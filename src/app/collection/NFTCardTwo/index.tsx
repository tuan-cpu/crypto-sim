import React, { useState } from "react";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./NFTCardTwo.module.css";
import { LikeProfile } from "@/components";

interface Props {
  element: any;
  index: number;
}

const NFTCardTwo: React.FC<Props> = ({ element, index }) => {
  const [like, setLike] = useState(false);
  const [likeInc, setLikeInc] = useState(21);
  const likeNFT = () => {
    if (!like) {
      setLike(true);
      setLikeInc(likeInc + 1);
    } else {
      setLike(false);
      setLikeInc(likeInc - 1);
    }
  };
  const getImageSrc = (imageIPFS: string) => {
    return imageIPFS.substring(7, imageIPFS.length);
  };
  return (
    <Link href={{ pathname: "/NFT-details", query: element }} key={index+1}>
      <div className={Style.nftCardTwo}>
        <div className={Style.nftCardTwo_box}>
          <div className={Style.nftCardTwo_box_like}>
            <div className={Style.nftCardTwo_box_like_box}>
              <div className={Style.nftCardTwo_box_like_box_box}>
                <BsImage className={Style.nftCardTwo_box_like_box_box_icon} />
                <p onClick={() => likeNFT()}>
                  {like ? <AiOutlineHeart /> : <AiFillHeart />}
                  {""}
                  <span>{likeInc + 1}</span>
                </p>
              </div>
            </div>
          </div>
          <div className={Style.nftCardTwo_box_img}>
            <Image
              src={`https://gateway.pinata.cloud/ipfs${getImageSrc(
                element.image
              )}`}
              alt="NFT"
              width={500}
              style={{ objectFit: "cover", height: 300 }}
              className={Style.nftCardTwo_box_img_img}
            />
          </div>
          <div className={Style.nftCardTwo_box_info}>
            <div className={Style.nftCardTwo_box_info_left}>
              <LikeProfile />
              <p>{element.name}</p>
            </div>
            <span>4{index + 2}</span>
          </div>
          <div className={Style.nftCardTwo_box_price}>
            <div className={Style.nftCardTwo_box_price_box}>
              <small>Current Bid</small>
              <p>{element.price} ETH</p>
            </div>
            <p className={Style.nftCardTwo_box_price_stock}>
              <MdTimer /> <span>{index + 1} hours left</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NFTCardTwo;
