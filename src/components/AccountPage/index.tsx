"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";

//INTERNAL IMPORT
import Style from "./AccountPage.module.css";
import images from "../../img";
import Form from "./Form/Form";
import { updateUserProfile, uploadAvatar } from "@/lib/actions/users.actions";

interface Props{
  wallet: string,
  userData: any
}

const AccountPage:React.FC<Props> = ({ wallet, userData }) => {
  const router = useRouter();
  const [fileURL, setFileURL] = useState("");
  const [image, setImage] = useState<File>();
  const onDrop = useCallback(
    async (acceptedFile: any) =>{
      setFileURL(URL.createObjectURL(acceptedFile[0]));
      setImage(acceptedFile[0]);
    },
    []
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    maxSize: 5000000,
  });
  const [profileInfo, setProfileInfo] = useState<any>({
    username: userData.username,
    email: userData.email,
    website: userData.website,
    facebook: userData.facebook,
    twitter: userData.twitter,
    instagram: userData.instagram,
    linkedin: userData.linkedin,
    youtube: userData.youtube,
    description: userData.description,
    wallet: wallet
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,name: string) => {
    setProfileInfo((prev: any) => ({...prev, [name]: e.target.value}));
  }

  const handleSubmit = async () => {
    let url: string;
    if(image) {
      url = await uploadAvatar(profileInfo.wallet, image);
      await updateUserProfile({
        id: profileInfo.wallet,
        username: profileInfo.username,
        email: profileInfo.email,
        description: profileInfo.description,
        image: url,
        website: profileInfo.website,
        facebook: profileInfo.facebook,
        twitter: profileInfo.twitter,
        instagram: profileInfo.instagram,
        linkedin: profileInfo.linkedin,
        youtube: profileInfo.youtube
      })
      router.back();
    }
  }
  return (
    <div className={Style.accountPage}>
      <div className={Style.accountPage_img} {...getRootProps()}>
        <input {...getInputProps()} />
        <Image
          src={fileURL !== ""? fileURL : (userData.image? userData.image: images.user1)}
          alt="user img"
          width={150}
          height={150}
          className={Style.accountPage_img_img}
          priority
        />
        <p className={Style.accountPage_img_para}>Change Image</p>
      </div>
      <div className={Style.accountPage_form}>
        <Form profileInfo={profileInfo} handleChange={handleChange} handleSubmit={handleSubmit}/>
      </div>
    </div>
  );
};

export default AccountPage;
