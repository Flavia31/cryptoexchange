const crypto = require("crypto");

/**The Block class stores the the transactions */

class Block {

    /**
     * 
     * @param {*} previousHash is the hash of previous block on the chain
     * @param {*} transaction is the object of class Transaction
     * @param {*} timestamp is he time the block was created
     */
    constructor (previousHash, transaction, timestamp = Date.now()) {
        this.previousHash = previousHash;
        this.transaction = transaction;
        this.timestamp = timestamp;
    }

    /**
     * Generate a hash of the block
     * @returns the generated hash
     */
    getHash() {
        const json = JSON.stringify(this);
        const hash = crypto.createHash("SHA256");
        hash.update(json).end();
        const hex = hash.digest("hex");
        return hex
    }

    /**
     * Convert the block object into JSON
     * @returns the block object into JSON
     */
    toString() {
        return JSON.stringify(this);
      }
}

module.exports = Block;