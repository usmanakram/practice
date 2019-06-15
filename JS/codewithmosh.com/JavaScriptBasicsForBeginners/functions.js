// Source: JavaScript Basics for Beginners | Mosh
// Source Link: 


//////////////////////////////////////////////////////////////

// Hoisting

// Javascript engine moves all function declarations at top. It's called Hoisting
// That's why we can call function before it's declaration

// Function Declaration
function walk() {
	console.log('walk');
}

// Function Expression
const run = function() {
	console.log('run');
};

//////////////////////////////////////////////////////////////

// Arguments

function sum() {
	let total = 0;
	for (let value of arguments)
		total += value;
	return total;
}

// Rest Operator
function sum2(...args) {
	return args.reduce((a, b) => a + b);
}

// Rest operator with some other arguments
// Rest should be last parameter of the function
function sum3(discount, ...prices) {
	const total = prices.reduce((a, b) => a + b);
	return total * (1 - discount);
}

console.log(sum3(0.1, 20, 30));

//////////////////////////////////////////////////////////////

// Default Parameters

function interest(principal, rate, years) {
	rate = rate || 3.5;
	years = years || 5;

	return principal * rate / 100 * years;
}

function interest2(principal, rate = 3.5, years = 5) {
	return principal * rate / 100 * years;
}

console.log(interest2(10000));

//////////////////////////////////////////////////////////////

// Getter and Setters

// getters => access properties
// setters => change (mutate) them

const person = {
	firstName: 'Usman',
	lastName: 'Akram',
	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	},
	set fullName(value) {
		const parts = value.split(' ');
		this.firstName = parts[0];
		this.lastName = parts[1];
	}
};

// person.fullName = 'Zeeshan Bilal';

// console.log(person);

//////////////////////////////////////////////////////////////

// Try and Catch

const person2 = {
	firstName: 'Usman',
	lastName: 'Akram',
	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	},
	set fullName(value) {
		if (typeof value !== 'string')
			throw new Error('Value is not a string.');

		const parts = value.split(' ');
		if (parts.length !== 2)
			throw new Error('Enter a first and last name.');

		this.firstName = parts[0];
		this.lastName = parts[1];
	}
};

try {
	// person2.fullName = null;
	// person2.fullName = '';
} catch (e) {
	alert(e);
	console.log(e.message);
}

//////////////////////////////////////////////////////////////

// Let vs Var

//////////////////////////////////////////////////////////////

// The this keyword

// if "this" is inside method of an object, it references to the object
// if "this" is inside global/regular function, it references to the global object (window "inside browser", global "inside node")

// Object
const video = {
	title: 'a',
	play() {
		console.log(this);
	}
};

video.play();

// Regular/Global function
function playVideo() {
	console.log(this);
}

playVideo();

// Constructor Function
function Video(title) {
	this.title = title;
	console.log(this);
}

const v = new Video('b');

const video2 = {
	title: 'a',
	tags: ['a', 'b', 'c'],
	showTags() {
		this.tags.forEach(function(tag) {
			// "this" references "window" instead of "video2" object
			// because it's inside anonymous callback (regular) function
			// that is not a method inside "video2" object
			// To solve this issue, we can add second parameter to "forEach" method
			console.log(this.title, tag);
		}, this);
	}
};

video2.showTags();

//////////////////////////////////////////////////////////////

// Changing "this"

// Some other techniques to solve last issue

// Solution 1 (define variable)
const video3 = {
	title: 'a',
	tags: ['a', 'b', 'c'],
	showTags() {
		const self = this;
		this.tags.forEach(function(tag) {
			console.log(self.title, tag);
		});
	}
};

video3.showTags();

// Solution 2 (bind method)
const video4 = {
	title: 'a',
	tags: ['a', 'b', 'c'],
	showTags() {
		this.tags.forEach(function(tag) {
			console.log(this.title, tag);
		}.bind(this));
	}
};

video4.showTags();

// Solution 3 (arrow function)
const video5 = {
	title: 'a',
	tags: ['a', 'b', 'c'],
	showTags() {
		this.tags.forEach(tag => {
			console.log(this.title, tag);
		});
	}
};

video5.showTags();


// Explaination
function playVideo2(a, b) {
	console.log(this);
}

// Techniqualy, this function is an object. It means, it has properties & methods
// Here we have 3 method, by using them we can change the value of this
playVideo2.call({ name: 'Usman 01' }, 1, 2);
playVideo2.apply({ name: 'Usman 02' }, [1, 2]);
// difference between "call" & "apply" is only passing arguments

// "bind" method does not call "playVideo2" function
// It returns a new function and sets "this" to point to passed "{name: 'Usman'}" object permanently
const fn = playVideo2.bind({ name: 'Usman 03' });
fn();

playVideo2.bind({ name: 'Usman 03' })();

playVideo2();