const SHA256 = require("crypto-js/sha256");

class CryptoBlock {

  constructor(index, timestamp, data, hashAnterior = " ") {

    this.index = index;

    this.timestamp = timestamp;

    this.data = data;

    this.hashAnterior = hashAnterior;

    this.hash = this.computeHash();

    this.nonce = 0;

  }

  computeHash() {

    return SHA256(

      this.index +

        this.hashAnterior +

        this.timestamp +

        JSON.stringify(this.data) +

        this.nonce

    ).toString();

  }

  proofOfWork(difficulty) {

    while (

      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")

    ) {

      this.nonce++;

      this.hash = this.computeHash();

    }

  }

  displayBlock() {
    console.log(`Block ${this.index}:
        Timestamp: ${this.timestamp}
        Data: ${JSON.stringify(this.data)}
        Previous Hash: ${this.previousHash}
        Hash: ${this.hash}`);
  }


}

module.exports = CryptoBlock;