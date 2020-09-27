Source: Object-oriented Programming in JavaScript | Mosh
Source Link: https://www.youtube.com/watch?v=PFmuCDHHpwk

//////////////////////////////////////////////////////////////
# 01 Getting Started
//////////////////////////////////////////////////////////////

## 4 Pillars of OOP (lesson 1.2)

1. Encapsulation  *(Reduce complexity + increase reusability)*
1. Abstraction    *(Reduce complexity + isolate impact of changes)*
1. Inheritance    _(Eliminate redundant code)_
1. Polymorphism   _(Refactor ugly if/else & switch/case statements)_

### 1) Encapsulation:
Uncle Bob says,
> "The best functions are those with no parameters."

Using encapsulation, we group related variables and functions together, and this way we can reduce complexity. Now we can reuse this object in different parts of the program, or in different programs.

### 2) Abstraction:
Example: DVD player

Hiding some properties and methods from outside and show only the essentials.
It gives us a couple of benefits.
1) It makes the interface of objects simpler.
2) It reduces the impact of change.

### 3) Inheritance:
It is a mechanism that allows us to eliminate redundant code.

Explanation:
We can pick common properties and methods from different classes and create a parent class having those common properties and methods.

### 4) Polymorphism:
`Poly` means many and `morph` means form, in that case polymorphism means many forms.
In OOP, polymorphism is a techique that allows us to get rid of long 'if/else' or 'switch/case' statements.

---
//////////////////////////////////////////////////////////////
# 02 Objects
//////////////////////////////////////////////////////////////

## Object Literals (lesson 2.2)

```javascript
const circle = {}; // Object literal
```

An object in javascript is essentially a collection of key/value pair.

```javascript
const circle = {
  radius: 1,
  location: {
    x: 2,
    y: 1,
  },
  draw: function() {
    console.log('draw');
  }
};
```

Object literal is a simple way to define an object. But, we can also define objects using factories and constructors.

//////////////////////////////////////////////////////////////

## Factories (lesson 2.3)

Factory Function (Camel Notation)
```javascript
function createCircle(radius) {
  return {
    // radius: radius,
    // after ES6, we can write it as
    radius,
    /*draw: function() {
        console.log('draw');
    },*/
    // after ES6, we can write it as
    draw() {
      console.log('draw');
    }
  };
}

const circle = createCircle(1);
circle.draw();
```
For Factory function, we should use Camel Notation.

//////////////////////////////////////////////////////////////

## Constructors (lesson 2.4)

Constructor Function (Pascal Notation)
```javascript
function Circle(radius) {
  this.radius = radius;
  this.draw = function() {
    console.log('draw');
  }
}
const another = new Circle(1);
```

When we use `new` keyword, three things happen
1. This `new` operator create an empty javascript object.
2. It sets `this` to point newly created object. (By default, `this` points to global object. If we skip `new`, `this` will point to global object that is `window` in case browser or `global` in case of node)
3. It returns newly created object.

//////////////////////////////////////////////////////////////

## Constructor Property (lesson 2.5)

Every object has a constructor property that referances the function that was used to creaate that object.

```javascript
another.constructor
circle.constructor
```

We can view constructor function by entering the above code inside chrome developer tool.
`another.constructor` will return `Circle` function.
`circle.constructor` will return built in constructor function in javascript. When we create an object using the object literal syntax, internally, javascript engine uses this constructor function.

```javascript
let x = {};
```
Javascript engine will translate it something like this
```javascript
let x = new Object();
```

In javascript, we have a few other built in constructors, for example
```javascript
new String(); // '', "", ``
new Boolean(); // true, false
new Number(); // 1, 2, 3, ...
```

//////////////////////////////////////////////////////////////

## Functions are Objects (lesson 2.6)

```javascript
function Circle(radius) {
  this.radius = radius;
  this.draw = function() {
    console.log('draw');
  }
}
```

When we declare a function, internally, it represented like below.

```javascript
const Circle1 = new Function('radius', `
this.radius = radius;
this.draw = function() {
  console.log('draw');
}
`);

const circle = new Circle1(1);

const another = new Circle(1);
```

Let's take a look
```Javascript
Circle.call({}, 1); // It's exactly like above expression ( new Circle(1); )
```

When we use `new`, internally, javascript calls `call()` method.

We have another method same like above (`call()`), but accepts parameters in the form of array.

```javascript
Circle.apply({}, [1, 2, 3]);
```

//////////////////////////////////////////////////////////////

## Value vs Reference Types (lesson 2.7)

### Value Types (primitives)
1. Number
2. String
3. Boolean
4. Symbol
5. undefined
6. null

### Reference Types (objects)
1. Object
2. Function
3. Array

Primitives are copied by value.
Objects are copied by their references.

//////////////////////////////////////////////////////////////

## Adding/Removing Properties (lesson 2.8)

```javascript
const circle2 = new Circle(10);
circle2.location = { x: 1 };

console.log(circle2);

delete circle2.location;
console.log(circle2);
```

//////////////////////////////////////////////////////////////

## Enumerating Properties (lesson 2.9)

```javascript
function Circle(radius) {
  this.radius = radius;
  this.draw = function() {
    console.log('draw');
  }
}

const circle = new Circle(10);

for (let key in circle) {
  // Print only keys
  if (typeof circle[key] !== 'function')
    console.log(key, circle[key]);
}

// Get all the keys in an array
const keys = Object.keys(circle);
console.log(keys);

// Check, if an object has given property
if ('radius' in circle) {
  console.log('Circle has a radius');
}
```

//////////////////////////////////////////////////////////////

## Abstraction (lesson 2.10)

```javascript
function Circle(radius) {
  this.radius = radius;

  this.defaultLocation = { x: 0, y: 0 };
  this.computeOptimumLocation = function(factor) {

  }

  this.draw = function() {
    this.computeOptimumLocation(0.1);
    console.log('draw');
  };
}

const circle = new Circle(10);
circle.draw();
```

Hide the details and expose only the essentials.

//////////////////////////////////////////////////////////////

## Private Properties and Methods (lesson 2.11)

```javascript
function Circle(radius) {
  this.radius = radius;

  // Local variable
  let defaultLocation = { x: 0, y: 0 };
  let computeOptimumLocation = function(factor) {

  }

  this.draw = function() {
    computeOptimumLocation(0.1);
    console.log('draw');
  };
}

const circle = new Circle(10);
circle.draw();
```

//////////////////////////////////////////////////////////////

## Getters/Setters (lesson 2.12)

Technically, local variables of objects are not private members of objects. Because, they are not inside objects, they are just local variables.
But, from an object oriented point of view, we can refer to them as private members of the object.

If we need to get private members/local variables, one solution we have to write a method that return our required private member.

```javascript
function Circle(radius) {
  this.radius = radius;

  let defaultLocation = { x: 0, y: 0 };

  this.getDefaultLocation = function() {
    return defaultLocation;
  };

  this.draw = function() {
    console.log('draw');
  };
}

const circle = new Circle(10);
circle.getDefaultLocation();
circle.draw();
```

We have another way to do this.
```javascript
function Circle(radius) {
  this.radius = radius;

  let defaultLocation = { x: 0, y: 0 };

  /*this.getDefaultLocation = function() {
    return defaultLocation;
  };*/
  Object.defineProperty(this, 'defaultLocation', {
    get: function() {
      return defaultLocation;
    },
    set: function(value) {
      if (!value.x || !value.y)
        throw new Error('Invalid location.');
      defaultLocation = value;
    }
  });

  this.draw = function() {
    console.log('draw');
  };
}

const circle = new Circle(10);
console.log(circle.defaultLocation);
circle.defaultLocation = { x: 2, y: 2};
```

//////////////////////////////////////////////////////////////

## Exercise & Solution (lesson 2.14 & 2.15)

```javascript
function Stopwatch() {
  let startTime, endTime, running, duration = 0;

  this.start = function() {
    if (running)
      throw new Error('Stopwatch has already started.');

    running = true;
    startTime = new Date();
  };

  this.stop = function() {
    if (!running)
      throw new Error('Stopwatch is not started.');

    running = false;
    endTime = new Date();

    const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
    duration += seconds;
  };

  this.reset = function() {
    startTime = null;
    endTime = null;
    running = false;
    duration = 0;
  };

  Object.defineProperty(this, 'duration', {
    // get: function() { return duration; }
    // we can write it down as
    get: () => duration
  });
}
```

---
//////////////////////////////////////////////////////////////
# 03 Prototypes
//////////////////////////////////////////////////////////////

## Inheritance (lesson 3.1)

Base/Super/Parent, Derived/Sub/Child

We refer to the inheritance as `IS-A` relationship.
We say circle `IS-A` shape.

But, in javascript, we don't have classes, we only have objects. So that's when prototypical inheritance comes in the picture.
So essentially, we have two types of inheritance, `classical` and `prototypical`.

//////////////////////////////////////////////////////////////

## Prototypes and Prototypical Inheritance (lesson 3.2)

We refer to the shape object as the prototype of the circle. So a prototype is essentially a parent of another object.
Every object in javascript, except only a single object, has a prototype or parent. And it inherits all the members defined in it's prototype.

```javascript
let x = {};
let y = {};

Object.getPrototypeOf(x) === Object.getPrototypeOf(y)

x.__proto__; // Not recommended, it's depricated
Object.getPrototypeOf(x); // Recommended way to get prototype
```

A prototype is just a regular object in memory. There is nothing special about it. Every object has a prototype or a parent, except the root object.

//////////////////////////////////////////////////////////////

## Multi-level Inheritance (lesson 3.3)

```javascript
const myArray = [];
```

`myArray` derived from `arrayBase` that derived from `objectBase`.
This is what we call multi level inheritance.
Similarly,
`circle` inherits from `circleBase`, and `circleBase` inherits from `objectBase`.

Every object in JavaScript, except the root object, has a prototype/parent.
Objects created by a given constructor will have the same prototype. So, all circle objects created by the `Circle` constructor will have the same prototype, and similarly, all arrays created by the array constructor will have the same prototype.

//////////////////////////////////////////////////////////////

## Property Descriptors (lesson 3.4)

```javascript
let person = { name: 'Usman' };

for (let key in person)
  console.log(key);

// OR
console.log(Object.keys(person));
```

We cannot iterate properties defined inside builtin parents, like Object, Array etc. Because, those properties have attributes attached to them. Sometimes these attributes prevent a property from being enumerated.

To get parent of `person` object.
In console, we can get the same result by typing `person.__proto__`

```javascript
let person = { name: 'Usman' };
let objectBase = Object.getPrototypeOf(person);
let descriptor = Object.getOwnPropertyDescriptor(objectBase, 'toString');

console.log(descriptor);
```

When we create our own objects, we can set these attributes for our properties.

```javascript
Object.defineProperty(person, 'name', {
  // By default, all these properties are true
  writable: false, // changeable
  enumerable: false, // visibility
  configurable: false // deletable
});

person.name = 'John'; // it will not update `name` as `writable` is `false`

console.log(person);
console.log(Object.keys(person)); // it will not print `name` as `enumerable` is `false`
delete person.name; // it will not delete `name` as `configurable` is `false`
console.log(person);
```

//////////////////////////////////////////////////////////////

## Constructor Prototypes (lesson 3.5)

Constructors also have a prototype property.
This is the object that will be used as the parent for objects created by constructor.

```javascript
function Circle(radius) {
  this.radius = radius;
}

let myObj = {};

Object.getPrototypeOf(myObj); // myObj.__proto__

// myObj.__proto__ (prototype or parent of myObj)
// Constructor.prototype

// Constructors also have a prototype property.
Circle.prototype // This is the object that will be used as the parent for objects created by the Circle constructor.
```

NOTE:
Need to watch this video again.

//////////////////////////////////////////////////////////////

## Prototype vs Instannce Members (lesson 3.6)

```javascript
function Circle(radius) {
  this.radius = radius;
  this.draw = function() {
    console.log('draw');
  }
}

const c1 = new Circle(1);
const c2 = new Circle(1);
```

If we want to have a large number of objects of Circle in the memory, we are going to waste a lot of memory by keeping copies of all these methods.

Question: So what's the solution?
Answer: prototypical inheritance

```javascript
function Circle(radius) {
  // Instance members
  this.radius = radius;
  this.move = function() {
    console.log('move');
  }
}

// Prototype members
Circle.prototype.draw = function() {
  this.move();
  console.log('draw');
}

const c1 = new Circle(1);
const c2 = new Circle(1);

// Overwrite builtin method
Circle.prototype.toString = function() {
  return 'Circle with radius ' + this.radius;
}
```

//////////////////////////////////////////////////////////////

## Iterating Instance and Prototype Members (lesson 3.7)

It does not matter when we change prototype. We can also change prototype after creating an object. Changes will be reflected, because, here we are dealing with object references. So we have a single object in memory, as soon as we modify that, all the changes are immediately visile.

```javascript
function Circle(radius) {
  // Instance members
  this.radius = radius;
  this.move = function() {
    console.log('move');
  }
}

const c1 = new Circle(1);

// Prototype members
Circle.prototype.draw = function() {
  console.log('draw');
}

c1.draw();

// Object.keys() returns only instance members
console.log(Object.keys(c1));

// Returns all members (instance + prototype)
// instance properties are commonly known as own properties
for (let key in c1) console.log(key);

// Instance/own property can be checked by using hasOwnProperty()
console.log(c1.hasOwnProperty('radius')); // true
console.log(c1.hasOwnProperty('draw')); // false
```

//////////////////////////////////////////////////////////////

## Avoid Extending the Built-in Objects (lesson 3.8)

Don't modify objects you don't own (built in objects)!
Don't add new methods or properties!
Don't remove existing methods or properties!

```javascript
Array.prototype.shuffle = function() {} // Not recommended
```

//////////////////////////////////////////////////////////////

## Exercise & Solution (lesson 3.10 & 3.11)

> "Premature optimization is the root of all evils."

---
//////////////////////////////////////////////////////////////
# 04 Prototypical Inheritace
//////////////////////////////////////////////////////////////

## Creating your own Prototypical Inheritance (lesson 4.1)

```javascript
function Shape() {
  // body...
}

Shape.prototype.duplicate = function() {
  console.log('duplicate');
}

function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.draw = function() {
  console.log('draw');
}

const s = new Shape();
const c = new Circle(1);
```

In this example, `c` object which inherits from `circleBase`, which is essentially `circle.prototype`. And this `circleBase` inherits from `objectBase`.
Similarly, we have `s` which inherits from `shapeBase`, and this is the same object referenced by `shape.prototype`, and this object inherits from `objectBase`.

```javascript
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
// This returns an object that inherits from shapeBase.
Circle.prototype = Object.create(Shape.prototype);
// So before this lien, our Circle.prototype was like this
// Circle.prototype = Object.create(Object.prototype); // objectBase

Circle.prototype.draw = function() {
  console.log('draw');
}

const s = new Shape();
const c = new Circle(1);
```



//////////////////////////////////////////////////////////////

## Resetting the Constructor (lesson 4.2)

Whenever reset the prototype, reset the constructor as well

```javascript
function Shape() {
  // body...
}

Shape.prototype.duplicate = function() {
  console.log('duplicate');
}

function Circle(radius) {
  this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;
// new Circle.prototype.constructor() => new Circle();

Circle.prototype.draw = function() {
  console.log('draw');
}

const s2 = new Shape();
const c2 = new Circle(1);
```

NOTE:
Need to watch this video again.

//////////////////////////////////////////////////////////////

## Calling the Super Constructor (lesson 4.3)

```javascript
function Shape(color) {
  this.color = color;
}

Shape.prototype.duplicate = function() {
  console.log('duplicate');
}

function Circle(radius, color) {
  Shape.call(this, color);
  this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.draw = function() {
  console.log('draw');
}

const s3 = new Shape();
const c3 = new Circle(1, 'red');
```

---
//////////////////////////////////////////////////////////////
# 05 ES6 Classes
//////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////

## Private Properties/Members Using Symbols

Now, we have another primitive, called symbol.
It is essentially a unique identifier. Every time we call this function, we get a new unique identifier. And, this is not a consturctor function.

```javascript
console.log(Symbol() === Symbol()); // false
```

```javascript
const _radius = Symbol();
const _draw = Symbol();

class Circle {
  constructor(radius) {
    // this.radius = radius;
    // this['radius'] = radius;
    this[_radius] = radius; // We can also use `Symbol` as property name, instead of `string`
  }

  /**
   * In ES6, we have a new feature called computed property names. So we can add brackets, and inside of these brackets
   * we add an expression. When that expression is evaluated, the resulting value will be used as the name of property or method.
   */
  // draw() {}
  [_draw]() {
  }
}

const c = new Circle(1);
console.log('Regular properties of Circle: ', Object.getOwnPropertyNames(c)); // []
const key = Object.getOwnPropertySymbols(c)[0];
console.log(c[key]); // 1
```

//////////////////////////////////////////////////////////////

## Private Members Using WeakMaps

A `weakMap` is essentially a dictionary where keys are objects and values can be anything. The reason we call them `weakMap` is because the keys are weak. So if there are no references to these keys, they will be garbage collected.

Now, inside of this structure, we are not going to set the radius property anymore, instead we are going to work with this radius key map. We call the set method. The first argument is the key, and you can see that the keys is an object, it cannot be a symbol. So here we passed `this` which represents the instance of circle object, that's our key. And for the value, I'm going to use radius argument.
Technically, we can access this radius private property if we can get access to this `weakMap`. But later I'm going to talk about modules, and you will see that we can hide this radius in a module, and only export the circle class, so imagine somewhere else in the code we get the circle class, we won't have access to this `weakMap`. And the circle object doesn't have a radius property.

### Defining private properties & methods using separate weakMap
```javascript
const _radius = new WeakMap();
const _move = new WeakMap();

class Circle {
  constructor(radius) {
    // Defining private property
    _radius.set(this, radius);

    // Defining private method
    _move.set(this, () => {
      /**
       * "this" is not going to be rebound / reset (due to arrow function)
       * rather inherited from what we have in this constructor.
       * So in this constructor, "this" references a Circle object
       */
      console.log('move', this);
    });
  }

  draw() {
    // Calling private method
    _move.get(this)();

    // To get value of circle property
    console.log('getting radius property: ', _radius.get(this));
  }
}

const c = new Circle(1);
console.log(c.draw());
```

### Defining private properties & methods under single weakMap
```javascript
const privateProps = new WeakMap();

class Circle {
  constructor(radius) {
    // Defining private properties & methods
    privateProps.set(this, {
      radius: radius,
      move: () => {
        console.log('move', this);
      }
    });
  }

  draw() {
    // Calling private method
    privateProps.get(this).move();

    // To get value of circle property
    console.log('getting radius property: ', privateProps.get(this).radius);
  }
}

const c = new Circle(1);
console.log(c.draw());
```

//////////////////////////////////////////////////////////////

## Getters and Setters

```javascript
const _radius = new WeakMap();

class Circle {
  constructor(radius) {
    _radius.set(this, radius);
  }

  // Before ES6
  /*Object.defineProperty(this, 'radius', {
    get: function() {

    }
  });*/
  // After ES6
  get radius() {
    return _radius.get(this);
  }

  set radius(value) {
    if (value <= 0) throw new Error('invalid radius');
    _radius.set(this, value);
  }

}

const c = new Circle(1);
```

//////////////////////////////////////////////////////////////

## Inheritance

```javascript
class Shape {
  constructor(color) {
    this.color = color;
  }
  move() {
    console.log('move');
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }
  draw() {
    console.log('draw');
  }
}

const c = new Circle('blue', 1);
```

//////////////////////////////////////////////////////////////

## Method Overriding

```javascript
class Shape {
  move() {
    console.log('move');
  }
}

class Circle extends Shape {
  move() {
    super.move();
    console.log('circle move');
  }
}

const c = new Circle();
```

//////////////////////////////////////////////////////////////

---
//////////////////////////////////////////////////////////////
# 06 ES6 Modules
//////////////////////////////////////////////////////////////

