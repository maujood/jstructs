QUnit.module("Linked List");

QUnit.test("Create linked list", function (assert) {
    var list = new jstructs.LinkedList();
    assert.ok(true, "LinkedList constructor called without errors");
});

QUnit.test("Add at head", function (assert) {
    var list = new jstructs.LinkedList();
    list.addAtHead(3);
    assert.deepEqual(
        list.toArray(), 
        [3], 
        "1 item added succesfully");

    list.addAtHead(4);
    list.addAtHead(5);
    assert.deepEqual(
        list.toArray(),
        [5, 4, 3],
        "3 items added succesfully");

    assert.equal(list.getSize(), 3, "List size maintained correctly");
});

QUnit.test("Remove from head", function (assert) {
    var list = new jstructs.LinkedList();
    list.addAtHead(3);
    list.addAtHead(5);
    list.addAtHead(4);
    assert.equal(list.removeFromHead(), 4, "Correct item returned");
    assert.deepEqual(
        list.toArray(),
        [5, 3],
        "1 item removed succesfully");
    list.removeFromHead();
    assert.deepEqual(
        list.toArray(),
        [3],
        "2 items removed succesfully");
    list.removeFromHead();
    assert.equal(list.toArray().length, 0, "Last item removed succesfully");
    assert.equal(list.getSize(), 0, "List size maintained properly")
});

QUnit.test("Add at tail", function (assert) {
    var list = new jstructs.LinkedList();
    list.addAtTail(3);
    assert.deepEqual(list.toArray(), [3], "1 item added succesfully");
    list.addAtTail(4);
    list.addAtTail(5);
    assert.deepEqual(list.toArray(), [3, 4, 5], "3 items added succesfully");
    assert.equal(list.getSize(), 3, "Size maintained properly");
});

QUnit.test("Remove from tail", function (assert) {
    var list = new jstructs.LinkedList();
    list.addAtTail(3);
    list.addAtTail(2);
    list.addAtTail(1);
    assert.equal(list.removeFromTail(), 1, "Correct item returned");
    assert.deepEqual(list.toArray(), [3, 2], "1 item removed succesfully");

    list.removeFromTail();
    assert.deepEqual(list.toArray(), [3], "2 items removed succesfully");

    list.removeFromTail();
    assert.equal(list.toArray().length, 0, "All items removed succesfully");
    assert.equal(list.getSize(), 0, "Size maintained properly");
});

QUnit.test("First and last", function (assert) {
    var list = new jstructs.LinkedList();
    assert.equal(list.first(), null, "First null if list empty"),
    assert.equal(list.last(), null, "Last null if list empty"),
    list.addAtHead(2);
    list.addAtHead(4);
    list.addAtHead(6);

    assert.equal(list.first(), 6, "First element retrieved succesfully");
    assert.equal(list.last(), 2, "Last element retrieved succesfully");
});

QUnit.test("To array", function (assert) {
    var list = new jstructs.LinkedList();
    list.addAtHead(2);
    list.addAtHead(5);
    list.addAtHead(6);
    assert.deepEqual(list.toArray(), [6, 5, 2], "Conversion to array done correctly");
    assert.deepEqual(
        list.toArray(function (i, item) { return item % 2 == 0; }),
        [6, 2],
        "Conversion to array with filtering works correctly");
});

QUnit.test("Element at index", function (assert) {
    var list = new jstructs.LinkedList();
    list.addAtHead(2);
    list.addAtHead(3);
    list.addAtHead(4);
    assert.equal(list.elementAt(-1), null, "Null on index less than 0");
    assert.equal(list.elementAt(3), null, "Null on index less greater or equal to size");
    assert.deepEqual(list.elementAt(0), 4, "Correct value on index 0");
    assert.deepEqual(list.elementAt(1), 3, "Correct value on index 1");
    assert.deepEqual(list.elementAt(2), 2, "Correct value on index 2");
});

QUnit.test("Remove at index", function (assert) {
    var list = new jstructs.LinkedList();
    list.addAtHead(2);
    list.addAtHead(3);
    list.addAtHead(4);

    assert.equal(list.removeAtIndex(-1), null, "Element at index less than 0 returns null");
    assert.equal(list.removeAtIndex(3), null, "Element at index greater or equal to size returns null");
    assert.equal(list.getSize(), 3, "Size maintained properly");
    assert.deepEqual(list.toArray(), [4, 3, 2], "List maintained properly");

    assert.equal(list.removeAtIndex(1), 3, "Element at index 1 retrieved properly");
    assert.equal(list.getSize(), 2, "Size maintained properly");
    assert.deepEqual(list.toArray(), [4, 2], "List maintained properly");

    list.addAtHead(6);
    assert.equal(list.removeAtIndex(0), 6, "Element at index 0 retrieved properly");
    assert.equal(list.getSize(), 2, "Size maintained properly");
    assert.deepEqual(list.toArray(), [4, 2], "List maintained properly");

    list.addAtHead(6);
    assert.equal(list.removeAtIndex(2), 2, "Element at index 2 retrieved properly");
    assert.equal(list.getSize(), 2, "Size maintained properly");
    assert.deepEqual(list.toArray(), [6, 4], "List maintained properly");
});

QUnit.test("Remove matching elements", function (assert) {
    var list = new jstructs.LinkedList();
    list.addAtHead(6);
    list.addAtHead(3);
    list.addAtHead(2);
    list.addAtHead(5);
    list.addAtHead(6);
    list.addAtHead(6);
    list.addAtHead(7);
    list.removeMatching(function (index, item) { return item % 2 == 1; });
    assert.deepEqual(list.toArray(), [6, 6, 2, 6], "Elements removed using function for filtering");
    list.removeMatching(6);
    assert.deepEqual(list.toArray(), [2], "Elements removed using equality comparison");
});

QUnit.test("Loop over each", function (assert) {
    var list = new jstructs.LinkedList();
    list.addAtHead(2);
    list.addAtHead(4);
    list.addAtHead(6);

    var sum = "";
    var indexSum = "";
    list.each(function (i, item) {
        sum += item;
        indexSum += i;
    });
    assert.equal(sum, "642", "Items iterated correctly");
    assert.equal(indexSum, "012", "Indexes during iteration valid");

    sum = "";
    indexSum = "";
    list.eachReverse(function (i, item) {
        sum += item;
        indexSum += i;
    });
    assert.equal(sum, "246", "Items reverse-iterated correctly");
    assert.equal(indexSum, "210", "Indexes during reverse-iteration valid");
});

QUnit.test("Clear", function (assert) {
    var list = new jstructs.LinkedList();
    list.addAtHead(2);
    list.addAtHead(3);
    list.addAtHead(4);
    list.clear();
    assert.equal(list.getSize(), 0, "Size maintained properly");
    assert.deepEqual(list.toArray(), [], "Contents cleared properly");
});

QUnit.test("Extends", function (assert) {
    var ChildList = jstructs.LinkedList.extend({
        changeSize: function () {
            this._size = 10;
        },

        addAtHead: function (element) {
            this._size++;
            this.uber('addAtHead', element);
        }
    });

    var myList = new ChildList()
    myList.addAtHead(2);
    myList.addAtHead(3);
    assert.deepEqual(myList.toArray(), [3, 2], 'Parent-calling child function worked properly');
    assert.equal(myList.getSize(), 4, 'Child object augments size properly');
    myList.changeSize();
    assert.equal(myList.getSize(), 10, 'Simple child function worked properly');
});

QUnit.module("Hashtable");

QUnit.test("Hashtable with strings: put, get, delete, count", function (assert) {
    var hashtable = new jstructs.Hashtable();
    assert.equal(hashtable.count(), 0, 'Count initially 0');
    hashtable.put('value1', 10);
    hashtable.put('value2', 20);
    assert.equal(hashtable.count(), 2, 'Values inserted correctly');
    assert.equal(hashtable.get('value1'), 10, 'Values retrieved properly');
    hashtable.remove('value2', 20);
    assert.equal(hashtable.get('value2'), null, 'Value deleted properly');
    assert.equal(hashtable.count(), 1, 'Count maintained properly');
});

QUnit.test("Key containment checked properly", function (assert) {
    var hashtable = new jstructs.Hashtable();
    hashtable.put('value1', 10);
    assert.ok(hashtable.containsKey('value1'), 'Contains key works properly');
    assert.ok(!hashtable.containsKey('constructor'), 'Contains key works properly');
});

QUnit.test("Special values work as keys", function (assert) {
    var hashtable = new jstructs.Hashtable();
    hashtable.put('hasOwnProperty', 10);
    //hashtable.put('__proto__', 20);
    hashtable.put('constructor', 10);
    assert.equal(hashtable.count(), 2, 'special values inserted correctly');
    assert.equal(hashtable.get('hasOwnProperty'), 10, 'hasOwnProperty works as a key');
    //assert.equal(hashtable.get('__proto__'), 20, '__proto__ works as a key');
    assert.equal(hashtable.get('constructor'), 10, 'constructor works as a key');
    hashtable.remove('hasOwnProperty');
    assert.ok(!hashtable.containsKey('hasOwnProperty'), 'hasOwnProperty removed correctly');
    assert.equal(hashtable.count(), 1, 'Count maintained properly');
});

QUnit.test("Objects work as keys", function (assert) {
    var hashtable = new jstructs.Hashtable();
    var obj1 = { key: 'value' };
    var obj2 = { key: 'value2' };
    var obj3 = { key2: 'value' };
    var obj4 = { key: 'value' };
    hashtable.put(obj1, 10);
    hashtable.put(obj2, 20);
    hashtable.put(obj3, 30);
    hashtable.put(obj4, 40);
    assert.equal(hashtable.count(), 3, 'Key/value pairs saved properly');
    assert.equal(hashtable.get(obj1), 40, 'First value retrieved properly');
    assert.equal(hashtable.get(obj2), 20, 'Second value retrieved properly');
    assert.equal(hashtable.get(obj3), 30, 'Third value retrieved properly');
});