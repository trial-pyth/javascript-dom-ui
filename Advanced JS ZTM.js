//call stack  + memory heap

//fill array with 60000 elements
const list = new Array(60).join("1.1").split(".");

function removeItemsFromList() {
  var item = list.pop();

  if (item) {
    setTimeout(removeItemsFromList, 0);
  }
}

removeItemsFromList();

// list

//DYNAMIC SCOPE VS LEXICAL SCOPE
const a = function () {
  console.log("a", this);
  const b = function () {
    console.log(this);
    const c = {
      hi: function () {
        console.log(this);
      },
    };
    c.hi();
  };
  b();
};
a();

const obj = {
  name: "billy",
  sing() {
    console.log("a", this);
    var anotherFunc = function () {
      console.log("b", this);
    };
    return anotherFunc.bind(this);
  },
};
const objArrow = {
  name: "billy",
  sing() {
    console.log("a", this);
    var anotherFunc = () => {
      console.log("b", this);
    };
    anotherFunc();
  },
};
const objSelf = {
  name: "billy",
  sing() {
    console.log("a", this);
    var self = this;
    var anotherFunc = () => {
      console.log("b", self);
    };
    anotherFunc();
  },
};
objSelf.sing();
obj.sing()();
objArrow.sing();

//CALL,APPLY,
/* to borrow methods from another object */

//BIND
/* call function with different context or parameters */

function call() {
  console.log("hi");
}

call();
call.call();

const wizard = {
  name: "Merlin",
  health: 50,
  heal(num1, num2) {
    return (this.health += num1 + num2);
  },
};

const archer = {
  name: "Robin Hood",
  health: 30,
};
console.log("1", archer);
// wizard.heal.call(archer)
// wizard.heal.call(archer,50,30)
// wizard.heal.apply(archer,[50,30])
const healArcher = wizard.heal.bind(archer, 50, 30); //bind returns new function with a parameter
healArcher();
console.log("2", archer);

//BIND AND CURRYING

//function currying

function multiply(a, b) {
  return a * b;
}

let multiplyBy2 = multiply.bind(this, 2);
console.log(multiplyBy2(4));

var b = {
  name: "Jay",
  say() {
    console.log(this);
  },
};
var c = {
  name: "Jay",
  say() {
    return function () {
      console.log(this);
    };
  },
};
var d = {
  name: "Jay",
  say() {
    return () => console.log(this);
  },
};

b.say();
c.say()();
d.say()();

//CONTEXT VS SCOPE
/* SCOPE - what is the variable access of a function - visibility of variables
 CONTEXT - Object based . What is the this keyword - how the function was invoked
*/

//IIFE
/* // Grouping Operator () creates a lexical scope
(function() {
    // statements
  })();
  // Immediately invokes the function with 2nd set of () */

const array = [1, 2, 3, 3, 52, 4, 6, 34];

function getMaxNumber(arr) {
  //code here
  let maxNumber = -Infinity;
  for (number of array) {
    if (number > maxNumber) {
      maxNumber = number;
    }
  }

  return maxNumber;
}

console.log(getMaxNumber(array));

function bigBrother() {
  function littleBrother() {
    return "it is me!";
  }
  return littleBrother();
  function littleBrother() {
    return "no me!";
  }
}

// Before running this code, what do you think the output is?
console.log(bigBrother());

const character = {
  name: "Simon",
  getCharacter() {
    return this.name;
  },
};
const giveMeTheCharacterNOW = character.getCharacter.bind();

//How Would you fix this?
console.log("?", giveMeTheCharacterNOW.apply(character)); //this should return 'Simon' bud doesn't

//JS TYPES
//NULL - abscence of value
//UNDEFINED - abscence of object

var z = 5;
var v = z;
v++;
console.log(z);
console.log(v);

let obj1 = { name: "Yao", password: "123" };
let obj2 = obj1;

//TYPE COERCION

for (var i = 0; i < 10; i++) {
  let i = 0;
  console.log(i);
}

// FUNCTIONS

//function constructor

const four = new Function("num", "return num");
console.log(four(4));

function woohoo() {
  console.log("woohoo");
}

woohoo.yell = "ahhhhh";

//functons are first class xitizens JS
let stuff = function hello() {
  console.log("hey");
};

stuff();

function passFunc(fn) {
  fn();
}

passFunc(function () {
  console.log("hi there");
});

function returnFunction() {
  return function returnedFunc() {
    console.log("bye");
  };
}

var returned = returnFunction();
returned();

// returnedFunc()

// HIGHER ORDER FUNCTION

const giveAccessTo = (name) => "Access granted to " + name;

function authenticate(verify) {
  let array = [];
  for (let i = 0; i < verify; i++) {
    array.push(i);
  }
  return true;
}

function letPerson(person, fn) {
  if (person.level === "admin") {
    fn(500000);
  } else if (person.level === "user") {
    fn(100000);
  }

  return giveAccessTo(person.name);
}

console.log(letPerson({ level: "user", name: "Tim" }, authenticate));
console.log(letPerson({ level: "admin", name: "Sally" }, authenticate));

const multiplyBy = (num1) => (num2) => num1 * num2;

const multiplyByTwo = multiplyBy(2);
const multiplyByFive = multiplyBy(5);
console.log(multiplyByTwo(10));
console.log(multiplyByFive(6));

//CLOSURES

function closureA() {
  let grandpa = "grandpa";
  return function b() {
    let father = "father";
    return function c() {
      let son = "son";
      return `${grandpa}>${father}>${son}`;
    };
  };
}

console.log(closureA()()());

//CLOSURES AND MEMORY
//Memory efficient

function heavyDuty(index) {
  const bigArray = new Array(7000).fill("/");
  console.log("created");
  return bigArray[index];
}

console.log(heavyDuty(688));
console.log(heavyDuty(688));

const getHeavyDuty = heavyDuty2();
console.log(getHeavyDuty(688));
console.log(getHeavyDuty(688));
console.log(getHeavyDuty(688));

function heavyDuty2() {
  const bigArray = new Array(7000).fill("/");
  console.log("created Again");
  return function (index) {
    return bigArray[index];
  };
}

//ENCAPSULATION
const makeNuclearButton = () => {
  let timeWithoutDestruction = 0;
  const passTime = () => timeWithoutDestruction++;
  const totalPeaceTime = () => timeWithoutDestruction;
  const launch = () => {
    timeWithoutDestruction = -1;
    return "Boom";
  };
  setInterval(passTime, 1000);

  return {
    totalPeaceTime: totalPeaceTime,
  };
};

const ohno = makeNuclearButton();
console.log(ohno.totalPeaceTime());
console.log(ohno.totalPeaceTime());
// console.log(ohno.launch())

let view;
function intialize() {
  let called = 0;
  return function () {
    if (called > 0) {
      return;
    } else {
      view = "init";
      called++;
      console.log("view has been set");
    }
  };
  // view="init";
  // console.log("View has been set!")
}

const startOnce = intialize();
startOnce();
startOnce();

const arrayNum = [1, 2, 3, 4];
for (let i = 0; i < arrayNum.length; i++) {
  setTimeout(function () {
    console.log("I am at index" + i);
  }, 3000);
}

//PROTOTYPAL INHERITANCE
const arrayProto = [];
arrayProto.__proto__;

const array = [];
console.log(array.__proto__.__proto__);
console.log(array.__proto__.hasOwnProperty("map"));
console.log(array.hasOwnProperty("map"));
console.log(array.__proto__ === Array.prototype);

function a() {}
console.log(a.__proto__.__proto__);

const obj1 = {};
console.log(obj1.__proto__);

let dragon = {
  name: "Tanya",
  fire: true,
  fight() {
    return 5;
  },
  sing() {
    if (this.fire) {
      return `I am ${this.name}, the breather of fire`;
    }
  },
};

let lizard = {
  name: "Kiki",
  fight() {
    return 1;
  },
};

lizard.__proto__ = dragon;
console.log(lizard.fire);
console.log(lizard.fight());
console.log(dragon.isPrototypeOf(lizard));
console.log(Object.keys(lizard));
for (let prop in lizard) {
  if (lizard.hasOwnProperty(prop)) {
    console.log(prop);
  }
}

const obj = { name: "Sally" };
console.log(obj.hasOwnProperty("name"));
function a() {}
console.log(a.hasOwnProperty("call"));
console.log(a.hasOwnProperty("apply"));
console.log(a.hasOwnProperty("bind"));
console.log(a.hasOwnProperty("name"));

function multiplyBy5(num) {
  return num + 5;
}

console.log(multiplyBy5.__proto__.hasOwnProperty("call"));
console.log(multiplyBy5.__proto__.hasOwnProperty("apply"));

let human = {
  mortal: true,
};

let socrates = Object.create(human);
socrates.age = 45;
console.log(socrates.mortal);
console.log(human.isPrototypeOf(socrates));

//only function have prototype property
console.log(multiplyBy5.prototype);
console.log(multiplyBy5.__proto__ === Function.prototype);

//constructor functions
console.log(typeof Object);
console.log(typeof {});

// OOP

const elfFunctions = {
  attack() {
    return `attack with ` + this.weapon;
  },
};
function createElf(name, weapon) {
  let newElf = Object.create(elfFunctions);
  newElf.name = name;
  newElf.weapon = weapon;
  return newElf;
}

const peter = createElf("Peter", "stones");
console.log(peter.attack());

//CONSTRUCTOR FUNCTION
function Elf(name, weapon) {
  this.name = name;
  this.weapon = weapon;
  console.log("this", this);
}

Elf.prototype.attack = function () {
  return "attack with " + this.weapon;
};
Elf.prototype.build = function () {
  const self = this;
  function building() {
    return self.name + " builds a house";
  }
  // return building.bind(this)
  return building();
};
// Elf.prototype.attack=()=> {
//     return 'attack with ' + this.weapon
// }

const peter2 = new Elf("Peter", "stones");
console.log(peter2.name);

const Elf1 = new Function(
  "name",
  "weapon",
  `this.name=name;
this.weapon=weapon;`
);

const sarah = new Elf1("Sarah", "fireworks");
const sam = Elf1("Sarah", "fireworks");
console.log(sarah.name);
console.log(peter2.attack());
console.log(peter2.__proto__);
console.log(peter2.prototype); //only functions have prototype
console.log(peter2.build());
// console.log(sam.naame)

var aNum = new Number(5);
console.log(typeof aNum);

//CLASSES
class ElfConstructor {
  constructor(name, weapon) {
    (this.name = name), (this.weapon = weapon);
  }
  attack() {
    return "attack with " + this.weapon;
  }
}

const newPeter = new ElfConstructor("Peter", "stones");
console.log(newPeter instanceof ElfConstructor);
console.log(peter instanceof createElf);
console.log(newPeter.attack());
const newSam = new ElfConstructor("Sam", "fire");
console.log(newSam.attack());

// THIS
//new binding this
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person1 = new Person("Xavier", 55);
console.log(person1.name, person1.age);

//implicit binding
const person2 = {
  name: "Karen",
  age: 40,
  hi() {
    console.log("hi" + this.name);
  },
};

//explicit binding
const person3 = {
  name: "Karen",
  age: 40,
  hi: function () {
    console.log("hi" + this.setTimeout);
  }.bind(globalThis),
};

person3.hi();

//arrow functions
const person4 = {
  name: "Karen",
  age: 40,
  hi: function () {
    var inner = () => {
      console.log("hi " + this.name);
    };

    return inner();
  },
};

//INHERITANCE
class Character {
  constructor(elfName, weapon) {
    (this.elfName = elfName), (this.weapon = weapon);
  }
  attack() {
    return "attack with " + this.weapon;
  }
}

class ElfSub extends Character {
  constructor(type) {
    super(name, weapon);
    this.type = type;
  }
}

const fiona = new ElfSub("Fiona", "ninja stars");
console.log(fiona);

const dolby = new Elf("Dolby", "cloth", "house");
console.log(dolby);
console.log(dolby.attack());

class Ogre extends Character {
  constructor(name, weapon, color) {
    super(name, weapon);
    this.color = color;
  }
  makeFort() {
    return "Strongest fort in the world made";
  }
}

const shrek = new Ogre("Shrek", "club", "green");
console.log(shrek.makeFort());

console.log(Ogre.prototype.isPrototypeOf(shrek));
console.log(Ogre.isPrototypeOf(shrek));
console.log(Character.prototype.isPrototypeOf(Ogre.prototype));

console.log(dolby instanceof Elf);
console.log(dolby instanceof Ogre);
console.log(dolby instanceof Character);

//PUBLIC vs PRIVATE

// FUNCTIONAL PROGRAMMING

const user = {
  name: "Kim",
  active: true,
  cart: [],
  purchases: [],
};

//PURE FUNCTIONS

//no side effects
//same input->same output

/* 
const arrayFunc=[1,2,3]
function a(arr) {
    arr.pop()
}

a(arrayFunc);
console.log(arrayFunc) */

const arrayFunc = [1, 2, 3];
function mutateArray(arr) {
  arr.pop();
}

// IDEMPOTENT
// function does what is expected

// iMPERATIVE VS DECLARATIVE

//IMMUTABILITY

//HOF
const hof = (fn) => fn(5);
console.log(
  hof(function a(x) {
    return x;
  })
);

//CLOSURE
const closure = function () {
  let count = 0;
  return function increment() {
    count++;
    console.log(count);
    return count;
  };
};
const incrementFn = closure();
incrementFn();
incrementFn();
incrementFn();

// CURRYING
const curriedMultiply = (a) => (b) => a * b;
console.log(curriedMultiply(5)(3));
const curriedMultiply5 = curriedMultiply(5);
console.log(curriedMultiply5(4));

//PARTIAL APPLICATION
const multiply = (a, b, c) => a * b * c;
const partialMultiplyBy5 = multiply.bind(null, 5);
console.log(partialMultiplyBy5(4, 10));

//MEMOIZATION

function addTo80(n) {
  return n + 80;
}
function memoizedAddTo80() {
  let cache = {};
  return function (n) {
    if (n in cache) {
      return cache[n];
    } else {
      cache[n] = n + 80;
      return cache[n];
    }
  };
}

console.log(memoizedAddTo80()(5));

//COMPOSE AND PIPE
const compose = (f, g) => (data) => f(g(data));
const pipe = (f, g) => (data) => g(f(data));
const mupltiplyBy3 = (num) => num * 3;
const makePositive = (num) => Math.abs(num);
const multiplyBy3AndAbsolute = compose(mupltiplyBy3, makePositive);

console.log(multiplyBy3AndAbsolute(-50));

//ARITY
//no of arguments a function takes

//Amazon example

const userShop = {
  name: "Kim",
  active: true,
  cart: [],
  purchases: [],
};

const composeShop =
  (f, g) =>
  (...args) =>
    f(g(...args));

console.log(
  purchaseItem(
    emptyCart,
    buyItem,
    applyTaxToItems,
    addItemToCart
  )(userShop, { name: "laptop", price: 200 })
);

function purchaseItem(...fns) {
  return fns.reduce(compose);
}

function addItemToCart(userShop, item) {
  const updateCart = userShop.cart.concat(item);
  return Object.assign({}, userShop, { cart: updateCart });
}

function applyTaxToItems(userShop) {
  const { cart } = userShop;
  const taxRate = 1.3;
  const updatedCart = cart.map((item) => {
    return {
      name: item.name,
      price: item.price * tax,
    };
  });
  return;
}

function buyItem(userShop) {
  return userShop;
}

function emptyCart(userShop) {
  return userShop;
}

//ASYNCHRONOUS

setTimeout(() => {
  console.log("1", "is the loneliest number");
}, 0);
setTimeout(() => {
  console.log("2", "can be as bad as one");
}, 10);

//2 JOB QUEUE (MICRO TASK QUEUE > Callback Queue (Tasks Queue))
Promise.resolve("hi").then((data) => console.log("2", data));

//3
console.log("3", "is a crowd");

//PROMISES
/* A promise is an object that may produce a single value some time in the future 
Either a resolved value, or a rejected value
3 possible states - fulfilled, rejected, pending
*/

const promise = new Promise((resolve, reject) => {
  if (true) {
    resolve("worked");
  } else {
    reject("Error, it broke");
  }
});

promise.then((result) => console.log(result));
promise
  .then((result) => result + "!")
  .then((result2) => {
    throw Error;
    console.log(result2);
  })
  .catch((err) => console.log(err));

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "HII");
});
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "POOKIE");
});
const promise4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, "Is it me you're looking for");
});

Promise.all([promise, promise2, promise3, promise4]).then((values) => {
  console.log(values);
});

const urls = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums",
];

Promise.all(
  urls.map((url) => {
    return fetch(url).then((resp) => resp.json());
  })
)
  .then((results) => {
    console.log(results[0]);
    console.log(results[1]);
    console.log(results[2]);
  })
  .catch((err) => console.log(err));

//ASYNC AWAIT
const getData2 = async function () {
  const arrayOfPromises = urls.map((url) => fetch(url));
  for await (let request of arrayOfPromises) {
    const data = await request.json();
    console.log(data);
  }
};

//JOB QUEUE

//PARALLEL, SEQUENTIAL AND RACE
const promisify = (item, delay) =>
  new Promise((resolve) => setTimeout(() => resolve(item), delay));

const a = () => promisify("a", 100);
const b = () => promisify("a", 5000);
const c = () => promisify("a", 3000);
console.log(a(), b(), c());

//parallel
async function parallel() {
  const promises = [a(), b(), c()];
  const [output1, output2, output3] = await Promise.all(promises);
  return `Parallel is done:${output1} ${output2} ${output3}`;
}

parallel().then((data) => console.log(data));

async function race() {
  const promises = [a(), b(), c()];
  const output = await Promise.race(promises);
  return `race is done:${output}`;
}

async function sequence() {
  const output1 = await a();
  const output2 = await b();
  const output3 = await c();

  return `sequence is done:${output1} ${output2} ${output3}`;
}

//THREADS, CONCURRENCY and PARALLELISM

//ERRORS
class authenticateError extends Error {
  constructor(message) {
    super(message);
    this.name = "authenticateError";
    this.snack = "grapes";
  }
}

const a = new authenticateError("oopsie");
console.log(a.snack);
