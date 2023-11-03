import React from "react";
import Image from "next/image";
import { BsCircleFill } from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./Category.module.css";
import images from "../../img";

const Category = () => {
  const categoryArray = [1, 2, 3, 4, 5, 6];
  return (
    <div className={Style.box_category}>
      <div className={Style.category}>
        {categoryArray.map((element, index) => (
          <div key={index + 1} className={Style.category_box}>
            <Image
              src={images.creatorbackground1}
              alt="creator-background"
              width={350}
              height={150}
              className={Style.category_box_image}
            />
            <div className={Style.category_box_title}>
              <span>
                <BsCircleFill />
              </span>
              <div className={Style.category_box_title_info}>
                <h4>Entertainment</h4>
                <small>1995 NFTs</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
