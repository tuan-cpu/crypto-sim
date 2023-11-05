import React from 'react';
import Image from 'next/image';
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram
} from "react-icons/ti";

//INTERNAL IMPORT
import Style from './CollectionProfile.module.css';
import images from '../../../img';
import Link from 'next/link';

const CollectionProfile = () => {
  const cardArray = [1,2,3,4];
  return (
    <div className={Style.collectionProfile}>
      <div className={Style.collectionProfile_box}>
        <div className={Style.collectionProfile_box_left}>
          <Image src={images.nft_image_1}
          alt='nft image'
          width={800}
          height={800}
          className={Style.collectionProfile_box_left_img}/>
                <div className={Style.collectionProfile_box_left_social}>
          <Link href={{pathname:'#'}}><TiSocialFacebook/></Link>
          <Link href={{pathname:'#'}}><TiSocialInstagram/></Link>
          <Link href={{pathname:'#'}}><TiSocialLinkedin/></Link>
          <Link href={{pathname:'#'}}><TiSocialTwitter/></Link>
          <Link href={{pathname:'#'}}><TiSocialYoutube/></Link>
        </div>
        </div>
        <div className={Style.collectionProfile_box_middle}>
          <h1>Awesome NFTs Collection</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <div className={Style.collectionProfile_box_middle_box}>
            {cardArray.map((element, index)=>(
              <div className={Style.collectionProfile_box_middle_box_item} key={index+1}>
                <small>Floor price</small>
                <small>${index+1}92,123</small>
                <span>+ {index+2}.11%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionProfile