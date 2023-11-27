import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ethers } from "ethers";
import axios from "axios";
import FormData from "form-data";

//Internal import
import contract_FCS from "../../artifacts/contracts/NFT.sol/TheFunixCryptoSim.json";
import contract_auction from "../../artifacts/contracts/NFT.sol/NFTAuction.json";
import constant from "./constant.js";

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
const nftContract = new ethers.Contract(
  FCS_CONTRACT_ADDRESS,
  contract_FCS.abi,
  signer
);
const auctionContract = new ethers.Contract(
  AUCTION_CONTRACT_ADDRESS,
  contract_auction.abi,
  signer
);

// Define the type for your context
type NFTContextType = {
  createNFT: any;
  buySim: any;
  breedSim: any;
  ownedSim: any;
  ownerOf: any;
  tokenUri: any;
  getListingPrice: any;
  listNFT: any;
  cancelListNFT: any;
  reListNFT: any;
  buyNFT: any;
  fetchMarketItem: any;
  fetchListedItem: any;
  createAuction: any;
  bid: any;
  settleAuction: any;
  getHighestBidderOfAnAuction: any;
  fetchNFTImageFromIPFS: any;
};

// Create a context with an initial state
const NFTContext = createContext<NFTContextType | undefined>(undefined);

// Create a context provider component
type NFTContextProviderProps = {
  children: ReactNode;
};

const NFTContextProvider: React.FC<NFTContextProviderProps> = ({
  children,
}) => {
  const pinFileToIPFS = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const pinataMetadata = JSON.stringify({
      name: `CryptoSims/${file.name}`,
    });
    formData.append("pinataMetadata", pinataMetadata);
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", pinataOptions);
    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: Infinity,
          headers: {
            "Content-Type": undefined,
            Authorization: `Bearer ${constant.PINATA_JWT}`,
          },
        }
      );
      return res.data.IpfsHash;
    } catch (error) {
      console.log(error);
    }
  };
  const pinJSONToIPFS = async (
    imageURI: string,
    name: string,
    description: string,
    website: string,
    collection: string,
    royalties: string,
    size: string,
    properties: string
  ) => {
    // let lastIndex = name.lastIndexOf(".");
    // let newName = name.substring(0,lastIndex);
    const metadataFileName = `${name}.json`; // Include the .json extension

    const data = JSON.stringify({
      pinataContent: {
        name: name,
        description: description,
        image: `ipfs://${imageURI}`,
        website: website || "",
        collection: collection,
        royalties: royalties,
        size: size + "MB",
        properties: properties,
      },
      pinataMetadata: {
        name: `CryptoSimsMeta/${metadataFileName}`, // Use the metadata file name
      },
    });

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${constant.PINATA_JWT}`, // Adjust the prefix if needed
          },
        }
      );
      return res.data.IpfsHash;
    } catch (error) {
      console.log(error);
    }
  };

  const createNFT = async (
    formInput: {
      name: string;
      description: string;
      price: string;
      website: string;
      collection: string;
      royalties: string;
      size: string;
      properties: string;
    },
    file: File
  ) => {
    try {
      const {
        name,
        description,
        price,
        website,
        collection,
        royalties,
        size,
        properties,
      } = formInput;
      if (
        !name ||
        !description ||
        !price ||
        !file ||
        !collection ||
        !royalties ||
        !size ||
        !properties
      )
        return console.log("Missing data for creating NFT");
      const imageURI = await pinFileToIPFS(file);
      const tokenURI = await pinJSONToIPFS(
        imageURI,
        name,
        description,
        website,
        collection,
        royalties,
        size,
        properties
      );
      console.log(tokenURI);
    } catch (error) {
      console.log("Error while creating NFT!");
    }
  };

  //NFT CREATE
  const buySim = async () => {
    return await nftContract.buySim({ value: ethToWei("0.02") });
  };
  const breedSim = async (matronId: number, sireId: number) => {
    return await nftContract.breedSim(matronId, sireId, { value: "0.05" });
  };
  const ownedSim = async () => {
    return await nftContract.ownedSims();
  };
  const ownerOf = async (tokenId: number) => {
    return await nftContract.ownerOf(tokenId);
  };
  const tokenUri = async (tokenId: number) => {
    return await nftContract.tokenURI(tokenId);
  };

  //MARKETPLACE
  const getListingPrice = async () => {
    return await nftContract.getListingPrice();
  };
  const listNFT = async (tokenId: number, price: number) => {
    const weiPrice = ethToWei(price.toString());
    const listingPrice = await getListingPrice();
    const ethListingPrice = weiToEth(listingPrice);
    const sentValue = price + Number(ethListingPrice);
    return await nftContract.listNFT(tokenId, weiPrice, {
      value: ethToWei(sentValue.toString()),
    });
  };
  const cancelListNFT = async (tokenId: number) => {
    return await nftContract.cancelListNFT(tokenId);
  };
  const reListNFT = async (tokenId: number, price: string) => {
    const weiPrice = ethToWei(price);
    const listingPrice = await getListingPrice();
    return await nftContract.reListNFT(tokenId, weiPrice, {
      value: weiPrice + listingPrice,
    });
  };
  const buyNFT = async (tokenId: number, price: string) => {
    const weiPrice = ethToWei(price);
    return await nftContract.buyNFT(tokenId, { value: weiPrice });
  };

  const fetchMarketItem = async () => {
    const data = await nftContract.fetchMarketItem();
    const items = await Promise.all(
      data.map(
        async (item: {
          tokenId: number;
          seller: string;
          price: string;
          escrow: string;
          sold: boolean;
        }) => {
          const tokenId = Number(BigInt(item.tokenId));
          const seller = item.seller;
          const escrow = item.escrow;
          const tokenURI = await nftContract.tokenURI(tokenId);
          const response = await fetch(tokenURI);
          const metadata = await response.json();
          const tokenDescription = metadata.description;
          const tokenName = metadata.name;
          const image = await fetchNFTImageFromIPFS(tokenId);
          const ethPrice = weiToEth(item.price);
          return {
            ethPrice,
            tokenId,
            seller,
            escrow,
            tokenName,
            tokenDescription,
            image,
            tokenURI,
          };
        }
      )
    );
    return items;
  };
  const fetchListedItem = async (type: string) => {
    try {
      const data =
        type == "fetchListedItems"
          ? await nftContract.fetchListedItem()
          : await ownedSim();
      const items = await Promise.all(
        data.map(
          async (item: {
            tokenId: number;
            seller: string;
            price: string;
            escrow: string;
            sold: boolean;
          }) => {
            const tokenId = Number(BigInt(item.tokenId));
            const seller = item.seller;
            const escrow = item.escrow;
            const tokenURI = await nftContract.tokenURI(tokenId);
            const response = await fetch(tokenURI);
            const metadata = await response.json();
            const tokenDescription = metadata.description;
            const tokenName = metadata.name;
            const image = await fetchNFTImageFromIPFS(tokenId);
            const ethPrice = weiToEth(item.price);
            return {
              ethPrice,
              tokenId,
              seller,
              escrow,
              tokenName,
              tokenDescription,
              image,
              tokenURI,
            };
          }
        )
      );
      return items;
    } catch (error) {
      console.log("Error while fetching listed NFTs!");
    }
  };

  useEffect(() => {
    fetchMarketItem();
  }, []);

  //AUCTION
  const createAuction = async (
    tokenId: number,
    price: string,
    duration: number
  ) => {
    await nftContract.approve(auctionContract.address, tokenId);
    const weiPrice = ethToWei(price);
    await auctionContract.createAuction(tokenId, weiPrice, duration, {
      value: ethToWei("0.025"),
    });
  };
  const bid = async (tokenId: number, price: string) => {
    return await auctionContract.bid(tokenId, { value: ethToWei(price) });
  };
  const getHighestBidderOfAnAuction = async (tokenId: number) => {
    return await auctionContract.getHighestBidderOfAnAuction(tokenId);
  };
  const settleAuction = async (tokenId: number) => {
    return await auctionContract.settleAuction(tokenId);
  };

  //SUPPORT FUNCTIONS
  const ethToWei = (price: string) => {
    return ethers.utils.parseEther(price);
  };
  const weiToEth = (price: string) => {
    return ethers.utils.formatEther(BigInt(price));
  };
  const extractCIDandImage = (uri: string) => {
    const result = uri.split("/");
    return [result[2], result[3]];
  };
  const constructGateway = (cid: string, image: string) => {
    return "https://gateway.pinata.cloud/ipfs/" + cid + "/" + image;
  };
  const fetchNFTImageFromIPFS = async (tokenId: number) => {
    const uri = await nftContract.tokenURI(tokenId);
    const response = await fetch(uri);
    const metadata = await response.json();
    const [cid, image] = extractCIDandImage(metadata.image);
    return constructGateway(cid, image);
  };

  return (
    <NFTContext.Provider
      value={{
        createNFT,
        buySim,
        breedSim,
        ownedSim,
        ownerOf,
        tokenUri,
        getListingPrice,
        listNFT,
        cancelListNFT,
        reListNFT,
        buyNFT,
        fetchMarketItem,
        fetchListedItem,
        createAuction,
        bid,
        settleAuction,
        getHighestBidderOfAnAuction,
        fetchNFTImageFromIPFS,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};

// Create a custom hook to use the context
const useNFTContext = (): NFTContextType => {
  const context = useContext(NFTContext);
  if (!context) {
    throw new Error("useNFTContext must be used within a NFTContextProvider");
  }
  return context;
};

export { NFTContextProvider, useNFTContext };
