# Hardhat Examples for Unique

This project demonstrates a basic Hardhat use case.
It comes with a sample contract and a script that deploys that contract.

Its main goal to show how to interact with Unique networks' Ethereum RPCs.  
Spoiler: the same way as usual with Ethereum-compatible network.

### install
1. copy `.env.example` => `.env`
2. fill its PRIVATE_KEY env var value with private key you know and which balance has some amount of coins
3. run `yarn`

### run
```shell
yarn hardhat run scripts/deployEventsExample.ts --network opal
```

### Opal testnet

How to add Opal to your metamask and other Opal testnet specs: https://docs.unique.network/networks/#opal-testnet

Faucet bot for the Opal testnet: [Telegram bot @unique2faucet_opal_bot](https://t.me/unique2faucet_opal_bot)

You can obtain OPLs via faucet bot or sending coins to your ethereum address' substrate mirror.
Mirror calculator can be found [here](https://docs.unique.network/about/addresses/).
