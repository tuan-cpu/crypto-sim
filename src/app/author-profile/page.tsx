"use client";
import React, { useState, useEffect } from "react";

//INTERNAL IMPORT
import Style from "./Author.module.css";
import { Banner, NFTCardTwo } from "../collection";
import { Brand, Title } from "@/components";
import FollowerTabCard from "@/components/FollowerTab/FollowerTabCard";
import images from "../../img";
import { AuthorProfileCard, AuthorTaps } from ".";

const Author = () => {
  const popularArray = [
    {
      user: images.user1,
      background: images.creatorbackground1
    },
    {
      user: images.user2,
      background: images.creatorbackground2
    },
    {
      user: images.user3,
      background: images.creatorbackground3
    },
    {
      user: images.user4,
      background: images.creatorbackground4
    },
    {
      user: images.user5,
      background: images.creatorbackground5
    },

  ];
  const [collectibles, setCollectibles] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);
  return (
    <div className={Style.banner}>
      <Banner bannerImage={images.creatorbackground1} />
      <AuthorProfileCard />
      <AuthorTaps
        collectibles={collectibles}
        created={created}
        like={like}
        follower={follower}
        following={following}
      />
      <Title
        heading="Popular Creator"
        paragraph="Click on music icon and enjoy NFT music or audio"
      />
      {popularArray.map((element,index)=>(
        <FollowerTabCard key={index+1} element={element} index={index+1}/>
      ))}
      <Brand/>
    </div>
  );
};

export default Author;
