import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineHttp, MdOutlineContentCopy, MdWallet } from "react-icons/md";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialLinkedin,
  TiSocialInstagram,
  TiSocialYoutube,
} from "react-icons/ti";

//INTERNAL IMPORT
import Style from ".//Form.module.css";
import { Button } from "@/components";

const Form = () => {
  return (
    <div className={Style.form}>
      <div className={Style.form_box}>
        <form>
          <div className={Style.form_box_input}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Your username"
              className={Style.form_box_input_username}
            />
          </div>
          <div className={Style.form_box_input}>
            <label htmlFor="email">Email</label>
            <div className={Style.form_box_input_box}>
              <div className={Style.form_box_input_box_icon}>
                <HiOutlineMail />
              </div>
              <input type="text" placeholder="Your email" />
            </div>
          </div>
          <div className={Style.form_box_input}>
            <label htmlFor="description">Description</label>
            <textarea
              name=""
              id=""
              cols={30}
              rows={6}
              placeholder="Introduce yourself in few lines..."
            ></textarea>
          </div>
          <div className={Style.form_box_input}>
            <label htmlFor="Website">Website</label>
            <div className={Style.form_box_input_box}>
              <div className={Style.form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>
              <input type="text" placeholder="Your websites" />
            </div>
          </div>
          <div className={Style.form_box_social}>
            <div className={Style.form_box_input}>
              <label htmlFor="facebook">Facebook</label>
              <div className={Style.form_box_input_box}>
                <div className={Style.form_box_input_box_icon}>
                  <TiSocialFacebook />
                </div>
                <input type="text" placeholder="Your facebook" />
              </div>
            </div>
            <div className={Style.form_box_input}>
              <label htmlFor="twitter">Twitter</label>
              <div className={Style.form_box_input_box}>
                <div className={Style.form_box_input_box_icon}>
                  <TiSocialTwitter />
                </div>
                <input type="text" placeholder="Your twitter" />
              </div>
            </div>
            <div className={Style.form_box_input}>
              <label htmlFor="instagram">Instagram</label>
              <div className={Style.form_box_input_box}>
                <div className={Style.form_box_input_box_icon}>
                  <TiSocialInstagram />
                </div>
                <input type="text" placeholder="Your instagram" />
              </div>
            </div>
            <div className={Style.form_box_input}>
              <label htmlFor="linkedin">Linkedin</label>
              <div className={Style.form_box_input_box}>
                <div className={Style.form_box_input_box_icon}>
                  <TiSocialLinkedin />
                </div>
                <input type="text" placeholder="Your linkedin" />
              </div>
            </div>
            <div className={Style.form_box_input}>
              <label htmlFor="youtube">Youtube</label>
              <div className={Style.form_box_input_box}>
                <div className={Style.form_box_input_box_icon}>
                  <TiSocialYoutube />
                </div>
                <input type="text" placeholder="Your youtube" />
              </div>
            </div>
          </div>
          <div className={Style.form_box_input}>
            <label htmlFor="wallet">Wallet Address</label>
            <div className={Style.form_box_input_box}>
              <div className={Style.form_box_input_box_icon}>
                <MdWallet/>
              </div>
              <input type="text" placeholder="Your wallet address"/>
              <div className={Style.form_box_input_box_icon}>
                <MdOutlineContentCopy/>
              </div>
            </div>
          </div>
          <div className={Style.form_box_btn}>
            <Button btnText={"Upload Profile"} handleClick={()=>{}} icon={undefined} classStyle={Style.button}/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
