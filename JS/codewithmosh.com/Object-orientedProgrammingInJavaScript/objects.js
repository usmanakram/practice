// Source: Object-oriented Programming in JavaScript | Mosh
// Source Link: https://www.youtube.com/watch?v=PFmuCDHHpwk

//////////////////////////////////////////////////////////////

// Factories

// Factory Function (Camel Notation)
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

// For Factory function, we should use Camel Notation

//////////////////////////////////////////////////////////////

// Constructors

// Constructor Function (Pascal Notation)
function Circle(radius) {
    this.radius = radius;
    this.draw = function() {
        console.log('draw');
    }
}
const another = new Circle(1);
/* 
When we use `new` keyword, three things happen
1. This `new` operator create an empty javascript object
2. It sets `this` to point newly created object
3. It returns newly created object
 */

// For Constructor function, we should use Pascal Notation

// Camel Notation: oneTwoThreeFour
// Pascal Notation: OneTwoThreeFour

//////////////////////////////////////////////////////////////

// Constructor Property

//////////////////////////////////////////////////////////////

// Functions are Objects

Circle.call({}, 1); // It's exactly like above expression ( new Circle(1); )
Circle.apply({}, [1, 2, 3]);

//////////////////////////////////////////////////////////////

// Value vs Reference Types

//////////////////////////////////////////////////////////////

// Adding/Removing Properties

const circle2 = new Circle(10);
circle2.location = { x: 1 };

console.log(circle2);
delete circle2.location;
console.log(circle2);

//////////////////////////////////////////////////////////////

// Enumerationg Properties

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

// Abstraction

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

// Getters/Setters

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

// Exercise

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

//////////////////////////////////////////////////////////////