const { ethers } = require("hardhat");

async function main(){
    const NFT = await ethers.getContractFactory("TheFunixCryptoSim");
    const nft = await NFT.deploy(process.env.BASE_URI);
    const Auction = await ethers.getContractFactory("NFTAuction");
    const auction = await Auction.deploy(nft.address);
    console.log("NFT contract deployed at: ", nft.address);
    console.log("Auction contract deployed at: ", auction.address);
}
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });