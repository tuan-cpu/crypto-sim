import React, { useState } from "react";
import { MdOutlineHttp, MdOutlineAttachFile } from "react-icons/md";
import { FaPercent } from "react-icons/fa";
import { AiTwotonePropertySafety } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./UploadNFT.module.css";
import formStyle from "@/components/AccountPage/Form/Form.module.css";
import images from "../../../../img";
import { Button } from "@/components";
import DropZone from "./DropZone";

interface Props{
  createNFT: any;
}

const UploadNFT:React.FC<Props> = ({createNFT}) => {
  const [price, setPrice] = useState("");
  const [active, setActive] = useState(0);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [royalties, setRoyalties] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [category, setCategory] = useState("");
  const [properties, setProperties] = useState("");
  const [image, setImage] = useState(null);
  const categoryArray = [
    {
      image: images.nft_image_1,
      category: "Sports",
    },
    {
      image: images.nft_image_2,
      category: "Arts",
    },
    {
      image: images.nft_image_3,
      category: "Musics",
    },
    {
      image: images.nft_image_1,
      category: "Digital",
    },
    {
      image: images.nft_image_2,
      category: "Time",
    },
    {
      image: images.nft_image_3,
      category: "Photography",
    },
  ];
  return (
    <div className={Style.upload}>
      <DropZone
        title="JPG, PNG, WEBM, MAX 100MB"
        heading="Drag & Drop file"
        subHeading="or Browse media on your device"
        itemName={name}
        website={website}
        description={description}
        royalties={royalties}
        fileSize={fileSize}
        category={category}
        properties={properties}
        setImage={setImage}
      />
      <div className={Style.upload_box}>
        <div className={formStyle.form_box_input}>
          <label htmlFor="nft">Item Name</label>
          <input
            type="text"
            placeholder="NFT name"
            onChange={(e) => setName(e.target.value)}
            className={formStyle.form_box_input_username}
          />
        </div>
        <div className={formStyle.form_box_input}>
          <label htmlFor="Website">Website</label>
          <div className={formStyle.form_box_input_box}>
            <div className={formStyle.form_box_input_box_icon}>
              <MdOutlineHttp />
            </div>
            <input
              type="text"
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Your websites"
            />
          </div>
        </div>
        <p className={Style.upload_box_input_para}>
          Ciscrypt will include a link to this URL on this item's detail page,
          so that users csn lick to learn more about it. You are welcome to link
          your own webpage with more details.
        </p>
        <div className={formStyle.form_box_input}>
          <label htmlFor="description">Description</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={6}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Introduce yourself in few lines..."
          ></textarea>
          <p>
            This description will be included on the item's detail page
            underneath its image. Markdown syntax is supported
          </p>
        </div>
        <div className={formStyle.form_box_input}>
          <label htmlFor="name">Choose Collection</label>
          <p className={Style.upload_box_input_para}>
            Choose an existing collection or create a new one.
          </p>
          <div className={Style.upload_box_slider_div}>
            {categoryArray.map((element, index) => (
              <div
                className={`${Style.upload_box_slider} ${
                  active == index + 1 ? Style.active : ""
                }`}
                key={index + 1}
                onClick={() => {
                  setActive(index + 1);
                  setCategory(element.category);
                }}
              >
                <div className={Style.upload_box_slider_box}>
                  <div className={Style.upload_box_slider_box_img}>
                    <Image
                      src={element.image}
                      alt="background-img"
                      width={70}
                      height={70}
                      className={Style.upload_box_slider_box_img_img}
                    />
                  </div>
                  <div className={Style.upload_box_slider_box_img_icon}>
                    <TiTick />
                  </div>
                </div>
                <p>{element.category}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={formStyle.form_box_social}>
          <div className={formStyle.form_box_input}>
            <label htmlFor="royalties">Royalties</label>
            <div className={formStyle.form_box_input_box}>
              <div className={formStyle.form_box_input_box_icon}>
                <FaPercent />
              </div>
              <input
                type="text"
                placeholder="20%"
                onChange={(e) => setRoyalties(e.target.value)}
              />
            </div>
          </div>
          <div className={formStyle.form_box_input}>
            <label htmlFor="size">Size</label>
            <div className={formStyle.form_box_input_box}>
              <div className={formStyle.form_box_input_box_icon}>
                <MdOutlineAttachFile />
              </div>
              <input
                type="text"
                placeholder="99MB"
                onChange={(e) => setFileSize(e.target.value)}
              />
            </div>
          </div>
          <div className={formStyle.form_box_input}>
            <label htmlFor="properties">Properties</label>
            <div className={formStyle.form_box_input_box}>
              <div className={formStyle.form_box_input_box_icon}>
                <AiTwotonePropertySafety />
              </div>
              <input
                type="text"
                placeholder="Properties"
                onChange={(e) => setProperties(e.target.value)}
              />
            </div>
          </div>
          <div className={formStyle.form_box_input}>
            <label htmlFor="price">Price</label>
            <div className={formStyle.form_box_input_box}>
              <div className={formStyle.form_box_input_box_icon}>
                <AiTwotonePropertySafety />
              </div>
              <input
                type="text"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={Style.upload_box_btn}>
          <Button
            btnText="Upload"
            classStyle={Style.upload_box_btn_style}
            handleClick={async() => {
              const formInput = {
                name: name,
                description: description,
                price: price,
                website: website || "", 
                collection: category, 
                royalties: royalties, 
                size: fileSize, 
                properties: properties
              }
              createNFT(formInput, image);
            }}
            icon={undefined}
          />
          <Button
            btnText="Preview"
            classStyle={Style.upload_box_btn_style}
            handleClick={() => {}}
            icon={undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadNFT;
