import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./DropZone.module.css";
import images from "../../../../../img";

interface Props {
  title: string;
  heading: string;
  subHeading: string;
  itemName: string;
  website: string;
  description: string;
  royalties: string;
  fileSize: string;
  category: string;
  properties: string;
  setImage: any;
}

const DropZone: React.FC<Props> = ({
  title,
  heading,
  subHeading,
  itemName,
  website,
  description,
  royalties,
  fileSize,
  category,
  properties,
  setImage,
}) => {
  const onDrop = useCallback(
    async (acceptedFile: any) =>{
      setFileUrl(URL.createObjectURL(acceptedFile[0]));
      setImage(acceptedFile[0]);
    },
    []
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    // accept: { "*": ["image/*"]},
    maxSize: 5000000,
  });
  const [fileUrl, setFileUrl] = useState("");
  return (
    <div className={Style.dropZone}>
      <div className={Style.dropZone_box} {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={Style.dropZone_box_input}>
          <p>{title}</p>
          <div className={Style.dropZone_box_input_img}>
            {fileUrl != "" ? (
              <Image
                src={fileUrl}
                alt="upload"
                width={100}
                height={100}
                style={{ objectFit: "contain" }}
                className={Style.dropZone_box_input_img_img}
              />
            ) : (
              <Image
                src={images.upload}
                alt="upload"
                width={100}
                height={100}
                style={{ objectFit: "contain" }}
                className={Style.dropZone_box_input_img_img}
              />
            )}
          </div>
          <p>{heading}</p>
          <p>{subHeading}</p>
        </div>
      </div>
      {fileUrl != "" && (
        <aside className={Style.dropZone_box_aside}>
          <div className={Style.dropZone_box_aside_box}>
            <Image
              src={fileUrl}
              alt="nft-image"
              width={200}
              height={200}
            />
            <div className={Style.dropZone_box_aside_box_preview}>
              <div className={Style.dropZone_box_aside_box_preview_one}>
                <p>
                  <samp>NFT Name </samp>
                  {itemName || ""}
                </p>
                <p>
                  <samp>Website </samp>
                  {website || ""}
                </p>
              </div>
              <div className={Style.dropZone_box_aside_box_preview_two}>
                <p>
                  <span>Description </span>
                  {description || ""}
                </p>
              </div>
              <div className={Style.dropZone_box_aside_box_preview_three}>
                <p>
                  <span>Royalties </span>
                  {royalties || ""}
                </p>
                <p>
                  <span>File Size </span>
                  {fileSize || ""}
                </p>
                <p>
                  <span>Properties </span>
                  {properties || ""}
                </p>
                <p>
                  <span>Category </span>
                  {category || ""}
                </p>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};

export default DropZone;
