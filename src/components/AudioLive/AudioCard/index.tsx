import React, { useState } from "react";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TbPlayerPlay, TbPlayerPause } from "react-icons/tb";

//INTERNAL IMPORT
import Style from "./AudioCard.module.css";
import images from "../../../img";
import { LikeProfile } from "@/components";

const AudioCard = () => {
  const [like, setLike] = useState(false);
  const [play, setPlay] = useState(false);
  const likeNFT = () => {
    setLike(!like);
  };
  const playMusic = () => {
    setPlay(!play);
  }
  return (
    <div className={Style.audioCard}>
      <div className={Style.audioCard_box}>
        <div className={Style.audioCard_box_like_time}>
          <div className={Style.audioCard_box_like} onClick={() => likeNFT()}>
            {like ? (
              <AiFillHeart className={Style.audioCard_box_like_icon} />
            ) : (
              <AiOutlineHeart
                className={Style.audioCard_box_like_icon_unlike}
              />
            )}
            <span>24</span>
          </div>
          <div className={Style.audioCard_box_time}>
            <div className={Style.audioCard_box_time_remaining}>
              <small>Remaining time</small>
              <h5>5h : 15m : 20s</h5>
            </div>
          </div>
        </div>
        <div className={Style.audioCard_box_player}>
          <Image src={images.musiceWave} alt="musics" width={200} />
          <div className={Style.audioCard_box_musicPlayer} onClick={() => playMusic()}>
            {play ? (
              <div className={Style.audioCard_box_musicPlayer_icon}>
                <TbPlayerPause />
              </div>
            ) : (
              <div className={Style.audioCard_box_musicPlayer_icon}>
                <TbPlayerPlay />
              </div>
            )}
          </div>
        </div>
        <div className={Style.audioCard_box_details}>
          <div className={Style.audioCard_box_details_info}>
            <h4>NFT music #1123</h4>
            <div className={Style.audioCard_box_details_info_price}>
              <small>Price</small>
              <p>$3,123.22</p>
            </div>
          </div>
          <div className={Style.audioCard_box_details_stock}>
            <LikeProfile/>
            <small>24 in stock</small>
          </div>
        </div>
        <div className={Style.audioCard_box_img}>
          <Image
            src={images.creatorbackground8}
            alt="background"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioCard;
