import { FC } from "react";
// import injectedModule from "@web3-onboard/injected-wallets";
// import { init, useConnectWallet } from "@web3-onboard/react";
import { useState } from "react";
import { Wallet } from "cartesi-wallet"
import configFile from "./config.json";
import TopNav from "./components/TopNav";

import { Web3OnboardProvider, init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
const config = configFile;

const injected = injectedModule();
const web3Onboard = init({
  wallets: [injected],
  chains: Object.entries(config).map(([k, v], i) => ({
    id: k,
    token: v.token,
    label: v.label,
    rpcUrl: v.rpcUrl,
  })),
  appMetadata: {
    name: "Cartesi Rollups Test DApp",
    icon: "<svg><svg/>",
    description: "Demo app for Cartesi Rollups",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
    ],
  },
});
// const chains = [ethereumRopsten]
// const wallets = [injectedModule()]
// const web3Onboard = init({
//   wallets,
//   chains,
//   appMetadata: {
//     name: 'Web3-Onboard Demo',
//     icon: '<svg>App Icon</svg>',
//     description: 'A demo of Web3-Onboard.'
//   }
// })


const App = () => {
  const [ethAddress, setEthAddress] = useState("")
  const [selected, setSelected] = useState("ether_dep")
  const [amount, setAmount] = useState()
  const [dappAddress, setDappAddress] = useState(
    "0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C"
  );
  let cartesi_wallet = new Wallet(new Map());

  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <div className="App bg-white h-screen">
        <TopNav />

        <div className='border-gray-200 bg-gray-900 w-full md:max-w-2xl mx-auto mt-20 h-fit py-10'>
          <span className='text-white text-lg md:text-2xl text-center block w-full font-bold'>Cartesi Vault</span>

          <select onChange={(e) => setSelected(e.target.value)} className="select select-bordered mx-auto grid mt-5 w-[80%]">
            <option disabled value="">--Please Select an option--</option>
            <option value="ether_dep">Ether Deposit</option>
            <option value="erc_dep">ERC20 Deposit</option>
            <option value="ether_wit">Ether Withdraw</option>
            <option value="ether_trf">Ether Transfer</option>
            <option value="erc_trf">ERC20 Transfer</option>
            <option value="erc_with">ERC20 Withdraw</option>
          </select>

          {selected === "ether_dep" &&
            <div>
              <div className='px-4 pb-4 mt-10'>
                <span className='text-white text-lg md:text-2xl text-center block w-full font-bold'>Deposit Ether</span>
              </div>
              <div className='pt-4 max-w-sm mx-auto'>
                <div className='inline-grid w-full'>
                  <label className='text-white font-medium text-lg pb-1'>Dapp Address</label>
                  <input value={ethAddress} onChange={(e) => setEthAddress(e.target.value)} className='h-12 w-full py-1 px-3 border rounded-md focus:outline-none' placeholder='Enter dapp address' />
                </div>
                <div className='inline-grid w-full mt-4'>
                  <label className='text-white font-medium text-lg pb-1'>Ether Amount</label>

                  <div className='flex relative'>
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className='h-12 w-full py-1 px-3 border rounded-md focus:outline-none appearance-none' placeholder='Enter Ether amount' />
                  </div>
                </div>
              </div>
            </div>
          }
          {selected === "erc_dep" &&
            <div>
              <div className='px-4 pb-4 mt-10'>
                <span className='text-white text-lg md:text-2xl text-center block w-full font-bold'>Deposit ERC20</span>
              </div>
              <div className='pt-4 max-w-sm mx-auto'>
                <div className='inline-grid w-full'>
                  <label className='text-white font-medium text-lg pb-1'>Dapp Address</label>
                  <input value={ethAddress} onChange={(e) => setEthAddress(e.target.value)} className='h-12 w-full py-1 px-3 border rounded-md focus:outline-none' placeholder='Enter dapp address' />
                </div>
                <div className='inline-grid w-full'>
                  <label className='text-white font-medium text-lg pb-1'>ERC20 Address</label>
                  <input value={ethAddress} onChange={(e) => setEthAddress(e.target.value)} className='h-12 w-full py-1 px-3 border rounded-md focus:outline-none' placeholder='Enter dapp address' />
                </div>
                <div className='inline-grid w-full mt-4'>
                  <label className='text-white font-medium text-lg pb-1'>ERC20 Amount</label>

                  <div className='flex relative'>
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className='h-12 w-full py-1 px-3 border rounded-md focus:outline-none appearance-none' placeholder='Enter Ether amount' />
                  </div>
                </div>
              </div>
            </div>
          }
          {selected === "ether_wit" &&
            <div>
              <div className='px-4 pb-4 mt-10'>
                <span className='text-white text-lg md:text-2xl text-center block w-full font-bold'>Withdraw Ether</span>
              </div>
              <div className='pt-4 max-w-sm mx-auto'>
                <div className='inline-grid w-full'>
                  <label className='text-white font-medium text-lg pb-1'>Dapp Address</label>
                  <input value={ethAddress} onChange={(e) => setEthAddress(e.target.value)} className='h-12 w-full py-1 px-3 border rounded-md focus:outline-none' placeholder='Enter dapp address' />
                </div>
                <div className='inline-grid w-full mt-4'>
                  <label className='text-white font-medium text-lg pb-1'>Ether Amount</label>

                  <div className='flex relative'>
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className='h-12 w-full py-1 px-3 border rounded-md focus:outline-none appearance-none' placeholder='Enter Ether amount' />
                  </div>
                </div>
              </div>
            </div>
          }
          {selected === "ether_trf" &&
            <div>
              <div className='px-4 pb-4 mt-10'>
                <span className='text-white text-lg md:text-2xl text-center block w-full font-bold'>Transfer Ether</span>
              </div>
              <div className='pt-4 max-w-sm mx-auto'>
                <div className='inline-grid w-full'>
                  <label className='text-white font-medium text-lg pb-1'>Dapp Address</label>
                  <input value={ethAddress} onChange={(e) => setEthAddress(e.target.value)} className='h-12 w-full py-1 px-3 border rounded-md focus:outline-none' placeholder='Enter dapp address' />
                </div>
                <div className='inline-grid w-full mt-4'>
                  <label className='text-white font-medium text-lg pb-1'>Ether Amount</label>

                  <div className='flex relative'>
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className='h-12 w-full py-1 px-3 border rounded-md focus:outline-none appearance-none' placeholder='Enter Ether amount' />
                  </div>
                </div>
              </div>
            </div>
          }
          {selected === "erc_trf" &&
            <div>
              <div className='px-4 pb-4 mt-10'>
                <span className='text-white text-lg md:text-2xl text-center block w-full font-bold'>ERC20 Transfer</span>
              </div>
              <div className='pt-4 max-w-sm mx-auto'>
                <div className='inline-grid w-full'>
                  <label className='text-white font-medium text-lg pb-1'>Dapp Address</label>
                  <input value={ethAddress} onChange={(e) => setEthAddress(e.target.value)} className='h-12 w-full py-1 px-3 border rounded-md focus:outline-none' placeholder='Enter dapp address' />
                </div>
                <div className='inline-grid w-full mt-4'>
                  <label className='text-white font-medium text-lg pb-1'>Ether Amount</label>

                  <div className='flex relative'>
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className='h-12 w-full py-1 px-3 border rounded-md focus:outline-none appearance-none' placeholder='Enter Ether amount' />
                  </div>
                </div>
              </div>
            </div>
          }
          {selected === "erc_with" &&
            <div>
              <div className='px-4 pb-4 mt-10'>
                <span className='text-white text-lg md:text-2xl text-center block w-full font-bold'>Deposit Ether</span>
              </div>
              <div className='pt-4 max-w-sm mx-auto'>
                <div className='inline-grid w-full'>
                  <label className='text-white font-medium text-lg pb-1'>Dapp Address</label>
                  <input value={ethAddress} onChange={(e) => setEthAddress(e.target.value)} className='h-12 w-full py-1 px-3 border rounded-md focus:outline-none' placeholder='Enter dapp address' />
                </div>
                <div className='inline-grid w-full mt-4'>
                  <label className='text-white font-medium text-lg pb-1'>Ether Amount</label>

                  <div className='flex relative'>
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className='h-12 w-full py-1 px-3 border rounded-md focus:outline-none appearance-none' placeholder='Enter Ether amount' />
                  </div>
                </div>
              </div>
            </div>
          }

          <div className='max-w-sm mx-auto mt-12'>
            <button className={`bg-blue-500 w-full h-12 text-white font-bold text-xl rounded-md`}>Process</button>
          </div>
        </div>
      </div>
    </Web3OnboardProvider>
  );
};

export default App;
