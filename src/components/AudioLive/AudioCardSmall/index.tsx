import React, { useState } from "react";
import Image from "next/image";
import { TbPlayerPause, TbPlayerPlay } from "react-icons/tb";

//INTERNAL IMPORT
import Style from "./AudioCardSmall.module.css";
import images from "../../../img";
import { LikeProfile } from "@/components";

const AudioCardSmall = () => {
  const [play, setPlay] = useState(false);
  const playMusic = () => {
    setPlay(!play);
  };
  return (
    <div className={Style.audioPlayer}>
      <div className={Style.audioPlayer_box}>
        <Image
          src={images.creatorbackground1}
          alt="music"
          width={150}
          height={150}
          className={Style.audioPlayer_box_img}
        />
        <div className={Style.audioPlayer_box_info}>
          <h4>NFT music #1144</h4>
          <div className={Style.audioPlayer_box_info_box}>
            <LikeProfile/>
            <div className={Style.audioPlayer_box_info_box_price}>
              <small>Price</small>
              <p>1.123 ETH</p>
            </div>
          </div>
        </div>
        <div
          className={Style.audioPlayer_box_playBtn}
          onClick={() => playMusic()}
        >
          {play ? <TbPlayerPause /> : <TbPlayerPlay />}
        </div>
      </div>
    </div>
  );
};

export default AudioCardSmall;
