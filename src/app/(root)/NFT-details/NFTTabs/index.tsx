import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./NFTTabs.module.css";
import images from "../../../../img";

interface Props {
  dataTab: any;
}

const NFTTabs: React.FC<Props> = ({ dataTab }) => {
  const convertTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };
  const shortenAddress = (address: string) => {
    if (address?.length < 10) {
      return address;
    }
    address = address?.substr(0, 10);
    return `${address}...`;
  };
  return (
    <>
      {dataTab.length > 0 && (
        <div className={Style.nftTabs}>
          {dataTab.map((element: any, index: number) => (
            <div className={Style.nftTabs_box} key={index + 1}>
              <Image
                src={element.image ? element.image : images.user1}
                alt="profile-image"
                width={40}
                height={40}
                className={Style.nftTabs_box_img}
              />
              <div className={Style.nftTabs_box_info}>
                {Number(element.amount) > 0 ? (
                  <span>
                    Offer {Number(element.amount)} ETH by{" "}
                    <span className={Style.nftTabs_box_info_owner}>
                      {shortenAddress(element.wallet)}
                    </span>
                  </span>
                ) : (
                  <span>
                    Created by{" "}
                    <span className={Style.nftTabs_box_info_owner}>
                      {shortenAddress(element.wallet)}
                    </span>
                  </span>
                )}
                <small>{convertTimestamp(element.timestamp)}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NFTTabs;
