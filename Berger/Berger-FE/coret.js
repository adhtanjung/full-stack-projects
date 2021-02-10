const reUppercase = /[A-Z]/;
const re6Chars = /^.{6,}$/;
const reSpecialChar = /\W|_/;

const password = "Asd12345!";

console.log(
	reUppercase.test(password) &&
		re6Chars.test(password) &&
		reSpecialChar.test(password)
);
console.log(re6Chars.test(password));
console.log(reSpecialChar.test(password));
