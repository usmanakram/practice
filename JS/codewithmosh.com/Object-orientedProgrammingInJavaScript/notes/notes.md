// Source: Object-oriented Programming in JavaScript | Mosh
// Source Link: https://www.youtube.com/watch?v=PFmuCDHHpwk

//////////////////////////////////////////////////////////////
# 01 Getting Started
//////////////////////////////////////////////////////////////

## // 4 Pillars of OOP (lesson 1.2)

1. Encapsulation  *(Reduce complexity + increase reusability)*
1. Abstraction    *(Reduce complexity + isolate impact of changes)*
1. Inheritance    _(Eliminnate redundant code)_
1. Polymorphism   _(Refactor ugly switch/case statements)_

### 1) Encapsulation:
Uncle Bob says,
> "the best function are those with no parameters"

Using encapsulation, we group related variables and functions together, and this way we can reduce complexity. Now we can reuse this object in different parts of the program, or in different programs.

### 2) Abstraction:
Example: DVD player

Hiding some properties and methods from ourside and show only the essentials.
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

## // Object Literals (lesson 2.2)

```javascript
const circle = {}; // Object litteral
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

Object litteral is a simple way to define an object. But, we can also define objects using factories and constructors.

//////////////////////////////////////////////////////////////

## // Factories (lesson 2.3)

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
For Factory function, we should use Camel Notation

---
//////////////////////////////////////////////////////////////
03 Prototypes
//////////////////////////////////////////////////////////////

---
//////////////////////////////////////////////////////////////
04 Prototypical Inheritace
//////////////////////////////////////////////////////////////

---
//////////////////////////////////////////////////////////////
05 ES6 Classes
//////////////////////////////////////////////////////////////

---
//////////////////////////////////////////////////////////////
06 ES6 Modules
//////////////////////////////////////////////////////////////

