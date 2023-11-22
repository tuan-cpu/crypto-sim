"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

//INTERNAL IMPORT
import { Button, Category, Brand } from '@/components';
import NFTDetailsPage from './NFTDetailsPage';

//SMART CONTRACT IMPORT
import { useNFTContext } from '@/context/NFTContext';


interface NFT {
  image: string;
  tokenId: string;
  name: string;
  seller: string;
  escrow: string;
  price: string;
}

const NFTDetails = () => {
  const {} = useNFTContext();
  const [nft, setNft] = useState<NFT | null>(null);
  const searchParams = useSearchParams();
  useEffect(()=>{
    if(!searchParams) return;

    const image = searchParams.get('image') || "";
    const tokenId = searchParams.get('tokenId') || "";
    const name = searchParams.get('name') || "";
    const seller = searchParams.get('seller') || "";
    const escrow = searchParams.get('escrow') || "";
    const price = searchParams.get('price') || "";
    
    const parsedNFT: NFT = {
      image,
      tokenId,
      name, 
      seller,
      escrow,
      price
    };

    setNft(parsedNFT);
  },[searchParams])
  return (
    <div>
      <NFTDetailsPage nft={nft}/>
      <Category/>
      <Brand/>
    </div>
  )
}

export default NFTDetails