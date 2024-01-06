import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Notification.module.css";
import { useDataContext } from "@/context/DataContext";

const Notification = () => {
  const { userInfo, userNotifications } = useDataContext();
  return (
    <div className={Style.notification}>
      <p>Notification</p>
      {userNotifications?.map((item, index) => (
        <div className={Style.notification_box} key={index}>
          <div className={Style.notification_box_details}>
            <div className={Style.notification_box_img}>
              <Image
                src={userInfo.image}
                alt="profile-image"
                width={50}
                height={50}
                style={{ borderRadius: 25 }}
              />
            </div>
            <div className={Style.notification_box_info}>
              <h4>{userInfo.username}</h4>
              <p>{item.message}</p>
              <small>{new Date(item.timestamp).toLocaleString()}</small>
            </div>
          </div>
          <span className={Style.notification_box_new}></span>
        </div>
      ))}
    </div>
  );
};

export default Notification;
