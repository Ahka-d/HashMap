//LinkedList
class Node {
  constructor(value = null){
    this.value = value
    this.next = null
  }
}
class LinkedList {
  constructor(){
    this.head = null
  }
  append(value){
    let current = this.head
    const newNode = new Node(value)
    if (this.head === null) {
      return this.head = newNode
    }
    while (current.next) {
      current = current.next
    }
    current.next = newNode
    return this.head
  }
  get(value){
    let current = this.head
    while (current) {
      if(current.value.key === value){
        return current.value.value
      }
      current = current.next
    }
    return null
  }
  remove(value){
    let prev = null
    let current = this.head
    while (current) {
      if(current.value.key === value){
        if(current === this.head){
          this.head = current.next
          return true
        }
        prev.next = current.next
        return true
      }
      prev = current
      current = current.next
    }
    return null
  }
  index(){
    let current = this.head
    let count = 0
    while (current) {
      count++
      current = current.next
    }
    return count
  }
  removeAll(){
    while (this.head) {
      this.head = null
    }
  }
  toPrint(){
    let current = this.head
    let result = []
    while (current) {
      result.push(current.value)
      current = current.next
    }
    return result
  }
}
//HashMaP
class HashMap {
  constructor() {
    this.limit = false
    this.space = 16
    this.loadFactor = 0.75
    this.capacity = 0
    this.buckets = []
  }
  growBucket() {
    this.capacity = 0
    this.loadFactor = 2
    this.space = this.space*this.loadFactor
    const arrayEntries = JSON.parse(this.entries())
    this.clear()
    for (let i = 0; i < arrayEntries.length; i++) {
      this.set(arrayEntries[i][0],arrayEntries[i][1])
    }
  }
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i))%this.space;
    }
    
    return hashCode;
  } 
  set(key,value){
    const hashCode = this.hash(key)
    if(!this.buckets[hashCode]){
      this.buckets[hashCode] = new LinkedList()
      this.capacity++
    }
    if(this.capacity===this.space*this.loadFactor&&!this.limit){
      this.growBucket()
      this.limit = true
    }
    this.buckets[hashCode].append({key,value})
    return
  }
  get(key){
    const hashCode = this.hash(key)
    if(this.buckets[hashCode]){
      return this.buckets[hashCode].get(key)
    }
    return null
  }
  has(key){
    const hashCode = this.hash(key)
    if(this.buckets[hashCode]){
      return !(this.buckets[hashCode].get(key))?false:true;
    }
    return false
  }
  remove(key){
    const hashCode = this.hash(key)
    if(this.buckets[hashCode]){
      return !(this.buckets[hashCode].remove(key))?false:true;
    }
    return false
  }
  length(){
    let count = 0
    for (let i = 0; i < this.space; i++) {
      if(this.buckets[i]){
        count += this.buckets[i].index()
      }
    }
    return count
  }
  clear(){
    for (let i = 0; i < this.space; i++) {
      if(this.buckets[i]){
        this.buckets[i].removeAll()
      }
    }
  }
  keys(){
    let arrayKeys = []
    for (let i = 0; i < this.space; i++) {
      if(this.buckets[i]){
        const data = this.buckets[i].toPrint()
        for (let j = 0; j < data.length; j++) {
          arrayKeys.push(data[j].key)
        }
      }
    }
    return arrayKeys?arrayKeys:null
  }
  values(){
    let arrayKeys = []
    for (let i = 0; i < this.space; i++) {
      if(this.buckets[i]){
        const data = this.buckets[i].toPrint()
        for (let j = 0; j < data.length; j++) {
          arrayKeys.push(data[j].value)
        }
      }
    }
    return arrayKeys?arrayKeys:null
  }
  entries(){
    let arrayKeys = []
    for (let i = 0; i < this.space; i++) {
      if(this.buckets[i]){
        const data = this.buckets[i].toPrint()
        for (let j = 0; j < data.length; j++) {
          arrayKeys.push([data[j].key,data[j].value])
        }
      }
    }
    return arrayKeys?JSON.stringify(arrayKeys):null
  }
}
const test = new HashMap()
 test.set('apple', 'red')
 test.set('banana', 'yellow')
 test.set('carrot', 'orange')
 test.set('dog', 'brown')
 test.set('elephant', 'gray')
 test.set('frog', 'green')
 test.set('grape', 'purple')
 test.set('hat', 'black')
 test.set('ice cream', 'white')
 test.set('jacket', 'blue')
 test.set('kite', 'pink')
 test.set('lion', 'golden')
 test.set('applea', 'red')
 test.set('bananaa', 'yellow')
 test.set('carrota', 'orange')
 test.set('doga', 'brown')
console.log(test.entries())
console.log(test.capacity)
 test.set('elephanta', 'gray')
 test.set('apple', 'dsahasdhsadsadsasdahdshadsasadaghsajsa')
console.log(test.entries())
console.log(test.capacity)