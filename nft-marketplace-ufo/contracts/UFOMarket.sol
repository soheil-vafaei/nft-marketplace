// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

// security against tranactions for multiple requests
import "../node_modules/hardhat/console.sol";

contract UFOMarket is ReentrancyGuard {
    using Counters for Counters.Counter;

    // numebr of items minting, number of tranactions, token that have not been sold
    // keep track of tokens total number - tokenId
    // array need to know the length - help to keep track for arrays

    Counters.Counter private _tokenids;
    Counters.Counter private _tokenSold;

    // datereminder owner of the contract
    // charge a listing fee so the owner makes a commission
    address payable owner;
    // we are deploying this to matic

    // for fees
    uint256 listingPrice = 0.045 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    struct marketToken {
        uint256 itemId;
        uint256 tokenId;
        address nftContract;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    // token id to return wich market token - fetch wich one it is
    mapping(uint256 => marketToken) private idToMarketToken;

    // listen event from frontend app
    event MarketTokenMinted(
        uint indexed itemId,
        address indexed nftContract,
        uint256 tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    // get the listing price
    function getListingPrice() public view returns (uint) {
        return listingPrice;
    }

    // tow func to intract with contract
    // 1. create a market item ot put it up for sale
    // 2. create a matket sale for buying and selleing between parties
    function mintMarketItem(
        address nftContract,
        uint tokenId,
        uint price
    ) public payable nonReentrant {
        // nonReentrant is a modifier to prevent reentry attack

        require(price > 0, "price must be at least one wei");
        require(
            msg.value == listingPrice,
            "price must equals ot listing price"
        );

        _tokenids.increment();
        uint itemId = _tokenids.current();

        // putting it up for sale - bool - no owner
        idToMarketToken[itemId] = marketToken(
            itemId,
            tokenId,
            nftContract,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );
    }
}
