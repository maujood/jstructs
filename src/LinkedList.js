/**
 * jstructs.LinkedList is an implementation of a doubly-linked list.
 * @class jstructs.LinkedList
 * @author Mehdi Maujood
 */
jstructs.LinkedList = function () {
    /**
     * Pointer to the head (first element) of the linked list.
     * @member jstructs.LinkedList#_head
     * @access protected
     */
    this._head = null;

    /**
     * Pointer to the tail (last element) of the linked list.
     * @member jstructs.LinkedList#_tail
     * @access protected
     */
    this._tail = null;

    /**
     * Number of elements in the linked list. Objects extending the linked list should also maintain this property.
     * @member jstructs.LinkedList#_size
     * @access protected
     */
    this._size = 0;
}

/**
 * Creates a new node with provided data and null next and previous pointers
 * @function jstructs.LinkedList#_newNode
 * @access protected
 * @param data The data this node will contain.
 * @returns {jstructs.LinkedList.LinkedListNode} A linked list node containing the data with null next and prev pointers.
 */
jstructs.LinkedList.prototype._newNode = function (data) {
    /**
     * @typedef {Object} jstructs.LinkedList.LinkedListNode
     * @property next Pointer to the next node.
     * @property prev Pointer to the previous node.
     * @property data Data contained in the node.
     */
    return {
        next: null,
        prev: null,
        data: data
    };
}

/**
 * Removes the provided node from the linked list.
 * @function jstructs.LinkedList#_removeFromList
 * @access protected
 */
jstructs.LinkedList.prototype._removeFromList = function (node) {
    if (node.prev !== null)
        node.prev.next = node.next;
    else
        this._head = this._head.next;
    if (node.next !== null)
        node.next.prev = node.prev;
    else
        this._tail = this._tail.prev;
    this._size--;
}

/**
 * Adds an element at the head of the linked list.
 * @function jstructs.LinkedList#addAtHead
 * @param data The data to be added to the list
 */
jstructs.LinkedList.prototype.addAtHead = function (data) {
    if (this._head === null) {
        this._head = this._newNode(data);
        this._tail = this._head;
    }
    else {
        var tempHead = this._head;
        this._head = this._newNode(data);
        tempHead.prev = this._head;
        this._head.next = tempHead;
    }
    this._size++;
}

/**
 * Adds an element at the tail of the linked list.
 * @function jstructs.LinkedList#addAtTail
 * @param data The data to be added to the list
 */
jstructs.LinkedList.prototype.addAtTail = function (data) {
    if (this._tail === null) {
        this._tail = this._newNode(data);
        this._head = this._tail;
    }
    else {
        var tempTail = this._tail;
        this._tail = this._newNode(data);
        tempTail.next = this._tail;
        this._tail.prev = tempTail;
    }
    this._size++;
}

/**
 * Removes the element at the head of linked list and returns it. Does nothing if the list is empty.
 * @function jstructs.LinkedList#removeFromHead
 * @returns The removed element 
 */
jstructs.LinkedList.prototype.removeFromHead = function () {
    if (this._head !== null) {
        var data = this._head.data;
        this._head = this._head.next;
        if (this._head !== null)
            this._head.prev = null;
        else
            this._tail = null;
        this._size--;
        return data;
    }
}

/**
 * Removes the element at the tail of linked list and returns it. Does nothing if the list is empty.
 * @function jstructs.LinkedList#removeFromTail
 * @returns The removed element 
 */
jstructs.LinkedList.prototype.removeFromTail = function () {
    if (this._tail !== null) {
        var data = this._tail.data;
        this._tail = this._tail.prev;
        if (this._tail !== null) {
            this._tail.next = null;
        }
        else {
            this._head = null;
        }
        this._size--;
        return data;
    }
}

/**
 * Returns element at the specified index.
 * @function jstructs.LinkedList#elementAt
 * @param index {int} Index of the element to be retrieved
 * @returns The element at specified index or null if index is out of range
 */
jstructs.LinkedList.prototype.elementAt = function (index) {
    if (index < 0 || index >= this._size) return null;
    var tempHead = this._head;
    for (var i = 0; i < index; i++, tempHead = tempHead.next) { }
    return tempHead.data;
}

/**
 * Returns the element stored at the head of the list or null if the list is empty.
 * @function jstructs.LinkedList#first
 * @returns Element stored at head of the list or null if the list is empty
 */
jstructs.LinkedList.prototype.first = function () {
    if (this._head !== null) return this._head.data;
    else return null;
}

/**
 * Returns the element stored at the tail of the list or null if the list is empty.
 * @function jstructs.LinkedList#last
 * @returns Element stored at tail of the list or null if the list is empty
 */
jstructs.LinkedList.prototype.last = function () {
    if (this._tail !== null) return this._tail.data;
    else return null;
}

/**
 * Removes an element from the linked list at the specified index. Returns null if specified index is out of range.
 * @function jstructs.LinkedList#removeAtIndex
 * @param index {int} Index of element to remove
 * @returns The removed element. Null if the supplied index was out of range.
 */
jstructs.LinkedList.prototype.removeAtIndex = function (index) {
    if (index < 0 || index >= this._size) return null;
    var tempHead = this._head;
    for (var i = 0; i < index; i++, tempHead = tempHead.next) { }
    this._removeFromList(tempHead);
    return tempHead.data;
}

/**
 * Removes all elements that match the specified object or function.
 * @function jstructs.LinkedList#removeMatching
 * @param obj Can be any javascript type or a can be a function that recieves a list element and returns a boolean. If a function is supplied, the function will be called on all items and items for which the function returns true will be removed. If the parameter is not a function, a deep equality comparison will be performed to remove items.
 * @example
 * //The following snippet will remove all even numbers
 * //from a linked list of numbers.
 * list.removeMatching(function (index, item) { return item % 2 == 0; });
 * @example
 * //The following snippet will remove all nodes storing 
 * //the specified object using a deep equality comparison.
 * list.removeMatching({ library: 'jstructs', author: 'Mehdi' });
 * @example
 * //The following snippet will remove all nodes storing 
 * //the specified string.
 * list.removeMatching('Hello World');
 */
jstructs.LinkedList.prototype.removeMatching = function (obj) {
    if (typeof (obj) === 'function') {
        for (var i = 0, pointer = this._head; pointer !== null; i++, pointer = pointer.next) {
            if (obj(i, pointer.data)) {
                this._removeFromList(pointer);
            }
        }
    }
    else {
        for (var i = 0, pointer = this._head; pointer !== null; i++, pointer = pointer.next) {
            if (jstructs.utils.equiv(obj, pointer.data)) {
                this._removeFromList(pointer);
            }
        }
    }
}

/**
 * Calls the provided function once on each element of the linked list, starting from the element at head.
 * @function jstructs.LinkedList#each
 * @param fn {function} The function to be called on each element
 * @example
 * //The following code will sum up all elements in a list
 * var sum = 0;
 * list.each(function (i, item) { sum += item; });
 */
jstructs.LinkedList.prototype.each = function (fn) {
    for (var i = 0, pointer = this._head; i < this._size; i++, pointer = pointer.next) {
        fn(i, pointer.data);
    }
};

/**
 * Calls the provided function once on each element of the linked list, starting from the element at tail and moving towards head.
 * @function jstructs.LinkedList#eachReverse
 * @param fn {function} The function to be called on each element
 * @example
 * //The following code will sum up all elements in a list
 * var sum = 0;
 * list.each(function (i, item) { sum += item; });
 */
jstructs.LinkedList.prototype.eachReverse = function (fn) {
    for (var i = this._size - 1, pointer = this._tail; i >= 0; i--, pointer = pointer.prev) {
        fn(i, pointer.data);
    }
}

/**
 * Returns all elements from the linked list as an array.
 * @function jstructs.LinkedList#toArray
 * @param filterFn {Function} Optional parameter. If a function is provided, it will be used to filter elements into the array.
 * @example
 * //The following code will include only the elements at 
 * //odd-numbered indexes in the array.
 * list.toArray(function (i, item) { return i % 2 == 1;});
 */
jstructs.LinkedList.prototype.toArray = function (filterFn) {
    var arr = [];
    if (typeof (filterFn) === 'function')
        for (var pointer = this._head, i = 0; pointer !== null; pointer = pointer.next, i++) {
            if (filterFn(i, pointer.data)) arr.push(pointer.data);
        }
    else
        for (var pointer = this._head; pointer !== null; pointer = pointer.next) {
            arr.push(pointer.data);
        }
    return arr;
}

/**
 * Removes all items from the list.
 * @function jstructs.LinkedList#clear
 */
jstructs.LinkedList.prototype.clear = function () {
    this._head = this._tail = null;
    this._size = 0;
}

/**
 * Returns the number of elements currently stored in the list.
 * @function jstructs.LinkedList#getSize
 * @returns {int} Size of the list
 */
jstructs.LinkedList.prototype.getSize = function () {
    return this._size;
}