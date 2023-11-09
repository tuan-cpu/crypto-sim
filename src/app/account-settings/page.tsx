"use client";
import React, { useCallback, useState, useMemo, useContext } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';

//INTERNAL IMPORT
import Style from './Account.module.css';
import images from '../../img';
import Form from './AccountPage/Form/Form';

const Account = () => {
  const [fileURL, setFileURL] = useState(null);
  const onDrop = useCallback(async(acceptedFiles:any)=>{
    setFileURL(acceptedFiles[0])
  },[])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    accept: {"key1": ["image/*"]},
    maxSize: 5000000
  })
  return (
    <div className={Style.account}>
      <div className={Style.account_info}>
        <h1>Profile Settings</h1>
        <p> Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
      <div className={Style.account_box}>
        <div className={Style.account_box_img} {...getRootProps()}>
          <input {...getInputProps()}/>
          <Image src={images.user1} alt='user img' width={150} height={150} className={Style.account_box_img_img}/>
          <p className={Style.account_box_img_para}>Change Image</p>
        </div>
        <div className={Style.account_box_form}>
          <Form/>
        </div>
      </div>
    </div>
  )
}

export default Account