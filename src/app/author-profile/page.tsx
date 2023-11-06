"use client";
import React, { useState, useEffect } from "react";

//INTERNAL IMPORT
import Style from "./Author.module.css";
import { Banner } from "../collection";
import { Brand, Title } from "@/components";
import images from "../../img";
import { AuthorNFTCardBox, AuthorProfileCard, AuthorTaps } from ".";
import FollowerTabCard from "@/components/FollowerTab/FollowerTabCard";

const Author = () => {
  const popularArray = [
    {
      user: images.user1,
      background: images.creatorbackground1,
    },
    {
      user: images.user2,
      background: images.creatorbackground2,
    },
    {
      user: images.user3,
      background: images.creatorbackground3,
    },
    {
      user: images.user4,
      background: images.creatorbackground4,
    },
    {
      user: images.user5,
      background: images.creatorbackground5,
    },
  ];
  const [collectibles, setCollectibles] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);
  return (
    <div className={Style.author}>
      <Banner bannerImage={images.creatorbackground1} />
      <AuthorProfileCard />
      <AuthorTaps
        setCollectibles={setCollectibles}
        setCreated={setCreated}
        setLike={setLike}
        setFollower={setFollower}
        setFollowing={setFollowing}
      />
      <AuthorNFTCardBox
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
      <div className={Style.author_box}>
        {popularArray.map((element, index) => (
          <FollowerTabCard element={element} index={index} key={index + 1} />
        ))}
      </div>
      <Brand />
    </div>
  );
};

export default Author;
