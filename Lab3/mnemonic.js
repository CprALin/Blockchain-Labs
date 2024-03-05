var bip39 = require('bip39');
var crypto = require('crypto');
const { createSign, createVerify } = require('crypto');

/* const mnemonic = bip39.generateMnemonic()

console.log(`Mnemonica generata : ${mnemonic}`)

if(bip39.validateMnemonic(mnemonic))
{
    console.log(`Memonica este valida.`)
}else{
    console.log(`Memonica nu este valida.`)
} */


// Funcție pentru generarea unei mnemonice aleatorii
function generateRandomMnemonic() {
    const entrofy = crypto.randomBytes(16);
    const mnemonic = bip39.entropyToMnemonic(entrofy);
    return mnemonic;
}

// Funcție pentru generarea unei perechi de chei (publică și privată) din mnemonica dată
function generateKeyPairFromMnemonic(mnemonic) {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        },
        seed
    });
    return keyPair;
}

// Funcție pentru semnarea unui mesaj folosind cheia privată
function signMessage(privateKey, message) {
    const sign = createSign('RSA-SHA256');
    sign.update(message);
    sign.end();
    const signature = sign.sign(privateKey);
    return signature;
}

// Funcție pentru verificarea semnăturii unui mesaj folosind cheia publică
function verifySignature(publicKey, message, signature) {
    const verify = createVerify('RSA-SHA256');
    verify.update(message);
    verify.end();
    const isValid = verify.verify(publicKey, signature);
    return isValid;
}

// Generare mnemonica
const mnemonic = generateRandomMnemonic();
console.log("Mnemonic:", mnemonic);

// Generare pereche de chei
const keyPair = generateKeyPairFromMnemonic(mnemonic);

const publicKey = keyPair.publicKey;
const privateKey = keyPair.privateKey;
console.log("Public Key:", publicKey);
console.log("Private Key:", privateKey);

// Mesaj de semnat
const message = "Hello, world!";

// Semnare mesaj
const signature = signMessage(privateKey, message);
console.log("Signature:", signature.toString('base64'));

// Verificare semnătură
const isValidSignature = verifySignature(publicKey, message, signature);
console.log("Is signature valid?", isValidSignature);

