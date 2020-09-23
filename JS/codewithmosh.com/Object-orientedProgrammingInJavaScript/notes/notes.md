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
````
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

const Circle1 = new Function('radius', `
this.radius = radius;
this.draw = function() {
  console.log('draw');
}
`);

const circle = new Circle1(1);

const another = new Circle(1);
```

Circle.call({}, 1); // It's exactly like above expression ( new Circle(1); )
Circle.apply({}, [1, 2, 3]);




//////////////////////////////////////////////////////////////

## Value vs Reference Types

//////////////////////////////////////////////////////////////

## Adding/Removing Properties

const circle2 = new Circle(10);
circle2.location = { x: 1 };

console.log(circle2);
delete circle2.location;
console.log(circle2);

//////////////////////////////////////////////////////////////

## Enumerationg Properties

for (let key in circle2) {
    if (typeof circle2[key] !== 'function')
        console.log(key, circle2[key]);
}

// Get all the keys in an array
const keys = Object.keys(circle2);
console.log(keys);

// Check, if an object has given property
if ('radius' in circle2) {
    console.log('Circle2 has a radius');
}

//////////////////////////////////////////////////////////////

## Abstraction

//////////////////////////////////////////////////////////////

// Private Properties and Methods

function Circle2(radius) {
    this.radius = radius;

    let defaultLocation = { x: 0, y: 0 };
    let computeOptimumLocation = function(factor) {

    }

    this.draw = function() {
        computeOptimumLocation(0.1);
        console.log('draw');
    };
}

const circle3 = new Circle2(10);
circle3.draw();

//////////////////////////////////////////////////////////////

## Getters/Setters

function Circle3(radius) {
    this.radius = radius;

    let defaultLocation = { x: 0, y: 0 };

    this.getDefaultLocation = function() {
        return defaultLocation;
    };

    this.draw = function() {
        console.log('draw');
    };
}

function Circle4(radius) {
    this.radius = radius;

    let defaultLocation = { x: 0, y: 0 };

    /* this.getDefaultLocation = function() {
        return defaultLocation;
    }; */

    this.draw = function() {
        console.log('draw');
    };

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
}

const circle4 = new Circle4(10);
console.log(circle4.defaultLocation);
circle4.defaultLocation = { x: 2, y: 2};

//////////////////////////////////////////////////////////////

## Exercise

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













---
//////////////////////////////////////////////////////////////
# 03 Prototypes
//////////////////////////////////////////////////////////////

---
//////////////////////////////////////////////////////////////
# 04 Prototypical Inheritace
//////////////////////////////////////////////////////////////

---
//////////////////////////////////////////////////////////////
# 05 ES6 Classes
//////////////////////////////////////////////////////////////

---
//////////////////////////////////////////////////////////////
# 06 ES6 Modules
//////////////////////////////////////////////////////////////

