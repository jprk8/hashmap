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
        while(cur != null) {
            if (cur.value.key === key) {
                return cur.value.value;
            }
            cur = cur.nextNode;
        }
        return null;
    }
}

const test = new HashMap();
console.log(test.hash('John'));

console.log(test.set('John', 'Park'));
console.log(test.set('john', 'bach'));
console.table(test.arr[11].head);

console.log(test.get('john'));

