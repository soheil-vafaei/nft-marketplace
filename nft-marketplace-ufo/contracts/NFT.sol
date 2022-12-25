// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// ERC721 NFT Contract

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import '../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '../node_modules/@openzeppelin/contracts/utils/Counters.sol';

contract NFT is ERC721URIStorage
{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenids;
    // counters allow us to keep track of tokenids
    // address of marketplace for nfts to interact

    address contractAddress;    
    
    constructor (address marketplaceAddress) ERC721("ufo-collection","UFO")
    {
        contractAddress = marketplaceAddress;
    }

    function mintToken (string memory _tokenURI) public returns(uint)
    {
        _tokenids.increment();
        uint256 newItemId = _tokenids.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        
    }


}
