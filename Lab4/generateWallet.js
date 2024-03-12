const fs = require('fs');
const bitcoin = require('bitcoinjs-lib');

// Funcție pentru a citi portofelul dintr-un fișier JSON
function readWalletFromFile(filePath) {
    const walletData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return walletData;
}

// Funcție pentru a efectua o tranzacție între două portofele
function makeTransaction(senderWallet, recipientWallet, amount) {
    // Convertim cheia privată din formatul WIF într-o cheie privată Bitcoinjs
    const senderPrivateKey = bitcoin.ECPair.fromWIF(senderWallet.privateKey);

    // Construim tranzacția
    const txb = new bitcoin.TransactionBuilder();
    txb.addInput(senderWallet.utxo.txId, senderWallet.utxo.vout); // Folosim UTXO-ul expeditorului
    txb.addOutput(recipientWallet.address, amount); // Adăugăm suma către adresa destinatarului
    txb.sign(0, senderPrivateKey); // Semnăm tranzacția cu cheia privată a expeditorului

    // Serializăm și afișăm tranzacția
    const txHex = txb.build().toHex();
    console.log('Transaction Hex:', txHex);
}

// Funcție principală
function main() {
    // Citim portofelele din fișierele JSON
    const senderWallet = readWalletFromFile('sender_wallet.json');
    const recipientWallet = readWalletFromFile('recipient_wallet.json');

    // Specificăm suma tranzacției
    const amount = 50000; // Suma exprimată în satoshi (0.0005 BTC)

    // Efectuăm tranzacția
    makeTransaction(senderWallet, recipientWallet, amount);
}

// Apelul funcției principale
main();
