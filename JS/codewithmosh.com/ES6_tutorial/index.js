// Source: JavaScript for React Developers | Mosh
// Source Link: https://www.youtube.com/watch?v=NCwa_xi0Uuc

const person1 = {
    name: 'Usman',
    walk: function() {
        console.log(this);
    },
    talk() {}
};

person1.walk();

const walk1 = person1.walk;

console.log(walk1);
walk1();

const walk2 = person1.walk.bind(person1);
walk2();

// START: ARROW FUNCTIONS
const square1 = function(number) {
    return number * number;
}

// short forms
const square2 = (number) => {
    return number * number;
}

// single parameter
const square3 = number => {
    return number * number;
}

// no parameter
const square4 = () => {
    return number * number;
}

// if body consists of single line
const square5 = number => number * number;


// uses of arrow function
// Example: 1
const jobs = [
    {id: 1, isActive: true},
    {id: 1, isActive: true},
    {id: 1, isActive: false},
];

const activeJobs1 = jobs.filter(function(job) { return job.isActive; });
const activeJobs2 = jobs.filter(job => job.isActive);
console.log(activeJobs2);
// END: ARROW FUNCTIONS

////////////////////////////////////////////////////////////
// Example: 2
const person2 = {
    talk() {
        console.log('this', this);
    }
};
person2.talk();

// Reference to the window object
const person3 = {
    talk() {
        setTimeout(function() {
            console.log('this', this);
        }, 1000);
    }
};
person3.talk();

// Reference to the persion4 object
const person4 = {
    talk() {
        var self = this;
        setTimeout(function() {
            console.log('self', self);
        }, 1000);
    }
};
person4.talk();

// Reference to the persion5 object
const person5 = {
    talk() {
        setTimeout(() => {
            console.log('this', this);
        }, 1000);
    }
};
person5.talk();
////////////////////////////////////////////////////////////

// Array.map()
const colors = ['red', 'green', 'blue'];
const items1 = colors.map(function (color) {
    return '<li>' + color + '</li>';
});
console.log(items1);

const items2 = colors.map(color => '<li>' + color + '</li>');
console.log(items2);

// Template litter (in ES6)
// ${} is called argument placeholder
const items3 = colors.map(color => `<li>${color}</li>`);
console.log(items3);

////////////////////////////////////////////////////////////

// Object destructuring
const address = {
    street: '',
    city: '',
    country: '',
};

const street1 = address.street;
const city1 = address.city;
const country1 = address.country;

// we can write it as 
const { street, city, country } = address;

// for single property, write property name.
// If need different named variable then put colon and then alias
const { street: st } = address;

////////////////////////////////////////////////////////////

const first1 = [1, 2, 3];
const second1 = [4, 5, 6];

// old way of concatination
const combined1 = first1.concat(second1);

// with spread operator
const combined2 = [...first1, ...second1];

// another example
const combined3 = [...first1, 'a', ...second1, 'b'];

// colne an array with spread operator
const clone1 = [...first1];

// we can also apply spread operator on objects
const first2 = { name: 'Usman' };
const second2 = { job: 'Instructor' };

const combined4 = {...first2, ...second2};
const combined5 = {...first2, ...second2, location: 'Pakistan'};
console.log(combined5);

// colne an object with spread operator
const clone2 = {...first2};

////////////////////////////////////////////////////////////

// Classes

class CoolPerson {
    constructor(name) {
        this.name = name;
    }

    walk() {
        console.log('walk');
    }
}

class Teacher extends CoolPerson {
    constructor(name, degree) {
        super(name);
        this.degree = degree;
    }
    teach() {
        console.log('teach');
    }
}

const person6 = new CoolPerson('Usman');
person6.walk();

const teacher = new Teacher('Usman Akram', 'MSc');
teacher.teach();

////////////////////////////////////////////////////////////

// Modules


////////////////////////////////////////////////////////////

// Named and Default Exports


////////////////////////////////////////////////////////////