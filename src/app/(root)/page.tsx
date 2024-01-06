"use client";
import React from "react";

//INTERNAL IMPORT
import Style from "./Home.module.css";
import images from '../../img';
import {
  HeroSection,
  Service,
  BigNFTSlider,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  FollowerTab,
  AudioLive,
  Slider,
  Brand,
  Video
} from "@/components";

const Home = () => {
  const featuredArray = [
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
  return (
    <main>
      <div className={Style.homePage}>
        <HeroSection />
        {/* <Service />
        <BigNFTSlider />
        <Title
          heading="Audio Collection"
          paragraph="Discover the most outstanding NFTs in all topics of life."
        />
        <AudioLive/>
        <Video/>
        <FollowerTab/>
        <Slider/>
        <Collection/>
        <Title
          heading="Featured NFTs"
          paragraph="Discover the most outstanding NFTs in all topics of life."
        />
        <Filter/>
        {/* <NFTCard nftArray={featuredArray}/> */}
        {/* <Title
          heading="Browse by Category"
          paragraph="Explore the NFTs in the most featured categories"
        />
        <Category />
        <Subscribe />
        <Brand/>  */}
      </div>
    </main>
  );
};

export default Home;
