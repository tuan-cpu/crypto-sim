// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

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

contract TheFunixCryptoSim is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using UintAndByteConvert for *;
    using Strings for uint256;
    string private  baseURI;
    string private  baseExtension = ".json";
    uint256 private  cost = 0.05 ether;
    uint256 public maxSupply = 50;
    bool private  paused = false;
    constructor(string memory _initBaseURI) ERC721("TheFunixCryptoSims", "FCS") Ownable(msg.sender) {
        setBaseURI(_initBaseURI);
        createGenesis();
    }
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

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
    Sim[] private  sims;

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

    function createSim(
        uint256 matron,
        uint256 sire,
        address owner
    ) internal returns (uint256) {
        uint256 supply = totalSupply();
        require(supply < maxSupply);
        require(!paused);
        require(owner != address(0));
        uint32 newGenes = generateSimGenes(matron, sire);
        string memory _newURI = string.concat("https://gateway.pinata.cloud/ipfs/",baseURI,"/",Strings.toString(supply+1),".json");

        Sim memory newSim = Sim({
            genes: newGenes,
            matronId: matron,
            sireId: sire
        });
        sims.push(newSim);
        _safeMint(owner,supply);
        emit Birth(
            owner,
            supply,
            newSim.matronId,
            newSim.sireId,
            newSim.genes
        );
        _setTokenURI(supply,_newURI);
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
        _setTokenURI(0,string.concat("https://gateway.pinata.cloud/ipfs/",baseURI,"/1.json"));

        sims.push(
            Sim({
                genes: encodeAttributes(secondAtrributes),
                matronId: 0,
                sireId: 0
            })
        );

        _safeMint(msg.sender, 1);
        _setTokenURI(1,string.concat("https://gateway.pinata.cloud/ipfs/",baseURI,"/2.json"));
    }

    function buySim() external payable returns (uint256) {
        // require(msg.value == 0.02 ether);
        return createSim(0, (sims.length - 1) % sims.length, msg.sender);
    }

    function breedSim(uint256 matronId, uint256 sireId)
        external
        payable
        returns (uint256)
    {
        // require(msg.value == 0.05 ether);
        return createSim(matronId, sireId, msg.sender);
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
    
    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
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