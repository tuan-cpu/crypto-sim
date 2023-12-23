"use client";
import React, { useEffect, useState } from "react";

//INTERNAL IMPORT
import Style from "./page.module.css";
import UploadNFT from "./UploadNFT";
//IMPORT SMART CONTRACT
import { useNFTContext } from "@/context/NFTContext";

const page = () => {
  const { createNFT } = useNFTContext();
  return (
    <div className={Style.uploadNFT}>
      <div className={Style.uploadNFT_box}>
        <div className={Style.uploadNFT_box_heading}>
          <h1>Create New NFT</h1>
          <p>
            You can set preferred display name, create your profile URL and
            manage other personal settings.
          </p>
        </div>
        <div className={Style.uploadNFT_box_title}>
          <h2>Image, Video, Audio and 3D Model</h2>
          <p>
            File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, CGG,
            GLE, GLTF. Max size: 100 MB
          </p>
        </div>
        <div className={Style.uploadNFT_box_form}>
          <UploadNFT createNFT={createNFT}/>
        </div>
      </div>
    </div>
  );
};

export default page;
