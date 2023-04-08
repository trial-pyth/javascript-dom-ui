//JS closures

//global scope
let x = 1;

const parentFunction = () => {
  //local scope
  let myValue = 2;
  console.log(x);
  console.log(myValue);

  const childFuntion = () => {
    console.log((x += 5));
    console.log((myValue += 1));
  };

  return childFuntion;
};

const result = parentFunction();
// console.log(result)
result();
result();
result();
console.log(x);
// console.log(myValue)

//IIFE
const privateCounter = (() => {
  let count = 0;
  console.log(`initial value: ${count}`);
  return () => {
    count += 1;
    console.log(count);
  };
})();

privateCounter();
privateCounter();
privateCounter();

const credits = ((num) => {
  let credits = num;
  console.log(`initial credits value:${credits}`);

  return () => {
    credits -= 1;
    if (credits > 0)
      console.log(`playing game, ${credits} credit(s) remaining`);
    if (credits <= 0) console.log(`not enough credits`);
  };
})(3);

credits();
credits();
credits();

//protypes

//object literals
const person = {
  alive: true,
};

const musician = {
  plays: true,
};

musician.__proto__ = person;

// console.log(musician.plays)
// console.log(musician.alive)

Object.setPrototypeOf(musician, person);
console.log(Object.getPrototypeOf(musician));
console.log(Object.getPrototypeOf(musician) === musician.__proto__);

console.log(Object.keys(musician));

const guitarist = {
  strings: 6,
  __proto__: musician,
};

console.log(guitarist.alive);
console.log(guitarist.plays);
console.log(guitarist.strings);

//object with getter and setter

const car = {
  doors: 2,
  seats: "vinyl",
  get seatMaterial() {
    return this.seats;
  },

  set seatMaterial(material) {
    this.seats = material;
  },
};

const luxuryCar = {};

Object.setPrototypeOf(luxuryCar, car);
console.log(luxuryCar.__proto__);
luxuryCar.seatMaterial = "leather";

console.log(luxuryCar.valueOf());

//getting the keys of an object
console.log(Object.keys(luxuryCar));

Object.keys(luxuryCar).forEach((key, i, array) => {
  console.log(key);
});

console.log(luxuryCar);
for (let key in luxuryCar) {
  console.log(key);
}

function Animal(species) {
  this.species = species;
  this.eats = true;
}

Animal.prototype.walks = function () {
  return `A ${this.species} is walking`;
};

const Bear = new Animal("bear");

console.log(Bear.species);
console.log(Bear.walks());

//The prototype property is wherre inheritable props and methods are
console.log(Bear.__proto__);
console.log(Animal.prototype);
console.log(Bear.__proto__ === Animal.prototype);
console.log(Bear instanceof Animal);
console.log(Bear);

//ES6 classes and examples of inheritance

class Vehicle {
  constructor() {
    (this.wheels = 4), (this.motorized = true);
  }

  ready() {
    return "Ready to go!";
  }
}

class Motorcycle extends Vehicle {
  constructor() {
    super();
    this.wheels = 2;
  }

  wheelie() {
    return "On one wheel now!";
  }
}

const myBike = new Motorcycle();
console.log(myBike);
console.log(myBike.wheels);
console.log(myBike.ready());
console.log(myBike.wheelie());

//RECURSION

//continuation token from API

const getAWSProductIdImages = async () => {
  if (DataTransfer.isTruncated) {
    return await getAWSProductIdImages(
      productId,
      s3,
      resultArray,
      data.NextContinuationToken
    );
  }

  return resultArray;
};

// 2) A Parser:
// a company directory
// a file directory
// the DOM - a web crawler
// An XML or JSON data export

// Export from your streaming service like Spotify, YT Music, etc.

const artistsByGenre = {
  jazz: ["Miles Davis", "John Coltrane"],
  rock: {
    classic: ["Bob Seger", "The Eagles"],
    hair: ["Def Leppard", "Whitesnake", "Poison"],
    alt: {
      classic: ["Pearl Jam", "The Killers"],
      current: ["Joywave", "Sir Sly"],
    },
  },
  unclassified: {
    new: ["Caamp", "Neil Young"],
    classic: ["Seal", "Morcheeba", "Chris Stapleton"],
  },
};

const getArtistNames = (dataObj, arr = []) => {
  Object.keys(dataObj).forEach((key) => {
    if (Array.isArray(dataObj[key])) {
      return dataObj[key].forEach((artist) => {
        arr.push(artist);
      });
    }
    getArtistNames(dataObj[key], arr);
  });
  return arr;
};

console.log(getArtistNames(artistsByGenre));

//DECORATORS

//decorators wrap a function in another function

//these wrappers "decorate" the original function with new capabilities

//using closure to log how many times a function is called

let sum = (...args) => {
  return [...args].reduce((acc, num) => acc + num);
};

const callCounter = (fn) => {
  let count = 0;

  return (...args) => {
    //write to logs,console,db, etc
    console.log(`sum has been called ${(count += 1)} times`);

    return fn(...args);
  };
};

sum = callCounter(sum);

console.log(sum(2, 3, 5));
console.log(sum(1, 5));
console.log(sum(14, 5));

//check for valid data and number of params
let rectangleArea = (length, width) => {
  return length * width;
};

const countParams = (fn) => {
  return (...params) => {
    if (params.length !== fn.length) {
      throw new Error(`Incorrect number of params ${fn.name}`);
    }

    return fn(...params);
  };
};

// A decorator that requires integers
const requireIntegers = (fn) => {
  const name = fn.name;
  return (name, ...params) => {
    console.log("requireIntegers");
    params.forEach((param) => {
      if (!Number.isInteger(param)) {
        throw new TypeError(`Params for ${name} must be integers`);
      }
    });
    return fn(...params);
  };
};

rectangleArea = countParams(rectangleArea);
rectangleArea = requireIntegers(rectangleArea);
// console.log(rectangleArea(20,30))
// console.log(rectangleArea(20,30,40))
// console.log(rectangleArea(20,"hey"))

//decorating an async api call gunction

let requestData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const dataResponseTime = (fn) => {
  return async (url) => {
    console.time("fn");
    const data = await fn(url);
    console.timeEnd("fn");
    return data;
  };
};

const myTestFunction = async () => {
  requestData = dataResponseTime(requestData);
  const data = await requestData("https://jsonplaceholder.typicode.com/posts");
  console.log(data);
};

myTestFunction();

//CURRYING

//takes a funcition that recieves more than one parameter and breaks it into a series of unary (one parameter) functions

//a curried function only takes one paramaeter at a time

const buildSandwich = (ingredient1) => {
  return (ingredient2) => {
    return (ingredient3) => {
      return `${ingredient1},${ingredient2},${ingredient3}`;
    };
  };
};

const mySandwich = buildSandwich("Bacon")("lettuce")("tomato");

console.log(mySandwich);

const buildSammy = (ingred1) => (ingred2) => (ingred3) =>
  `${ingred1} ${ingred2} ${ingred3}`;

const addCustomer =
  (fn) =>
  (...args) => {
    console.log("saving customer info...");

    return fn(...args);
  };

const processOrder =
  (fn) =>
  (...args) => {
    console.log(`processing order #${args[0]}`);
    return fn(...args);
  };

let completeOrder = (...args) => {
  console.log(`Order #${[...args].toString()} completed`);
};

completeOrder = processOrder(completeOrder);
console.log(completeOrder);
completeOrder = addCustomer(completeOrder);
completeOrder("1000");

//IMPURE FUNCTION

const addToScoreHistory = (array, score) => {
  array.push(score);
  return array;
};

const scoreArray = [44, 23, 12];
console.log(addToScoreHistory(scoreArray, 14));

//shallow copy vs deep copy

//shallow copy

//spread opartor
const zArray = [...scoreArray, 10];
console.log(zArray);
//Object.freeze()
const scoreObj = {
  first: 44,
  second: 12,
  third: { a: 1, b: 2 },
};

Object.freeze(scoreObj);
scoreObj.third.a = 8;
console.log(scoreObj);

//deep copy is needed to avoid mutation
const newScoreObj = JSON.parse(JSON.stringify(scoreObj));
console.log(newScoreObj);
console.log(newScoreObj === scoreObj);

const deepClone = (obj) => {
  if (typeof obj !== "object" || obj === null) return obj;

  const newObject = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    const value = obj[key];
    newObject[key] = deepClone(value);
  }

  return newObject;
};

//PURE FUNCTIONS
//clean code, easy to test, decoupled and independent

// IIFE
(() => {
  //...code
})();

(function myIIFE() {
  num++;
  console.log(num);
  return num !== 5 ? myIIFE(num) : console.log("finished");
})((num = 0));

//global
const t = "whatever";

// const helloWorld=()=>"Hello World!"

//isolate declarations within the function
(() => {
  const t = "iife whatever";
  const helloWorld = () => "Hello IIFE";
  console.log(x);
  console.log(helloWorld());
})();

console.log(t);
// console.log(helloWorld())

//Private variables and Methods from closure

const increment = (() => {
  let counter = 0;
  console.log(counter);
  const credits = (num) => console.log(`I have ${num} credit(s).`);
  return () => {
    counter++;
    credits(counter);
  };
})();

increment();
increment();
credits(3); //ref error

//Modules Patters

const Score = (() => {
  let count = 0;

  return {
    current: () => {
      return count;
    },
    increment: () => {
      count++;
    },
    reset: () => {
      count = 0;
    },
  };
})();

Score.increment();
console.log(Score.current());
Score.increment();
console.log(Score.current());
Score.reset();
console.log(Score.current());

//revealing pattern
const Game = (() => {
  let count = 0;
  const current = () => {
    return `Game score is ${count}.`;
  };
  const increment = () => {
    count++;
  };
  const reset = () => {
    count = 0;
  };

  return {
    current,
    increment,
    reset,
  };
})();

Game.increment();
console.log(Game.current());

//injecting a namespace object

// ((namespace)=>{
//     namespace.count=0
//     namespace.current=function(){return `App cpunt is ${this.count}.`}
//     namespace.increment=function(){this.count++}
//     namespace.reset=function(){this.count=0}

// })(window.App=window.App || {})

// App.increment()

//HOISTING
const initApp = () => {
  stepOne();
};

const stepOne = () => {
  console.log("step one");
};

//FUNCTIONAL PROGRAMMING

//function composition

const add2 = (x) => x + 2;
const subtract1 = (x) => x - 1;
const multiplyBy5 = (x) => x * 5;

const compose =
  (...fns) =>
  (val) =>
    fns.reduceRight((prev, fn) => fn(prev), val);

const compResult = compose(multiplyBy5, subtract1, add2)(4);
console.log(compResult);

const pipe =
  (...fns) =>
  (val) =>
    fns.reduce((prev, fn) => fn(prev), val);

const piperesult = pipe(add2, subtract1, multiplyBy5)(5);
console.log(piperesult);

//pointer free parameter, more than one parameter
const divideBy = (divisor, num) => num / divisor;

const pipeResult3 = pipe(add2, subtract1, multiplyBy5, (x) => divideBy(2, x))(
  5
);

console.log(pipeResult3);

const divBy = (divisor) => (num) => num / divisor;
const divideBy2 = divBy(2);

const lorem =
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum beatae nisi temporibus velit, non dignissimos, tempore expedita voluptate cupiditate, laborum tenetur ex consequuntur dolorem nesciunt. Assumenda eaque autem facere, aperiam excepturi iure saepe doloremque, culpa dolor atque architecto repellat commodi nostrum veritatis corporis delectus voluptatum aliquid suscipit voluptatibus dolorem ad?";

const splitOnSpace = (string) => string.split(" ");
const count = (array) => array.length;

const wordCount = pipe(splitOnSpace, count);
console.log(wordCount(lorem));

//combine processes

const pal1 = "taco cat";
const pal2 = "UFO tofu";
const pal3 = "Dave";

const split = (string) => string.split("");
const join = (string) => string.join("");
const lower = (string) => string.toLowerCase();
const reverse = (array) => array.reverse();

const fwd = pipe(splitOnSpace, join, lower);
const rev = pipe(fwd, split, reverse, join);

console.log(fwd(pal1) === rev(pal1));
console.log(fwd(pal2) === rev(pal2));
console.log(fwd(pal3) === rev(pal3));

//clone / copy within a pipe or compose function

//3 approaches

//1> clone before impure function mutates it

const scoreObj = { home: 0, away: 0 };
const shallowClone = (obj) => (Array.isArray(obj) ? [...obj] : { ...obj });

const incrementHome = (obj) => {
  obj.home += 1;
  return obj;
};

const homeScore = pipe(shallowClone, incrementHome);

console.log(homeScore(scoreObj));
console.log(scoreObj);
console.log(homeScore(scoreObj) === scoreObj);

// 2)curry the function to create a partial that is unary

let incrementHomeB = (cloneFn) => (obj) => {
  const newObj = cloneFn(obj);
  newObj.home += 1;
  return newObj;
};

//JavaScript Debounce

const initApp = () => {
  const button = document.querySelector("button");
};

//MEMOIZATION

//added to pure functions
//trade memory for speed
