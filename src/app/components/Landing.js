import React, { useState, useEffect } from "react";
const ethers = require("ethers")
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const CHAIN_ID_REQUIRED = 80001; //Mumbai

function Landing() {
  
  const router = useRouter();
  let [walletAddress, setWalletAddress] = useState(false)

  // Creating a function to connect user's wallet
  const connectWallet = async () => {
    console.log("TRIGGER CONNECT")
    toast.loading("loading..")
    try {
      const { ethereum } = window;

      // Checking if user have Metamask installed
      if (!ethereum) {
        // If user doesn't have Metamask installed, throw an error
        alert("Please install MetaMask");
        return;
      }
      let ETHERSJS_PROVIDER = new ethers.BrowserProvider(ethereum);
      await ETHERSJS_PROVIDER.send('wallet_switchEthereumChain', [{ chainId: `0x${CHAIN_ID_REQUIRED.toString(16)}` }]);

      // If user has Metamask installed, connect to the user's wallet
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log(accounts, "ACC")

      // At last save the user's wallet address in browser's local storage
      localStorage.setItem("walletAddress", accounts[0]);
      setWalletAddress(accounts)
      toast.dismiss()
      toast.success("Wallet Connected!")
      router.push("/home")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.removeItem("walletAddress")
  }, [])
  

  return (
    <>
      {/* Creating a hero component with black background and centering everything in the screen */}
      <Toaster />
      <section className="relative bg-black flex flex-col h-screen justify-center items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="text-center pb-12 md:pb-16">
              <h1
                className="text-5xl text-white md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
              >
                It is YouTube, but{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                  Decentralized
                </span>
              </h1>
              <div className="max-w-3xl mx-auto">
                <p
                  className="text-xl text-gray-400 mb-8"
                  data-aos="zoom-y-out"
                  data-aos-delay="150"
                >
                  A YouTube Clone built on top of Polygon network, allow users
                  to create, share and watch videos, without worrying about
                  their privacy.
                </p>
                {
                  walletAddress ? 
                  <div>
                    <h6
                    className="text text-white md:text-6 font-extrabold leading-tighter tracking-tighter mb-4"
                    data-aos="zoom-y-out"
                    >
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                        {localStorage.getItem("walletAddress")}
                      </span>
                      <br></br>Wallet Address Connected
                    </h6> 

                    {/* <button
                    className="items-center  bg-white rounded-full font-medium  p-4 shadow-lg w-52  "
                    onClick={() => {
                      // Calling the connectWallet function when user clicks on the button
                      connectWallet();
                    }}
                    >
                      <span>Upload Video</span>
                    </button> */}
                  </div>
                  
                  
                  : <button
                  className="items-center  bg-white rounded-full font-medium  p-4 shadow-lg"
                  onClick={() => {
                    // Calling the connectWallet function when user clicks on the button
                    connectWallet();
                  }}
                >
                  <span>Connect wallet</span>
                </button>
                }

                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Landing;
