"use client";
import React from "react";

//INTERNAL IMPORT
import Style from "./Home.module.css";
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
  Brand
} from "@/components";

const Home = () => {
  return (
    <main>
      <div className={Style.homePage}>
        <HeroSection />
        <Service />
        <BigNFTSlider />
        <Title
          heading="Audio Collection"
          paragraph="Discover the most outstanding NFTs in all topics of life."
        />
        <AudioLive/>
        <FollowerTab/>
        <Slider/>
        <Collection/>
        <Title
          heading="Featured NFTs"
          paragraph="Discover the most outstanding NFTs in all topics of life."
        />
        <Filter/>
        <NFTCard/>
        <Title
          heading="Browse by Category"
          paragraph="Explore the NFTs in the most featured categories"
        />
        <Category />
        <Subscribe />
        <Brand/>
      </div>
    </main>
  );
};

export default Home;
