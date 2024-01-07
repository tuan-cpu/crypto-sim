// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

library UintAndByteConvert {
    function bytesToUintArray(bytes memory data)
        internal
        pure
        returns (uint256[] memory)
    {
        require(data.length % 32 == 0, "Invalid data length");

        uint256[] memory uintArray = new uint256[](data.length / 32);

        for (uint256 i = 0; i < data.length; i += 32) {
            uint256 value;
            assembly {
                value := mload(add(data, add(32, i)))
            }
            uintArray[i / 32] = value;
        }

        return uintArray;
    }

    function combineUintArrayToUint32(uint256[] memory values)
        internal
        pure
        returns (uint32)
    {
        uint32 result = 0;
        result = (result << 2) | uint32(values[0]); // 2 bits for 0-3
        result = (result << 3) | uint32(values[1]); // 3 bits for 0-7
        result = (result << 7) | uint32(values[2]); // 7 bits for 0-127
        result = (result << 5) | uint32(values[3]); // 5 bits for 0-31
        result = (result << 5) | uint32(values[4]); // 5 bits for 0-31
        result = (result << 2) | uint32(values[5]); // 2 bits for 0-3
        result = (result << 8) | uint32(values[6]); // 8 bits for 0-255

        return result;
    }

    function splitUint32ToUintArray(uint32 input)
        internal
        pure
        returns (uint256[7] memory values)
    {
        // Initialize the result array
        values = [uint256(0), 0, 0, 0, 0, 0, 0];

        // Extract each value from the input using bitwise shifting and masking
        // The mask depends on the number of bits allocated to each value
        values[6] = uint8(input & 0xFF); // 8 bits for 0-255
        input >>= 8;
        values[5] = uint8(input & 0x03); // 2 bits for 0-3
        input >>= 2;
        values[4] = uint8(input & 0x1F); // 5 bits for 0-31
        input >>= 5;
        values[3] = uint8(input & 0x1F); // 5 bits for 0-31
        input >>= 5;
        values[2] = uint8(input & 0x7F); // 7 bits for 0-127
        input >>= 7;
        values[1] = uint8(input & 0x07); // 3 bits for 0-7
        input >>= 3;
        values[0] = uint8(input & 0x03); // 2 bits for 0-3

        return values;
    }

    function uintToBytes(uint32 x) internal pure returns (bytes memory) {
        uint256[7] memory y = splitUint32ToUintArray(x);
        bytes memory data;
        data = abi.encodePacked(y);
        return data;
    }
}

abstract contract CryptoSimBase {
    // This struct will be used to represent the attributes of CryptoSim
    struct SimAttributes {
        // 0 -> 3
        uint8 body;
        // 0 -> 7
        uint8 eye;
        // 0 -> 127
        uint8 hairstyle;
        // 0 -> 31
        uint8 outfit;
        // 0 -> 31
        uint8 accessory;
        // 0 -> 3
        uint8 hiddenGenes;
        // 0 - 255
        uint8 generation;
    }

    // This struct will be used to represent one sim
    struct Sim {
        uint32 genes;
        uint256 matronId;
        uint256 sireId;
    }

    // List of existing sims. Use as CryptoSims' "database"
    Sim[] public sims;

    struct SimOwnership {
        address owner;
        uint256 price;
        uint256 timestamp;
    }

    // Sim ownership history
    mapping(uint256 => SimOwnership[]) simOwnership;

    // Event that will be emitted whenever a new sim is created
    event Birth(
        address owner,
        uint256 id,
        uint256 matronId,
        uint256 sireId,
        uint32 genes
    );

    function generateSimGenes(uint256 matronId, uint256 sireId)
        internal
        view
        returns (uint32)
    {
        SimAttributes memory matronAttr = decodeAttributes(
            sims[matronId].genes
        );
        SimAttributes memory sireAttr = decodeAttributes(sims[sireId].genes);
        uint8 x = matronAttr.hiddenGenes;
        if (matronAttr.hiddenGenes == sireAttr.hiddenGenes) {
            x = (matronAttr.hiddenGenes * sireAttr.hiddenGenes + 3) % 4;
        } else if (x < sireAttr.hiddenGenes) {
            x = sireAttr.hiddenGenes;
        }
        SimAttributes memory attributes = SimAttributes({
            body: 0,
            eye: 0,
            hairstyle: 0,
            outfit: 0,
            accessory: 0,
            hiddenGenes: 0,
            generation: 0
        });
        attributes.generation = matronAttr.generation + 1;
        if (sireAttr.generation > matronAttr.generation) {
            attributes.generation = sireAttr.generation + 1;
        }
        if (x == 0) {
            attributes.eye = sireAttr.eye;
            attributes.hairstyle = matronAttr.hairstyle;
            attributes.outfit = (matronAttr.outfit + sireAttr.outfit + 1) % 32;
            attributes.accessory =
                (matronAttr.accessory + sireAttr.accessory) %
                32;
            attributes.hiddenGenes = 0;
        } else if (x == 1) {
            attributes.eye = matronAttr.eye;
            attributes.hairstyle =
                (sireAttr.hairstyle - matronAttr.hairstyle + 128) %
                128;
            attributes.outfit = (matronAttr.outfit + sireAttr.outfit + 1) % 32;
            attributes.accessory =
                (matronAttr.accessory + sireAttr.accessory) %
                32;
            attributes.hiddenGenes = 1;
        } else if (x == 2) {
            attributes.eye = (matronAttr.eye + sireAttr.eye) % 8;
            attributes.hairstyle =
                (sireAttr.hairstyle - matronAttr.hairstyle + 128) %
                128;
            attributes.outfit = (matronAttr.outfit + sireAttr.outfit) % 32;
            attributes.accessory =
                (matronAttr.accessory + sireAttr.accessory + 1) %
                32;
            attributes.hiddenGenes = 2;
        } else if (x == 3) {
            attributes.eye = (matronAttr.eye + sireAttr.eye) % 8;
            attributes.hairstyle = sireAttr.hairstyle;
            attributes.outfit = (matronAttr.outfit + sireAttr.outfit) % 32;
            attributes.accessory =
                (matronAttr.accessory + sireAttr.accessory + 1) %
                32;
            attributes.hiddenGenes = 3;
        }
        attributes.body = (matronAttr.body * sireAttr.body + 3) % 4;
        return encodeAttributes(attributes);
    }

    function getSimDetails(uint256 simId)
        external
        view
        returns (
            uint256,
            uint32,
            uint256,
            uint256
        )
    {
        Sim storage sim = sims[simId];
        return (simId, sim.genes, sim.matronId, sim.sireId);
    }

    function getAllSims() external view returns (Sim[] memory) {
        return sims;
    }

    function updateOwnershipHistory(
        uint256 tokenId,
        uint256 price,
        address newOwner
    ) external {
        simOwnership[tokenId].push(
            SimOwnership(newOwner, price, block.timestamp)
        );
    }

    function getOwnershipHistory(uint256 tokenId)
        external
        view
        returns (SimOwnership[] memory)
    {
        return simOwnership[tokenId];
    }

    function encodeAttributes(SimAttributes memory attributes)
        internal
        pure
        returns (uint32)
    {
        uint32 genes = 0;
        genes = UintAndByteConvert.combineUintArrayToUint32(
            UintAndByteConvert.bytesToUintArray(abi.encode(attributes))
        );
        return genes;
    }

    function decodeAttributes(uint32 genes)
        internal
        pure
        returns (SimAttributes memory)
    {
        SimAttributes memory attributes = SimAttributes({
            body: 0,
            eye: 0,
            hairstyle: 0,
            outfit: 0,
            accessory: 0,
            hiddenGenes: 0,
            generation: 0
        });
        bytes memory data = UintAndByteConvert.uintToBytes(genes);
        (
            attributes.body,
            attributes.eye,
            attributes.hairstyle,
            attributes.outfit,
            attributes.accessory,
            attributes.hiddenGenes,
            attributes.generation
        ) = abi.decode(data, (uint8, uint8, uint8, uint8, uint8, uint8, uint8));
        return attributes;
    }
}

contract TheFunixCryptoSim is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    CryptoSimBase
{
    using UintAndByteConvert for *;
    using Strings for uint256;
    string private baseURI;
    uint256 public maxSupply = 50;
    address payable public owner;
    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    constructor(string memory _initBaseURI)
        ERC721("TheFunixCryptoSims", "FCS")
    {
        owner = payable(msg.sender);
        setBaseURI(_initBaseURI);
        createGenesis();
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function createSim(
        uint256 matron,
        uint256 sire,
        address simOwner
    ) internal returns (uint256) {
        uint256 supply = totalSupply();
        require(supply < maxSupply);
        require(simOwner != address(0));
        uint32 newGenes = generateSimGenes(matron, sire);
        string memory _newURI = string.concat(
            "https://gateway.pinata.cloud/ipfs/",
            baseURI,
            "/",
            Strings.toString(supply + 1),
            ".json"
        );

        Sim memory newSim = Sim({
            genes: newGenes,
            matronId: matron,
            sireId: sire
        });
        sims.push(newSim);
        simOwnership[supply].push(SimOwnership(simOwner, 0, block.timestamp));
        _safeMint(simOwner, supply);
        _setTokenURI(supply, _newURI);
        emit Birth(
            simOwner,
            supply,
            newSim.matronId,
            newSim.sireId,
            newSim.genes
        );
        return supply;
    }

    function createGenesis() internal {
        SimAttributes memory firstAtrributes = SimAttributes({
            body: 0,
            eye: 0,
            hairstyle: 0,
            outfit: 0,
            accessory: 0,
            hiddenGenes: 0,
            generation: 0
        });

        SimAttributes memory secondAtrributes = SimAttributes({
            body: 3,
            eye: 7,
            hairstyle: 127,
            outfit: 31,
            accessory: 31,
            hiddenGenes: 0,
            generation: 0
        });

        sims.push(
            Sim({
                genes: encodeAttributes(firstAtrributes),
                matronId: 0,
                sireId: 0
            })
        );

        _safeMint(msg.sender, 0);
        _setTokenURI(
            0,
            string.concat(
                "https://gateway.pinata.cloud/ipfs/",
                baseURI,
                "/1.json"
            )
        );
        simOwnership[0].push(SimOwnership(owner, 0, block.timestamp));

        sims.push(
            Sim({
                genes: encodeAttributes(secondAtrributes),
                matronId: 0,
                sireId: 0
            })
        );

        _safeMint(msg.sender, 1);
        _setTokenURI(
            1,
            string.concat(
                "https://gateway.pinata.cloud/ipfs/",
                baseURI,
                "/2.json"
            )
        );
        simOwnership[1].push(SimOwnership(owner, 0, block.timestamp));
    }

    function buySim() external payable returns (uint256) {
        require(msg.value == 0.02 ether);
        return createSim(0, (sims.length - 1) % sims.length, msg.sender);
    }

    function breedSim(uint256 matronId, uint256 sireId)
        external
        payable
        returns (uint256)
    {
        require(msg.value == 0.05 ether);
        require(matronId != sireId, "2 sims must be different!");
        require(
            ownerOf(matronId) == msg.sender && ownerOf(sireId) == msg.sender,
            "Not your sim!"
        );
        return createSim(matronId, sireId, msg.sender);
    }

    function ownedSims() external view returns (uint256[] memory) {
        uint256 simCount = balanceOf(msg.sender);
        if (simCount == 0) {
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](simCount);
            uint256 totalSims = sims.length;
            uint256 resultIndex = 0;
            uint256 simId = 0;
            while (simId < totalSims) {
                if (ownerOf(simId) == msg.sender) {
                    result[resultIndex] = simId;
                    resultIndex = resultIndex + 1;
                }

                simId = simId + 1;
            }
            return result;
        }
    }

    function transferSims(uint256 tokenId, address receiver) public {
        require(ownerOf(tokenId) == msg.sender, "Not your sim!");
        safeTransferFrom(msg.sender, receiver, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

contract NFTMarketplace is IERC721Receiver {
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    TheFunixCryptoSim nftContract; // NFT contract
    address owner;
    uint256 listingPrice = 0.025 ether;

    constructor(address _nftContract) {
        nftContract = TheFunixCryptoSim(_nftContract);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    // NFT Marketplace functions
    struct Listing {
        uint256 tokenId;
        address payable seller;
        uint256 price;
        address payable escrow;
        bool sold;
    }

    event ListingItemCreated(
        address seller,
        uint256 price,
        address escrow,
        bool sold
    );

    mapping(uint256 => Listing) listings;
    uint256 private listingItemCount = 0;
    mapping(uint256 => uint256) escrowAmounts;
    uint256 itemsSold = 0;

    function updateBaseContract(address _nftContract) public onlyOwner {
        nftContract = TheFunixCryptoSim(_nftContract);
    }

    function updateListingPrice(uint256 _newPrice) public onlyOwner {
        listingPrice = _newPrice;
    }

    function getItemSolds() public view returns (uint256) {
        return itemsSold;
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function listNFT(uint256 tokenId, uint256 price) public payable {
        require(tokenId != 0 && tokenId != 1, "Genesis are not for sale");
        require(price > 0, "Price must be atleast 1");
        require(
            msg.value == listingPrice + price,
            "Must pay enough for listing"
        );
        require(nftContract.ownerOf(tokenId) == msg.sender, "Not your token");
        Listing memory _newListing = Listing(
            tokenId,
            payable(msg.sender),
            price,
            payable(address(this)), // Contract as escrow
            false
        );
        listings[tokenId] = _newListing;
        // Transfer NFT to contract
        nftContract.safeTransferFrom(msg.sender, address(this), tokenId);

        escrowAmounts[tokenId] = _newListing.price;
        listingItemCount++;

        emit ListingItemCreated(msg.sender, price, address(this), false);
    }

    function cancelListNFT(uint256 tokenId) public {
        require(
            listings[tokenId].seller == msg.sender,
            "You are not the seller"
        );
        // Transfer NFT to seller
        nftContract.safeTransferFrom(address(this), msg.sender, tokenId);
        payable(msg.sender).transfer(listings[tokenId].price);
        listingItemCount--;
        delete listings[tokenId];
        delete escrowAmounts[tokenId];
    }

    function reListNFT(uint256 tokenId, uint256 price) public payable {
        require(
            listings[tokenId].escrow == msg.sender,
            "Only item owner can perforn this additional operation!"
        );
        require(
            msg.value == listingPrice + price,
            "Must pay the listing price"
        );
        listings[tokenId].price = price;
        listings[tokenId].seller = payable(msg.sender);
        listings[tokenId].sold = false;
        listings[tokenId].escrow = payable(address(this));
        itemsSold -= 1;
        // Transfer NFT to contract
        nftContract.safeTransferFrom(msg.sender, address(this), tokenId);
        escrowAmounts[tokenId] = price;
    }

    function buyNFT(uint256 tokenId) public payable {
        Listing storage listing = listings[tokenId];
        require(
            msg.value == listing.price,
            "You need to pay the price exactly!"
        );

        listings[tokenId].escrow = payable(msg.sender);
        listings[tokenId].sold = true;

        itemsSold++;

        // Transfer listing price to contract owner
        payable(owner).transfer(listingPrice);

        // Transfer NFT to buyer
        nftContract.safeTransferFrom(address(this), msg.sender, tokenId);
        nftContract.updateOwnershipHistory(tokenId, listing.price, msg.sender);

        // Release funds to seller
        uint256 escrowAmount = escrowAmounts[tokenId];
        payable(listing.seller).transfer(escrowAmount);
        payable(listing.seller).transfer(msg.value);

        // Delete escrow amount after transfer
        delete escrowAmounts[tokenId];
    }

    function fetchMarketItem() public view returns (Listing[] memory) {
        uint256 unSoldItemCount = listingItemCount - itemsSold;
        uint256 currentIndex = 0;
        Listing[] memory items = new Listing[](unSoldItemCount);
        TheFunixCryptoSim.Sim[] memory sims = nftContract.getAllSims();
        for (uint256 i = 0; i < sims.length; i++) {
            if (listings[i + 1].escrow == address(this)) {
                uint256 currentId = i + 1;
                Listing storage currentItem = listings[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchListedItem() public view returns (Listing[] memory) {
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
        TheFunixCryptoSim.Sim[] memory sims = nftContract.getAllSims();
        for (uint256 i = 0; i < sims.length; i++) {
            if (listings[i].seller == msg.sender) {
                itemCount++;
            }
        }
        Listing[] memory items = new Listing[](itemCount);
        for (uint256 i = 0; i < sims.length; i++) {
            if (listings[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                Listing storage currentItem = listings[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}

contract NFTAuction is IERC721Receiver {
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    TheFunixCryptoSim nftContract; // NFT contract
    address owner;
    uint256 auctionFee = 0.025 ether;

    constructor(address _nftContract) {
        nftContract = TheFunixCryptoSim(_nftContract);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    struct Auction {
        uint256 tokenId;
        address seller;
        uint256 minBid;
        address highestBidder;
        uint256 highestBid;
        uint256 endTimestamp;
    }

    struct BidHistory {
        address bidder;
        uint256 bid;
        uint256 timestamp;
    }

    mapping(uint256 => Auction) auctions;
    mapping(uint256 => BidHistory[]) bidHistories;
    uint256 numberOfAuctionItems;

    function updateBaseContract(address _nftContract) public onlyOwner {
        nftContract = TheFunixCryptoSim(_nftContract);
    }

    function createAuction(
        uint256 tokenId,
        uint256 minBid,
        uint256 duration
    ) external payable {
        require(msg.value == 0.025 ether, "Not enough fee!");
        // Transfer NFT to contract
        nftContract.safeTransferFrom(msg.sender, address(this), tokenId);

        // Create auction
        auctions[tokenId] = Auction(
            tokenId,
            msg.sender,
            minBid,
            address(0),
            0,
            block.timestamp + duration
        );
        numberOfAuctionItems += 1;
    }

    function fetchAuctionItemOfUser() public view returns (Auction[] memory) {
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
        TheFunixCryptoSim.Sim[] memory sims = nftContract.getAllSims();
        for (uint256 i = 0; i < sims.length; i++) {
            if (auctions[i].seller == msg.sender) {
                itemCount++;
            }
        }
        Auction[] memory items = new Auction[](itemCount);
        for (uint256 i = 0; i < sims.length; i++) {
            if (auctions[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                Auction storage currentItem = auctions[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchAllAuctionItems() public view returns (Auction[] memory) {
        uint256 currentIndex = 0;
        Auction[] memory items = new Auction[](numberOfAuctionItems);
        TheFunixCryptoSim.Sim[] memory sims = nftContract.getAllSims();
        for (uint256 i = 0; i < sims.length; i++) {
            if (auctions[i + 1].endTimestamp >= block.timestamp) {
                uint256 currentId = i + 1;
                Auction storage currentItem = auctions[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function cancelAuction(uint256 tokenId) public {
        require(
            auctions[tokenId].seller == msg.sender,
            "You must be the seller to cancel this auction"
        );
        require(
            block.timestamp < auctions[tokenId].endTimestamp,
            "Auction had ended!"
        );
        // Transfer NFT to to the seller
        nftContract.safeTransferFrom(address(this), msg.sender, tokenId);

        // delete auction
        delete auctions[tokenId];
        numberOfAuctionItems -= 1;
    }

    function bid(uint256 tokenId) external payable {
        Auction storage auction = auctions[tokenId];
        BidHistory[] storage bidHistory = bidHistories[tokenId];
        require(block.timestamp < auction.endTimestamp, "Auction had ended!");
        require(
            msg.value > auction.highestBid,
            "Must bid higher than current value!"
        );

        if (auction.highestBidder != address(0)) {
            // Refund previous bidder
            payable(auction.highestBidder).transfer(auction.highestBid);
        }

        // Update auction
        auction.highestBidder = msg.sender;
        auction.highestBid = msg.value;
        bidHistory.push(BidHistory(msg.sender, msg.value, block.timestamp));
    }

    function getBidHistoryOfAToken(uint256 tokenId)
        external
        view
        returns (BidHistory[] memory)
    {
        return bidHistories[tokenId];
    }

    function settleAuction(uint256 tokenId) external {
        Auction storage auction = auctions[tokenId];
        require(
            block.timestamp > auction.endTimestamp,
            "Auction time not ended yet!"
        );
        require(
            msg.sender == owner ||
                msg.sender == auction.highestBidder ||
                msg.sender == auction.seller,
            "You must be either seller/highest bidder/contract owner to settle this auction!"
        );

        // Transfer NFT to highest bidder
        if (auction.highestBid != 0) {
            nftContract.safeTransferFrom(
                address(this),
                auction.highestBidder,
                tokenId
            );
            nftContract.updateOwnershipHistory(
                tokenId,
                auction.highestBid,
                auction.highestBidder
            );
            // Pay seller
            payable(auction.seller).transfer(auction.highestBid);
        } else {
            nftContract.safeTransferFrom(
                address(this),
                auction.seller,
                tokenId
            );
        }

        // Delete auction
        delete auctions[tokenId];
        numberOfAuctionItems -= 1;
    }

    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}

