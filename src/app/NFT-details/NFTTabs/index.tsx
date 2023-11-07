import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./NFTTabs.module.css";

interface Props {
  dataTab: any;
  icon: any
}

const NFTTabs: React.FC<Props> = ({ dataTab, icon }) => {
  return (
    <div className={Style.nftTabs}>
      {dataTab.map((element: any, index: number) => (
        <div className={Style.nftTabs_box} key={index + 1}>
          <Image
            src={element}
            alt="profile-image"
            width={40}
            height={40}
            className={Style.nftTabs_box_img}
          />
          <div className={Style.nftTabs_box_info}>
            <span>
              Offer by $770 by <span className={Style.nftTabs_box_info_owner}>Lê Tuấn {icon}</span> 
            </span>
            <small>Jun 14 - 4:12 PM</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTTabs;
