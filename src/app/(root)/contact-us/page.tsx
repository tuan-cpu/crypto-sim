"use client";
import React from "react";
import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialTwitter,
  TiSocialLinkedin,
  TiSocialYoutube,
} from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";

//INTERNAL IMPORT
import Style from "./page.module.css";
import formStyle from "../account-settings/AccountPage/Form/Form.module.css";
import { Button } from "@/components";
import Link from "next/link";

const page = () => {
  return (
    <div className={Style.contactUs}>
      <div className={Style.contactUs_box}>
        <h1>Contact</h1>
        <div className={Style.contactUs_box_box}>
          <div className={Style.contactUs_box_box_left}>
            <div className={Style.contactUs_box_box_left_item}>
              <h3>ADDRESS</h3>
              <p>
                Photo booth tattooed prism, portland taiyaki hoodie neutra
                typewriter
              </p>
            </div>
            <div className={Style.contactUs_box_box_left_item}>
              <h3>EMAIL</h3>
              <p>nc.example@example.com</p>
            </div>
            <div className={Style.contactUs_box_box_left_item}>
              <h3>PHONE</h3>
              <p>0123456789</p>
            </div>
            <div className={Style.contactUs_box_box_left_item}>
              <h3>SOCIALS</h3>
              <div className={Style.contactUs_box_box_left_item_socials}>
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
          </div>
          <div className={Style.contactUs_box_box_right}>
            <form>
              <div className={formStyle.form_box_input}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className={formStyle.form_box_input_username}
                />
              </div>
              <div className={formStyle.form_box_input}>
                <label htmlFor="email">Email</label>
                <div className={formStyle.form_box_input_box}>
                  <div className={formStyle.form_box_input_box_icon}>
                    <HiOutlineMail />
                  </div>
                  <input type="text" placeholder="Your email" />
                </div>
              </div>
              <div className={formStyle.form_box_input}>
                <label htmlFor="message">Message</label>
                <textarea
                  name=""
                  id=""
                  cols={30}
                  rows={6}
                  placeholder="Enter your message in few lines..."
                ></textarea>
              </div>
              <Button
                btnText="Send Message"
                handleClick={() => {}}
                classStyle={Style.button}
                icon={undefined}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
