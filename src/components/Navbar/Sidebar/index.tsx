import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GrClose } from "react-icons/gr";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp
} from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./Sidebar.module.css";
import images from '../../../img';
import { Button } from "@/components";

interface SidebarProps {
  setOpenSideBar: any;
}

const Sidebar: React.FC<SidebarProps> = ({ setOpenSideBar }) => {
  //-------USESTATE
  const [openDiscover, setOpenDiscover] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);

  const discover = [
    {
      name: "Collection",
      link: "collection",
    },
    {
      name: "Search",
      link: "search",
    },
    {
      name: "Author Profile",
      link: "author-profile",
    },
    {
      name: "NFT Details",
      link: "NFT-details",
    },
    {
      name: "Account Setting",
      link: "account-setting",
    },
    {
      name: "Connect Wallet",
      link: "connect-wallet",
    },
    {
      name: "Blog",
      link: "blog",
    },
  ];

  const helpCenter = [
    {
      name: "About",
      link: "about",
    },
    {
      name: "Contact Us",
      link: "contact-us",
    },
    {
      name: "Sign Up",
      link: "sign-up",
    },
    {
      name: "Sign In",
      link: "sign-in",
    },
    {
      name: "Subscription",
      link: "subscription",
    },
  ];

  const closeSideBar = () => {
    setOpenSideBar(false);
  }
  const openDiscoverMenu = () => {
    setOpenDiscover(!openDiscover);
  }
  const openHelpMenu = () => {
    setOpenHelp(!openHelp);
  }
  return (
    <div className={Style.sideBar}>
      
      <div className={Style.sideBar_box}>
        <div className={Style.sideBar_header}>
          <Image src={images.logo} alt="logo" width={150} height={150} style={{padding:1}}/>
          <GrClose className={Style.sideBar_closeBtn} onClick={()=>closeSideBar()}/>
        </div>
        
        <p>Discover the most outstanding articles on all topics of NFT & your own stories and share them</p>
        <div className={Style.sideBar_social}>
          <Link href={{pathname: "#"}}>
            <TiSocialFacebook/>
          </Link>
          <Link href={{pathname: "#"}}>
            <TiSocialInstagram/>
          </Link>
          <Link href={{pathname: "#"}}>
            <TiSocialLinkedin/>
          </Link>
          <Link href={{pathname: "#"}}>
            <TiSocialYoutube/>
          </Link>
          <Link href={{pathname: "#"}}>
            <TiSocialTwitter/>
          </Link>
        </div>
      </div>
      <div className={Style.sideBar_menu}>
        <div>
          <div className={Style.sideBar_menu_box} onClick={()=> openDiscoverMenu()}>
            <p>Discover</p>
            <TiArrowSortedDown/>
          </div>
          {openDiscover && (
            <div className={Style.sideBar_discover}>
              {discover.map((element, index)=>(
                <div key={index+1}>
                  <Link href={{pathname: element.link}}>{element.name}</Link>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className={Style.sideBar_menu_box} onClick={()=> openHelpMenu()}>
            <p>Help Center</p>
            <TiArrowSortedDown/>
          </div>
          {openHelp && (
            <div className={Style.sideBar_discover}>
              {helpCenter.map((element, index)=>(
                <div key={index+1}>
                  <Link href={{pathname: element.link}}>{element.name}</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={Style.sideBar_button}>
        <Button btnText="Create" handleClick={()=>{}}/>
        <Button btnText="Connect Wallet" handleClick={()=>{}}/>
      </div>
    </div>
  );
};

export default Sidebar;
