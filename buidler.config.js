require('dotenv').config()
usePlugin("@nomiclabs/buidler-waffle");

require("./tasks/deploy");

module.exports = {
  networks: {
    development: {
      url: "http://127.0.0.1:8545"
    },
    kovan: {
      accounts: {
        mnemonic: process.env.DEV_MNEMONIC,
        initialIndex: 1,
        count: 1
      },
      url: 'https://kovan.infura.io/v3/' + process.env.INFURA_PROJECT_ID,
      network_id: 42
  }
},
   solc: {
    version: "0.6.8",
  }
}
