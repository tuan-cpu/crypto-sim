import React from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";

//INTERNAL IMPORT
import Style from "./DaysComponents.module.css";
import images from "../../../img";
interface Props{
  element: any
}

const DaysComponents:React.FC<Props> = ({element}) => {
  return (
    <div className={Style.daysComponent}>
      <div className={Style.daysComponent_box}>
        <div className={Style.daysComponent_box_img}>
          <Image
            src={element.background}
            className={Style.daysComponent_box_img_img}
            alt="profile-background"
            width={500}
            height={300}
          />
        </div>
        <div className={Style.daysComponent_box_profile}>
          <Image
            src={images.creatorbackground2}
            className={Style.daysComponent_box_profile_img_1}
            alt="profile"
            width={200}
            height={200}
          />
          <Image
            src={images.creatorbackground2}
            className={Style.daysComponent_box_profile_img_2}
            alt="profile"
            width={200}
            height={200}
          />
          <Image
            src={images.creatorbackground2}
            className={Style.daysComponent_box_profile_img_3}
            alt="profile"
            width={200}
            height={200}
          />
        </div>
        <div className={Style.daysComponent_box_title}>
          <h2>Amazing Collections</h2>
          <div className={Style.daysComponent_box_title_info}>
            <div className={Style.daysComponent_box_title_info_profile}>
              <Image
                src={element.user}
                alt="profile"
                width={50}
                height={50}
                className={Style.daysComponent_box_title_info_profile_img}
              />
              <p>
                Creator
                <span>
                  Tuan{" "}Le
                  <small>
                    <MdVerified/>
                  </small>
                </span>
              </p>
            </div>
            <div className={Style.daysComponent_box_title_info_price}>
              <small>1.225 ETH</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaysComponents;
