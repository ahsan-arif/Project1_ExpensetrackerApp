const path = require("path");
var HDWalletProvider = require("truffle-hdwallet-provider");
const infuraKey = "INFURA_KEY_PLACED;"
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
/* module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host : "127.0.0.1",
      network_id : "*",
      port: 7545
    }
  }
}; */
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/447e523ed3bc4b0eadc8e017f07c7721")
      },
      network_id: 3,
      networkCheckTimeout: 10000000,
      gas: 4000000      //make sure this gas allocation isn't over 4M, which is the max
    }
  },
  contracts_directory: './contracts/',
  contracts_build_directory: './client/src/contracts/', //directory for abis or .json files
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200,
       version: "^0.5.0"
      },
      evmVersion: "petersburg"
    }
  }
}