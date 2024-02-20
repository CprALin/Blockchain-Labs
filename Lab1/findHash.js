var crypto = require('crypto');
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Introdu textul pentru a fi criptat: ", function(text) {
  var index = 0;
  var start = '0';
  var startTime = new Date(); // Momentul în care începe calculul

  while(start.length < 4) {
    var hash = crypto.createHash('sha256');
    var data = hash.update(text + index.toString(), 'utf-8');
    var gen_hash = data.digest('hex');
    
    // Verificăm dacă hash-ul începe cu zero-uri
    if (gen_hash.startsWith(start)) {
      start += '0';
      var endTime = new Date(); // Momentul în care am găsit hash-ul
      var executionTime = (endTime - startTime) / 1000; // Calculăm timpul de execuție în secunde
      console.log("Hash: " + gen_hash + " pentru index-ul: " + index);
      console.log("Timpul de execuție: " + executionTime + " secunde");
    } else { 
      index++;
    }
  }

  rl.close();
});
