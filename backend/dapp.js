// Copyright 2022 Cartesi Pte. Ltd.
//
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

const { ethers } = require("ethers");
const { Wallet } = require("cartesi-wallet");
const { stringToHex } = "viem";
let wallet = new Wallet(new Map());

const rollup_server = process.env.ROLLUP_HTTP_SERVER_URL;
console.log("HTTP rollup_server url is " + rollup_server);
const DAPP_ADDRESS_REALY = "0xF5DE34d6BbC0446E2a45719E718efEbaaE179daE";

async function handle_advance(data) {
    console.log("Received advance request data " + JSON.stringify(data));
    let input = data.payload;
    let str = Buffer.from(input.substr(2), "hex").toString("utf8");
    let json = JSON.parse(str);
    let JSONpayload = {};
    try {
        if (
            String(data.metadata.msg_sender).toLowerCase() ===
            DAPP_ADDRESS_REALY.toLowerCase()
        ) {
            console.log("setting Dapp address:", input);
            DAPP_ADDRESS = payload;
        }

        console.log("payload:" + JSON.stringify(input));
    } catch (e) {
        console.log("error is:", e);
        console.log(`Adding notice with binary value "${payload}"`);
        await fetch(rollup_server + "/report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ payload: payload }),
        });
        return "reject";
    }

    let notice;
    try {
        if (json.method == "ether_deposit") {
            notice = wallet.ether_deposit_process(json.amount);
            await fetch(rollup_server + "/notice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ payload: notice.payload }),
            });
            const json = await notice.json();
            console.log("Received notice status " + notice.status + " with body " + JSON.stringify(json));
            return "accept";
        } else if (json.method == "ether_withdraw") {
            notice = wallet.ether_withdraw(json.dapp, data.metadata.msg_sender, BigInt(json.amount));
            await fetch(rollup_server + "/notice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ payload: notice.payload }),
            });
            const json = await notice.json();
            console.log("Received notice status " + notice.status + " with body " + JSON.stringify(json));
            return "accept";
        } else if (json.method == "ether_transfer") {
            notice = wallet.ether_transfer(data.metadata.msg_sender, json.to, BigInt(data.json.amount));
            await fetch(rollup_server + "/notice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ payload: notice.payload }),
            });
            const json = await notice.json();
            console.log("Received notice status " + notice.status + " with body " + JSON.stringify(json));
            return "accept";
        } else if (json.method == "ether_deposit") {
            notice = wallet.ether_deposit_process(BigInt(json.amount));
            await fetch(rollup_server + "/notice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ payload: notice.payload }),
            });
            const json = await notice.json();
            console.log("Received notice status " + notice.status + " with body " + JSON.stringify(json));
            return "accept";
        } else if (json.method == "erc_transfer") {
            notice = wallet.erc20_transfer(json.from, json.to, json.erc20, BigInt(json.amount));
            await fetch(rollup_server + "/notice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ payload: notice.payload }),
            });
        } else if (json.method == "erc_withdraw") {
            voucher = wallet.erc20_withdraw(json.from, json.erc20, BigInt(json.amount));
            await fetch(rollup_server + "/voucher", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ payload: voucher.payload, destination: voucher.destination }),
            });
        }
    }
    catch (e) {
        console.log("error is:", e);
        await fetch(rollup_server + "/report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                payload: stringToHex(JSON.stringify({ error: e })),
            }),
        });
        return "reject";
    }
}

async function handle_inspect(data) {
    console.log("Received inspect request data " + JSON.stringify(data));
    const payload = data["payload"];
    try {
        const payloadStr = ethers.utils.toUtf8String(payload);
        console.log(`Adding report "${payloadStr}"`);
    } catch (e) {
        console.log(`Adding report with binary value "${payload}"`);
    }
    const inspect_req = await fetch(rollup_server + '/report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ payload })
    });
    console.log("Received report status " + inspect_req.status);
    return "accept";
}

var handlers = {
    advance_state: handle_advance,
    inspect_state: handle_inspect,
}

var finish = { status: "accept" };

(async () => {
    while (true) {
        console.log("Sending finish")

        const finish_req = await fetch(rollup_server + '/finish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'accept' })
        });

        console.log("Received finish status " + finish_req.status);


        if (finish_req.status == 202) {
            console.log("No pending rollup request, trying again");
        } else {
            const rollup_req = await finish_req.json();
            var handler = handlers[rollup_req["request_type"]];
            finish["status"] = await handler(rollup_req["data"]);

        }
    }
})();
