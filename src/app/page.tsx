"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  getSecondGenesis,
  nftContract,
  connectWallet,
  getCurrentWalletConnected,
  buySim,
} from "../utils/interact.js";
declare global {
  interface Window {
    ethereum: {
      on: any;
      request: (request: {
        method: string;
        params?: Array<any>;
      }) => Promise<any>;
    };
  }
}
export default function Home() {
  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState<any>();
  const [message, setMessage] = useState("No connection to the network.");
  const [newMessage, setNewMessage] = useState("");
  //called only once
  useEffect(() => {
    async function fetchMessage() {
      const message = await getSecondGenesis();
      setMessage(message[1]);
    }
    fetchMessage();
    addSmartContractListener();
    async function fetchWallet() {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
    }
    fetchWallet();
    addWalletListener();
  }, []);
  function addSmartContractListener() {
    nftContract.events.Birth({}, (error: any, data: any) => {
      if (error) {
        setStatus("😥 " + error.message);
      } else {
        setMessage(data.returnValues[1]);
        setNewMessage("");
        setStatus("🎉 New Sim was born!");
      }
    });
  }

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: any) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Press the button below to buy new Sim.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onBuySimPressed = async () => {
    const { status } = await buySim(walletAddress);
    setStatus(status);
  };
  return (
    <main>
      <div id="container">
        <button id="walletButton" onClick={connectWalletPressed}>
          {walletAddress.length > 0 ? (
            "Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )}
        </button>

        <h2 style={{ paddingTop: "50px" }}>Second Genesis genes:</h2>
        <p>{message}</p>
        <div>
          <button id="publishButton" onClick={onBuySimPressed}>
            Buy Sim
          </button>
        </div>
      </div>
    </main>
  );
}
