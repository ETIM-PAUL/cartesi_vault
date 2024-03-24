import { useState } from "react";
import { Wallet } from "cartesi-wallet"
import TopNav from "./components/TopNav";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useConnectWallet } from '@web3-onboard/react'
import { toast } from "react-toastify";
import { isAddress } from "@ethersproject/address";
import { ethers } from "ethers";
import { useRollups } from "./useRollups";

const App = () => {

  const [ethAddress, setEthAddress] = useState("")
  const [selected, setSelected] = useState("ether_dep")
  const [amount, setAmount] = useState()
  let cartesi_wallet = new Wallet(new Map());
  const [{ wallet }, connect] = useConnectWallet();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const schema = yup
    .object({
      dapp: yup.string(),
      amount: yup.string(),
      erc20: yup.string(),
    })
    .required();
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // const rollups = useRollups("0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C");



  const sendTransaction = async (data) => {
    setIsSubmitLoading(true)
    console.log(data)
    if (!isAddress(data.dapp)) {
      toast.error("Invalid address value");
      return;
    }
    try {
      // if (data.dapp) {
      //   try {
      //     let str = cartesi_wallet.ether_deposit_process();
      //     let payload = ethers.utils.toUtf8Bytes(str);

      //     const result = await rollups.inputContract.addInput(data.dapp, payload);
      //     toast.info("waiting for confirmation...");
      //     const receipt = await result.wait(1);
      //     reset();
      //     // Search for the InputAdded event
      //     setIsSubmitLoading(true)
      //     toast("Ether Deposited sucessfully");

      //   } catch (e) {
      //     console.log(`${e}`);
      //   }
      // }
      setIsSubmitLoading(true);
      setTimeout(() => {
        setIsSubmitLoading(false);
        toast.success("processing transaction")
      }, 5000);
    } catch (error) {
      setIsSubmitLoading(false)
      console.log("Error", error);
      setError("name", {
        type: "manual",
        message: error.message,
      });
    }
  }


  return (
    <div className="App bg-white h-screen">
      <TopNav />

      <form
        onSubmit={handleSubmit(sendTransaction)} className='border-gray-200 bg-gray-900 w-full md:max-w-2xl mx-auto mt-20 h-fit py-10'>
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
                <input {...register("dapp")} onChange={(e) => setEthAddress(e.target.value)} className='h-12 w-full py-1 px-3 border rounded-md focus:outline-none' placeholder='Enter dapp address' />
              </div>
              <div className='inline-grid w-full mt-4'>
                <label className='text-white font-medium text-lg pb-1'>Ether Amount</label>

                <div className='flex relative'>
                  <input {...register("amount")} onChange={(e) => setAmount(e.target.value)} type="number" className='h-12 w-full py-1 px-3 border rounded-md focus:outline-none appearance-none' placeholder='Enter Ether amount' />
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
                <input value={ethAddress} onChange={(e) => setEthAddress(e.target.value)} className='h-12 w-full py-1 px-3 border rounded-md focus:outline-none' placeholder='Enter erc20 address' />
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
              <div className='inline-grid w-full'>
                <label className='text-white font-medium text-lg pb-1'>ERC20 Address</label>
                <input value={ethAddress} onChange={(e) => setEthAddress(e.target.value)} className='h-12 w-full py-1 px-3 border rounded-md focus:outline-none' placeholder='Enter erc20 address' />
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
              <div className='inline-grid w-full'>
                <label className='text-white font-medium text-lg pb-1'>ERC20 Address</label>
                <input value={ethAddress} onChange={(e) => setEthAddress(e.target.value)} className='h-12 w-full py-1 px-3 border rounded-md focus:outline-none' placeholder='Enter erc20 address' />
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

        <div className='max-w-sm mx-auto mt-12'>
          {!wallet?.accounts ?
            <button onClick={() => connect()} className={`bg-blue-500 w-full h-12 text-white font-bold text-xl rounded-md`}>Connect Wallet</button>
            :
            <button disabled={isSubmitLoading} type="submit" className={`bg-black w-full h-12 text-white font-bold text-xl rounded-md disabled:opacity-30`}>{isSubmitLoading ? "Loading" : "Process"}</button>
          }
        </div>
      </form>
    </div>
  );
};

export default App;