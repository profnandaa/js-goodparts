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
flight.equipment.model;						//throw "TypeError"
flight.equipment && flight.equipment.model;	//undefined







