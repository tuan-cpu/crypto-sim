import React, { useState, useEffect } from "react";
import {
  BsFillAlarmFill,
  BsFillCalendarDateFill,
  BsCalendar3,
} from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./Collection.module.css";
import images from '../../img';
import DaysComponents from "./DaysComponents/DaysComponents";
const Collection = () => {
  const [popular, setPopular] = useState(true);
  const [following, setFollowing] = useState(false);
  const [news, setNews] = useState(false);
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
    }
  ];
  const followingArray = [
    {
      background: images.creatorbackground1,
      user: images.user1
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
      background: images.creatorbackground7,
      user: images.user7
    },
  ];
  const newsArray = [
    {
      background: images.creatorbackground4,
      user: images.user4
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
  const openPopular = () => {
    setPopular(!popular);
    setFollowing(false);
    setNews(false);
  };
  const openFollowing = () => {
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
    <div className={Style.collection}>
      <div className={Style.collection_title}>
        <h2>Top List Creators</h2>
      </div>
      <div className={Style.collection_collections}>
        <div className={Style.collection_collections_btn}>
          <button type="button" onClick={() => openPopular()}>
            <BsFillAlarmFill /> 24 hours
          </button>
          <button type="button" onClick={() => openFollowing()}>
            <BsFillAlarmFill /> 7 days
          </button>
          <button type="button" onClick={() => openNews()}>
            <BsFillAlarmFill /> 30 days
          </button>
        </div>
      </div>
      {popular && (
        <div className={Style.collection_box}>
          {cardArray.map((element, index) => (
            <DaysComponents key={index + 1} element={element}/>
          ))}
        </div>
      )}
      {following && (
        <div className={Style.collection_box}>
          {followingArray.map((element, index) => (
            <DaysComponents key={index + 1} element={element}/>
          ))}
        </div>
      )}
      {news && (
        <div className={Style.collection_box}>
          {newsArray.map((element, index) => (
            <DaysComponents key={index + 1} element={element}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection;
