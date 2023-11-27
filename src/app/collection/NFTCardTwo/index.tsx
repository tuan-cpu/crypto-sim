import React, { useState } from "react";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./NFTCardTwo.module.css";
import { LikeProfile } from "@/components";
import { useControlContext } from "@/context/ControlContext";

interface Props {
  element: any;
  index: number;
}

const NFTCardTwo: React.FC<Props> = ({ element, index }) => {
  const { updateSelectedNFT } = useControlContext();
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
  return (
    <Link
      href={{
        pathname: "/NFT-details",
      }}
      key={index + 1}
    >
      <div
        className={Style.nftCardTwo}
        onClick={() =>
          updateSelectedNFT({
            image: element.tokenUri,
            tokenId: element.tokenId,
            name: element.tokenName,
            seller: element.seller || "",
            escrow:
              element.escrow || "0x2822126c7d88Fd8128Ca79ea7953ac0ec05442E3",
            price: element.price || 0,
          })
        }
      >
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
              src={element.tokenUri}
              alt="NFT"
              width={500}
              height={300}
              style={{ objectFit: "cover" }}
              className={Style.nftCardTwo_box_img_img}
            />
          </div>
          <div className={Style.nftCardTwo_box_info}>
            <div className={Style.nftCardTwo_box_info_left}>
              <LikeProfile />
              <p>{element.tokenName}</p>
            </div>
            <span>4{index + 2}</span>
          </div>
          <div className={Style.nftCardTwo_box_price}>
            <div className={Style.nftCardTwo_box_price_box}>
              <small>Current Bid</small>
              <p>{element.price || 0} ETH</p>
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
