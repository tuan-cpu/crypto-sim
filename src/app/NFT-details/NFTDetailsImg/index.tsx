import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsImages } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./NFTDetailsImg.module.css";
import images from "../../../img";

const NFTDetailsImg = () => {
  const [description, setDescription] = useState(true);
  const [details, setDetails] = useState(true);
  const [like, setLike] = useState(false);
  const likeNFT = () => {
    setLike(!like);
  };
  const openDescription = () => {
    setDescription(!description);
  };
  const openDetails = () => {
    setDetails(!details);
  }
  return (
    <div className={Style.nftDetailsImg}>
      <div className={Style.nftDetailsImg_box}>
        <div className={Style.nftDetailsImg_box_NFT}>
          <div className={Style.nftDetailsImg_box_NFT_like}>
            <BsImages className={Style.nftDetailsImg_box_NFT_like_icon} />
            <p onClick={() => likeNFT()}>
              {!like ? (
                <AiOutlineHeart
                  className={Style.nftDetailsImg_box_NFT_like_icon}
                />
              ) : (
                <AiFillHeart
                  className={Style.nftDetailsImg_box_NFT_like_icon}
                />
              )}
              <span>23</span>
            </p>
          </div>
          <div className={Style.nftDetailsImg_box_NFT_img}>
            <Image
              src={images.nft_image_1}
              className={Style.nftDetailsImg_box_NFT_img_img}
              alt="NFT image"
              width={700}
              height={800}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div
          className={Style.nftDetailsImg_box_description}
          onClick={() => openDescription()}
        >
          <p>Description</p>
          {description ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>
        {description && (
          <div className={Style.nftDetailsImg_box_description_box}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        )}
        <div className={Style.nftDetailsImg_box_details} onClick={()=>openDetails()}>
          <p>Details</p>
          {details ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>
        {
          details && (
            <div className={Style.nftDetailsImg_box_details_box}>
            <small>2000 x 2000 px.IMAGE(685kb)</small>
            <p>
              <small>Contract Address</small>
              <br></br>
              0x1234567890myaddress
            </p>
            <p>
              <small>Token ID</small>
              <br></br>
              123456
            </p>
          </div>
          )
        }
      </div>
    </div>
  );
};

export default NFTDetailsImg;
