"use client";
import React, { useState, useEffect } from "react";

//INTERNAL IMPORT
import Style from "../Author.module.css";
import { Banner } from "../../collection";
import { Brand, Title } from "@/components";
import images from "../../../../img";
import { AuthorProfileCard } from "..";
import FollowerTabCard from "@/components/FollowerTab/FollowerTabCard";
import { getUserProfile } from "@/lib/actions/users.actions";

interface UserInfo {
  username: string;
  email: string;
  description: string;
  image: string;
  website: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
}

const UserProfile = ({ params }: { params: { walletId: string } }) => {
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
  // const [collectibles, setCollectibles] = useState(true);
  // const [created, setCreated] = useState(false);
  // const [like, setLike] = useState(false);
  // const [follower, setFollower] = useState(false);
  // const [following, setFollowing] = useState(false);
  // const [currentlyOwnedSim, setCurrentlyOwnedSim] = useState<any[]>([]);

  // const { ownedSim, tokenUri, fetchNFTImageFromIPFS } = useNFTContext();
  const [targetedWallet, setTargetedWallet] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "",
    email: "",
    description: "",
    image: "",
    website: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  });
  useEffect(()=>{
    setTargetedWallet(params.walletId);
  },[])
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await getUserProfile(targetedWallet);
      if (response)
        setUserInfo({
          username: response.username,
          email: response.email,
          description: response.description,
          image: response.image,
          website: response.website,
          facebook: response.facebook,
          twitter: response.twitter,
          instagram: response.instagram,
          linkedin: response.linkedin,
          youtube: response.youtube,
        });
    };
    if (targetedWallet) fetchUserData();
  }, [targetedWallet]);
  //SUPPORT FUNCTIONS
  // const bigIntArrayConverter = (array: any[]) => {
  //   let result = [];
  //   for(let i=0; i< array.length; i++){
  //     result[i] = Number(BigInt(array[i]));
  //   }
  //   return result;
  // }
  // const getAllTokenURI = async(array: any[]) => {
  //   let converted_array = bigIntArrayConverter(array);
  //   let result = [];
  //   for(let i=0; i<converted_array.length; i++){
  //     const uri = await tokenUri(converted_array[i]);
  //     const response = await fetch(uri);
  //     const metadata = await response.json();
  //     const image = await fetchNFTImageFromIPFS(converted_array[i]);
  //     result.push({
  //       tokenId: converted_array[i],
  //       tokenUri: image,
  //       tokenName: metadata.name,
  //       tokenDescription: metadata.description
  //     })
  //   }
  //   return result;
  // }
  // useEffect(()=>{
  //   const getOwnedSim =async () => {
  //     const response = await ownedSim();
  //     const uri_array = await getAllTokenURI(response);
  //     setCurrentlyOwnedSim(uri_array);
  //   }
  //   getOwnedSim();
  // },[])
  return (
    <div className={Style.author}>
      <Banner bannerImage={images.creatorbackground1} />
      <AuthorProfileCard wallet={targetedWallet} userData={userInfo}/>
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

export default UserProfile;
