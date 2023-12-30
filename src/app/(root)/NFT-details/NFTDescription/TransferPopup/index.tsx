import React, { useState } from "react";
import { MdOutlineClose, MdOutlineDelete } from "react-icons/md";

//INTERNAL IMPORT
import Style from "./TransferPopup.module.css";
import { Button } from "@/components";
import { useNFTContext } from "@/context/NFTContext";
interface Props{
    nftName: string,
    tokenId: number,
    owner: string,
    close: () => {}
}

const TransferPopup:React.FC<Props> = ({nftName, tokenId, owner, close}) => {
  const { transferNFT } = useNFTContext();
  const [addressTo, setAddressTo] = useState("");
  return (
    <div className={Style.container} id="popupContainer">
      <div className={Style.popup}>
        <div className={Style.popup_box}>
          <span className={Style.popup_box_button} onClick={close}>
            <MdOutlineClose/>
          </span>
          <div className={Style.popup_box_info}>
            <h1>Transfer "{nftName}" to:</h1>
            <div className={Style.popup_box_info_input}>
              <input placeholder="e.g. 0x1ed3... or destination.eth, destination.lens" type="text" onChange={(e) => setAddressTo(e.target.value)} value={addressTo}/>
              <MdOutlineDelete onClick={() => setAddressTo("")}/>
            </div>
          </div>
          <Button btnText="Transfer" handleClick={async () => await transferNFT(owner, addressTo, tokenId)} icon={undefined} classStyle={Style.button}/>
        </div>
      </div>
    </div>
  );
};

export default TransferPopup;
