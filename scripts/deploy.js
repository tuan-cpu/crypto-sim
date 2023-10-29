const { ethers } = require("hardhat");

async function main(){
    const NFT = await ethers.getContractFactory("TheFunixCryptoSim");
    const nft = await NFT.deploy(process.env.BASE_URI);
    console.log("Contract deployed to address:", nft.address);
}
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });