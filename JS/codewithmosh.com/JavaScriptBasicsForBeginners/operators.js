// Source: JavaScript Basics for Beginners | Mosh
// Source Link: 


//////////////////////////////////////////////////////////////

// Equality Operators

// Strict Equality (Type + Value)
console.log(1 === 1); // true
console.log('1' === 1); // false

// Lose Equality (Value)
console.log(1 == 1); // true
console.log('1' == 1); // true
// '==' operator looks left side argument, it's a string, so it changes right side argumennt into string.

console.log(true == 1); // true
// '==' operator looks left side argument, it's a boolean, so it changes right side argumennt into boolean.

//////////////////////////////////////////////////////////////

// Logical Operators

//////////////////////////////////////////////////////////////

// Logical Operators with Non-boolean

console.log(false || true); // true
console.log(false || 'Usman'); // Usman
console.log(false || 1); // 1
/**
 * The result of logically not necessarily a true or false. That depends on the value of the oprands we have. 
 * In the first example, our second operand is true, that's why we get true back.
 * In the second example, our second operand is string, that's why we get string back.
 * And in the third example, we get number back.
 * When javascript engien evaluate this expression, it looks at each operand, if that operand is not bollean
 * true or false, it will try to interpret it as truthy or falsy.
 * In javascript, we have is value which we refer to as Falsey, that's not a boolean false.
 * What are these falsy values ?
 * undefined, null, number 0, the boolean false and empty string and not a number (NaN).
 */

console.log(false || 1 || 2); // 1
/**
 * When javascript engine tries to evaluate above expression, it looks at the first operand, it's false so the 
 * search continues as soon as we find an operand that is truthy, that operand is returned, so here our second
 * operand is truthy, it's value is returned, and here the evaluation stops.
 * It doesn't matter what we have on the right side.
 * This is what we called short-circuiting.
 */

 let userColor = 'red';
 let defaultColor = 'blue';
 let currentColor = userColor || defaultColor;
 console.log(currentColor);

//////////////////////////////////////////////////////////////

// Bitwise Operators


