"use client";
import React from 'react';

//INTERNAL IMPORT
import Style from './search.module.css';
import { Slider, Brand, Filter } from '@/components';
import { SearchBar } from './SearchPage';
import { Banner, NFTCardTwo } from '../collection';
import images from '../../img';

const Search = () => {
  const collectionArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3
  ]
  return (
    <div className={Style.search}>
      <Banner bannerImage={images.creatorbackground1}/>
      <SearchBar/>
      <Filter/>
      <div className={Style.search_box}>
        {
          collectionArray.map((element, index)=>(
            <NFTCardTwo element={element} index={index} key={index+1}/>
          ))
        }
      </div>
      <Slider/>
      <Brand/>
    </div>
  )
}

export default Search