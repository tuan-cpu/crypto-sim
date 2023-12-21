import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsImages } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./NFTDetailsImg.module.css";

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
  const shortenAddress = (address: string) => {
    if (address?.length < 25) {
      return address;
    }
    address = address?.substr(0, 25);
    return `${address}...`;
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
              src={nft?.image}
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
            <p>{nft?.description}</p>
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
              <small>Contact Address</small>
              <br></br>
              {shortenAddress(nft?.seller || nft?.escrow)}
            </p>
            <p>
              <small>Token ID</small> {nft?.tokenId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetailsImg;
