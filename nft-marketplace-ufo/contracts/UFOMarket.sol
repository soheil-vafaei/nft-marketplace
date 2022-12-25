// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import '../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '../node_modules/@openzeppelin/contracts/utils/Counters.sol';

// security against tranactions for multiple requests
import "../node_modules/hardhat/console.sol";

contract UFOMarket is ReentrancyGuard
{
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

    constructor (){
        owner = payable(msg.sender);
    }

    struct marketToken 
    {
        uint256 itemId;
        uint256 tokenId;
        address nftContract;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    // token id to return wich market token - fetch wich one it is 
    mapping (uint256 => marketToken) private idToTokenItem;

    // listen event from frontend app
    event MarketTokenMinted(uint indexed itemId, address indexed nftContract,uint256 tokenId,address seller,address owner,uint256 price,bool sold);
    
    function getListingPrice() public view returns(uint)
    {
        return listingPrice;
    }

}