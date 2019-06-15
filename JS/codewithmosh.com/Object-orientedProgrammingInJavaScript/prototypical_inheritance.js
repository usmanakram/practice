// Source: Object-oriented Programming in JavaScript | Mosh
// Source Link: 

//////////////////////////////////////////////////////////////

// Creating your own Prototypical Inheritance

function Shape() {
	// body...
}

Shape.prototype.duplicate = function() {
	console.log('duplicate');
}

function Circle(radius) {
	this.radius = radius;
}

// In javaScript, we have a method for creating an object with a given prototype.
// This returns an object that inherits from shapeBase
Circle.prototype = Object.create(Shape.prototype);
// So before this lien, our Circle.prototype was like this
// Circle.prototype = Object.create(Object.prototype); // objectBase

Circle.prototype.draw = function() {
	console.log('draw');
}

const s = new Shape();
const c = new Circle(1);

//////////////////////////////////////////////////////////////

// Resetting the Constructor

// Whenever reset the prototype, reset the constructor as well

function Shape2() {
	// body...
}

Shape2.prototype.duplicate = function() {
	console.log('duplicate');
}

function Circle2(radius) {
	this.radius = radius;
}

Circle2.prototype = Object.create(Shape2.prototype);
Circle2.prototype.constructor = Circle2;
// new Circle2.prototype.constructor() => new Circle2();

Circle2.prototype.draw = function() {
	console.log('draw');
}

const s2 = new Shape2();
const c2 = new Circle2(1);

//////////////////////////////////////////////////////////////

// Calling the Super Constructor

function Shape3(color) {
	this.color = color;
}

Shape3.prototype.duplicate = function() {
	console.log('duplicate');
}

function Circle3(radius, color) {
	Shape3.call(this, color);
	this.radius = radius;
}

Circle3.prototype = Object.create(Shape3.prototype);
Circle3.prototype.constructor = Circle3;

Circle3.prototype.draw = function() {
	console.log('draw');
}

const s3 = new Shape3();
const c3 = new Circle3(1, 'red');

//////////////////////////////////////////////////////////////

// Intermediate Function Inheritance

// Intermediate function inheritance
function extend(Child, Parent) {
	Child.prototype = Object.create(Parent.prototype);
	Child.prototype.constructor = Child;
}

function Shape4(color) {
	this.color = color;
}

Shape4.prototype.duplicate = function() {
	console.log('duplicate');
}

function Circle4(radius, color) {
	Shape4.call(this, color);
	this.radius = radius;
}

extend(Circle4, Shape4);

Circle4.prototype.draw = function() {
	console.log('draw');
}

function Square4(size) {
	this.size = size;
}

extend(Square4, Shape4);

const s4 = new Shape4();
const c4 = new Circle4(1, 'red');

//////////////////////////////////////////////////////////////

// Method Overriding

// Intermediate function inheritance
function extend1(Child, Parent) {
	Child.prototype = Object.create(Parent.prototype);
	Child.prototype.constructor = Child;
}

function Shape5() {
}

Shape5.prototype.duplicate = function() {
	console.log('duplicate');
}

function Circle5() {
}

extend1(Circle5, Shape5);

Circle5.prototype.duplicate = function() {
	// Sometime we need to call parent implementation as well
	Shape5.prototype.duplicate.call(this);
	console.log('duplicate circle');
}

const c5 = new Circle5();

//////////////////////////////////////////////////////////////

// Polymorphism

//////////////////////////////////////////////////////////////

// When to Use Inheritance

// Favor Composition over Inheritance
// In JavaScript, we can use mixing (Mixins) to achieve composition.

//////////////////////////////////////////////////////////////

// Mixins

function mixin(target, ...sources) {
	Object.assign(target, ...sources);
}

// Define one feature as an object
const canEat = {
	ear: function() {
		this.hunger--;
		console.log('eating');
	}
};

// Another feature
const canWalk = {
	walk: function() {
		console.log('walking');
	}
};

const canSwim = {
	swim: function() {
		console.log('swim');
	}
};

// In ES6, we have a new method "Object.assign()"
// we can use this to copy the properties & methods from one object to another.
const person = Object.assign({}, canEat, canWalk);
console.log(person);

// if we are using constructor function, we can still use this technique.
function Person() {
}

// Object.assign(Person.prototype, canEat, canWalk);
mixin(Person.prototype, canEat, canWalk);

const person2 = new Person();
console.log(person2);

function Goldfish() {
}

// Object.assign(Goldfish.prototype, canEat, canSwim);
mixin(Goldfish.prototype, canEat, canSwim);

const goldfish = new Goldfish();
console.log(goldfish);