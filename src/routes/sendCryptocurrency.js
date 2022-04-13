var express = require("express");
var Chain = require("../crypto/chain");
var Wallet = require("../crypto/wallet");

const server = express();

server.use(express.json());

server.post('/send',
  async (req, res) =>{
    const itachi = new Wallet();
    const madara = new Wallet();
    const orochimaru = new Wallet();

    console.log(itachi);
    console.log(madara);
    console.log(orochimaru);

    res.send(itachi)
    
    // itachi.send(50, madara.publicKey);
    // madara.send(23, orochimaru.publicKey);
    // orochimaru.send(5, madara.publicKey);

    
    console.log(Chain.instance);
});

module.exports = server;