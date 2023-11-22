import React, { useState } from "react";
import Image from "next/image";
import {
  MdVerified,
  MdCloudUpload,
  MdTimer,
  MdReportProblem,
  MdOutlineDeleteSweep,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaWallet, FaPercentage } from "react-icons/fa";
import { BiTransferAlt, BiDollar } from "react-icons/bi";
import Link from "next/link";
import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
} from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./NFTDescription.module.css";
import images from "../../../img";
import { Button } from "@/components";
import { NFTTabs } from "..";

//SMART CONTRACT IMPORT
import { useNFTContext } from "@/context/NFTContext";
import { useConnectWalletContext } from "@/context/ConnectWalletContext";

interface Props {
  nft: any;
}

const NFTDescription: React.FC<Props> = ({ nft }) => {
  const { buyNFT } = useNFTContext();
  const { wallet } = useConnectWalletContext();
  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);
  const [history, setHistory] = useState(true);
  const [provenance, setProvenance] = useState(false);
  const [owner, setOwner] = useState(false);
  const historyArray = [images.user1, images.user2, images.user3, images.user4];
  const provenanceArray = [
    images.user6,
    images.user7,
    images.user8,
    images.user9,
  ];
  const ownerArray = [images.user5, images.user2, images.user7, images.user4];

  const openSocial = () => {
    setSocial(!social);
    setNFTMenu(false);
  };
  const openMenu = () => {
    setNFTMenu(!NFTMenu);
    setSocial(false);
  };
  const openTabs = (e: any) => {
    const inputText = e.target as HTMLElement;
    const btnText = inputText.innerText;
    if (btnText == "Bid History") {
      setHistory(true);
      setProvenance(false);
      setOwner(false);
    } else if (btnText == "Provenance") {
      setHistory(false);
      setProvenance(true);
      setOwner(false);
    } else {
      setHistory(false);
      setProvenance(false);
      setOwner(true);
    }
  };
  return (
    <div className={Style.nftDescription}>
      <div className={Style.nftDescription_box}>
        {/* Part ONE */}
        <div className={Style.nftDescription_box_share}>
          <p>Virtual Worlds</p>
          <div className={Style.nftDescription_box_share_box}>
            <MdCloudUpload
              className={Style.nftDescription_box_share_box_icon}
              onClick={() => openSocial()}
            />
            {social && (
              <div className={Style.nftDescription_box_share_box_social}>
                <Link href={{ pathname: "#" }}>
                  <TiSocialFacebook /> Facebook
                </Link>
                <Link href={{ pathname: "#" }}>
                  <TiSocialInstagram /> Instagram
                </Link>
                <Link href={{ pathname: "#" }}>
                  <TiSocialTwitter /> Twitter
                </Link>
                <Link href={{ pathname: "#" }}>
                  <TiSocialLinkedin /> Linkedin
                </Link>
                <Link href={{ pathname: "#" }}>
                  <TiSocialYoutube /> Youtube
                </Link>
              </div>
            )}
            <BsThreeDots
              className={Style.nftDescription_box_share_box_icon}
              onClick={() => openMenu()}
            />
            {NFTMenu && (
              <div className={Style.nftDescription_box_share_box_social}>
                <Link href={{ pathname: "#" }}>
                  <BiDollar /> Change price
                </Link>
                <Link href={{ pathname: "#" }}>
                  <BiTransferAlt /> Transfer
                </Link>
                <Link href={{ pathname: "#" }}>
                  <MdReportProblem /> Report abuse
                </Link>
                <Link href={{ pathname: "#" }}>
                  <MdOutlineDeleteSweep /> Delete item
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className={Style.nftDescription_box_profile}>
          <h1>
            {nft?.name} #{nft?.tokenId}
          </h1>
          <div className={Style.nftDescription_box_profile_box}>
            <div className={Style.nftDescription_box_profile_box_left}>
              <Image
                src={images.user1}
                alt="profile"
                width={40}
                height={40}
                className={Style.nftDescription_box_profile_box_left_img}
              />
              <div className={Style.nftDescription_box_profile_box_left_info}>
                <small>Creator</small>
                <br />
                <Link
                  href={{
                    pathname: "/author-profile",
                    query: `${nft?.seller}`,
                  }}
                >
                  <span>
                    Lê Tuấn <MdVerified />
                  </span>
                </Link>
              </div>
            </div>
            <div className={Style.nftDescription_box_profile_box_right}>
              <Image
                src={images.creatorbackground1}
                alt="profile"
                width={40}
                height={40}
                className={Style.nftDescription_box_profile_box_left_img}
              />
              <div className={Style.nftDescription_box_profile_box_right_info}>
                <small>Collection</small>
                <br />
                <span>
                  Monkey <MdVerified />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={Style.nftDescription_box_profile}>
          <div className={Style.nftDescription_box_profile_bidding}>
            <p>
              <MdTimer /> <span>Auction ending in:</span>
            </p>
            <div className={Style.nftDescription_box_profile_bidding_timers}>
              <div
                className={Style.nftDescription_box_profile_bidding_timers_item}
              >
                <p>2</p>
                <span>Days</span>
              </div>
              <div
                className={Style.nftDescription_box_profile_bidding_timers_item}
              >
                <p>3</p>
                <span>Hours</span>
              </div>
              <div
                className={Style.nftDescription_box_profile_bidding_timers_item}
              >
                <p>4</p>
                <span>Minutes</span>
              </div>
              <div
                className={Style.nftDescription_box_profile_bidding_timers_item}
              >
                <p>5</p>
                <span>Seconds</span>
              </div>
            </div>
            <div className={Style.nftDescription_box_profile_bidding_price}>
              <div
                className={Style.nftDescription_box_profile_bidding_price_bid}
              >
                <small>Current Bid</small>
                <p>
                  {nft?.price} ETH <span>(≈ $2999.99)</span>
                </p>
              </div>
              <span>[96 in stock]</span>
            </div>
            <div className={Style.nftDescription_box_profile_bidding_button}>
              {wallet == nft?.seller.toLowerCase() ? (
                <p>You cannot buy your own NFT</p>
              ) : wallet == nft?.escrow.toLowerCase() ? (
                <div
                  className={Style.nftDescription_box_profile_bidding_button}
                >
                  <Button
                    btnText="List on Marketplace"
                    handleClick={() => {}}
                    icon={<FaWallet />}
                    classStyle={Style.button}
                  />
                </div>
              ) : (
                <Button
                  btnText="Buy NFT"
                  handleClick={() => buyNFT()}
                  icon={<FaPercentage />}
                  classStyle={Style.button}
                />
              )}
              <Button
                btnText="Make offer"
                handleClick={() => {}}
                icon={<FaPercentage />}
                classStyle={Style.button}
              />
            </div>
            <div className={Style.nftDescription_box_profile_bidding_tabs}>
              <button onClick={(e) => openTabs(e)}>Bid History</button>
              <button onClick={(e) => openTabs(e)}>Provenance</button>
              <button onClick={(e) => openTabs(e)}>Owner</button>
            </div>
            {history && (
              <div
                className={Style.nftDescription_box_profile_bidding_box_card}
              >
                <NFTTabs dataTab={historyArray} icon={undefined} />
              </div>
            )}
            {provenance && (
              <div
                className={Style.nftDescription_box_profile_bidding_box_card}
              >
                <NFTTabs dataTab={provenanceArray} icon={undefined} />
              </div>
            )}
            {owner && (
              <div
                className={Style.nftDescription_box_profile_bidding_box_card}
              >
                <NFTTabs dataTab={ownerArray} icon={<MdVerified />} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDescription;
