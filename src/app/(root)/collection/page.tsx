"use client";
import React from "react";

//INTERNAL IMPORT
import Style from "./Collection.module.css";
import images from "../../../img";
import { Banner, CollectionProfile, NFTCardTwo } from ".";
import { Slider, Brand, Filter } from "@/components";

const collection = () => {
  const nftArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
  ];
  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.creatorbackground1} />
      <CollectionProfile/>
      <Filter />
      <div className={Style.collection_nft_card_two}>
        {nftArray.map((element, index)=><NFTCardTwo element={element} index={index} key={index+1}/>)}
      </div>
      <Slider/>
      <Brand/>
    </div>
  );
};

export default collection;
