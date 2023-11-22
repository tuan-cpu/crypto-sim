"use client";
import React, { useEffect, useState } from "react";

//INTERNAL IMPORT
import Style from "./search.module.css";
import { Slider, Brand, Filter } from "@/components";
import { SearchBar } from "./SearchPage";
import { Banner, NFTCardTwo } from "../collection";
import images from "../../img";

//SMART CONTRACT IMPORT
import { useNFTContext } from "@/context/NFTContext";

const Search = () => {
  const { fetchMarketItem } = useNFTContext();
  const [nfts, setNFTs] = useState<any[]>([]);
  const [nftsCopy, setNFTsCopy] = useState<any[]>([]);

  useEffect(() => {
    fetchMarketItem().then((item: any) => {
      setNFTs(item.reverse());
      setNFTsCopy(item);
    });
  }, []);

  const onHandleSearch = (value: string) => {
    interface NFT {
      name: string;
    }
    const filteredNFTs: NFT[] = nfts.filter(({ name }: NFT) =>
      name.toLowerCase().includes(value)
    );
    if(filteredNFTs.length === 0) {
      setNFTs(nftsCopy);
    }else{
      setNFTs(filteredNFTs);
    }
  };

  const onClearSearch = () => {
    if(nfts.length && nftsCopy.length) {
      setNFTs(nftsCopy);
    }
  }
  // const collectionArray = [
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3
  // ]
  return (
    <div className={Style.search}>
      <Banner bannerImage={images.creatorbackground1} />
      <SearchBar onHandleSearch={onHandleSearch} onClearSearch={onClearSearch} />
      <Filter />
      <div className={Style.search_box}>
        {nfts.map((element, index) => (
          <NFTCardTwo element={element} index={index} key={index + 1} />
        ))}
      </div>
      <Slider />
      <Brand />
    </div>
  );
};

export default Search;
