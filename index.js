
let _invalidToken = '((INVALID TOKEN))';
let _missingData  = '((MISSING DATA))';
let _invalidDataType = '((INVALID DATA TYPE))';

function sprintf(format) {
  // Parse provided format and verify that the 
  // correct number of arguments has been provided.
  let fnArgs = arguments;
  
  // TODO: Consider this deletion.
  // // Remove the format from the array of function
  // // arguments to be able to provide them to the 
  // // core parsing function.
  // delete fnArgs[0];

  let formatted = _parseFormat(format, fnArgs);
  return formatted;
}

function _parseFormat(format, variadic) {
  let final = '';
  let latestVariadicIndex = 1;
  let expectedVariadicNumber = variadic.length-1;
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
    latestVariadicIndex++

    final += token;
    i++; // force i increment to skip the token.
  }

  return final;
}

function _parseToken(token, data) {
  // console.log('Parsing ' + token + ' with val: ' + asd);
  switch (token) {
    case 's':
    case 'd':
    case 'f':
      return '' + data; // force data convertion to a string.
    case 'j':
      // Print an object represantation.
      if (typeof data === "object") {
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

function isFloat(n) {
  return n === +n && n !== (n|0);
}

function isInteger(n) {
  return n === +n && n === (n|0);
}

// Numeric and String.
console.log(sprintf("The fmt has an int %d a string '%s'.", 42, "Douglas"));
console.log(sprintf("The fmt has an int %d a string '%s' and a float: %f.", 42, "Douglas", 3.14192));

console.log(sprintf("The fmt has an int %d a string '%s' and an unknown ']' token %].", 42, "Douglas", "NOTPRINTED"));

console.log(sprintf("The fmt has an int %d a string '%s' and a missing int %d.", 42, "Douglas"));

// Objects and arrays.
let obj = {a: 'hi there', b: 32};
let arr = [3, 5, 123, "the arr"];

console.log(sprintf("The fmt has an int %d a string '%s' and an object %j.", 42, "Douglas", obj));
console.log(sprintf("The fmt has an int %d a string '%s' and something that is not an object %j.", 42, "Douglas", "XX"));
console.log(sprintf("The fmt has an int %d a string '%s' and something that is not an object %j.", 42, "Douglas", arr));

console.log(sprintf("The fmt has an int %d a string '%s' and an array %a.", 42, "Douglas", arr));
console.log(sprintf("The fmt has an int %d a string '%s' and something that is not an array %a.", 42, "Douglas", "XX"));
console.log(sprintf("The fmt has an int %d a string '%s' and something that is not an array %a.", 42, "Douglas", obj));
