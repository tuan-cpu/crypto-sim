import React from 'react';

//INTERNAL IMPORT
import Style from './NFTDetails.module.css';
import { NFTDescription, NFTDetailsImg, NFTTabs } from '.';

const NFTDetailsPage = () => {
  return (
    <div className={Style.nftDetailsPage}>
        <div className={Style.nftDetailsPage_box}>
            <NFTDetailsImg/>
            <NFTDescription/>
        </div>
    </div>
  )
}

export default NFTDetailsPage