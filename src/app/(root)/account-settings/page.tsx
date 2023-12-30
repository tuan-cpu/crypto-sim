"use client";
import React from 'react';

//INTERNAL IMPORT
import Style from './Account.module.css';
import { AccountPage } from '@/components';
import { useConnectWalletContext } from "@/context/ConnectWalletContext";
import { useDataContext } from '@/context/DataContext';

const Account = () => {
  const { wallet } = useConnectWalletContext();
  const { userInfo } = useDataContext();
  return (
    <div className={Style.account}>
      <div className={Style.account_info}>
        <h1>Profile Settings</h1>
        <p>Change your profile to best suite you.</p>
      </div>
      <div className={Style.account_box}>
        {userInfo && <AccountPage wallet={wallet} userData={userInfo}/> }
      </div>
    </div>
  )
}

export default Account