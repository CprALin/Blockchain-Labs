const CryptoBlockchain = require('./CryptoBlockchain');
const CryptoBlock = require('./CryptoBlock');
const fs = require('fs');

let exempluBlock = new CryptoBlockchain();

console.log("Mining in progress....");

exempluBlock.addNewBlock(

  new CryptoBlock(1, "20/02/2024", {

    sender: "Satoshi",

    recipient: "Nume1 Prenume1",

    quantity: 50

  })

);

exempluBlock.addNewBlock(

  new CryptoBlock(2, "22/02/2024", {

    sender: "Nume2 Prenume2",

    recipient: "Nume3 Prenume3",

    quantity: 100

  })

);

/* exempluBlock.displayBlock(1);
exempluBlock.displayBlock(2); 
console.log(JSON.stringify(exempluBlock, null, 5)); */


exempluBlock.displayBlockchain();
