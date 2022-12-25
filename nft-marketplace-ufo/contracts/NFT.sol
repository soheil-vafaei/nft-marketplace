// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// ERC721 NFT Contract

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage
{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenids;
    // counters allow us to keep track of tokenids
    // address of marketplace for nfts to interact

    address contractAddress;    
    
}
