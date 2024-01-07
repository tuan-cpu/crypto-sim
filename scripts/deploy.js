const { ethers } = require("hardhat");

async function main(){
    // const NFT = await ethers.getContractFactory("TheFunixCryptoSim");
    // const nft = await NFT.deploy(process.env.BASE_URI);
    const Auction = await ethers.getContractFactory("NFTAuction");
    const auction = await Auction.deploy("0x9140b53F882F031b76fBC0BD48A4d68CaF1E9613");
    // const Marketplace = await ethers.getContractFactory("NFTMarketplace");
    // const marketplace = await Marketplace.deploy(nft.address);
    
    // console.log("NFT contract deployed at: ", nft.address);
    // console.log("Marketplace contract at: ", marketplace.address);
    console.log("Auction contract deployed at: ", auction.address);
}
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });