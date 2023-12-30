import React, { useState } from "react";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./NFTCard.module.css";
import { LikeProfile } from "@/components";
import { useControlContext } from "@/context/ControlContext";

interface Props {
  element: any;
  index: number;
}

const NFTCard: React.FC<Props> = ({ element, index }) => {
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
        className={Style.nftCard}
        onClick={() =>
          updateSelectedNFT({
            image: element.image,
            tokenURI: element.tokenURI,
            tokenId: element.tokenId,
            metadata: element.metadata,
            seller: element.seller,
            escrow: element.escrow,
            price: element.ethPrice || 0,
          })
        }
      >
        <div className={Style.nftCard_box}>
          <div className={Style.nftCard_box_like}>
            <div className={Style.nftCard_box_like_box}>
              <div className={Style.nftCard_box_like_box_box}>
                <BsImage className={Style.nftCard_box_like_box_box_icon} />
                <p onClick={() => likeNFT()}>
                  {like ? <AiOutlineHeart /> : <AiFillHeart />}
                  {""}
                  <span>{likeInc + 1}</span>
                </p>
              </div>
            </div>
          </div>
          <div className={Style.nftCard_box_img}>
            <Image
              src={element.image}
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
              <p>{element.metadata.name}</p>
            </div>
            <span>{index + 2}</span>
          </div>
          <div className={Style.nftCard_box_price}>
            <p>Price: {element.ethPrice} ETH</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
