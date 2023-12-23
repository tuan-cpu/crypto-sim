"use client";
import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./page.module.css";
import images from "../../../img";

const page = () => {
  const founderArray = [
    {
      name: "First Founder",
      position: "Co-founder and Chief Executive",
      image: images.user9,
    },
    {
      name: "Second Founder",
      position: "Co-founder and Chief Executive",
      image: images.user8,
    },
    {
      name: "Third Founder",
      position: "Co-founder, Chairman",
      image: images.user7,
    },
    {
      name: "Fourth Founder",
      position: "Co-founder, Chief Strategy Officer",
      image: images.user6,
    },
  ];
  const factsArray = [
    {
        title: "10 millions",
        info: "Articles have been public around the world (as of Sept.30, 2021)"
    },
    {
        title: "100000",
        info: "Registered users account (as of Sept.30, 2021)"
    },
    {
        title: "220+",
        info: "Countries and regions have our presence (as of Sept.30, 2021)"
    }
  ]
  return (
    <div className={Style.about}>
      <div className={Style.about_box}>
        <div className={Style.about_box_hero}>
          <div className={Style.about_box_hero_left}>
            <h1>About Us</h1>
            <p>
              We are impartial and independent, and every day we create
              distinctive, world-class programmes and content which inform,
              educate and entertain millions of people around the world.
            </p>
          </div>
          <div className={Style.about_box_hero_right}>
            <Image src={images.hero} alt="hero" />
          </div>
        </div>
        <div className={Style.about_box_title}>
          <h2>Founder</h2>
          <p>
            We are impartial and independent, and every day we create
            distinctive, world-class programmes and content.
          </p>
        </div>
        <div className={Style.about_box_founder}>
          <div className={Style.about_box_founder_box}>
            {founderArray.map((element, index) => (
              <div className={Style.about_box_founder_box_img} key={index + 1}>
                <Image
                  src={element.image}
                  alt="founder-image"
                  width={500}
                  height={500}
                  className={Style.about_box_founder_box_img_img}
                />
                <h3>{element.name}</h3>
                <p>{element.position}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={Style.about_box_title}>
          <h2>Fast Facts</h2>
          <p>
            We are impartial and independent, and every day we create
            distinctive, world-class programmes and content.
          </p>
        </div>
        <div className={Style.about_box_facts}>
            <div className={Style.about_box_facts_box}>
                {factsArray.map((element, index)=>(
                    <div className={Style.about_box_facts_box_info} key={index+1}>
                        <h3>{element.title}</h3>
                        <p>{element.info}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default page;
