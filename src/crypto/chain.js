const crypto = require("crypto");
const Block  = require("./block.js");
const Transaction  = require("./transaction.js");

/** The Chain class holds every block that takes place on the blockchain
 * the blockchain contains all the blocks linked to each other
*/

class Chain {
    
    /**
     * The chain is initialized once and not multiple times
     */
    static instance = new Chain();

    /**
     * Initialize the chain with no records
     */
    constructor() {
        this.chain = [new Block("", new Transaction(1000, "temp", "temp"))];
    }

    /**
     * Get the last hash of the chain
     * @returns the last hash of the chain
     */
     getPreviousBlockHash() {
        //send the entire block itself
        return this.chain[this.chain.length - 1].getHash();
    }

    /**
     * Create and insert a block into the chain array
     * @param {*} transaction - the transaction object
     * @param {*} senderPublicKey - the sender's public key
     * @param {*} sig - the signature
     */
    insertBlock(transaction, senderPublicKey, sig) {
        //create verifier
        const verify = crypto.createVerify("SHA256");

        //add the transaction JSON
        verify.update(transaction.toString());

        //Verify the signature with the sender's public key
        const isValid = verify.verify(senderPublicKey, sig);

        if(isValid) {
            const block = new Block(this.getPreviousBlockHash(), transaction);
            console.log("Block added", block.toString());
            this.chain.push(block);
        }
    }
}

module.exports = Chain;