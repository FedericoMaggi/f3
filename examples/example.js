
// Numeric and String.
console.log(sprintf('The fmt has an int %d a string `%s`.', 42, 'Douglas'));
console.log(sprintf('The fmt has an int %d a string `%s`` and a float: %f.', 42, 'Douglas', 3.14192));

console.log(sprintf('The fmt has an int %d a string `%s` and an unknown `]` token %].', 42, 'Douglas', 'NOTPRINTED'));

console.log(sprintf('The fmt has an int %d a string `%s` and a missing int %d.', 42, 'Douglas'));

// Objects and arrays.
let obj = {a: 'hi there', b: 32};
let arr = [3, 5, 123, 'the arr'];

console.log(sprintf('The fmt has an int %d a string `%s` and an object %j.', 42, 'Douglas', obj));
console.log(sprintf('The fmt has an int %d a string `%s` and something that is not an object %j.', 42, 'Douglas', 'XX'));
console.log(sprintf('The fmt has an int %d a string `%s` and something that is not an object %j.', 42, 'Douglas', arr));

console.log(sprintf('The fmt has an int %d a string `%s` and an array %a.', 42, 'Douglas', arr));
console.log(sprintf('The fmt has an int %d a string `%s` and something that is not an array %a.', 42, 'Douglas', 'XX'));
console.log(sprintf('The fmt has an int %d a string `%s` and something that is not an array %a.', 42, 'Douglas', obj));


// Extra arguments
console.log(sprintf('The fmt has an int %d.', 42, 'Douglas', obj, 42));
