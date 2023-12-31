import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./NFTCard.module.css";
import { LikeProfile } from "@/components";
import { useControlContext } from "@/context/ControlContext";
import Timer from "./Timer";

interface Props {
  element: any;
  index: number;
}

const NFTCard: React.FC<Props> = ({ element, index }) => {
  const { updateSelectedNFT } = useControlContext();
  return (
    <Link
      href={{
        pathname: "/NFT-details",
      }}
      key={index + 1}
    >
      <div className={Style.nftCard} onClick={() => {
        if(element.type == 'market') {
          updateSelectedNFT({
            image: element.item.image,
            tokenURI: element.item.tokenURI,
            tokenId: element.item.tokenId,
            metadata: element.item.metadata,
            seller: element.item.seller,
            escrow: element.item.escrow,
            price: element.item.ethPrice || 0,
          })
        }else{
          updateSelectedNFT({
            image: element.item.image,
            tokenURI: element.item.tokenURI,
            tokenId: element.item.tokenId,
            metadata: element.item.metadata,
            seller: element.item.seller,
            minBid: element.item.minBid,
            highestBid: element.item.highestBid,
            highestBidder: element.item.highestBidder,
            endTimestamp: element.item.endTimestamp,
            type: "auction"
          })
        }
      }}>
        <div className={Style.nftCard_box}>
          <div className={Style.nftCard_box_timer}>
            <div className={Style.nftCard_box_timer_box}>
              {element.type == "auction" && (
                <div className={Style.nftCard_box_timer}>
                  <Timer timestamp={element.item.endTimestamp} />
                </div>
              )}
            </div>
          </div>
          <div className={Style.nftCard_box_img}>
            <Image
              src={element.item.image}
              alt="NFT"
              width={500}
              height={300}
              style={{ objectFit: "cover" }}
              className={Style.nftCard_box_img_img}
            />
          </div>
          <div className={Style.nftCard_box_info}>
            <div className={Style.nftCard_box_info_left}>
              <LikeProfile />
              <p>{element.item.metadata.name}</p>
            </div>
            <span>{index + 2}</span>
          </div>
          {element.type == "market" ? (
            <div className={Style.nftCard_box_price}>
              <p>Price: {element.item.ethPrice} ETH</p>
            </div>
          ) : (
            <div className={Style.nftCard_box_bid}>
              <p>Min Bid: {element.item.minBid} ETH</p>
              <p>Current Highest Bid: {element.item.highestBid} ETH</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
