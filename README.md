# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product based on ER721 token standards and Zokrates as mean to build a proof of concept verification process using ZkSnarks.

## Rinkeby live contract details

- [Rinkeby -contract address](https://rinkeby.etherscan.io/address/0x8D0A45C467DC1c7255b9Fcb759bE80c495617088)
- [Opensea collection](https://testnets.opensea.io/collection/real-token)

## Environnemet variables

In order to run the application you will need to create environnement files to refrences environnement variables and add the already deployed contract address to the supplychain contract abi.
At root directory fire the following command:

```bash
## creating general environement file
echo -e "MNEMONIC=<YOUR MNEMONIC> PROVIDER_URL=<YOUR PROVIDER URL>" >> .env
```

## Test contracts

At root directory fire the following command:

```bash
npm run test
```

## Deploy contract

At root directory fire the following command:

```bash
npm run deploy-testnet
```

## Generate zokrates valid proofs

```bash
zokrates compute-witness -a <squareRoot> <root>
zokrates generate-proof  -j ./proofs/[file_name].json
```

## Seed the contract (generate ERC721 tokens)

At root directory fire the following command:

```bash
npm run seed-testnet
```

## Project Resources

- [Remix - Solidity IDE](https://remix.ethereum.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Truffle Framework](https://truffleframework.com/)
- [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
- [Open Zeppelin ](https://openzeppelin.org/)
- [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
- [Docker](https://docs.docker.com/install/)
- [ZoKrates](https://github.com/Zokrates/ZoKrates)
