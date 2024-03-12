const fs = require('fs');
const bitcoin = require('bitcoinjs-lib');
const crypto = require('crypto');

// Funcție pentru a genera un portofel Bitcoin și a salva detaliile într-un fișier JSON
function generateAndSaveWallet() {
    // Generează o cheie privată de 32 de octeți
    const privateKeyBuffer = crypto.randomBytes(32);
    const keyPair = bitcoin.ECPair.fromPrivateKey(privateKeyBuffer);

    // Obțineți adresa Bitcoin asociată cu cheia publică
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });

    // Creează un obiect wallet cu adresa și cheia privată
    const wallet = { address, privateKey: privateKeyBuffer.toString('hex') };

    // Salvează obiectul wallet într-un fișier JSON
    fs.writeFileSync('wallet.json', JSON.stringify(wallet, null, 2));

    console.log('Wallet generated and saved successfully!');
    console.log('Address:', wallet.address);
}

// Funcție pentru a efectua o tranzacție între două portofele
function makeTransaction(senderWallet, recipientWallet) {
    // Citeste cheia privată a expeditorului din fișierul JSON
    const senderPrivateKey = Buffer.from(senderWallet.privateKey, 'hex');
    const senderKeyPair = bitcoin.ECPair.fromPrivateKey(senderPrivateKey);

    // Creează un obiect transaction
    const txb = new bitcoin.TransactionBuilder();
    txb.addInput(senderWallet.utxo.txId, senderWallet.utxo.vout); // UTXO-ul expeditorului
    txb.addOutput(recipientWallet.address, 50000); // Trimit 0.0005 BTC la adresa destinatarului
    txb.sign(0, senderKeyPair); // Semnează tranzacția cu cheia privată a expeditorului

    // Serializează tranzacția și o afișează
    const txHex = txb.build().toHex();
    console.log('Transaction Hex:', txHex);
}

// Apelăm funcțiile pentru a crea portofelul, a salva în fișier JSON, a face tranzacția și a implementa securitatea
generateAndSaveWallet();

// Simulăm portofelele destinatar și expeditor
const senderWallet = {
    address: 'expeditor_address',
    privateKey: 'expeditor_private_key',
    utxo: { txId: 'expeditor_utxo_txid', vout: 0 }
};

const recipientWallet = {
    address: 'recipient_address'
};

makeTransaction(senderWallet, recipientWallet);
