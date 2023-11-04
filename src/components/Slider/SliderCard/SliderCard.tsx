import React from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

//INTERNAL IMPORT
import Style from "./SliderCard.module.css";
import images from "../../../img";
import { LikeProfile } from "@/components";
interface CardProps {
  index: number;
  element: any;
}
const SliderCard: React.FC<CardProps> = ({ element, index }) => {
  const controls = useAnimation();
  return (
    <motion.div className={Style.sliderCard} animate={controls}>
      <div className={Style.sliderCard_box}>
        <motion.div className={Style.sliderCard_box_img}>
          <Image
            src={images.creatorbackground10}
            alt="slider-profile"
            width={500}
            height={300}
            className={Style.sliderCard_box_img_img}
          />
        </motion.div>
        <div className={Style.sliderCard_box_title}>
          <p>NFT Video #1234</p>
          <div className={Style.sliderCard_box_title_like}>
            {/* <LikeProfile /> */}
            <small>1 of 100</small>
          </div>
        </div>
        <div className={Style.sliderCard_box_price}>
          <div className={Style.sliderCard_box_price_box}>
            <small>Current Bid</small>
            <p>1.000 ETH</p>
          </div>
          <div className={Style.sliderCard_box_price_time}>
            <small>Remaining time</small>
            <p>3h : 15m : 20s</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SliderCard;
