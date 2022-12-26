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
    function makeMarketItem(
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
        // nft transactions
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit MarketTokenMinted(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    // function to condunt tranactions and market sales
    function createMarketSale(address nftContract, uint itemId)
        public
        payable
        nonReentrant
    {
        uint price = idToMarketToken[itemId].price;
        uint tokenId = idToMarketToken[itemId].tokenId;
        require(
            msg.value == price,
            "place submit the asking price in order to continue"
        );

        // transfer the amount to the seller
        idToMarketToken[itemId].seller.transfer(msg.value);

        // transfer the token from contract address to the buyer
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

        // set new owner
        idToMarketToken[itemId].owner = payable(msg.sender);

        // sale
        idToMarketToken[itemId].sold = true;

        _tokenSold.increment();

        payable(owner).transfer(listingPrice);
    }

    // function to fetchMarketItems - minting, buying and selling
    // return number of unsold items
    function fetchMarkeTokens() public view returns (marketToken[] memory) {
        uint itemCount = _tokenids.current();
        uint unsoldItemCount = _tokenids.current() - _tokenSold.current();
        uint currentIndex = 0;

        // looping over the number of items created (if number has not been sold populate the array)
        marketToken[] memory items = new marketToken[](unsoldItemCount);
        for (uint i = 0; i < itemCount; i++) {
            if (idToMarketToken[i + 1].owner == address(0)) {
                uint currentId = i + 1;
                marketToken storage currentItem = idToMarketToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // return nft that the user has purchased
    function fetchMyNft() public view returns (marketToken[] memory) {
        uint totalItemCount = _tokenids.current();
        // a socend counter for each indicidual user
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketToken[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        // second loop to loop truough the amount you hace purchest with itemcount
        // check to see if the owner address is equal to msg.sender
        marketToken[] memory items = new marketToken[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketToken[i + 1].owner == msg.sender) {
                uint currentId = idToMarketToken[i + 1].itemId;
                //curren array
                marketToken storage currenItem = idToMarketToken[currentId];
                items[currentId] = currenItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // function for returning an array fofr minted nfts
    function fetchItemsCreaeted() public view returns (marketToken[] memory) {
        uint totalItemCount = _tokenids.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketToken[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        // second loop to loop truough the amount you hace purchest with itemcount
        // check to see if the owner address is equal to msg.sender
        marketToken[] memory items = new marketToken[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketToken[i + 1].seller == msg.sender) {
                uint currentId = idToMarketToken[i + 1].itemId;
                marketToken storage currenItem = idToMarketToken[currentId];
                items[currentId] = currenItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
