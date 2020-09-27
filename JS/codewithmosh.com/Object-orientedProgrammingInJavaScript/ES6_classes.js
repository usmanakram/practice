// Source: Object-oriented Programming in JavaScript | Mosh
// Source Link:

//////////////////////////////////////////////////////////////

// ES6 Classes

/*function Circle(radius) {
	this.radius = radius;

	this.draw = function() {
		console.log('draw');
	}
}*/

// Classes are syntactic sugar over constructor functions

class Circle {
	constructor(radius) {
		this.radius = radius;

		// Methods defined hare will on the object instance
		this.move = function() {}
	}

	// Methods defined hare will be on the prototype
	draw() {
		console.log('draw');
	}
}

const c = new Circle(1);


// Classes are constructor function
console.log('Circle class is a', typeof Circle);

//////////////////////////////////////////////////////////////

// Hoisting

// Javascript engine moves all function declarations at top. It's called Hoisting.
// That's why we can call function before it's declaration.
// Function Declarations are hoisted but Function Expressions are not

// We can also define classes using Declaraion or Expression syntax
// Unlike Functions class Declarations or class Expressions are not hoisted.

// Class Declaration (Recommended)
class Circle2 {
}

// Class Expression
const Square = class {
}

//////////////////////////////////////////////////////////////

// Static Methods

// In classical OOP languages, we have two types of methods (Instance & Static)

class Circle3 {
	constructor(radius) {
		this.radius = radius;
	}

	// Instance Methods
	draw() {
	}

	// Static Method
	static parse(str) {
		const radius = JSON.parse(str).radius;
		return new Circle3(radius);
	}
}

const c2 = new Circle3(1);
const c3 = Circle3.parse('{ "radius": 1 }');

//////////////////////////////////////////////////////////////

// The "this" Keyword

const Circle4 = function() {
	this.draw = function() { console.log(this); }
};

const c4 = new Circle4();

// Method Call
c4.draw();

const draw = c4.draw;

// Function Call
draw();

/**
 * Now, in JavaScript we have a mode that is called strict mode. When we enable this mode, JavaScript engine will be
 * most sensitive, so it will do more error checking if there are errors that silently fail. It's going to turn
 * them into exceptions, and also it will change the behavior of "this" keyword in functions. We can enable the
 * strict mode by adding a string on the top, 'use strict'.
 *
 * When we enable the strict mode, if we call a method as a function, "this" by default will no longer point to
 * the global object, it will be set to undefined
 */

/**
 * By default, the body of classes are executed in the strict mode. So whether we explicitly enable the strict mode
 * on top of this file or not, JavaScript engine will execute the body of class on the strict mode, and this will
 * prevent us from accidentally modify the global object.
 */
class Circle5 {
	draw() {
		console.log(this);
	}
}

const c5 = new Circle5();
const draw2 = c5.draw;
draw2();

//////////////////////////////////////////////////////////////

// Private Members Using Symbols

/**
 * Now, we have another primitive called symbol.
 * It is essentially a unique identifier. Every time we call this function, we get a new unique identifier.
 * This is not a consturctor function.
 */
const _radius = Symbol();
const _draw = Symbol();

class Circle6 {
	constructor(radius) {
		this[_radius] = radius;
	}

	/**
	 * In ES6, we have a new feature called computed property names. So we can add brackets, and inside of these brackets
	 * we add an expression. When that expression is evaluated, the resulting value will be used as the name of property or method.
	 */
	[_draw]() {
	}
}

const c6 = new Circle6(1);
console.log('Regular properties of Circle6: ', Object.getOwnPropertyNames(c6));
const key6 = Object.getOwnPropertySymbols(c6)[0];
console.log(c6[key6]);

//////////////////////////////////////////////////////////////

// Private Members Using WeakMaps

/**
 * A WeakMap is essentially a dictionary where keys are objects and values can be anything.
 * The reason we call them WeakMap is because the keys are weak.
 * So if there are no references to these keys, they will be garbage collected.
 * Now inside of this structure, we are not going to set the radius property anymore,
 * instead we are going to work with this radius key map. We call the set method.
 * The first argument is the key, and you can see that the keys is an object, it cannot
 * be a symbol. So here we passed "this" which represents the instance of circle object,
 * that's our key. And for the value, I'm going to use this radius argument.
 * Technically, we can access this radius private property if we can get access to this
 * WeakMap. But later I'm going to talk about modules, and you will see that we can hide
 * this radius in a module, and only export the circle class, so imagine somewhere else in
 * the code we get the circle class, we won't have access to this WeakMap. And thie circle
 * object doesn't have a radius property.
 *
 *
 */
const _radius7 = new WeakMap();
const _move = new WeakMap();
const privateProps = new WeakMap();

class Circle7 {
	constructor(radius) {
		/*START: Defining private properties & methods under single WeakMap*/
		privateProps.set(this, {
			radius: radius,
			move: () => {

			}
		});

		privateProps.get(this).radius;
		/*END: Defining private properties & methods under single WeakMap*/



		/*START: Defining private properties & methods using separate WeakMap*/
		// Defining private property
		_radius7.set(this, radius);

		// Defining private method
		_move.set(this, () => {
			/**
			 * "this" is not going to be rebound / reset (due to arrow function)
			 * rather inherited from what we have in this constructor,
			 * so in this constructor, "this" references a Circle7 object
			 */
			console.log('move', this);
		});
		/*START: Defining private properties & methods using separate WeakMap*/
	}

	draw() {
		// Calling private method
		_move.get(this)();

		// To get value of circle property
		console.log('getting radius property: ', _radius7.get(this));
	}
}

const c7 = new Circle7(1);
console.log(c7.draw());

//////////////////////////////////////////////////////////////

// Getters and Setters

const _radius8 = new WeakMap();

class Circle8 {
	constructor(radius) {
		_radius8.set(this, radius);
	}

	get radius() {
		return _radius8.get(this);
	}

	set radius(value) {
		if (value <= 0) throw new Error('invalid radius');
		_radius8.set(this, value);
	}

}

const c8 = new Circle8(1);

//////////////////////////////////////////////////////////////

// Inheritance

class Shape9 {
	constructor(color) {
		this.color = color;
	}
	move() {
		console.log('move');
	}
}

class Circle9 extends Shape9 {
	constructor(color, radius) {
		super(color);
		this.radius = radius;
	}
	draw() {
		console.log('draw');
	}
}

const c9 = new Circle9('blue', 1);

//////////////////////////////////////////////////////////////

// Method Overriding

class Shape10 {
	move() {
		console.log('move');
	}
}

class Circle10 extends Shape10 {
	move() {
		super.move();
		console.log('circle move');
	}
}

const c10 = new Circle10();

//////////////////////////////////////////////////////////////

// Solution

const _items = new WeakMap();

class Stack {
	constructor() {
		_items.set(this, []);
	}

	push(obj) {
		_items.get(this).push(obj);
	}

	pop() {
		const items = _items.get(this);

		if (items.length === 0)
			throw new Error('Stack is empty.');

		return items.pop();
	}

	peek() {
		const items = _items.get(this);

		if (items.length === 0)
			throw new Error('Stack is empty.');

		return items[items.length - 1];
	}

	get count() {
		return _items.get(this).length;
	}
}