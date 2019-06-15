// Source: Object-oriented Programming in JavaScript | Mosh
// Source Link: 

//////////////////////////////////////////////////////////////

// Multi-level Inheritance

// Every object in JavaScript except the root object has a prototype/parent
// Objects created by a given constructor will have the same prototype.

//////////////////////////////////////////////////////////////

// Property Descriptors

// we cannot iterate properties defined inside builtin parents, like Object, Array etc
// because, those properties have attributes attached to them
// Sometimes these attributes prevent a property from being enumerated.

let person = { name: 'Usman' };

// get parent of "person" object
// In console, we can get the same result by typing "person.__proto__"
let objectBase = Object.getPrototypeOf(person);
let descriptor = Object.getOwnPropertyDescriptor(objectBase, 'toString');

console.log(descriptor);


Object.defineProperty(person, 'name', {
	// By default, all these properties are true
	writable: false,
	enumerable: false, // visibility
	configurable: false // deletable
});

person.name = 'John';

console.log(person);
console.log(Object.keys(person));
delete person.name;
console.log(person);

//////////////////////////////////////////////////////////////

// Constructor Prototypes

// Constructors also have a prototype property
// This is the object that will be used as the parent for objects created by constructor

//////////////////////////////////////////////////////////////

// Prototype vs Instannce Members

function Circle(radius) {
	this.radius = radius;
	this.draw = function() {
		console.log('draw');
	}
}

const c1 = new Circle(1);
const c2 = new Circle(1);

// If we want to have a large number of objects of Circle in the memory
// we are going to waste a lot of memory by keeping copies of all these methods.
// So what's the solution ?
// prototypical inheritance

function Circle2(radius) {
	// Instance members
	this.radius = radius;
	this.move = function() {
		console.log('move');
	}
}

// Prototype members
Circle2.prototype.draw = function() {
	this.move();
	console.log('draw');
}

const c3 = new Circle2(1);
console.log(c3);

// Overwrite builtin method
Circle2.prototype.toString = function() {
	return 'Circle with radius ' + this.radius;
}

//////////////////////////////////////////////////////////////

// Iterating Instance and Prototype Members

function Circle3(radius) {
	// Instance members
	this.radius = radius;
	this.move = function() {
		console.log('move');
	}
}

// Prototype members
Circle3.prototype.draw = function() {
	console.log('draw');
}

const c4 = new Circle3(1);

// Returns instance members
console.log(Object.keys(c4));

// Returns all members (instance + prototype)
// instance properties are commonly known as own properties
for (let key in c4) console.log(key);

// Instance/own property can by checked by using hasOwnProperty()
console.log(c4.hasOwnProperty('radius'));
console.log(c4.hasOwnProperty('draw'));

//////////////////////////////////////////////////////////////

// Avoid Extending the Built-in Objects

// Don't modify objects you don't own!

// Premature optimization is the root of all evils