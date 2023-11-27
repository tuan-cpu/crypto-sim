"use client";
import React from 'react';

//INTERNAL IMPORT
import { Button, Category, Brand } from '@/components';
import NFTDetailsPage from './NFTDetailsPage';

import { useControlContext } from '@/context/ControlContext';

const NFTDetails = () => {
  const { selectedNFT } = useControlContext();
  return (
    <div>
      <NFTDetailsPage nft={selectedNFT}/>
      <Category/>
      <Brand/>
    </div>
  )
}

export default NFTDetails