console.log('I am worker');

addEventListener("message", (event) => {
  console.log({event});
});