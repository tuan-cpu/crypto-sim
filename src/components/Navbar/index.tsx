import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

//IMPORT ICON
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";

// INTERNAL IMPORT
import Style from "./Navbar.module.css";
import Discover from "./Discover";
import HelpCenter from "./HelpCenter";
import Notification from "./Notification";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import images from "../../img";
import { Button } from "..";

//IMPORT FROM SMART CONTRACT
import { useConnectWalletContext } from "@/context/ConnectWalletContext";

const Navbar = () => {
  //--USESTATE COMPONENTS
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  const openMenu = (e: any) => {
    const btnText = e.target.innerText;
    setOpenSideBar(false);
    if (btnText == "Discover") {
      setDiscover(!discover);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    } else if (btnText == "Help Center") {
      setDiscover(false);
      setHelp(!help);
      setNotification(false);
      setProfile(false);
    } else {
      setDiscover(false);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    }
  };

  const openNotification = () => {
    setNotification(!notification);
    setDiscover(false);
    setHelp(false);
    setProfile(false);
  };

  const openProfile = () => {
    setProfile(!profile);
    setOpenSideBar(false);
    setDiscover(false);
    setHelp(false);
    setNotification(false);
  };

  const openSidebar = () => {
    setOpenSideBar(!openSideBar);
    setDiscover(false);
    setHelp(false);
    setNotification(false);
    setProfile(false);
  };

  //SMART CONTRACT SECTION
  const { wallet, connectWalletPressed } = useConnectWalletContext();

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <Image
              src={images.logo}
              alt="NFT Marketplace"
              width={100}
              height={100}
            />
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder="Search NFT" />
              <BsSearch onClick={() => {}} className={Style.search_icon} />
            </div>
          </div>
        </div>

        {/* // END OF LEFT SECTION */}
        <div className={Style.navbar_container_right}>
          {/* DISCOVER MENU */}
          <div className={Style.navbar_container_right_discover}>
            <p onClick={(e) => openMenu(e)}>Discover</p>
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>
          {/* HELP CENTER */}
          <div className={Style.navbar_container_right_help}>
            <p onClick={(e) => openMenu(e)}>Help Center</p>
            {help && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )}
          </div>
          {/* NOTIFICATION */}
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications
              className={Style.notify}
              onClick={() => openNotification()}
            />
            {notification && <Notification />}
          </div>
          {/* CREATE BUTTON SECTION */}
          <div className={Style.navbar_container_right_button}>
            {wallet == "" ? (
              <Button
                btnText="Connect"
                handleClick={() => connectWalletPressed()}
                icon={undefined}
                classStyle={undefined}
              />
            ) : (
              <Link href={{ pathname: "/upload-nft" }}>
                <Button
                  btnText="Create"
                  handleClick={() => {}}
                  icon={undefined}
                  classStyle={undefined}
                />
              </Link>
            )}
          </div>
          {/* USER PROFILE */}
          <div className={Style.navbar_container_right_profile}>
            <div className={Style.navbar_container_right_profile_box}>
              <Image
                src={images.user1}
                alt="Profile"
                width={40}
                height={40}
                style={{ borderRadius: 20 }}
                onClick={() => openProfile()}
              />
              {profile && <Profile />}
            </div>
          </div>
          {/* MENU BUTTON */}
          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={() => openSidebar()}
            />
          </div>
          {/* SIDEBAR COMPONENT */}
          {openSideBar && (
            <div className={Style.sideBar}>
              <Sidebar setOpenSideBar={setOpenSideBar} wallet={wallet} connectWallet={connectWalletPressed} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
export { Discover, HelpCenter };
