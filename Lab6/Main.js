const CryptoBlockchain = require('./CryptoBlockchain');
const CryptoBlock = require('./CryptoBlock');

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

// Afisare intreg lanț de blocuri
exempluBlock.displayBlockchain();

// Modificare date într-un bloc
exempluBlock.modifyBlockData(1, {
    sender: "Nume4 Prenume4",
    recipient: "Nume5 Prenume5",
    quantity: 200
});

console.log("\nBlockchain after modifying data:");
exempluBlock.displayBlockchain();

// Verificare integritate blockchain
console.log("\nIs blockchain valid?", exempluBlock.checkChainValidity());
