import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./NFTTabs.module.css";
import images from '../../../../img';

interface Props {
  dataTab: any
}

const NFTTabs: React.FC<Props> = ({ dataTab }) => {
  return (
    <div className={Style.nftTabs}>
      {dataTab.map((element: any, index: number) => (
        <div className={Style.nftTabs_box} key={index + 1}>
          <Image
            src={images.static_profile_1}
            alt="profile-image"
            width={40}
            height={40}
            className={Style.nftTabs_box_img}
          />
          <div className={Style.nftTabs_box_info}>
            <span>
              Offer by {element.price} ETH by <span className={Style.nftTabs_box_info_owner}>{element.wallet}</span> 
            </span>
            <small>{element.time}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTTabs;
