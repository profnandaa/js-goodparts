/*
Upon a homely object Love can wink.
—William Shakespeare, The Two Gentlemen of Verona
*/

/*
* The simple types of JS are:
	- numbers
	- strings
	- boolean
	- null
	- undefined

* Numbers, strings and boolean are object-liike in that they
 	have methods, but they are immutable

* Object in JS are mutable keyed collections

* Objects in JS:
	- arrays
	- functions
	- regexp
	- objects* 

*/

/* == Object Literals == */

/* example */

var empty_object = {};
var stooge = {
	"first-name" : "Jerome",
	"last-name" : "Howard"
};

console.log(empty_object);
console.log(stooge);

/*

* The quotes around a property's name are optional, if the name is a legal name

* A propety value can be obtained from any expression, including another
	object literal. Objects can nest: 
*/

var flight = {
	airline: "Ocean",
	number: 815,
	departure: {
		IATA : "SYD",
		time : "2014-09-22 14:50",
		city: "Lagos"
	},
	arrival: {
		IATA : "LAX",
		time: "2014-09-23 10:43",
		city : "Nairobi"
	}
};

console.log(flight);

/* == Retrieval == */

/*

* use []
* If the string expression is a constant, and if it is a legal JS name,
	then the . (dot) notation can be used instead (reads better).
*/

stooge["first-name"];
flight.departure.IATA;

/*

* The undefined value is produced if an attempt is made to retrieve a
	nonexistent member

* The || operator can be used to fill in default values:
*/

var middle = stooge["middle-name"] || "(none)";
var status = flight.status || "unknown";

/*

* Attempting to retrieve values from undefined will throw a TypeError
	exception. This can be guarded against with the && operator
*/

flight.equipment;							//undefined
// flight.equipment.model;						//throw "TypeError"
flight.equipment && flight.equipment.model;	//undefined

/* == Update == */
/* 

* A value in an object can be updated by assignment. If the property
	name already exists in the object, the property value is replaced.
*/
stooge['fist-name'] = 'Jerome';

/*

* If teh object does not already have the property name, the object
	is augmented:
*/

stooge['middle-name'] = 'Tony';
stooge.nickname = 'Curly';
flight.equipment = {
	model : 'Boeng 787'
};
flight.status = 'overdue';

console.log(stooge);

/* == Reference == */
/*

* Objects are passed around by reference. They are never copied.
*/

var x = stooge;
x.nickname = 'Curly';
var nick = stooge.nickname;
//nick is 'Curly' because x and stooge are references to teh same obj.

var a = {}, b = {}, c = {};
//a, b and c each refers to a different empty object

a = b = c = {};
//a,b and c all refer to the same empty object

/* == Prototype == */
/*

* Every object is linked to a prototype object from which it 
	can inherit properties

* All objcets created from object literals are linked to 
	Object.prototype, an object that comes standard with JS.

* When you make a new object, you can select the object that should be
	its prototype.

* Simplified mechanism:
	We will add a create method to the object function. The create
	method creates a new object that uses an object as its prototype.
*/

if(typeof Object.create !== 'function'){
	Object.create = function(o){
		var F = function(){};
		F.prototype = o;
		return new F();
	};
}

var another_stooge = Object.create(stooge);

/*
* The prototype link has no effect on updating when we make changes to
	an object, the object's prototype is not touched.
*/

another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';

/*
* The prototype link is used only in retrieval.
	If we try to retrive a property value from an object, and
	if the object lacks the property name, then JS attemptes
	to retrive the property value from the prototype object.
	And if that object is lacking the property, then it goes to it's
	prototype, and so on until the process finally bottoms out with
	Object.prototype. 
	This is called delegation.

* The prototype relationship is a dynamic relationship. If we add a new
	property to a prototype, that property will immediately be visible
	in all of the objects that are based on that prototype:
*/

stooge.profession = 'actor';
another_stooge.profession; //'actor'
console.log(another_stooge);

/*
More on prototype chain in Chap. 6
*/

/*

#Aside:  __proto__ vs prototype 
from http://stackoverflow.com/questions/9959727/proto-vs-prototype-in-javascript

* __proto__ is the actual object that is used in the lookup 
	chain to resolve methods, etc.  prototype is the object 
	that is used to build __proto__ when you create an object with new:

( new Foo ).__proto__ === Foo.prototype
( new Foo ).prototype === undefined

*/

/* == Reflection == */
/*
* Using typeof operator in determining the type of a property:
*/

typeof flight.number;	//'number'
typeof flight.status;	//'string'
typeof flight.arrival;	//'object'
typeof flight.manifest;	//'undefined'

/*
* Some care must be taken because any property on the prototype 
	chain can produce a value:
*/

typeof flight.toString;		//'function'
typeof flight.constructor;	//'function'

/*
* Two approaches dealing with this:
	- Look for and reject function values
	- Use the hasOwnProperty method, which returns true if the object
		has a particular property. It does not look at the prototype
		chain.
*/

flight.hasOwnProperty('number');		//true
flight.hasOwnProperty('constructor')	//false

/* == Enumaration == */
/*
* The for in statement can loop over all of the properties in
	an object. The enumeration will include all the properties - 
	including functions and prototypes that you might not be
	interested in. 
	So it is necessary to filter out the values you don't want.
	The most common filters are the hasOwnProperty method and
	using typeof to exclude functions:
*/

var name;
for(name in another_stooge){
	if(typeof another_stooge[name] != 'function'){
		document.writeln(name + ':' + another_stooge[name]);
	}
}

/*
* Properties appear in any order.
	If you want to assure that properties appear in a particular
	order, it is best to avoid teh for in statement entiresly and
	instead make an array containing the names of the properties in
	the correct order:
*/

var i;
var properties = [
	'first-name',
	'middle-name',
	'last-name',
	'profession'
];
for(i=0; i<properties.length; i += 1){
	document.writeln(properties[i] + ' : '+ another_stooge[properties[i]]);
}


/* == Delete == */
/*
* The delete operator can be used to remove a property from an object.
	It will remove a property from the object if it has one. It will 
	not touch any of the objects in the prototype linkage.

* Removing a property from an object may allow a property from the 
	prototype linkage to shine through:
*/

console.log(another_stooge.nickname);		//'Moe'
//Remove nickname from another_stooge, 
//revealing the nickname of the prototype

delete another_stooge.nickname;

console.log(another_stooge.nickname);		// 'Curly'







