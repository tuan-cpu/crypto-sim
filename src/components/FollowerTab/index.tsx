import React, { useState, useEffect } from "react";
import {
  RiUserFollowFill,
  RiUserUnfollowFill,
  RiAwardLine,
} from "react-icons/ri";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./FollowerTab.module.css";
import FollowerTabCard from "./FollowerTabCard";
import images from "../../img";

const FollowerTab = () => {
  const cardArray = [
    {
      background: images.creatorbackground1,
      user: images.user1
    },
    {
      background: images.creatorbackground2,
      user: images.user2
    },
    {
      background: images.creatorbackground3,
      user: images.user3
    },
    {
      background: images.creatorbackground4,
      user: images.user4
    },
    {
      background: images.creatorbackground5,
      user: images.user5
    },
    {
      background: images.creatorbackground6,
      user: images.user6
    },
    {
      background: images.creatorbackground7,
      user: images.user7
    },
  ];
  const followingArray = [
    {
      background: images.creatorbackground1,
      user: images.user1
    },
    {
      background: images.creatorbackground6,
      user: images.user6
    },
    {
      background: images.creatorbackground7,
      user: images.user7
    },
    {
      background: images.creatorbackground4,
      user: images.user4
    },
  ];
  const newsArray = [
    {
      background: images.creatorbackground5,
      user: images.user5
    },
    {
      background: images.creatorbackground6,
      user: images.user6
    },
    {
      background: images.creatorbackground7,
      user: images.user7
    },
    {
      background: images.creatorbackground2,
      user: images.user2
    },
    {
      background: images.creatorbackground3,
      user: images.user3
    }
  ];
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
          <Link href={{ pathname: "#" }}>Show me more</Link>
          <Link href={{ pathname: "#" }}>Become author</Link>
        </div>
      </div>
    </div>
  );
};

export default FollowerTab;
