/*
Why, every fault’s condemn’d ere it be done:
Mine were the very cipher of a function...
—William Shakespeare, Measure for Measure
*/

/*
* The best thing about JS is its implementation of functions.
	It got almost everything right.

* A function encloses a set of statements. Functions are 
	fundamental modular unit of JS.
* They are use for:
	- code resue
	- information hiding, and
	- composition
	* to specify the behavior of objects

*/

/* == Function Objects == */
/*
* Functions in JS are objects. Objects are collections of name/value pairs
	having a hidden link to a prototype object.
* Objects produced frm object literals are linked to Object.prototype.
	Function objects are linked to Function.prototype (which is itself 
	linked to object.prototype)
* Every function is also created with 2 additional hidden properties: the 
	function's context and the code the implements the function's behavior.
* Every function is also created with a prototype property. Its value 
	is an object with a constructor property whose value is the function.
* Since functions are objects, they can be used like any other value.
	Functions can be sotred in variables, objects and arrays. Functions can
	be passed as arguments to functions, and functions can be returnd 
	from functions. Also, since functions are objects, functions can have
	methods.
* The thing that is special about function is that they can be invoked.
*/


