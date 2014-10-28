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

/* == Function Objects, pg.26 == */

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

/* == Function Literal, pg.27 == */

/*
* Function objects are created within function literals:
*/
//create a variable called add and store a function in it that 
//adds two numbers
var add = function(a,b){
	return a + b;
}

/*
* A function has 4 parts:
	(1) Reserved word function.
	(2) Optional, function's name. The function can be use its name 
		to call itself recursively. The name can also be used by debuggers and
		development tools to identiy the function. If a function is not given
		a name, like above, it is said to be anonymous.
	(3) Set of paramenters, wrapped in parentheses. Unlike ordinary variables,
		instead of being initialized to undefined, they will be initialized
		to arguments supplied when the function is invoked.
	(4) A set of statements wrapped in curly braces.

* A function literal can appear anywhere that an expression can appear. 
* Functions can be defined inside of other functions. An inner function
 	enjoys access to the parameters and variables of functions it is nested
 	within.
* The function object created by a function literal contains a link to that
	outer context. This is called closure. This is the source of enomous
	expressive power.
*/

/* == Invocation, pg.27 == */

/*
* Invoking a function suspends the execution of the current function, passing
	control and paramenters to the new function.
* In addition to the declared paramenters, every function receives two 
	additional parameters: `this` and `arguments`
* There are 4 patterns of Invocation:
	(1) the method invocation pattern
	(2) the function invocation pattern
	(3) the constructor invocation pattern
	(4) the apply invocation pattern
  The patterns differ in how the bonus paramenter `this` is initialized.

(1) The Method Invocation pattern
* When a function is stored as a property of an object, we call it a method.
* If an invocation expression contains a refinement (that is . (dot) expression
	or [subscript] expression) it is invoved as a method.
*/

//Create myObject. It has a value and an increment method.
//The increment method takes an optional paramenter. If the argument
//is not a number, then 1 is used as the default.

var myObject = {
	value : 0,
	increment: function(inc){
		this.value += typeof inc === 'number' ? inc : 1;
	}
};

myObject.increment();
console.log(myObject.value); //1

myObject.increment(10);
console.log(myObject.value); //11

/*
* A method can use `this` to access the object so that it can retrieve
	values from the object or modify the object. This binding of `this`
	to the object happens at incovation time. This very late binding makes
	functions that us this highly reusable.
* Methods that get their object context from `this` are called public methods.

(2) The Function Invocation Pattern
* When a function is not the property of an object, then it is invoked
	as a function:
*/

var sum = add(3,4); //7

/*
* When a function is invoked with this atter, `this` is bound to the
	global object. This was a mistake in the design of the language.
	A consequence of this error is that a method cannot employ an
	inner function to help it do its work because the inner function
	does not share the method's access to the object as its `this`
	is bound to the wrong value.
	- 	Fortunately, there's a workaround. If the method defines a 
		variable and assigns it the value of `this`, the inner function
		will have access to `this` through that variable. By convention,
		the name of that variable is `that`.
*/

//Augment myObject with a double method.

myObject.double = function(){
	var that = this;	//Workaround

	var helper = function(){
		that.value = add(that.value,that.value);
	}

	helper();	//Invoke helper as a function.
};

//Invoke double as a method

myObject.double();
console.log(myObject.value); 

/*
(3) The Constructor Invocation Pattern
* JS is a prototypal inheritance language. That means that objects
	can inherit properties directly from other objects.
	The language is class-free.
* If a function is invoked with the `new` prefix, then a new object
	will be created with hidden links to the value of the function's
	prototype member, and `this` will be bound to that new object.
* The `new` prefix also changes the behavior of the `return` statement.
*/

//Create a constructor function called Quo.
//It makes an object with a status property.

var Quo = function (string){
	this.status = string;
};

//Give all instances of Quo a public method called get_status

Quo.prototype.get_status = function(){
	return this.status;
}

//Make an instance of Quo

var myQuo = new Quo("confused");

console.log(myQuo.get_status()); //'confused'

/*
* Functions that are intended to be used with the `new` prefix are
	called constructors. By convention, they are kep in variables
	with a capitalized name.
* Use of this style of constructor functions is not recommended. We
	will see better alternatives in the next chapter.

(3) The Apply Invocation Pattern
* Because JS is functional object-oriented language, functions can
	have methods.
* The `apply` method lets us construct an array of arguments to use
	to invoke a function.
* The `apply` method takes two paramenters:
	(i) the value that should be bound to `this`
	(ii)the array of parameters
*/

//Make an array of 2 members and add them

var array = [3,4];
var sum = add.apply(null,array);

//Make an object with a status member

var statusObject = {
	status : 'A-OK'
};

//statusObject does not inherit from Quo.prototype, but we can invoke
//the get_status method on statusObject even though statusObject
//even though statusObject does not have a get_status method.

var status = Quo.prototype.get_status.apply(statusObject);

/* == Arguments, pg.31 == */
/*
* A bonus parameter that is available to functions that is available to
	functions when they are invoked is the `arguments` array. It gives
	the function access to all of the arguments that were supplied with
	the invocation, including excess arguments that were not assigned
	to parameters. This makes it possible to write functions that take
	an unspecified number of paramenters.
*/

//Make a functin that adds a lot of stuff.

//Note that dfining the variable sum sinsde the function does not
//interfere with the sum defined outside of the function. The function
//only sees the inner one.

var sum = function(){
	var i,sum = 0;
	for(i=0; i<arguments.length; i+=4){
		sum += arguments[i];
	}
	return sum;
};

console.log(sum(10,30,50,23,54));

/*
* Because of a design error, `arguments` is not really an array. It is an
	array-like object. `arguments` has a length property, but lacks all
	of the array methods.
*/

/* == Return, pg.31 == */
/*
* The `return` statement can be used to cause the functions to be 
	return early.
* A function always returns a value. If the `return` value is not
	specified, then `undefined` is returned.
* If the function was invoked with the `new` prefix and the `return`
	value is not an object, then `this` (like new object) is returned
	instead.
*/

/* == Exceptions, pg.32 == */
/*
* Exceptions are unsusual (but not completely unexpected) mishaps that
	interfer with the normal flow of a program. When such a mishap is
	detected, your program should throw an exception.
*/

var add = function (a,b){
	if(typeof a !== 'number' || typeof b !== 'number'){
		throw {
			name: 'TypeError',
			message: 'add needs numbers'
		};
	}
	return a + b;
}

/*
* The throw statement interrupts execution of the function. It should
	be given an `exception` object containing a `name` property that
	identifies the type of the exception, and a descriptive `message`
	property. You can also add other properties.
* The `exception` object will be delivered to the `catch` clause of 
	a `try` statement:
*/

//Make a try_it function that calls the new add function incorrectly

var try_it = function(){
	try{
		add("seven");
	}catch(e){
		console.log(e.name + " : " + e.message);
	}
}

try_it();

/*
* If an exception is thrown within a `try` block, control will go to
	its `catch` clause.
*/

/* == Augmenting Types, pg.32 == */
/*
* JS allows the basic types of the language to be augmented.
* eg. by augmenting Function.prototype we can make a method
	available to all functions:
*/

Function.prototype.method = function(name,func){
	this.prototype[name] = func;
	return this;
}

/*
* By augmenting Function.prototype with a `method` method, we
	no longer have to type the name of the prototype properly.
	That bit of ugliness can now be hidden.
* It does not have a separate type, so it is sometimes 
	necessary to extract just the integer part of a number.
	The methd JS provides to do that is ugly. We can fix by 
	adding an integer method to Number.prototype. It uses 
	either Math.ceil (was errata in book 'ceiling!') or Math.floor, 
	depending on the sign of the number:
*/

Number.method('integer',function(){
	return Math[this < 0 ? 'ceil' : 'floor'](this);
});



console.log((-10/3).integer());

/*
* JS lacks a method that removes spaces from ends of a string.
To fix: 
*/

String.method('trim',function(){
	return this.replace(/^\s+|\s+$/g,'');
});

/*
* Because of the dunamic nature of JSs prototypal inheritance, 
	all values are immediately endowed with the new methds, even 
	values that were created befre the methods were created.
*/

/* == Recursion, pg.34 == */
/*
* A recursive function is a function that calls itself either
	directly or indirectly.
* Recursive functions can be very effective in manipulating tree
	structures such as the browser's DOM. Each recursive call is
	given a smaller piece of the tree to work on.
*/

//Define a walk_the_DOM function that visits every node of the tree
//in HTML source order, starting from some given node. It invokes
//a function, passing it each node in turn. walk_the_DOM calls itself
//to process each of the child node.

var walk_the_DOM = function walk(node,func){
	func(node);
	node = node.firstChild;
	while(node){
		walk(node,func);
		node = node.nextSibling;
	}
};

//Define a getElementsByAttribute function. It takes an attribute
//name string and an optional matching value. It calls walk_the_DOM
//passing it a function that looks for an attribute name, in the node.
//The matching nodes are accumulated in a result array

var getElementsByAttribute = function(att,value){
	var results = [];

	walk_the_DOM(document.body,function(node){
		var actual = node.nodeType === 1 && node.getAttribute(att);
		if(typeof actual === 'string' && 
			(actual == value || typeof value !== 'string')){
			results.push(node);
		}
	});

	return results;
};

/*
* JavaScipt does not currently provide tail recursion optimization.
	Functions that recurse very deeply can fail by exhausting
	the result stack.
*/

//Make a factorial function with tail recursion. It is tail recursive
//because it returns the result of calling itself

//JavaScript does not currently optimize this form

var factorial = function factorial(i,a){
	a = a || 1;
	if(i<2){
		return a;
	}
	return factorial(i-1,a*i);
};

console.log(factorial(4));
