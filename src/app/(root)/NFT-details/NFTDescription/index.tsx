import React, { useEffect, useState } from "react";
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
import { RiAuctionLine } from "react-icons/ri";

//INTERNAL IMPORT
import Style from "./NFTDescription.module.css";
import images from "../../../../img";
import { Button } from "@/components";
import TransferPopup from "./TransferPopup";

//SMART CONTRACT IMPORT
import { useNFTContext } from "@/context/NFTContext";
import { useConnectWalletContext } from "@/context/ConnectWalletContext";
import constant from "@/context/constant";
import NFTTabs from "../NFTTabs";
import Timer from "../../search/SearchPage/NFTCard/Timer";

interface Props {
  nft: any;
}

const NFTDescription: React.FC<Props> = ({ nft }) => {
  const {
    buyNFT,
    listNFT,
    createAuction,
    getBidHistoryOfAToken,
    getOwnershipHistory,
    settleAuction,
    bid,
  } = useNFTContext();
  const { wallet } = useConnectWalletContext();
  const [social, setSocial] = useState(false);
  const [transfer, setTransfer] = useState(false);
  const [history, setHistory] = useState(true);
  const [provenance, setProvenance] = useState(false);
  const [owner, setOwner] = useState(false);
  const [openPricing, setOpenPricing] = useState(false);
  const [openAuctioning, setOpenAuctioning] = useState(false);
  const [biddingBox, setBiddingBox] = useState(false);
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState<{
    day: number;
    hour: number;
    minute: number;
  }>({
    day: 0,
    hour: 0,
    minute: 0,
  });
  const [bidHistory, setBidHistory] = useState<any>([]);
  const [ownershipHistory, setOwnershipHistory] = useState<any>([]);
  useEffect(() => {
    let isMounted = true;
    const getHistory = async () => {
      const bid_history = await getBidHistoryOfAToken(nft.tokenId);
      const ownership_history = await getOwnershipHistory(nft.tokenId);
      setBidHistory(bid_history);
      setOwnershipHistory(ownership_history);
    };
    if (isMounted) getHistory();
    return () => {
      isMounted = false;
    };
  }, [nft]);

  const openSocial = () => {
    setSocial(!social);
  };
  const openTransfer = () => {
    setSocial(false);
    setTransfer(!transfer);
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
  const shortenAddress = (address: string) => {
    if (address?.length < 10) {
      return address;
    }
    address = address?.substr(0, 10);
    return `${address}...`;
  };
  const openBiddingBox = () => {
    setBiddingBox(!biddingBox);
  };
  return (
    <div className={Style.nftDescription}>
      <div className={Style.nftDescription_box}>
        {/* Part ONE */}
        <div className={Style.nftDescription_box_share}>
          <p>{nft?.metadata.category}</p>
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
            <BiTransferAlt
              className={Style.nftDescription_box_transfer}
              onClick={() => openTransfer()}
            />
            {transfer && wallet == nft?.escrow && (
              <TransferPopup
                nftName={nft.metadata.name}
                tokenId={nft.tokenId}
                owner={wallet}
                close={async () => openTransfer()}
              />
            )}
          </div>
        </div>
        <div className={Style.nftDescription_box_profile}>
          <h1>{nft?.metadata.name}</h1>
          <div className={Style.nftDescription_box_profile_box}>
            <div className={Style.nftDescription_box_profile_box_left}>
              <Image
                src={images.static_profile_1}
                alt="profile"
                width={40}
                height={40}
                className={Style.nftDescription_box_profile_box_left_img}
              />
              <div className={Style.nftDescription_box_profile_box_left_info}>
                <small>Owner</small>
                <br />
                <Link
                  href={{
                    pathname: `/author-profile/${nft?.seller || nft?.escrow}`,
                  }}
                >
                  <span>
                    {shortenAddress(nft?.seller || nft?.escrow)} <MdVerified />
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
                  {nft?.metadata.collection} <MdVerified />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={Style.nftDescription_box_profile}>
          {nft?.type == "auction" ? (
            <div className={Style.nftDescription_box_profile_bidding}>
              <p>
                <MdTimer /> <span>Auction ending in:</span>
              </p>
              <div className={Style.nftDescription_box_profile_bidding_timers}>
                <Timer timestamp={nft.endTimestamp} />
              </div>
              <div className={Style.nftDescription_box_profile_bidding_price}>
                <div
                  className={Style.nftDescription_box_profile_bidding_price_bid}
                >
                  <small>Current Bid</small>
                  <p>
                    {Number(nft?.highestBid) != 0
                      ? Number(nft?.highestBid)
                      : Number(nft?.minBid)}{" "}
                    ETH
                  </p>
                </div>
              </div>
              <div className={Style.nftDescription_box_profile_bidding_button}>
                {wallet.toLowerCase() == nft?.seller.toLowerCase() ? (
                  <p>You cannot bid your own NFT</p>
                ) : (
                  <div
                    className={
                      Style.nftDescription_box_profile_bidding_button_box
                    }
                  >
                    {biddingBox ? (
                      <Button
                        btnText="Confirm"
                        handleClick={() => {
                          if (price == 0) openBiddingBox();
                          else bid(nft?.tokenId, price);
                        }}
                        icon={undefined}
                        classStyle={Style.button_confirm}
                      />
                    ) : (
                      <Button
                        btnText="Bid"
                        handleClick={() => openBiddingBox()}
                        icon={<FaPercentage />}
                        classStyle={Style.button}
                      />
                    )}

                    {biddingBox ? (
                      <div
                        className={
                          Style.nftDescription_box_profile_bidding_pricing
                        }
                      >
                        <input
                          type="number"
                          step="0.001"
                          onChange={(e) => setPrice(Number(e.target.value))}
                        />
                        <p>ETH</p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
              {wallet.toLowerCase() == nft?.seller.toLowerCase() ||
              wallet.toLowerCase() == nft?.highestBidder.toLowerCase() ? (
                <Button
                  btnText="Settle Auction"
                  handleClick={() => settleAuction(nft.tokenId)}
                  icon={undefined}
                  classStyle={undefined}
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className={Style.nftDescription_box_profile_bidding}>
              <div className={Style.nftDescription_box_profile_bidding_price}>
                <div
                  className={Style.nftDescription_box_profile_bidding_price_bid}
                >
                  <small>Price</small>
                  <p>
                    {nft.price > 0 ? nft.price : nft.metadata.mint_price} ETH
                  </p>
                </div>
              </div>
              <div className={Style.nftDescription_box_profile_bidding_button}>
                {wallet.toLowerCase() == nft?.escrow.toLowerCase() ? (
                  <div
                    className={
                      Style.nftDescription_box_profile_bidding_button_box
                    }
                  >
                    <Button
                      btnText="List on Marketplace"
                      handleClick={() => {
                        setOpenPricing(!openPricing);
                        setOpenAuctioning(false);
                      }}
                      icon={<FaWallet />}
                      classStyle={Style.button}
                    />
                    <Button
                      btnText="Create Auction"
                      handleClick={() => {
                        setOpenAuctioning(!openAuctioning);
                        setOpenPricing(false);
                      }}
                      icon={<RiAuctionLine />}
                      classStyle={Style.button}
                    />
                  </div>
                ) : (
                  <>
                    {wallet.toLowerCase() == nft?.seller?.toLowerCase() ? (
                      <p>You cannot buy your own NFT</p>
                    ) : (
                      <div
                        className={
                          Style.nftDescription_box_profile_bidding_button_box
                        }
                      >
                        <Button
                          btnText="Buy NFT"
                          handleClick={() => buyNFT(nft.tokenId, nft.price)}
                          icon={<FaPercentage />}
                          classStyle={Style.button}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
              {openPricing ? (
                <div
                  className={Style.nftDescription_box_profile_bidding_pricing}
                >
                  <input
                    type="number"
                    placeholder="ETH"
                    step="0.001"
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                  <p>ETH</p>
                </div>
              ) : (
                ""
              )}
              {openAuctioning ? (
                <div
                  className={
                    Style.nftDescription_box_profile_bidding_auctioning
                  }
                >
                  <p>Minimum Price</p>
                  <div
                    className={Style.nftDescription_box_profile_bidding_pricing}
                  >
                    <input
                      type="number"
                      placeholder="ETH"
                      step="0.001"
                      onChange={(e) => setPrice(Number(e.target.value))}
                    />
                    <p>ETH</p>
                  </div>
                  <p>Auction Duration</p>
                  <div
                    className={
                      Style.nftDescription_box_profile_bidding_auctioning_box
                    }
                  >
                    <div
                      className={
                        Style.nftDescription_box_profile_bidding_auctioning_input
                      }
                    >
                      <input
                        type="number"
                        placeholder="Day"
                        step="1"
                        onChange={(e) =>
                          setDuration((prev) => ({
                            ...prev,
                            day: Number(e.target.value),
                          }))
                        }
                      />
                    </div>
                    <div
                      className={
                        Style.nftDescription_box_profile_bidding_auctioning_input
                      }
                    >
                      <input
                        type="number"
                        placeholder="Hours"
                        step="1"
                        onChange={(e) =>
                          setDuration((prev) => ({
                            ...prev,
                            hour: Number(e.target.value),
                          }))
                        }
                      />
                    </div>
                    <div
                      className={
                        Style.nftDescription_box_profile_bidding_auctioning_input
                      }
                    >
                      <input
                        type="number"
                        placeholder="Minutes"
                        step="1"
                        onChange={(e) =>
                          setDuration((prev) => ({
                            ...prev,
                            minute: Number(e.target.value),
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {openPricing ? (
                <Button
                  btnText="Confirm"
                  handleClick={() => listNFT(nft?.tokenId, price)}
                  icon={undefined}
                  classStyle={Style.button_confirm}
                />
              ) : (
                ""
              )}
              {openAuctioning ? (
                <Button
                  btnText="Confirm"
                  handleClick={() => {
                    const durationInSecond: number =
                      duration.minute * 60 +
                      duration.hour * 60 * 60 +
                      duration.day * 60 * 60 * 24;
                    createAuction(
                      nft.tokenId,
                      price.toString(),
                      durationInSecond
                    );
                  }}
                  icon={undefined}
                  classStyle={Style.button_confirm}
                />
              ) : (
                ""
              )}
            </div>
          )}
        </div>
        <div className={Style.nftDescription_box_profile_bidding_tabs}>
          <button type="button" onClick={(e) => openTabs(e)}>
            Bid History
          </button>
          <button type="button" onClick={(e) => openTabs(e)}>
            Provenance
          </button>
          <button type="button" onClick={(e) => openTabs(e)}>
            Owner
          </button>
        </div>
        {history && (
          <div className={Style.nftDescription_box_profile_bidding_box_card}>
            <NFTTabs dataTab={bidHistory} />
          </div>
        )}
        {owner && (
          <div className={Style.nftDescription_box_profile_bidding_box_card}>
            <NFTTabs dataTab={ownershipHistory} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDescription;
