var crypto = require('crypto');
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Introdu textul pentru a fi decriptat: ", function(encryptedText) {
    try {
        const textParts = encryptedText.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
    
        const encryptedData = Buffer.from(textParts.join(':'), 'hex');
        const key = crypto.randomBytes(32);
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        
        const decrypted = decipher.update(encryptedData);
        const decryptedText = Buffer.concat([decrypted, decipher.final()]);
        return decryptedText.toString();
      } catch (error) {
        console.log(error)
      }
    
    rl.close();
});
