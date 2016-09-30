/*
function testFun(arg, callback) {
	if(arg == 'testt') {
		alert('It is test function.');
	} else {
		return callback();
	}
}

testFun('test', function() {
	alert('It is function call');
});
*/

// Anonymous function
(function () {
    // Q returns new Library object that hold our selector. Ex: Q('.wrapper')
    var Q = function (params) {
        return new Library(params);
    };
     
    // In our Library we get our selector with querySelectorAll (we do not support < ie8)
    // We also add selector length, version and twitter/github or whatever you like as information about your library.
    /*
	var Library = function (params) {
        // Get params
        var selector = document.querySelectorAll(params),
            i = 0;
        // Get selector length
        this.length = selector.length;
        this.version = '0.1.0';
        this.twitter = 'http://www.twitter.com/bjarneo_';
         
        // Add selector to object for method chaining
        for (; i < this.length; i++) {
            this&#91;i&#93; = selector&#91;i&#93;;
        }
         
        // Return as object
        return this;        
    };
	*/
	var Library = function (params) {
		var selector, i = 0;
		// Get params
		if (params === document) {
			selector = document;
			
			selector.length = 0;
			
			this[0] = selector;
		} else {
			selector = document.querySelectorAll(params);
		}
		
		// Get selector length
		this.length = selector.length;
		this.version = '0.1.0';
		this.twitter = 'http://www.twitter.com/bjarneo_';
		
		// Add selectors if not document
		if (!this[0]) {
			for (; i < this.length; i++) {
				this[i] = selector[i];
			}
		}
		
		// Return as object
		return this;
	};
	
	// Extend the Library object.
    Q.fn = Library.prototype = 
    {
        /**
         * Hide element(s) from DOM
         * @returns {*}
         */
        hide: function () {
            var len = this.length;
            // Here we simply loop through our object (this) and set the css to display none. 
            //If you got more that 1 node from DOM selected with querySelectorAll, you would hide them all.
            while (len--) {
                this[len].style.display = 'none';
            }
 
            // It's important to return this if you want to chain methods!
            return this;
        },
 
        /**
         * Show element(s) from DOM
         * @returns {*}
         */
        show: function () {
            var len = this.length;
            while (len--) {
                this[len].style.display = 'block';
            }
 
            return this;
        },
		css: function (name, value) {
			if(this._isArray(name)) {
				return this._cssObject(name);
			} else {
				return this._cssString(name, value);
			}
		},
		click: function(callback) {
			
			//document.getElementsByClassName('heading')[0].addEventListener('click', myFun);
			var len = this.length;
			while (len--) {
				this[len].addEventListener('click', callback);
			}
			
			return this;
		},
		mouseover: function(callback) {
			return this._event('mouseover', callback);
		},
		mouseout: function(callback) {
			return this._event('mouseout', callback);
		},
		_event: function(event, callback) {
			var len = this.length;
			while (len--) {
				this[len].addEventListener(event, callback);
			}
			
			return this;
		},
		on: function(event, selector, callback) {
			
			selector = document.querySelectorAll(selector);
			this.length = selector.length;
			
			// Add selectors if not document
			for (var i=0; i < this.length; i++) {
				this[i] = selector[i];
			}
			
			return this._event(event, callback);
		},
		/*
		on: function(event, selector, callback) {
			
			selector = document.querySelectorAll(selector);
			this.length = selector.length;
			
			// Add selectors if not document
			for (var i=0; i < this.length; i++) {
				this[i] = selector[i];
			}
			
			return this[event](callback);
		},
		*/
		_cssString: function(name, value) {
			var len = this.length;
            while (len--) {
                this[len].style[name] = value;
            }
			
			return this;
		},
		_cssObject: function(obj) {
			var len = this.length;
			while (len--) {
				var i = 0;
				for (i in obj) {
					this[len].style[i] = obj[i];
				}
			}
			
			return this;
		},
		_isArray: function(data) {
			return (typeof data === 'object') ? true : false;
		}
    };
	
    // Assign our Q object to global window object.
    if(!window.Q) {
        window.Q = Q;
    }
})();

/*
// Example usage: 
Q('.wrapper');
&#91;/javascript&#93;
 
Now if you use console in Chrome or Firebug in Firefox you'll see we got our object holding information about the library. Selector, length, version and twitter:
<a href="http://www.codephun.com/wp-content/uploads/2013/11/Q_library.png"><img src="http://www.codephun.com/wp-content/uploads/2013/11/Q_library.png" alt="Q_library" width="755" height="120" class="alignnone size-full wp-image-609" /></a>
 
Try to write Q('.wrapper').length and see what result you got.
 
<strong>How to extend the library with methods</strong>
[javascript]
// put this code between Library and if(!window.Q)
*/