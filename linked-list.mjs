export default class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(value) {
        const item = new Node(value);
        if (this.head === null) {
            this.head = item;
            this.tail = item;
            return;
        }

        this.tail.nextNode = item;
        this.tail = item;
    }

    prepend(value) {
        const item = new Node(value);
        if (this.head === null) {
            this.head = item;
            this.tail = item;
            return;
        }

        item.nextNode = this.head;
        this.head = item;
    }

    size() {
        if (this.head === null) return 0;
        let i = 1;
        let cur = this.head;
        while (cur.nextNode != null) {
            cur = cur.nextNode;
            i++;
        }
        return i;
    }

    head() {
        return this.head;
    }

    tail() {
        return this.tail;
    }

    at(index) {
        if (index === 0) return this.head;
        if (index > this.size() - 1) {
            console.log(`Index: ${index} does not exist. (List size is ${this.size()})`);
            return;
        }
        
        let cur = this.head;
        for (let i = 0; i < index; i++) {
            cur = cur.nextNode;
        }

        return cur;
    }

    pop() {
        let cur = this.head;
        // go to the second to last element
        while (cur.nextNode.nextNode != null) {
            cur = cur.nextNode;
        }

        cur.nextNode = null;
        this.tail = cur;
    }

    contains(value) {
        let cur = this.head;
        // Need to iterate through the last element for checking match
        while (cur != null) {
            if (cur.value === value) {
                return true;
            }
            cur = cur.nextNode;
        }
        return false;
    }

    find(value) {
        let cur = this.head;
        let i = 0;
        while (cur != null) {
            if (cur.value === value) {
                return i;
            }
            cur = cur.nextNode;
            i++;
        }
        return null;
    }

    toString() {
        let cur = this.head;
        let str = '';
        while (cur != null) {
            str += `( ${cur.value} ) -> `;
            cur = cur.nextNode;
        }

        return str += cur;
    }

    insertAt(value, index) {
        if (index === 0) {
            this.prepend(value);
            return;
        }

        let cur = this.head;
        for (let i = 0; i < index - 1; i++) {
            cur = cur.nextNode;
        }

        const item = new Node(value, cur.nextNode);
        cur.nextNode = item;
    }

    removeAt(index) {
        if (index === 0) {
            this.head = this.head.nextNode;
            return;
        }

        let cur = this.head;
        for (let i = 0; i < index - 1; i++) {
            cur = cur.nextNode;
        }

        cur.nextNode = cur.nextNode.nextNode;
    }
}

class Node {
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}