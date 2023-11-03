import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { RiSendPlaneFill } from "react-icons/ri";

// INTERNAL IMPORT
import Style from "./Footer.module.css";
import images from "../../img";
import { Discover, HelpCenter } from "../Navbar";

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          <Image src={images.logo} alt="app-logo" />
          <p>
            Mine first and largest digital marketplace for creating, buying,
            selling and auctioning NFTs.
          </p>
          <div className={Style.footer_social}>
            <Link href={{ pathname: "#" }}>
              <TiSocialFacebook />
            </Link>
            <Link href={{ pathname: "#" }}>
              <TiSocialTwitter />
            </Link>
            <Link href={{ pathname: "#" }}>
              <TiSocialLinkedin />
            </Link>
            <Link href={{ pathname: "#" }}>
              <TiSocialInstagram />
            </Link>
            <Link href={{ pathname: "#" }}>
              <TiSocialYoutube />
            </Link>
          </div>
        </div>
        <div className={Style.footer_box_discover}>
          <h3>Discover</h3>
          <Discover />
        </div>
        <div className={Style.footer_box_help}>
          <h3>Help Center</h3>
          <HelpCenter />
        </div>
        <div className={Style.subscribe}>
          <div className={Style.subscribe_box}>
            <input type="email" placeholder="Enter your email *" />
            <RiSendPlaneFill className={Style.subscribe_box_send}/>
          </div>
          <div className={Style.subscribe_box_info}>
            <p>Discover, collect, and sell extraordinary NFTs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
