const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UFOMarket", function () {
  it("should mint and trade NFTs", async function (){
    // test to receive conrtact addresses
    const Market = await ethers.getContractFactory('UFOMarket')
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address

    const NFT = await ethers.getContractFactory('NFT')
    const nft = await NFT.deploy(marketAddress)
    await nft.deployed()
    const nftContractAddress = nft.address

    // test to receive listing price and actionPrice
    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()

    const actionPrice = ethers.utils.parseUnits('100', 'ethers');

    // test for minting test 
    await nft.mintToken("https-t1")
    await nft.mintToken("https-t2")

    await market.makeMarketItem(nftContractAddress, 1 , actionPrice)
    await market.makeMarketItem(nftContractAddress, 2 , actionPrice)

    //test for diffrent addresses from diffrent users - test accounts
    //return an array oh however many addresses
    const [_, buyerAddress] = await ethers.getSigner()

    // create a market sale with address id and price 
    await market.connect(buyerAddress).createMarketSale(nftContractAddress,1)

    const items = await market.fetchMarkeTokens()

    // test out all the items
    console.log('items', items)
  })
});
