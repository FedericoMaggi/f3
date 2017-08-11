'use strict';

let _invalidToken = '((INVALID TOKEN))';
let _missingData = '((MISSING DATA))';
let _invalidDataType = '((INVALID DATA TYPE))';
let _extraDataStart = '((EXTRA DATA:';
let _extraDataEnd = '))';

/**
 * sprintf
 * This function uses provided format and variadic
 * arguments to compose and return a string.
 * 
 * @param {String}  format the format to be used.
 * @param {*}       args a variadic number of arguments 
 *                    to be used for string composing.
 * @return {String} the string composed based on provided
 *                    format and arguments.
 */
function sprintf(format, ...args) {
  let formatted = _parseFormat(format, args);
  return formatted;
}

/**
 * 
 * @param {*} format 
 * @param {*} variadic 
 * @return {String}
 */
function _parseFormat(format, variadic) {
  let final = '';
  let latestVariadicIndex = 0;
  let expectedVariadicNumber = variadic.length-1;

  // Loop through all format characters.
  for (let i = 0; i < format.length; i++) {
    let rune = format[i];

    // If current rune is not a '%' then 
    // attach it to the final string and 
    // proceed further.
    if (rune !== '%') {
      final += rune;
      continue;
    }

    // Get the character right following the 
    // '%' and retrieve the proper argument.
    if (latestVariadicIndex > expectedVariadicNumber) {
      final += _missingData;
      i++; // force i increment to skip the token.
      continue;
    }

    let token = _parseToken(format[i+1], variadic[latestVariadicIndex]);
    latestVariadicIndex++;

    final += token;
    i++; // force i increment to skip the token.
  }

  // Append any extra token if there's any.
  if (latestVariadicIndex < variadic.length) {
    console.log('There are still args ', latestVariadicIndex, variadic);

    final += ' ' + _extraDataStart;
    for (let i = latestVariadicIndex; i < variadic.length; i++) {
      let data = variadic[i];
      let type = typeof data;
      if (typeof data === 'object') {
        data = JSON.stringify(data);
      }
      final += ' ' + type + '=`' + data + '`';
      // final += _parseFormat(_extraData, type, data);
    }
    final += _extraDataEnd;
  }

  return final;
}

/**
 * 
 * @param {*} token 
 * @param {*} data 
 * @return {String}
 */
function _parseToken(token, data) {
  // console.log('Parsing ' + token + ' with val: ' + asd);
  switch (token) {
  case 's':
  case 'd':
  case 'f':
    return '' + data; // force data convertion to a string.

  case 'j':
    // Print an object represantation.
    if (typeof data === 'object') {
      return JSON.stringify(data);
    }
    return _invalidDataType;

  case 'a':
    if (data instanceof Array) {
      return JSON.stringify(data);
    }
    return _invalidDataType;

  default:
    return _invalidToken;
  }
}

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
