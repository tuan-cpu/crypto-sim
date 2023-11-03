import React from 'react';
import Image from 'next/image';

//INTERNAL IMPORT 
import Style from './HeroSection.module.css';
import { Button } from '..';
import images from '../../img';

const HeroSection = () => {
  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <h1>Discover, select and sell NFTs </h1>
          <p>
            Discover the most outstanding NFTs in all topics of life. Creative your NFTs and sell them
          </p>
          <Button btnText='Start your search' handleClick={()=>{}}/>
        </div>
        <div className={Style.heroSection_box_right}>
          <Image src={images.hero} alt='Hero section' width={600} height={600}/>
        </div>
      </div>
    </div>
  )
}

export default HeroSection