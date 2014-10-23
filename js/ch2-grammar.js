/*I know it well:
I read it in the grammar long ago.
—William Shakespeare, The Tragedy of Titus Andronicus
*/

/*White spaces */

// /*  */ are not safe for commenting out blocks of code,
// esp. for code with regular expression e.g.

//	/*
//	var rm_a = /a*/.match(s);
//	*/

/*Names */
/* reserved names:
abstract
boolean break byte
case catch char class const continue
debugger default delete do double
else enum export extends
false final finally float for function
goto
if implements import in instanceof int interface
long
native new null
package private protected public
return
short static super switch synchronized
this throw throws transient true try typeof
var volatile void
while with

*/

/*Numbers*/

/*
- JS has a single number type. Internally represented as a 64-bit floating
 point, the same as Java's double.

- Upside: problems of overlow in short intergets are completely avoided;
	a large class of number type errors are avoided.

- Value NaN is a number value that is the result of an operation that 
cannot produce a normal result. NaN is not equal to any value, including 
itself! You can detect NaN with the isNaN(number) function.

- JS has a Math object that contains a set of methods that act on numbers. 
e.g. Math.floor(number) method can be used to convert a number into 
an integer

*/



