import React from 'react';
import Image from 'next/image';

//INTERNAL IMPORT
import Style from './Brand.module.css';
import images from '../../img';
import { Button } from '..';

const Brand = () => {
  return (
    <div className={Style.brand}>
      <div className={Style.brand_box}>
        <div className={Style.brand_box_left}>
          <Image src={images.logo} alt='brand-logo' width={120} height={100}/>
          <h1>Earn free crypto with Ciscrypt</h1>
          <p>A creative agency that lead and inspire</p>
          <div className={Style.brand_box_left_btn}>
            <Button btnText='Create' handleClick={() => { } } icon={undefined} classStyle={undefined}/>
            <Button btnText='Discover' handleClick={() => { } } icon={undefined} classStyle={undefined}/>
          </div>
        </div>
        <div className={Style.brand_box_right}>
          <Image src={images.earn} alt='brand-logo' width={800} height={600}/>
        </div>
      </div>
    </div>
  )
}

export default Brand