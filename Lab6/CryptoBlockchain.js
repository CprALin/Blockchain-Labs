const CryptoBlock = require('./CryptoBlock');

class CryptoBlockchain {

    constructor() {
  
      this.blockchain = [this.startGenesisBlock()];
  
      this.difficulty = 3;
  
    }
  
    startGenesisBlock() {
  
      return new CryptoBlock(0, "01/01/2024", [], "0");
  
    }

    getLatestBlock() {
      return this.blockchain[this.blockchain.length - 1];
    }
  
    obtainLatestBlock() {
  
      return this.blockchain[this.blockchain.length - 1];
  
    }
  
    addNewBlock(newBlock) {
  
      newBlock.hashAnterior = this.obtainLatestBlock().hash;
  
      //newBlock.hash = newBlock.computeHash();
  
      newBlock.proofOfWork(this.difficulty);
  
      this.blockchain.push(newBlock);
  
    }

    modifyBlockData(blockIndex, newTransactions) {
      if (blockIndex >= 0 && blockIndex < this.blockchain.length) {
          this.blockchain[blockIndex].modifyTransactions(newTransactions);
      } else {
          console.log("Invalid block index");
      }
    }
  
    checkChainValidity() {
  
      for (let i = 1; i < this.blockchain.length; i++) {
  
        const currentBlock = this.blockchain[i];
  
        const precedingBlock = this.blockchain[i - 1];
  
        if (currentBlock.hash !== currentBlock.computeHash()) {
  
          return false;
  
        }
  
        if (currentBlock.hashAnterior !== precedingBlock.hash) return false;
  
      }
  
      return true;
  
    }

    // Funcție pentru afișarea unui singur bloc
    displayBlock(index) {
        if (index >= 0 && index < this.blockchain.length) {
            console.log("Block " + index + ":");
            console.log(this.blockchain[index]);
        } else {
            console.log("Blockul cu indexul specificat nu există.");
        }
    }

    // Funcție pentru afișarea întregului lanț de blocuri
    displayBlockchain() {
        console.log("Blockchain:");
        this.blockchain.forEach((block, index) => {
            console.log("Block " + index + ":");
            console.log(block);
        });
    }
  
  
  }

  module.exports = CryptoBlockchain;