/**
 * jstructs.Hashtable is a javascript implentation of a Hashtable which uses a javascript object as the actual Hashtable. It can be seen as a wrapper over Hashtable functionality present in javascript objects.
 * @class jstructs.Hashtable
 * @author Mehdi Maujood
 */
jstructs.Hashtable = function () {
    /**
     * Count of elements stored in the hashtable.
     * @member jstructs.Hashtable#_size
     * @access protected
     */
    this._size = 0;

    /**
     * The base object used to store values.
     * @member jstructs.Hashtable#_hashtable
     * @access protected
     */
    this._hashtable = {};
}

/**
 * Converts non-string data to string so they can be used as keys. For example, 
 * javascript objects need to be converted into a unique string before they can be 
 * used as keys in a javascript object.
 * @function jstructs.Hashtable#_toString
 * @access protected
 * @param key key that needs to be represented as a string
 * @returns {string} String representation of the passed value
 */
jstructs.Hashtable.prototype._toString = function (key) {
    if (typeof (key) == 'object') {
        //TODO: Implement a better object-to-string conversion to support older browsers and allow circular references
        return JSON.stringify(key);
    }
    return key.toString();
}

/**
 * Instead of calling hasOwnProperty directly on _hashtable, we use this function
 * to make sure it will be called even if it has been overwritten by the user i.e.
 * if the user has used 'hasOwnProperty' as a key.
 * @function jstructs.Hashtable#_hasOwnProperty
 * @access protected
 * @param property key that will be checked for containment.
 * @returns {boolean} Boolean indicating if the key was present in _hashtable.
 */
jstructs.Hashtable.prototype._hasOwnProperty = function (property) {
    return Object.hasOwnProperty.call(this._hashtable, property);
}

/**
 * Puts a key/value pair in the hashtable. Value will be overwritten if already present.
 * @function jstructs.Hashtable#put
 * @access public
 * @param key Key against which value will be stored
 * @param value Value to be stored against the provided key
 */
jstructs.Hashtable.prototype.put = function (key, value) {
    var strKey = this._toString(key)
    if (!this._hasOwnProperty(strKey)) this._size++;
    this._hashtable[strKey] = value;
}

/**
 * Checks if a key is present in the hashtable.
 * @function jstructs.Hashtable#containsKey
 * @access public
 * @param key Key against which value will be stored
 * @param value Value to be stored against the provided key
 */
jstructs.Hashtable.prototype.containsKey = function (key) {
    return this._hasOwnProperty(this._toString(key));
}

/**
 * Retrieves a value against given key
 * @function jstructs.Hashtable#get
 * @access public
 * @param key Key against which value needs to be retrieved
 * @returns Value stored against the given key and null if key was not found.
 */
jstructs.Hashtable.prototype.get = function (key) {
    var strKey = this._toString(key);
    if (this._hasOwnProperty(strKey))
        return this._hashtable[strKey];
    return null;
}

/**
 * Removes a key/value pair from the hashtable
 * @function jstructs.Hashtable#remove
 * @access public
 * @param key Key for which the key/value pair has to be removed
 */
jstructs.Hashtable.prototype.remove = function (key) {
    var strKey = this._toString(key);
    if (this._hasOwnProperty(strKey)) {
        delete this._hashtable[strKey];
        this._size--;
    }
}

/**
 * Count of key/value pairs currently in the hashtable.
 * @function jstructs.Hashtable#count
 * @access public
 * @returns {int} Count of items in the hashtable.
 */
jstructs.Hashtable.prototype.count = function () {
    return this._size;
}