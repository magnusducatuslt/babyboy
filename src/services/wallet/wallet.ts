//@ts-ignore
import { walletFromMnemonic, generateWallet } from "minterjs-wallet";
//@ts-ignore
import { Minter, TX_TYPE } from "minter-js-sdk";
import { config } from "@core/config";
const { senderSeed, chainId, baseUrl, coin, gasCoin } = config.blockchain;
// const TEST_ADDRESS = "Mx04bac5a69b54adbcf2ca24fca2d3141596b3ddab";
const SENDER_SEED = senderSeed;
const COIN = coin;
const GAS_COIN = gasCoin;
const BASE_URL = baseUrl;
//test 2, main 1
const CHAIN_ID = chainId;

const walletSender = walletFromMnemonic(SENDER_SEED);

const minter = new Minter({
  apiType: "node",
  baseURL: BASE_URL,
});

const txMultySend = {
  nonce: 0,
  chainId: CHAIN_ID,
  type: TX_TYPE.MULTISEND,
  data: {},
  gasCoin: GAS_COIN,
  payload: "sending payments for voting gas/coin",
};
export async function sendVotingPayments(addressReciever: string) {
  try {
    const nonceForSender = await minter.getNonce(
      walletSender.getAddressString()
    );

    await minter.postTx(
      {
        ...txMultySend,
        data: {
          list: [
            {
              to: addressReciever,
              value: 1,
              coin: COIN,
            },
            {
              to: addressReciever,
              value: 1,
              coin: GAS_COIN,
            },
          ],
        },
        nonce: nonceForSender,
      },
      {
        privateKey: walletSender.getPrivateKeyString(),
      }
    );

    return true;
  } catch (e) {
    console.log(e.response.data);
    throw new Error(e.response.data);
  }
}
