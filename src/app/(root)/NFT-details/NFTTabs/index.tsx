import React, { useState, useEffect } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./NFTTabs.module.css";
import images from "../../../../img";
import { getUserImage } from "@/lib/actions/users.actions";
import { useNFTContext } from "@/context/NFTContext";

interface Props {
  dataTab: any;
  type: string;
}

type DataTab = {
  wallet: string;
  amount: string;
  timestamp: number;
  image: string;
};

const NFTTabs: React.FC<Props> = ({ dataTab, type }) => {
  const { weiToEth } = useNFTContext();
  const [generalizedData, setGeneralizedData] = useState<DataTab[]>([]);
  useEffect(() => {
    const normalizedData = async () => {
      let result = [];
      if (type === "auction") {
        for (let i = 0; i < dataTab.length; i++) {
          const image = await getUserImage(dataTab[i].bidder);
          result.push({
            wallet: dataTab[i].bidder,
            amount: weiToEth(dataTab[i].bid.toString()),
            timestamp: dataTab[i].timestamp * 1000,
            image: image
          });
        }
      } else {
        for (let i = 0; i < dataTab.length; i++) {
          const image = await getUserImage(dataTab[i].wallet);
          result.push({
            wallet: dataTab[i].wallet,
            amount: weiToEth(dataTab[i].price.toString()),
            timestamp: dataTab[i].timestamp * 1000,
            image: image
          });
        }
      }
      setGeneralizedData(result);
    };
    normalizedData();
  }, []);
  const convertTimestamp = (timestamp: string | number | Date) => {
    return new Date(timestamp).toLocaleString();
  };
  return (
    <>
      {generalizedData.length > 0 && (
        <div className={Style.nftTabs}>
          {generalizedData.map((element: any, index: number) => (
            <div className={Style.nftTabs_box} key={index + 1}>
              <Image
                src={element.image !== "" ? element.image : images.user1}
                alt="profile-image"
                width={40}
                height={40}
                className={Style.nftTabs_box_img}
              />
              <div className={Style.nftTabs_box_info}>
                <span>
                  Offer {element.price} ETH by{" "}
                  <span className={Style.nftTabs_box_info_owner}>
                    {element.wallet}
                  </span>
                </span>
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
