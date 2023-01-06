
const { ethers } = require("hardhat");
const fs = require('fs');

async function main() {

  const nftMarket = await ethers.getContractFactory("UFOMarket");
  const NFTMARKET = await nftMarket.deploy();

  await NFTMARKET.deployed();
  console.log("NFT-MARKET: ", NFTMARKET.address);

  const nft = await ethers.getContractFactory("NFT");
  const NFT = await nft.deploy(NFTMARKET.address);

  await NFT.deployed();
  console.log("NFT: ", NFT.address);

  let config = `
    export const nftmarketaddress = ${NFTMARKET.address};
    export const nftaddress = ${NFT.address};`
  
  let data = JSON.stringify(config)
  fs.writeFileSync('config.js', JSON.parse(data))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });