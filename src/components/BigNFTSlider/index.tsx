import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AiFillFire, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import { TbArrowBigLeftLine, TbArrowBigRightLine } from "react-icons/tb";

//INTERNAL IMPORT
import Style from "./BigNFTSlider.module.css";
import images from "../../img";
import { Button } from "..";

const BigNFTSlider = () => {
  const [idNumber, setIdNumber] = useState(1);
  const sliderData = [
    {
      title: "Hello NFT",
      id: 1,
      name: "Tuan Le",
      collection: "Nikke",
      price: "00000006464 ETH",
      like: 243,
      image: images.user1,
      nftImage: images.nft_image_1,
      time: {
        days: 27,
        hours: 10,
        minutes: 15,
        seconds: 43,
      },
    },
    {
      title: "World NFT",
      id: 2,
      name: "Tran Le",
      collection: "God",
      price: "00000007274 ETH",
      like: 299,
      image: images.user2,
      nftImage: images.nft_image_2,
      time: {
        days: 19,
        hours: 3,
        minutes: 20,
        seconds: 31,
      },
    },
    {
      title: "Buddy NFT",
      id: 3,
      name: "Ha Le",
      collection: "Squad",
      price: "00000003344 ETH",
      like: 999,
      image: images.user3,
      nftImage: images.nft_image_3,
      time: {
        days: 32,
        hours: 5,
        minutes: 46,
        seconds: 27,
      },
    },
  ];
  const decrease = useCallback(() => {
    if (idNumber - 1 >= 0) {
      setIdNumber(idNumber - 1);
    }
  }, [idNumber]);
  const increase = useCallback(() => {
    if (idNumber + 1 < sliderData.length) {
      setIdNumber(idNumber + 1);
    }
  }, [idNumber, sliderData.length]);
  return (
    <div className={Style.bigNFTSlider}>
      <div className={Style.bigNFTSlider_box}>
        <div className={Style.bigNFTSlider_box_left}>
          <h2>{sliderData[idNumber].title}</h2>
          <div className={Style.bigNFTSlider_box_left_creator}>
            <div className={Style.bigNFTSlider_box_left_creator_profile}>
              <Image
                src={sliderData[idNumber].image}
                alt="profile-image"
                width={50}
                height={50}
                style={{ borderRadius: 25 }}
              />
              <div className={Style.bigNFTSlider_box_left_creator_profile_info}>
                <p>Creator</p>
                <h4>
                  {sliderData[idNumber].name}{" "}
                  <span>
                    <MdVerified />
                  </span>
                </h4>
              </div>
            </div>
            <div className={Style.bigNFTSlider_box_left_creator_collection}>
              <AiFillFire
                className={Style.bigNFTSlider_box_left_creator_collection_icon}
              />
              <div
                className={Style.bigNFTSlider_box_left_creator_collection_info}
              >
                <p>Collection</p>
                <h4>{sliderData[idNumber].collection}</h4>
              </div>
            </div>
          </div>
          <div className={Style.bigNFTSlider_box_left_bidding}>
            <div className={Style.bigNFTSlider_box_left_bidding_box}>
              <small>Current Bid</small>
              <p>
                {sliderData[idNumber].price} <span>$221,21</span>
              </p>
            </div>
            <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
              <MdTimer
                className={Style.bigNFTSlider_box_left_bidding_box_icon}
              />
              <span>Auction ending in</span>
            </p>
            <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.days}</p>
                <span>Days</span>
              </div>
              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.hours}</p>
                <span>Hours</span>
              </div>
              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.minutes}</p>
                <span>Minutes</span>
              </div>
              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.seconds}</p>
                <span>Seconds</span>
              </div>
            </div>
          </div>
          <div className={Style.bigNFTSlider_box_left_button}>
            <Button btnText="Place" handleClick={() => {}} />
            <Button btnText="View" handleClick={() => {}} />
          </div>
          <div className={Style.bigNFTSlider_box_left_sliderBtn}>
            <TbArrowBigLeftLine
              className={Style.bigNFTSlider_box_left_sliderBtn_icon}
              onClick={() => decrease()}
            />
            <TbArrowBigRightLine
              className={Style.bigNFTSlider_box_left_sliderBtn_icon}
              onClick={() => increase()}
            />
          </div>
        </div>

        <div className={Style.bigNFTSlider_box_right}>
          <div className={Style.bigNFTSlider_box_right_box}>
            <Image
              src={sliderData[idNumber].nftImage}
              alt="nft-image"
              className={Style.bigNFTSlider_box_right_box_img}
            />
            <div className={Style.bigNFTSlider_box_right_box_like}>
              <AiFillHeart />
              <span>{sliderData[idNumber].like}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigNFTSlider;
