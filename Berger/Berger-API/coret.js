const aes = require("crypto-js/aes");
const sha256 = require("crypto-js/sha256");

console.log(sha256("password").toString());
console.log(aes.encrypt("message", "asd123"));
