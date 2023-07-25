// const apiUrl = "https://jsonplaceholder.typicode.com/posts";

// const fetchData = (url) => {
//   return new Promise((resolve, reject) => {
//     fetch(url)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         resolve(data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

// fetchData(apiUrl)
//   .then((data) => {
//     console.log("Fetched JSON data:", data);
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error);
//   });

//   const apiUrl = "https://jsonplaceholder.typicode.com/posts";

//   const fetchData = async (url) => {
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   (async () => {
//     try {
//       const data = await fetchData(apiUrl);
//       console.log("Fetched JSON data:", data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   })();

function add(a, b) {
  return a + b;
}

function calculate(a, b, operation) {
  return new Promise((resolve, reject) => {
    const result = operation(a, b);
    if (result > 0) {
      resolve("Addition Done");
    } else {
      reject("Cant be Added");
    }
  });
}
calculate(9, 3, add)
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  });
