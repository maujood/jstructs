# jStructs - Data Structures for Javascript

jStructs is a collection of data structures implemented in javascript. Implemented data structures include:

- Linked List

## Highlights

- Fully tested and documented
- Easily extendable

## Examples

### Simple example of using the Linked List

	var myList = new jstructs.LinkedList();
	myList.addAtHead({ foo: 'bar', bar: 'foo' });

### Extending functionality of the structures

For an example, assume that we want to extend the linked list to maintain a count of the number of elements that were added to the head or tail of the linked list. This count is not decremented if items are removed.

	var ChildList = jstructs.LinkedList.extend({
		//Private variables to maintain the counts. Since all properties in javascript 
		//are public, we use underscore as a prefix to identify private variables.
		_headCount: 0,
		_tailCount: 0,

		//Override addAtHead function
		addAtHead: function(element) {
			//Increment the count of variables added to head.
			this._headCount++;
			
			//Call the parent's addAtHead. This is like "super" and "base" from Java and C#.
			this.uber('addAtHead', element);
		},

		addAtTail: function (element) {
			//Increment the count of variables added to tail.
			this._tailCount++;

			//Call the parent's addAtTail
			this.uber('addAtTail', element);
		},

		getHeadCount: function () {
			return this._headCount;
		},

		getTailCount: function () {
			return this._tailCount;
		}
	});