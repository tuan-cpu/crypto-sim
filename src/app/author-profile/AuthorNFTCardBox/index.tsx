import React, { useState } from "react";

//INTERNAL IMPORT
import Style from "./AuthorNFTCardBox.module.css";
import images from "../../../img";
import { NFTCardTwo } from "@/app/collection";
import FollowerTabCard from "@/components/FollowerTab/FollowerTabCard";

interface Props {
  collectibles: boolean;
  created: boolean;
  like: boolean;
  follower: boolean;
  following: boolean;
}

const AuthorNFTCardBox: React.FC<Props> = ({
  collectibles,
  created,
  like,
  follower,
  following,
}) => {
  const collectiblesArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
  ];
  const createdArray = [
    images.nft_image_1,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_3,
  ];
  const likeArray = [images.nft_image_1, images.nft_image_2];
  const followerArray = [
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
  ];
  const followingArray = [
    {
      user: images.user5,
      background: images.creatorbackground5
    },
    {
      user: images.user6,
      background: images.creatorbackground6
    },
  ];
  return (
    <div className={Style.authorNFTCardBox}>
      {collectibles &&
        collectiblesArray.map((element, index) => (
          <NFTCardTwo element={element} index={index + 1} key={index+1}/>
        ))}
      {created &&
        createdArray.map((element, index) => (
          <NFTCardTwo element={element} index={index + 1} key={index+1}/>
        ))}
      {like &&
        likeArray.map((element, index) => (
          <NFTCardTwo element={element} index={index + 1} key={index+1}/>
        ))}
      {follower &&
        followerArray.map((element, index) => (
          <FollowerTabCard index={index+1} element={element} key={index+1}/>
        ))}
      {following &&
        followingArray.map((element, index) => (
          <FollowerTabCard index={index+1} element={element} key={index+1}/>
        ))}
    </div>
  );
};

export default AuthorNFTCardBox;
