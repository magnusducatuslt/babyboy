import { walletFromMnemonic, generateWallet } from "minterjs-wallet";
import { Minter, TX_TYPE } from "minter-js-sdk";

const IGOR_ADDRESS = "Mx04bac5a69b54adbcf2ca24fca2d3141596b3ddab";
const SENDER_SEED =
  "crop alcohol crack ticket viable point tooth broccoli powder better thought inject";
const RECIEVER_SEED =
  "major session crowd spike wheel muscle noise choice hard fitness attend brave";
const walletSender = walletFromMnemonic(SENDER_SEED);

const walletReciever = walletFromMnemonic(RECIEVER_SEED);

const wallet = walletFromMnemonic(
  "risk shy pyramid artwork primary health say convince ladder first sugar current"
);
console.log(wallet.getAddressString());
const receiverAddress = walletReciever.getAddressString();
//test 2, main 1
const CHAIN_ID = 2;

const minter = new Minter({
  apiType: "node",
  baseURL: "https://minter-node-1.testnet.minter.network/",
});

const txParamsPayment = {
  nonce: 0,
  chainId: CHAIN_ID,
  type: TX_TYPE.SEND,
  data: {
    to: receiverAddress,
    value: 1,
    coin: "MNT",
  },
  gasCoin: "MNT",
  payload: "custom message",
};
const txParamsCoin = {
  nonce: 0,
  chainId: CHAIN_ID,
  type: TX_TYPE.SEND,
  data: {
    to: receiverAddress,
    value: 1,
    coin: "IGCOINBABY",
  },
  gasCoin: "MNT",
  payload: "custom message",
};
const txParamsResend = {
  nonce: 0,
  chainId: CHAIN_ID,
  type: TX_TYPE.SEND,
  data: {
    to: IGOR_ADDRESS,
    value: 1,
    coin: "IGCOINBABY",
  },
  gasCoin: "MNT",
  payload: "custom message",
};
const txMultySend = {
  nonce: 10,
  chainId: CHAIN_ID,
  type: TX_TYPE.MULTISEND,
  data: {
    to: IGOR_ADDRESS,
    value: 1,
    coin: "IGCOINBABY",
  },
  gasCoin: "MNT",
  payload: "custom message",
};
async function startChain() {
  try {
    let nonceForSender = null;
    let nonceForReciever = null;

    nonceForSender = await minter.getNonce(walletSender.getAddressString());
    console.log("nonce sender for send MNT", nonceForSender);
    await minter.postTx(
      {
        ...txMultySend,
        data: { list: [txParamsPayment.data, txParamsCoin.data] },
        nonce: nonceForSender,
      },
      {
        privateKey: walletSender.getPrivateKeyString(),
      }
    );
    // console.log(`sended to reciever MNT`);

    // nonceForSender = await minter.getNonce(walletSender.getAddressString());
    // console.log("nonce sender for send COIN", nonceForSender + 1);
    // await minter.postTx(
    //   { ...txParamsCoin, nonce: 25 },
    //   {
    //     privateKey: walletSender.getPrivateKeyString(),
    //   }
    // );
    // console.log("sended to reciever COIN");
    nonceForReciever = await minter.getNonce(walletReciever.getAddressString());
    console.log("nonce reciever for send COIN", nonceForReciever);
    await minter.postTx(
      { ...txParamsResend, nonce: nonceForReciever },
      {
        privateKey: walletReciever.getPrivateKeyString(),
      }
    );

    return true;
  } catch (e) {
    console.log(e.response.data.error);
  }
}
startChain()
  .then((r) => console.log("success", r))
  .catch((e) => console.log("catched", e));
