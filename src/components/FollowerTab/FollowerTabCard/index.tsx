import React, { useState } from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { BiAward } from "react-icons/bi";

//INTERNAL IMPORT
import Style from "./FollowerTabCard.module.css";

interface TabProps {
  index: number;
  element: any;
}
const FollowerTabCard: React.FC<TabProps> = ({ index, element }) => {
  const [following, setFollowing] = useState(false);
  const followMe = () => {
    setFollowing(!following);
  };
  return (
    <div className={Style.followerTabCard}>
      <div className={Style.followerTabCard_rank}>
        <p>
          #{index + 1}{" "}
          <span>
            <BiAward />
          </span>
        </p>
      </div>
      <div className={Style.followerTabCard_box}>
          <div className={Style.followerTabCard_box_img}>
            <Image
              src={element.background}
              alt="profile-background"
              width={500}
              height={500}
              className={Style.followerTabCard_box_img_img}
            />
          </div>
          <div className={Style.followerTabCard_box_profile}>
            <Image
              className={Style.followerTabCard_box_profile_img}
              alt="profile-picture"
              width={85}
              height={85}
              src={element.user}
            />
          </div>
        <div className={Style.followerTabCard_box_info}>
          <div className={Style.followerTabCard_box_info_name}>
            <h4>
              Tuan Le{""}{" "}
              <span>
                <MdVerified />
              </span>
            </h4>
            <p>12.21 ETH</p>
          </div>
          <div className={Style.followerTabCard_box_info_following}>
            {following ? (
              <a onClick={() => followMe()}>
                Follow{""}{" "}
                <span>
                  <TiTick />
                </span>
              </a>
            ) : (
              <a onClick={() => followMe()}>Following</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowerTabCard;
