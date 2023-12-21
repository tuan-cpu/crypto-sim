import React from "react";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./HelpCenter.module.css";

interface Props {
  close: () => {},
}

const HelpCenter:React.FC<Props> = ({close}) => {
  const helpCenter = [
    {
      name: "About",
      link: "about",
    },
    {
      name: "Contact Us",
      link: "contact-us",
    },
    // {
    //   name: "Sign Up",
    //   link: "sign-up",
    // },
    // {
    //   name: "Sign In",
    //   link: "sign-in",
    // },
    {
      name: "Subscription",
      link: "subscription",
    },
  ];
  return (
    <div className={Style.box}>
      {helpCenter.map((element, index) => (
        <div key={index + 1} className={Style.helpCenter} onClick={close}>
          <Link href={{ pathname: element.link }}>{element.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default HelpCenter;
