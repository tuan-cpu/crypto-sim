"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

declare global {
  interface Window {
    ethereum: {
      on: any;
      request: (request: {
        method: string;
        params?: Array<any>;
      }) => Promise<any>;
    };
  }
}

// Define the type for your context
type ConnectWalletContextType = {
  wallet: string;
  walletStatus: string | JSX.Element | undefined;
  getCurrentWalletConnected: () => Promise<
    | {
        address: any;
        status: string;
      }
    | {
        address: string;
        status: React.JSX.Element;
      }
  >;
  connectWalletPressed: () => Promise<void>;
};

// Create a context with an initial state
const ConnectWalletContext = createContext<
  ConnectWalletContextType | undefined
>(undefined);

// Create a context provider component
type ConnectWalletContextProviderProps = {
  children: ReactNode;
};

const ConnectWalletContextProvider: React.FC<
  ConnectWalletContextProviderProps
> = ({ children }) => {
  const [wallet, setWallet] = useState("");
  const [walletStatus, setWalletStatus] = useState<string | JSX.Element>();
  
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "👆🏽 Write a message in the text-field above.",
          address: addressArray[0],
        };
        return obj;
      } catch (err: any) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };
  const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "👆🏽 Write a message in the text-field above.",
          };
        } else {
          return {
            address: "",
            status: "🦊 Connect to Metamask using the top right button.",
          };
        }
      } catch (err: any) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };
  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: Array<string>) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setWalletStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setWalletStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setWalletStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  };
  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address);
    setWalletStatus(walletResponse.status);
  };

  useEffect(() => {
    const fetchWallet= async() => {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      setWalletStatus(status);
    }
    fetchWallet();
    addWalletListener();
  }, []);

  return (
    <ConnectWalletContext.Provider
      value={{
        wallet,
        walletStatus,
        getCurrentWalletConnected,
        connectWalletPressed,
      }}
    >
      {children}
    </ConnectWalletContext.Provider>
  );
};

// Create a custom hook to use the context
const useConnectWalletContext = (): ConnectWalletContextType => {
  const context = useContext(ConnectWalletContext);
  if (!context) {
    throw new Error(
      "useConnectWalletContext must be used within a ConnectWalletContextProvider"
    );
  }
  return context;
};

export { ConnectWalletContextProvider, useConnectWalletContext };
