import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsImages } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./NFTDetailsImg.module.css";
import images from "../../../img";

interface Props {
  nft: any;
}

const NFTDetailsImg: React.FC<Props> = ({ nft }) => {
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
  };
  const getImageSrc = (imageIPFS: string) => {
    return imageIPFS.substring(7, imageIPFS.length);
  };
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
              // src={`https://gateway.pinata.cloud/ipfs${getImageSrc(nft.image)}`}
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
              {nft?.description}
            </p>
          </div>
        )}
        <div
          className={Style.nftDetailsImg_box_details}
          onClick={() => openDetails()}
        >
          <p>Details</p>
          {details ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>
        {details && (
          <div className={Style.nftDetailsImg_box_details_box}>
            <small>2000 x 2000 px.IMAGE(685kb)</small>
            <p>
              <small>Contract Address</small>
              <br></br>
              {nft?.seller}
            </p>
            <p>
              <small>Token ID</small>
              <br></br>
              {nft?.tokenId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetailsImg;
