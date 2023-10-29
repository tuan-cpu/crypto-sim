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

function extractCIDandImage(uri){
    const result = uri.split("/");
    return [result[2], result[3]];
}
function constructGateway(cid,image){
    return "https://gateway.pinata.cloud/ipfs/" + cid + "/" + image;
}

async function main() {
    const uri = await nftContract.tokenURI(3);
    const response = await fetch(uri);
    const metadata = await response.json();
    const [cid, image] = extractCIDandImage(metadata.image);
    console.log(constructGateway(cid, image));
}
main();