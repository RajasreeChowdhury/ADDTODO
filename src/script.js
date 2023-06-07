import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: "hjcquRjV1MokRNohmpMHYlQrF8lW1Zad",
  network: Network.MATIC_MAINNET
};

const alchemy = new Alchemy(settings);

// get the latest block
const latestBlock = alchemy.core.getBlock("latest").then(console.log);
