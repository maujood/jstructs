//These functions augment Function.prototype to provide a framework for implementing inheritance.

//This function adds a method to the prototype of a constructor.
//Authored: Douglas Crockford
//http://www.crockford.com/javascript/inheritance.html
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

//Utility function for implementing inheritance along with an "uber" function
//Authored: Douglas Crockford
//http://www.crockford.com/javascript/inheritance.html
Function.method('inherits', function (parent) {
    this.prototype = new parent();
    var d = {},
        p = this.prototype;
    this.prototype.constructor = parent;
    this.method('uber', function uber(name) {
        if (!(name in d)) {
            d[name] = 0;
        }
        var f, r, t = d[name], v = parent.prototype;
        if (t) {
            while (t) {
                v = v.constructor.prototype;
                t -= 1;
            }
            f = v[name];
        } else {
            f = p[name];
            if (f == this[name]) {
                f = v[name];
            }
        }
        d[name] += 1;
        r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
        d[name] -= 1;
        return r;
    });
    return this;
});

//Builds on Crockford's inheritance method to provide a simple "extends" functionality to all our constructors.
//Author: Mehdi Maujood
Function.method('extend', function (functions) {
    var Child = function () { };
    Child.inherits(this);
    for (var func in functions) {
        Child.prototype[func] = functions[func];
    }
    return Child;
});
