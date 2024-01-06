"use client";
import React, { useEffect, useState } from "react";

//INTERNAL IMPORT
import Style from "./search.module.css";
import { Brand } from "@/components";
import { SearchBar, NFTCard } from "./SearchPage";
import { Banner } from "../collection";
import images from "../../../img";

//SMART CONTRACT IMPORT
import { useNFTContext } from "@/context/NFTContext";

const Search = () => {
  const { fetchMarketItem, fetchAuctionItem } = useNFTContext();
  const [nfts, setNFTs] = useState<any[]>([]);
  const [nftsCopy, setNFTsCopy] = useState<any[]>([]);

  useEffect(() => {
    const getMarketData = async () => {
      try {
        const marketItems = await fetchMarketItem();
        const auctionItems = await fetchAuctionItem();
        const modifiedAuctionItems = auctionItems.filter((item: any) => item.seller !== "0x0000000000000000000000000000000000000000");

        const result = [
          ...marketItems.map((item: any) => ({ item, type: 'market' })),
          ...modifiedAuctionItems.map((item: any) => ({ item, type: 'auction' })),
        ];
        return result;
      } catch (error) {
        console.error('Error fetching market data:', error);
        return [];
      }
    };
  
    const fetchData = async () => {
      const response = await getMarketData();
      setNFTs(response);
      setNFTsCopy(response);
    };
  
    fetchData();
  }, []);
  const onHandleSearch = (value: string) => {
    const filteredNFTs: any[] = nfts.filter((nft) =>
      nft.item.metadata.name.toLowerCase().includes(value)
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
  return (
    <div className={Style.search}>
      <Banner bannerImage={images.creatorbackground1} />
      <SearchBar onHandleSearch={onHandleSearch} onClearSearch={onClearSearch} />
      <div className={Style.search_box}>
        {nfts.map((element, index) => (
          <NFTCard element={element} index={index} key={index + 1} />
        ))}
      </div>
      <Brand />
    </div>
  );
};

export default Search;
