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
import images from "../../../../img";
import { Button } from "@/components";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";

import { useConnectWalletContext } from "@/context/ConnectWalletContext";
import { useNFTContext } from "@/context/NFTContext";

interface Props {
  wallet: string;
  userData: any;
}
const AuthorProfileCard: React.FC<Props> = ({ wallet, userData }) => {
  const { wallet: currentWallet } = useConnectWalletContext();
  const { buySim, breedSim } = useNFTContext();
  const [share, setShare] = useState(false);
  const [report, setReport] = useState(false);
  const [popup, setPopup] = useState(false);
  const [breedPopup, setBreedPopup] = useState(false);
  const [breedInfo, setBreedInfo] = useState<{
    matronId: number;
    sireId: number;
  }>({
    matronId: 0,
    sireId: 0,
  });
  const textRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const breedPopupRef = useRef<HTMLDivElement>(null);

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
  const openPopup = () => {
    setPopup(true);
  };
  const openBreedPopup = () => {
    setBreedPopup(true);
  };
  const updateMatronId = (newMatronId: number) => {
    setBreedInfo((prevBreedInfo) => ({
      ...prevBreedInfo,
      matronId: newMatronId,
    }));
  };
  const updateSireId = (newSireId: number) => {
    setBreedInfo((prevBreedInfo) => ({
      ...prevBreedInfo,
      sireId: newSireId,
    }));
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        // Clicked outside the popup, close it
        setPopup(false);
      }
    };
    // Attach the event listener to the document body
    document.body.addEventListener("click", handleClickOutside);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handleClickOutsideBreed = (event: MouseEvent) => {
      if (
        breedPopupRef.current &&
        !breedPopupRef.current.contains(event.target as Node)
      ) {
        // Clicked outside the popup, close it
        setBreedPopup(false);
      }
    };
    // Attach the event listener to the document body
    document.body.addEventListener("click", handleClickOutsideBreed);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.body.removeEventListener("click", handleClickOutsideBreed);
    };
  }, []);
  return (
    <div className={Style.authorProfileCard}>
      <div className={Style.authorProfileCard_box}>
        <div className={Style.authorProfileCard_box_img}>
          <Image
            src={userData.image || images.nft_image_1}
            className={Style.authorProfileCard_box_img_img}
            alt="nft-images"
            width={220}
            height={220}
          />
        </div>
        <div className={Style.authorProfileCard_box_info}>
          <h2>
            {userData.username || "Unnamed"}
            {""}
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
          <p>{userData.description}</p>
          <div className={Style.authorProfileCard_box_info_social}>
            {userData.facebook !== "" && (
              <Link href={{ pathname: userData.facebook }} target="_blank">
                <TiSocialFacebook />
              </Link>
            )}
            {userData.instagram !== "" && (
              <Link href={{ pathname: userData.instagram }}>
                <TiSocialInstagram />
              </Link>
            )}
            {userData.linkedin !== "" && (
              <Link href={{ pathname: userData.linkedin }}>
                <TiSocialLinkedin />
              </Link>
            )}
            {userData.twitter !== "" && (
              <Link href={{ pathname: userData.twitter }}>
                <TiSocialTwitter />
              </Link>
            )}
            {userData.youtube !== "" && (
              <Link href={{ pathname: userData.youtube }}>
                <TiSocialYoutube />
              </Link>
            )}
          </div>
        </div>
        <div className={Style.authorProfileCard_box_share}>
          {currentWallet === wallet ? (
            <Button
              btnText="Mint New Sim"
              handleClick={openPopup}
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
      {popup && (
        <div className={Style.authorProfileCard_popup} ref={popupRef}>
          <div className={Style.authorProfileCard_popup_box}>
            <Button
              btnText="Buy Sim"
              handleClick={buySim}
              icon={undefined}
              classStyle={Style.button}
            />
            <Button
              btnText="Breed Sim"
              handleClick={openBreedPopup}
              icon={undefined}
              classStyle={Style.button}
            />
          </div>
        </div>
      )}
      {breedPopup && (
        <div className={Style.authorProfileCard_popup} ref={breedPopupRef}>
          <div className={Style.authorProfileCard_popup_box_second}>
            <div className={Style.authorProfileCard_popup_box_second_box}>
              <input
                type="number"
                placeholder="MatronID"
                onChange={(e) => updateMatronId(Number(e.target.value))}
              />
              <input
                type="number"
                placeholder="SireID"
                onChange={(e) => updateSireId(Number(e.target.value))}
              />
            </div>
            <Button
              btnText="Breed"
              handleClick={() => breedSim(breedInfo.matronId, breedInfo.sireId)}
              icon={undefined}
              classStyle={Style.button}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorProfileCard;
