// By default, everything that we define in a module is considered to be private.
// Unless we explicitly export it.


// Implementation Detail
const _radius = new WeakMap();

// Public Interface
class Circle {
	constructor(radius) {
		_radius.set(this, radius);
	}

	draw() {
		console.log('Circle with radius ' + _radius.get(this));
	}
}

// In Node or CommonJS format, we can export as 
// module.exports.Circle = Circle; // exporting only a single object
module.exports = Circle; // we'll get circle class