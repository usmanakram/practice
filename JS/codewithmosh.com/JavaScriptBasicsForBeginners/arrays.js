// Source: JavaScript Basics for Beginners | Mosh
// Source Link: 

let print;
//////////////////////////////////////////////////////////////

// Add new element in array

const numbers = [3, 4];

// End
numbers.push(5, 6);

// Beginning
numbers.unshift(1, 2);

// Middle
numbers.splice(2, 0, 'a', 'b');

//////////////////////////////////////////////////////////////

// Remove an element from array

const numbers1 = [1, 2, 3, 4, 5, 6];

// End, remove and return removed element
const last = numbers1.pop();

// Beginning, remove and return removed element
const first = numbers1.shift();

// Middle, remove and return the array of removed element/elements
const middle = numbers1.splice(2, 1);

//////////////////////////////////////////////////////////////

// Empty the array

let numbers2 = [1, 2, 3, 4];
let another2 = numbers2;

// Solution 1
numbers2 = []; // Recommended

// Solution 2
numbers2.length = 0; // Recommended

// Solution 3
numbers2.splice(0, numbers2.length);

// Solution 4
while (numbers2.length > 0)
	numbers2.pop();

//////////////////////////////////////////////////////////////

// Finding element in array of letterls

const numbers3 = [1, 2, 3, 1, 4];

print = numbers3.indexOf('1');
print = numbers3.indexOf(1, 1);
print = numbers3.lastIndexOf(1);

print = numbers3.indexOf(1) !== -1;
print = numbers3.includes(1);


// Finding object in array of objects
const cources = [
	{ id: 1, name: 'a' },
	{ id: 2, name: 'b' },
];

// It returns matching object
const cource = cources.find(function(cource) {
	return cource.name === 'a';
});

const cource2 = cources.findIndex(cource => cource.name === 'a');

//////////////////////////////////////////////////////////////

// Combining arrays

const firstArray = [1, 2, 3];
const secondArray = [4, 5, 6];

const combined = firstArray.concat(secondArray);
const slice = combined.slice(2, 4);

// Arrays of primitive is coppied by value but arrays of objects by reference

const firstObjArray = [{ id: 1 }];
const secondObjArray = [4, 5, 6];

const combinedObj = firstObjArray.concat(secondObjArray);

firstObjArray[0].id = 10; // Change value after combining arrays


// Spread operator
const combined2 = [...firstArray, 'a', ...secondArray, 'b'];

//////////////////////////////////////////////////////////////

// Iterating arrays

const numbers4 = [1, 2, 3];

for (let number of numbers4)
	console.log(number);

numbers4.forEach((number, index) => console.log(index, number));

//////////////////////////////////////////////////////////////

// Join arrays

const numbers5 = [1, 2, 3];
const joined = numbers5.join(',');

console.log(joined);

const message = 'This is my first message';
const parts = message.split(' ');

console.log(parts);

//////////////////////////////////////////////////////////////

// Sorting arrays

const numbers6 = [2, 3, 1];

numbers6.sort();
console.log(numbers6);

numbers6.reverse();
console.log(numbers6);

// For array of objects
const cources2 = [
	{ id: 1, name: 'Node.js' },
	{ id: 2, name: 'javaScript' },
];

cources2.sort(function(a, b) {
	// a < b => -1
	// a > b => 1
	// a === b => 0

	const nameA = a.name.toUpperCase();
	const nameB = b.name.toUpperCase();

	if (nameA < nameB) return -1;
	if (nameA > nameB) return 1;
	return 0;
});
console.log(cources2);

//////////////////////////////////////////////////////////////

// Testing elements of array

const numbers7 = [1, -1, 2, 3];

// every() checkes if every element matches the given criteria
const allPositive = numbers7.every(function(value) {
	return value >= 0;
});

// some() checkes if atleast one element matches the given criteria
const atLeastOnePositive = numbers7.some(function(value) {
	return value >= 0;
});

console.log(allPositive);
console.log(atLeastOnePositive);

//////////////////////////////////////////////////////////////

// Filtering array

const numbers8 = [1, -1, 2, 3];

const filtered = numbers8.filter(n => n >= 0);
console.log(filtered);

//////////////////////////////////////////////////////////////

// Mapping array

const numbers9 = [1, -1, 2, 3];

const mapped = numbers9.map(n => '<li>' + n + '</li>');

const html = '<ul>' + mapped.join('') + '</ul>';

console.log(html);


const items = numbers9
	.filter(n => n >= 0)
	.map(n => ({ value: n }))
	.filter(obj => obj.value > 1)
	.map(obj => obj.value);

console.log(items);

//////////////////////////////////////////////////////////////

// Reducing array

const numbers10 = [1, -1, 2, 3];

// Second argument of reduce() is the initialization value of "accumulator"
const sum1 = numbers10.reduce(function(accumulator, currentValue) {
	return accumulator + currentValue;
}, 0);

// By skipping second argument of reduce(), "accumulator" is initialized as 1st value of numbers array
const sum2 = numbers10.reduce((accumulator, currentValue) => accumulator + currentValue);

console.log(sum2);

//////////////////////////////////////////////////////////////

const movies = [
	{ title: 'a', year: 2018, rating: 4.5 },
	{ title: 'b', year: 2018, rating: 4.7 },
	{ title: 'c', year: 2018, rating: 3 },
	{ title: 'd', year: 2017, rating: 4.5 },
];

// All the movies in 2018 with rating > 4
// Sort them by their rating
// Descending order
// Pick their title

const titles = movies
	.filter(m => m.year === 2018 && m.rating >= 4)
	/*.sort((a, b) => {
		a < b => -1
		a === b => 0
		a > b => 1
	})*/
	.sort((a, b) => a.rating - b.rating)
	.reverse()
	.map(m => m.title);

console.log(titles);