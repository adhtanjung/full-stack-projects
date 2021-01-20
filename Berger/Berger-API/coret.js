// const aes = require("crypto-js/aes");
// const sha256 = require("crypto-js/sha256");

// console.log(sha256("password").toString());
// console.log(aes.encrypt("message", "asd123"));

// let form = new FormData();
// form.append("nama", { nama: "asd" });

// console.log(form);

let image = "gambar.jpasdg";

const regex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
console.log(image.match(regex));
console.log(regex.test(image));
