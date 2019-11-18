/**
 * Creating Promise
 */
const p = new Promise((resolve, reject) => {
  // Kick off some async work
  // ...
  setTimeout(() => {
    // resolve(1);
    reject(new Error("message"));
  }, 2000);

  // If operation completed successfully
  // resolve(1);

  // If something went wrong
  // reject(new Error('message'));
});

/**
 * Consuming Promise
 */
p
  // To get the result
  .then(result => console.log("Result", result))
  // To get the error
  .catch(error => console.log("Error", error.message));
