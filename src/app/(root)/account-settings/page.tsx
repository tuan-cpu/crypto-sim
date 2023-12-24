"use client";
import React, { useEffect, useState } from 'react';

//INTERNAL IMPORT
import Style from './Account.module.css';
import { AccountPage } from '@/components';
import { useConnectWalletContext } from "@/context/ConnectWalletContext";
import { useDataContext } from '@/context/DataContext';
import { getUserProfile } from '@/lib/actions/users.actions';

const Account = () => {
  const { wallet } = useConnectWalletContext();
  const { userInfo } = useDataContext();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if(userInfo.username !== '' && !checked){
      setChecked(true);
    }
  },[userInfo])
  return (
    <div className={Style.account}>
      <div className={Style.account_info}>
        <h1>Profile Settings</h1>
        <p>Change your profile to best suite you.</p>
      </div>
      <div className={Style.account_box}>
        {checked && <AccountPage wallet={wallet} userData={userInfo}/> }
      </div>
    </div>
  )
}

export default Account