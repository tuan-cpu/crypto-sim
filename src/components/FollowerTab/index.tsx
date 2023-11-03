import React, { useState, useEffect } from "react";
import {
  RiUserFollowFill,
  RiUserUnfollowFill,
  RiAwardLine,
} from "react-icons/ri";

//INTERNAL IMPORT
import Style from "./FollowerTab.module.css";
import FollowerTabCard from "./FollowerTabCard";
import Link from "next/link";

const FollowerTab = () => {
  const cardArray = [1, 2, 3, 4, 5, 6, 7, 8];
  const followingArray = [1, 2, 3, 4, 5, 6];
  const newsArray = [1, 2, 3, 4];
  const [popular, setPopular] = useState(true);
  const [following, setFollowing] = useState(false);
  const [news, setNews] = useState(false);
  const openPopular = () => {
    setPopular(!popular);
    setFollowing(false);
    setNews(false);
  };
  const openFollower = () => {
    setPopular(false);
    setFollowing(!following);
    setNews(false);
  };
  const openNews = () => {
    setPopular(false);
    setFollowing(false);
    setNews(!news);
  };
  return (
    <div className={Style.followerTab}>
      <div className={Style.followerTab_title}>
        <h2>Top Creators List...</h2>
        <div className={Style.followerTab_tabs}>
          <div className={Style.followerTab_tabs_btn}>
            <button type="button" onClick={() => openPopular()}>
              <RiUserFollowFill /> Popular
            </button>
            <button type="button" onClick={() => openFollower()}>
              <RiUserFollowFill /> Following
            </button>
            <button type="button" onClick={() => openNews()}>
              <RiAwardLine /> News
            </button>
          </div>
        </div>
      </div>
      {popular && (
        <div className={Style.followerTab_box}>
          {cardArray.map((element, index) => (
            <FollowerTabCard key={index + 1} index={index} element={element} />
          ))}
        </div>
      )}
      {following && (
        <div className={Style.followerTab_box}>
          {followingArray.map((element, index) => (
            <FollowerTabCard key={index + 1} index={index} element={element} />
          ))}
        </div>
      )}
      {news && (
        <div className={Style.followerTab_box}>
          {newsArray.map((element, index) => (
            <FollowerTabCard key={index + 1} index={index} element={element} />
          ))}
        </div>
      )}
      <div className={Style.followerTab_member}>
        <div className={Style.followerTab_member_box}>
          <Link href={{pathname:'#'}}>Show me more</Link>
          <Link href={{pathname:'#'}}>Become author</Link>
        </div>
      </div>
    </div>
  );
};

export default FollowerTab;
