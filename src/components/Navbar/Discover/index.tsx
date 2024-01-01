import React from "react";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./Discover.module.css";

interface Props {
  close: () => {},
}

const Discover:React.FC<Props> = ({close}) => {
  //----------DISCOVER NAVIGATION MENU
  const discover = [
    // {
    //   name: "Collection",
    //   link: "collection",
    // },
    {
      name: "Search",
      link: "search",
    },
    {
      name: "Author Profile",
      link: "author-profile",
    },
    // {
    //   name: "NFT Details",
    //   link: "NFT-details",
    // },
    {
      name: "Account Setting",
      link: "account-settings",
    },
    {
      name: "Connect Wallet",
      link: "connect-wallet",
    },
    // {
    //   name: "Blog",
    //   link: "blog",
    // },
    // {
    //   name: "Upload NFT",
    //   link: "upload-nft"
    // }
  ];
  return (
    <div>
      {discover.map((element, index) => (
        <div key={index + 1} className={Style.discover} onClick={close}>
          <Link href={{ pathname: element.link }}>{element.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Discover;
