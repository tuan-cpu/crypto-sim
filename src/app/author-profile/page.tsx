"use client";
import React, { useState, useEffect } from "react";

//INTERNAL IMPORT
import Style from "./Author.module.css";
import { Banner } from "../collection";
import { Brand, Title } from "@/components";
import images from "../../img";
import { AuthorNFTCardBox, AuthorProfileCard, AuthorTaps } from ".";
import FollowerTabCard from "@/components/FollowerTab/FollowerTabCard";

//IMPORT FROM SMART CONTRACT
import { useNFTContext } from "@/context/NFTContext";
import { useConnectWalletContext } from "@/context/ConnectWalletContext";

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
  const [currentlyOwnedSim, setCurrentlyOwnedSim] = useState<any[]>([]);

  const { ownedSim, tokenUri, fetchNFTImageFromIPFS } = useNFTContext();
  const { wallet } = useConnectWalletContext();
  //SUPPORT FUNCTIONS
  const bigIntArrayConverter = (array: any[]) => {
    let result = [];
    for(let i=0; i< array.length; i++){
      result[i] = Number(BigInt(array[i]));
    }
    return result;
  }
  const getAllTokenURI = async(array: any[]) => {
    let converted_array = bigIntArrayConverter(array);
    let result = {};
    for(let i=0; i<converted_array.length; i++){
      const uri = await tokenUri(converted_array[i]);
      const response = await fetch(uri);
      const metadata = await response.json();
      const image = await fetchNFTImageFromIPFS(converted_array[i]);
      result = {
        tokenId: converted_array[i],
        image: image,
        tokenURI: uri,
        tokenName: metadata.name,
        tokenDescription: metadata.description,
        escrow: wallet
      };
      setCurrentlyOwnedSim((prev) => [...prev, result]);
    }
  }
  useEffect(()=>{
    let isMounted = true;
    const getOwnedSim =async () => {
      try {
        const response = await ownedSim();
        if(isMounted) await getAllTokenURI(response);
      } catch (error) {
        console.log("Error while fetching owned Sim");
      }
    }
    getOwnedSim();
    return () => {
      isMounted = false;
    };
  },[])
  return (
    <div className={Style.author}>
      <Banner bannerImage={images.creatorbackground1} />
      <AuthorProfileCard wallet={wallet}/>
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
        nftArray={currentlyOwnedSim}
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
