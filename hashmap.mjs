// if (index < 0 || index >= buckets.length) {
//     throw new Error("Trying to access index out of bound");
// }

import LinkedList from './linked-list.mjs';

class HashMap {
    constructor() {
        this.arr = [];
        this.capacity = 16;
        this.loadFactor = 0.75;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            // Apply modulo by capacity on each iteration
            // to prevent integers from getting too big
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    set(key, value) {
        // First check if a new entry will go over the load factor threshold

        const index = this.hash(key);
        // Create new linked list if the bucket is empty
        if (!this.arr[index]) {
            console.log('Making new linked list in this bucket');
            const list = new LinkedList();
            list.append({key, value});
            this.arr[index] = list;
        } else {
            // Iterate to check if a key already exists
            // IF key exists, update the value
            // ELSE append to the list
            let cur = this.arr[index].head;
            while (cur != null) {
                if (cur.value.key === key) {
                    console.log(`Updating the existing key's value`);
                    cur.value.value = value;
                    return;
                }
                cur = cur.nextNode;
            }
            console.log('Appending a new key to the same bucket');
            this.arr[index].append({key, value});
        }
    }

    get(key) {
        const index = this.hash(key);
        if (!this.arr[index]) {
            return null;
        }

        let cur = this.arr[index].head;
        while (cur != null) {
            if (cur.value.key === key) {
                return cur.value.value;
            }
            cur = cur.nextNode;
        }
        return null;
    }

    has(key) {
        const index = this.hash(key);
        if (!this.arr[index]) {
            return false;
        }

        let cur = this.arr[index].head;
        while (cur != null) {
            if (cur.value.key === key) {
                return true;
            }
            cur = cur.nextNode;
        }
        return false;
    }

    remove(key) {
        const index = this.hash(key);
        if (!this.arr[index]) {
            return false;
        }

        let cur = this.arr[index].head;
        let i = 0;
        while (cur != null) {
            if (cur.value.key === key) {
                // remove the key and return true
                this.arr[index].removeAt(i);
                return true;
            }
            cur = cur.nextNode;
            i++;
        }

        return false;
    }

    length() {
        let sum = 0;
        for (let i = 0; i < this.capacity; i++) {
            if (this.arr[i]) {
                sum += this.arr[i].size();
            }
        }

        return sum;
    }

    clear() {
        this.arr = [];
        this.capacity = 16;
    }

    keys() {
        const keysArray = [];
        for (let i = 0; i < this.capacity; i++) {
            if (this.arr[i]) {
                let cur = this.arr[i].head;
                while (cur != null) {
                    keysArray.push(cur.value.key);
                    cur = cur.nextNode;
                }
            }
        }

        return keysArray;
    }

    values() {
        const valuesArray = [];
        for (let i = 0; i < this.capacity; i++) {
            if (this.arr[i]) {
                let cur = this.arr[i].head;
                while (cur != null) {
                    valuesArray.push(cur.value.value);
                    cur = cur.nextNode;
                }
            }
        }

        return valuesArray;
    }

    entries() {
        const entriesArray = [];
        for (let i = 0; i < this.capacity; i++) {
            if (this.arr[i]) {
                let cur = this.arr[i].head;
                while (cur != null) {
                    const pair = [cur.value.key, cur.value.value];
                    entriesArray.push(pair);
                    cur = cur.nextNode;
                }
            }
        }

        return entriesArray;
    }

    isFull() {
        const threshold = this.capacity * this.loadFactor;
        if (this.length() > threshold) {
            return true;
        }
        return false;
    }
}

const test = new HashMap();
console.log(test.hash('John'));

test.set('John', 'Park');
test.set('john', 'bach');
test.set('Claire', 'Park');
test.set('Jaden', 'Park');
test.set('Caitlyn', 'Park');
// console.log(test.arr[11]);

console.log(test.get('Jaden'));
console.log(test.keys());
console.log(test.length());
console.log(test.values());
console.log(test.entries());

console.log(test.isFull());
