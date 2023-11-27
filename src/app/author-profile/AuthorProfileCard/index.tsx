import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  MdVerified,
  MdCloudUpload,
  MdOutlineReportProblem,
} from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./AuthorProfileCard.module.css";
import images from "../../../img";
import { Button } from "@/components";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";

import { useConnectWalletContext } from "@/context/ConnectWalletContext";
import { useNFTContext } from "@/context/NFTContext";

interface Props {
  wallet: string;
}
const AuthorProfileCard: React.FC<Props> = ({ wallet }) => {
  const { wallet: currentWallet } = useConnectWalletContext();
  const { buySim } = useNFTContext();
  const [share, setShare] = useState(false);
  const [report, setReport] = useState(false);
  const textRef = useRef<HTMLInputElement>(null);

  const copyAddress = async () => {
    if (textRef.current) {
      await navigator.clipboard.writeText(textRef.current.value);
    }
  };
  const openShare = () => {
    setShare(!share);
    setReport(false);
  };
  const openReport = () => {
    setReport(!report);
    setShare(false);
  };
  return (
    <div className={Style.authorProfileCard}>
      <div className={Style.authorProfileCard_box}>
        <div className={Style.authorProfileCard_box_img}>
          <Image
            src={images.nft_image_1}
            className={Style.authorProfileCard_box_img_img}
            alt="nft-images"
            width={220}
            height={220}
          />
        </div>
        <div className={Style.authorProfileCard_box_info}>
          <h2>
            Dony Herrera{""}
            <span>
              <MdVerified />
            </span>
          </h2>
          <div className={Style.authorProfileCard_box_info_address}>
            <input
              type="text"
              defaultValue={wallet}
              id="myInput"
              ref={textRef}
            />
            <FiCopy
              onClick={() => copyAddress()}
              className={Style.authorProfileCard_box_info_address_icon}
            />
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className={Style.authorProfileCard_box_info_social}>
            <Link href={{ pathname: "#" }}>
              <TiSocialFacebook />
            </Link>
            <Link href={{ pathname: "#" }}>
              <TiSocialInstagram />
            </Link>
            <Link href={{ pathname: "#" }}>
              <TiSocialLinkedin />
            </Link>
            <Link href={{ pathname: "#" }}>
              <TiSocialTwitter />
            </Link>
            <Link href={{ pathname: "#" }}>
              <TiSocialYoutube />
            </Link>
          </div>
        </div>
        <div className={Style.authorProfileCard_box_share}>
          {currentWallet === wallet ? (
            <Button
              btnText="Mint New Sim"
              handleClick={()=>buySim()}
              icon={undefined}
              classStyle={undefined}
            />
          ) : (
            <Button
              btnText="Follow"
              handleClick={() => {}}
              icon={undefined}
              classStyle={undefined}
            />
          )}
          <MdCloudUpload
            onClick={() => openShare()}
            className={Style.authorProfileCard_box_share_icon}
          />
          {share && (
            <div className={Style.authorProfileCard_box_share_upload}>
              <p>
                <span>
                  <TiSocialFacebook />
                </span>{" "}
                Facebook
              </p>
              <p>
                <span>
                  <TiSocialInstagram />
                </span>{" "}
                Instagram
              </p>
              <p>
                <span>
                  <TiSocialLinkedin />
                </span>{" "}
                Linkedin
              </p>
              <p>
                <span>
                  <TiSocialTwitter />
                </span>{" "}
                Twitter
              </p>
              <p>
                <span>
                  <TiSocialYoutube />
                </span>{" "}
                Youtube
              </p>
            </div>
          )}
          <BsThreeDots
            onClick={() => openReport()}
            className={Style.authorProfileCard_box_share_icon}
          />
          {report && (
            <p className={Style.authorProfileCard_box_share_report}>
              <span>
                <MdOutlineReportProblem />
              </span>{" "}
              Report abuse
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfileCard;
