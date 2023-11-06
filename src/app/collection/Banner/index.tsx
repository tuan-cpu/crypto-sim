import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Banner.module.css";

interface Props {
  bannerImage: any;
}
const Banner: React.FC<Props> = ({ bannerImage }) => {
  return (
    <div className={Style.banner}>
      <div className={Style.banner_img}>
        <Image
          style={{ objectFit: "cover", height: 300, width: 2600 }}
          src={bannerImage}
          alt="banner-img"
        />
      </div>
      <div className={Style.banner_img_mobile}>
        <Image
          style={{ objectFit: "cover" }}
          src={bannerImage}
          alt="banner-img"
          width={1600}
          height={900}
        />
      </div>
    </div>
  );
};

export default Banner;
