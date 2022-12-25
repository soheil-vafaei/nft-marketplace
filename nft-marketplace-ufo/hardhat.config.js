require("@nomiclabs/hardhat-waffle");

 module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enable: true,
        runs: 200
      }
    }
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337 // config standard
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: ["{PRIVATE_KEY}"]
    }
  }
};


