"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";
// Define the type for your context
type DataContextType = {
    userInfo: UserInfo,
    setUserInfo: Dispatch<SetStateAction<UserInfo>>,
    userNotifications: UserNotification[],
    setUserNotifications: Dispatch<SetStateAction<UserNotification[]>>,
};

// Create a context with an initial state
const DataContext = createContext<DataContextType | undefined>(undefined);

// Create a context provider component
type DataContextProviderProps = {
  children: ReactNode;
};
interface UserInfo {
  username: string;
  email: string;
  description: string;
  image: string;
  website: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
}
type UserNotification = {
  message: string,
  timestamp: number
}
const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "",
    email: "",
    description: "",
    image: "",
    website: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  });
  const [userNotifications, setUserNotifications] = useState<UserNotification[]>([]);
  return <DataContext.Provider value={{ userInfo, setUserInfo, userNotifications, setUserNotifications }}>{children}</DataContext.Provider>;
};

// Create a custom hook to use the context
const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
};

export { DataContextProvider, useDataContext };
