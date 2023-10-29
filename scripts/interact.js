const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const contract = require("../artifacts/contracts/NFT.sol/TheFunixCryptoSim.json");
const ethers = require('ethers');

// Provider
const alchemyProvider = new ethers.providers.JsonRpcProvider(API_URL);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const nftContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
    const secondSim = await nftContract.getSimDetails(1);
    console.log("Second Genesis Sim Genes is: " + secondSim[1]);
    console.log("Buy a new Sim....");
    const txHash = await nftContract.buySim();
    await txHash.wait();
}
main();