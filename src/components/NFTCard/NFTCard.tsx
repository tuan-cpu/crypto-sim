import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./NFTCard.module.css";
import images from "../../img";

const NFTCard = () => {
  const featuredArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [like, setLike] = useState(true);
  const likeNFT = () => {
    setLike(!like);
  };
  return (
    <div className={Style.nftCard}>
      {featuredArray.map((element, index) => (
        <div key={index + 1} className={Style.nftCard_box}>
          <div className={Style.nftCard_box_img}>
            <Image
              src={images.nft_image_1}
              alt="NFT Image"
              width={600}
              height={600}
              className={Style.nftCard_box_img_mg}
            />
          </div>
          <div className={Style.nftCard_box_update}>
            <div className={Style.nftCard_box_update_left}>
              <div
                className={Style.nftCard_box_update_left_like}
                onClick={() => likeNFT()}
              >
                {like ? (
                  <AiOutlineHeart />
                ) : (
                  <AiFillHeart
                    className={Style.nftCard_box_update_left_like_icon}
                  />
                )}
                {""} 22
              </div>
            </div>
            <div className={Style.nftCard_box_update_right}>
              <div className={Style.nftCard_box_update_right_info}>
                <small>Remaining time</small>
                <p>3h : 15m : 20s</p>
              </div>
            </div>
          </div>
          <div className={Style.nftCard_box_update_details}>
            <div className={Style.nftCard_box_update_details_price}>
              <div className={Style.nftCard_box_update_details_price_box}>
                <h4>Clone #12234 </h4>
                <div className={Style.nftCard_box_update_details_price_box_box}>
                  <div
                    className={
                      Style.nftCard_box_update_details_price_box_box_bid
                    }
                  >
                    <small>Current Bid</small>
                    <p>1.000ETH</p>
                  </div>
                  <div
                    className={
                      Style.nftCard_box_update_details_price_box_box_stock
                    }
                  >
                    <small>61 in stocks</small>
                  </div>
                </div>
              </div>
            </div>
            <div className={Style.nftCard_box_update_details_category}>
              <BsImages />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTCard;
