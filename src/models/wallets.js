const mongoose = require("mongoose");

//walletID
//publicKey
//private key
//userID

const walletsSchema = mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  wallet: {
    type: {
      publicKey: String,
      privateKey: String
    },
    require: true,
  },
});

walletsSchema.index({ userId: 1, username: 1 });
walletsSchema.index({ userId: 1, email: 1 });

const Wallets = mongoose.model("wallets", walletsSchema);

module.exports = Wallets;