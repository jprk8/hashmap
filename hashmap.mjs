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
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    let index = this.hash(key);
    if (index < 0 || index >= this.capacity) {
      throw new Error('Trying to access index out of bound');
    }

    if (!this.arr[index]) {
      const list = new LinkedList();
      list.append({ key, value });
      this.arr[index] = list;
      if (this.isFull()) this.expand();
    } else {
      let cur = this.arr[index].head;
      while (cur != null) {
        if (cur.value.key === key) {
          cur.value.value = value;
          return;
        }
        cur = cur.nextNode;
      }
      this.arr[index].append({ key, value });
      if (this.isFull()) this.expand();
    }
  }

  get(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.capacity) {
      throw new Error('Trying to access index out of bound');
    }

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
    if (index < 0 || index >= this.capacity) {
      throw new Error('Trying to access index out of bound');
    }

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
    if (index < 0 || index >= this.capacity) {
      throw new Error('Trying to access index out of bound');
    }

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

  expand() {
    const original = this.entries();
    this.capacity *= 2;
    console.log(`Expanding HashMap capacity to ${this.capacity}`);
    this.clear();
    for (const item of original) {
      this.set(item[0], item[1]);
    }
  }
}

const test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
console.log(test.entries());

test.set('kite', 'clear');
console.log(test.entries());

test.set('moon', 'silver');
console.log(test.entries());
