// By default, everything that we define in a module is considered to be private.
// Unless we explicitly export it.


// Implementation Detail
const _radius = new WeakMap();

// In ES6, we can export as 
// Public Interface
export class Circle {
	constructor(radius) {
		_radius.set(this, radius);
	}

	draw() {
		console.log('Circle with radius ' + _radius.get(this));
	}
}