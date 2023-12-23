"use client";
import React, { useEffect } from 'react';

//INTERNAL IMPORT
import { Category, Brand } from '@/components';
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