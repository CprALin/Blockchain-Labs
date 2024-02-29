const { MerkleTree } = require('merkletreejs');
const SHA256 = require('crypto-js/sha256');

// Creaza Marke tree
function generateAndPrintMerkleTree(arr) {
    const leaves = arr.map(x => SHA256(x).toString()); 
    const tree = new MerkleTree(leaves, SHA256);
    const rootHash = tree.getRoot().toString('hex');
    const depth = tree.getDepth();
    const levels = depth + 1;
    const nodes = arr.length;

    console.log(`Input : \t ${arr}`)
    console.log(`Root hash:\t ${rootHash}`);
    console.log(`Tree depth\t ${depth}`);
    console.log(`Tree levels:\t ${levels}`);
    console.log(`Tree nodes:\t ${nodes}`);

    for (let i = 0; i <= depth; i++) {
        console.log(`\nLevel ${i}`);
        console.log(tree.getLayers(i));
    }

    return {
        rootHash: rootHash,
        depth: depth,
        levels: levels,
        nodes: nodes
    };

}

// Functie pentru verificarea proof-lui (Merkle) pentru a modifica tranzactia
function verifyProofForModifiedTransaction(arr, indexToModify, newValue) {
    const modifiedLeaves = arr.map(x => SHA256(x).toString());
    const modifiedTree = new MerkleTree(modifiedLeaves, SHA256);
    const rootHash = modifiedTree.getRoot().toString('hex'); // Obține rădăcina arborelui Merkle
    const proof = modifiedTree.getProof(modifiedLeaves[indexToModify]);

    // Printează mesajul indicând tranzacția modificată
    console.log(`Transaction at index ${indexToModify} was modified.`);

    // Printează rădăcina arborelui Merkle modificată
    console.log(`Modified root hash:\t ${rootHash}`);

    // Printează proof-ul de Merkle pentru tranzacția modificată
    console.log(`\nProof of Merkle for the modified transaction:`);
    console.log(proof);
    
    // Verifica proof-ul
    const isVerified = MerkleTree.verify(proof , Buffer.from(newValue) , rootHash);

    console.log(`Is the proof verified? ${isVerified}`);
}


// Examplu
const arr = ['France', 'Germany', 'Denmark', 'Sweden', 'UK', 'Spain', 'Italy'];
generateAndPrintMerkleTree(arr);

// Modifica 'Sweden' cu 'Norway' si verifica proof
	const indexToModify = 3;
	const newValue = 'Norway';
	verifyProofForModifiedTransaction(arr, indexToModify, newValue);

