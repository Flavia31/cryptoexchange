/** The Transaction class is used for crypto exchange */
class Transaction {

    /**
     * 
     * @param {*} amount the amount to send
     * @param {*} senderPublicKey the sender's public key
     * @param {*} receiverPublicKey the receiver's public key
     */
    constructor(amount, senderPublicKey, receiverPublicKey) {
        this.amount = amount;
        this.senderPublicKey = senderPublicKey;
        this.receiverPublicKey =receiverPublicKey;
    }

    /**
     * Convert the transaction object into JSON
     * @returns the transaction object into JSON
     */
    toString() {
        return JSON.stringify(this);
    }
}

module.exports = Transaction;