import { Person } from './person';

// named export
export function promote() {}

// default export
export default class Teacher extends Person {
    constructor(name, degree) {
        super(name);
        this.degree = degree;
    }

    teach() {
        console.log('teach');
    }
}