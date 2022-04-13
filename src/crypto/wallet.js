const Chain  = require("./Chain.js");
const Transaction  = require("./transaction.js");

const crypto = require("crypto");

 /**
   * The Wallet is used to send cryptocurrencies between the users
   */
class Wallet {

    /**
     * The crypto wallet has a pair of keys: a public key and a private key
     */
    constructor() {
        //Create the pair of keys
        const keys = crypto.generateKeyPairSync("rsa",{
            modulusLength: 2048,
            publicKeyEncoding: { type: "spki", format: "pem" },
            privateKeyEncoding: { type: "pkcs8", format: "pem" },
        });

        //The private key is used to create new transactions 
        this.privateKey = keys.privateKey;

        //the public key is used to verify transactions and receive cryptocurrencies
        this.publicKey = keys.publicKey;
    }

    /**
     * Send cryptocurrencies to other wallets
     * @param {*} amount -  the amount to send
     * @param {*} receiverPublicKey - the receiver's public key
     */
    send(amount, receiverPublicKey) {
        const transaction = new Transaction(amount, this.publicKey, receiverPublicKey);
        const shaSign = crypto.createSign("SHA256");

        //Add the transaction json
        shaSign.update(transaction.toString()).end();

        //sign the SHA with the private key
        const signature = shaSign.sign(this.privateKey);
        Chain.instance.insertBlock(transaction, this.publicKey, signature);
    }
}

module.exports = Wallet;