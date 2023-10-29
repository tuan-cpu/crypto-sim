//export const helloWorldContract;

export const getSecondGenesis = async () => {
    const message = await nftContract.methods.getSimDetails(2).call();
    return message;
};

export const connectWallet = async () => {
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
        } catch (err) {
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

export const getCurrentWalletConnected = async () => {
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
        } catch (err) {
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


export const buySim = async (address) => {
    if (!window.ethereum || address === null) {
        return {
            status:
                "💡 Connect your Metamask wallet to buy a new Sim on the blockchain.",
        };
    }
    //set up transaction parameters
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: address, // must match user's active address.
        data: nftContract.methods.buySim().encodeABI(),
    };

    //sign the transaction
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
        return {
            status: (
                <span>
                    ✅{" "}
                    <a target="_blank" href={`https://sepolia.etherscan.io/tx/${txHash}`}>
                        View the status of your transaction on Etherscan!
                    </a>
                    <br />
                    ℹ️ Once the transaction is verified by the network, the message will
                    be updated automatically.
                </span>
            ),
        };
    } catch (error) {
        return {
            status: "😥 " + error.message,
        };
    }
};

import contractABI from '../../artifacts/contracts/NFT.sol/TheFunixCryptoSim.json';
const alchemyKey = "wss://eth-sepolia.g.alchemy.com/v2/oP0jSmziI3BCPpftKhF3vnI43fqpMyde"
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
const abi = contractABI.abi;
const contractAddress = "0xA3c669EDBFF57e8F3e1Cb01f32B274c8d4BD1787";

export const nftContract = new web3.eth.Contract(
    abi,
    contractAddress
);
const extractCIDandImage = (uri) => {
    const result = uri.split("/");
    return [result[2], result[3]];
}
const constructGateway = (cid,image) => {
    return "https://gateway.pinata.cloud/ipfs/" + cid + "/" + image;
}
export const getNFTImage = async (tokenId) => {
    const uri = await nftContract.methods.tokenURI(tokenId).call();
    const response = await fetch(uri);
    const metadata = await response.json();
    const [cid, image] = extractCIDandImage(metadata.image);
    return constructGateway(cid, image);
}