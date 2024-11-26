const worker = require('node:worker_threads'); 
console.log('i m main');
const myWorker = new Worker(new URL("worker.js", import.meta.url));