document.getElementById("create wallet").addEventListener("click", (e) => {
  const wallet = minterWallet.generateWallet();
  document.getElementById("seed-out").innerHTML = wallet._mnemonic;
  document.getElementById("address").innerHTML = wallet.getAddressString();
});
document.getElementById("login-button").addEventListener("click", (e) => {
  const SEED = document.getElementById("login-input").value;
  console.log(SEED);
  const wallet = minterWallet.walletFromMnemonic(SEED);
  const address = wallet.getAddressString();
  if (address) {
    document.getElementById("candidates").style.display = "block";
    fetch("http://localhost:7777/candidates")
      .then((res) => res.json())
      .then((res) => console.log(res));
  }
});
document.getElementById("first").addEventListener("click", (e) => {
  const minter = new minterTx.Minter({
    apiType: "node",
    baseURL: "https://minter-node-1.testnet.minter.network/",
  });
  console.log(minter);
  // const txParamsPayment = {
  //   nonce: 0,
  //   chainId: CHAIN_ID,
  //   type: TX_TYPE.SEND,
  //   data: {
  //     to: receiverAddress,
  //     value: 1,
  //     coin: "MNT",
  //   },
  //   gasCoin: "MNT",
  //   payload: "custom message",
  // };
});
