"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./page.module.css";
import images from "../../img";
import { useConnectWalletContext } from "@/context/ConnectWalletContext";

const page = () => {
  const { connectWalletPressed } = useConnectWalletContext();
  const [activeBtn, setActiveBtn] = useState(1);
  const providerArray = [
    {
      provider: images.provider1,
      name: "MetaMask",
    },
    {
      provider: images.provider2,
      name: "Wallet Connect",
    },
    {
      provider: images.provider3,
      name: "Coinbase Wallet",
    },
    {
      provider: images.provider4,
      name: "Crypto.com",
    },
  ];
  return (
    <div className={Style.connectWallet}>
      <div className={Style.connectWallet_box}>
        <h1>Connect your wallet</h1>
        <p className={Style.connectWallet_box_para}>
          Connect with one of our available wallet providers or create a new
          one.
        </p>
        <div className={Style.connectWallet_box_provider}>
          {providerArray.map((element, index) => (
            <div
              className={`${Style.connectWallet_box_provider_item} ${
                activeBtn == index + 1 ? Style.active : ""
              }`}
              key={index + 1}
              onClick={() => {
                setActiveBtn(index + 1);
                if (index == 0) connectWalletPressed();
              }}
            >
              <Image
                src={element.provider}
                alt={element.name}
                width={50}
                height={50}
                className={Style.connectWallet_box_provider_item_img}
              />
              <p>{element.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
