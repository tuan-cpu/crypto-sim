import React from 'react';

//INTERNAL IMPORT
import Style from './NFTDetails.module.css';
import { NFTDescription, NFTDetailsImg, NFTTabs } from '.';

interface Props {
  nft: any;
}

const NFTDetailsPage:React.FC<Props> = ({nft}) => {
  return (
    <div className={Style.nftDetailsPage}>
        <div className={Style.nftDetailsPage_box}>
            <NFTDetailsImg nft={nft}/>
            <NFTDescription nft={nft}/>
        </div>
    </div>
  )
}

export default NFTDetailsPage