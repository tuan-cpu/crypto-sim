import React from "react";
import { TiTick } from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./Subscription.module.css";
import { Button } from "@/components";
interface Props {
  index: number;
  element: any;
}

const Subscription: React.FC<Props> = ({ index, element }) => {
  return (
    <div className={Style.subscriptionBox}>
      <div className={Style.subscriptionBox_box}>
        <span className={Style.subscriptionBox_box_span}>{element.plan}</span>
        <small className={Style.subscriptionBox_box_small}>
          {element.popular || ""}
        </small>
        <p className={Style.subscriptionBox_box_para}>{element.price}</p>
        <div className={Style.subscriptionBox_box_info}>
          {element.service.map((service: string, i: number) => (
            <p className={Style.subscriptionBox_box_info_para} key={i + 1}>
              <span>
                <TiTick />
              </span>
              {service}
            </p>
          ))}
        </div>
        <Button
          btnText="Submit"
          handleClick={() => {}}
          classStyle={Style.button}
          icon={undefined}
        />
      </div>
    </div>
  );
};

export default Subscription;
