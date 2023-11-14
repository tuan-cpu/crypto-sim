import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ethers } from 'ethers';

//Internal import
import contract_FCS from '../../artifacts/contracts/NFT.sol/TheFunixCryptoSim.json';
import contract_auction from '../../artifacts/contracts/NFT.sol/NFTAuction.json';
import constant from './constant';

//Constant attributes
const API_URL = constant.API_URL;
const PRIVATE_KEY = constant.PRIVATE_KEY;
const FCS_CONTRACT_ADDRESS = constant.FCS_CONTRACT_ADDRESS;
const AUCTION_CONTRACT_ADDRESS = constant.AUCTION_CONTRACT_ADDRESS;

// Provider
const alchemyProvider = new ethers.providers.JsonRpcProvider(API_URL);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const nftContract = new ethers.Contract(FCS_CONTRACT_ADDRESS, contract_FCS.abi, signer);
const auctionContract = new ethers.Contract(AUCTION_CONTRACT_ADDRESS, contract_auction.abi, signer);

// Define the type for your context
type NFTContextType = {
};

// Create a context with an initial state
const NFTContext = createContext<NFTContextType | undefined>(undefined);

// Create a context provider component
type NFTContextProviderProps = {
  children: ReactNode;
};

const NFTContextProvider: React.FC<NFTContextProviderProps> = ({ children }) => {

  return (
    <NFTContext.Provider value={{  }}>
      {children}
    </NFTContext.Provider>
  );
};

// Create a custom hook to use the context
const useNFTContext = (): NFTContextType => {
  const context = useContext(NFTContext);
  if (!context) {
    throw new Error('useNFTContext must be used within a NFTContextProvider');
  }
  return context;
};

export { NFTContextProvider, useNFTContext };
