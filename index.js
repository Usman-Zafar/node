"use strict";

// // let user = {
// //   name: "Usman",
// //   address: "H12 Sector",

// //   speak: function speak() {
// //     console.log("~~~~~~~~~~~~~~~~~~~~Speaking~~~~~~~~~~~~~~~~~~~~");
// //     return "Lol";
// //   },
// // };
// // console.log("~~~~~~~~~~~~~~~~~~~~User~~~~~~~~~~~~~~~~~~~~", user.name);
// // console.log("~~~~~~~~~~~~~~~~~~~~User~~~~~~~~~~~~~~~~~~~~", user.speak());

// // const numbers = [1, 34, 43, 56, 67];
// // const number2 = [...user];

// // user = {
// //   name: "Mohammad Usman Zafar",
// //   address: "H-12",
// // };
// // user2 = { ...user };

// // console.log("Are Equal``````", user == user2);

// let User = {
//   name: "Mohammad Usman Zafar",
//   address: {
//     town: "Islamabad",
//     sector: "H-12",
//   },
// };

// const { address } = User;
// // console.log("town-----", address);

// name1 = User.name;
// name1 = "Umar";
// address.town = "Lahore";
// console.log("address", User.address);
// console.log("Name````", User.name);

let nums = [1, 2, 2, 3, 4];
console.log([...new Set(nums)]); //Set is a new datatype which doesnt allow duplicate values. to make it back to an array we used spread operator

let func = function () {
  {
    let l = "let"; //let scope is just inside its own block var on the other hand exist even outside its block.
    var v = "var";
  }
  console.log(l);
  console.log(v);
};

//func();

console.log(5 < 6 < 7); //This happens cause the first 2 values are compared and that gives an ans true and true value (1) is compared with last value which results it in being true or false
console.log(7 > 6 > 5);

//The arguments is an object which is local to a function.
//You can think of it as a local variable that is available with all functions by default except arrow functions in JavaScript.
//This object (arguments) is used to access the parameter passed to a function. It is only available within a function.

let profile = {
  name: "inTech",
  //address: "JT",
};

//Object.freeze(profile); //Forbades adding or editing  object attributes. If only addiing attributes shouldnt be allowed then instead of using freeze use seal
//profile.postcode = 1234;

//console.log(profile);

Object.defineProperty(profile, "address", {
  value: "JT",
  writable: false,
});

profile.name = "Us";
profile.address = "Cantt";
console.log(profile.address);
