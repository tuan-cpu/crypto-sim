import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownload } from "react-icons/tb";

//INTERNAL IMPORT
import Style from "./Profile.module.css";
import { useConnectWalletContext } from "@/context/ConnectWalletContext";
import { useDataContext } from "@/context/DataContext";
import images from '../../../img';

const Profile = () => {
  const { wallet } = useConnectWalletContext();
  const { userInfo } = useDataContext();
  const shortenAddress = (address: string) => {
    if (address?.length < 10) {
      return address;
    }
    address = address?.substr(0, 10);
    return `${address}...`;
  };
  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
        <Image
          src={userInfo.image || images.user1}
          alt="user-profile"
          width={50}
          height={50}
          className={Style.profile_account_img}
        />
        <div className={Style.profile_account_info}>
          <p>{userInfo.username}</p>
          <small>{shortenAddress(wallet)}</small>
        </div>
      </div>
      <div className={Style.profile_menu}>
        <div className={Style.profile_menu_item}>
          <FaUserAlt />
          <p>
            <Link href={{ pathname: "/author-profile" }}>My Profile</Link>
          </p>
        </div>
        <div className={Style.profile_menu_item}>
          <FaRegImage />
          <p>
            <Link href={{ pathname: "/my-items" }}>My Items</Link>
          </p>
        </div>
        <div className={Style.profile_menu_item}>
          <FaUserEdit />
          <p>
            <Link href={{ pathname: "/account-settings" }}>Edit Profile</Link>
          </p>
        </div>
        <div className={Style.profile_menu_item}>
          <MdHelpCenter />
          <p>
            <Link href={{ pathname: "/help" }}>Help</Link>
          </p>
        </div>
        <div className={Style.profile_menu_item}>
          <TbDownload />
          <p>
            <Link href={{ pathname: "/disconnect" }}>Disconnect</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
