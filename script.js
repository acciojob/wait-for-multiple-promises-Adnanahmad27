const output = document.querySelector('#output');

function promiseCreator(delay , data){
	return new Promise((res , rej) =>{
		setTimeout(() => {
			res([data , parseInt(delay/1000)]);
		},delay);
	});
}
const promises = new Array(3);
for(let i=0 ; i<3 ; i++){
	let delay = Math.floor(Math.random()*4);
	promises[i] = promiseCreator(delay*1000 , `Promise ${i+1}`);
	
} 
let newRow = output.insertRow();
newRow.id = 'loading';
let cell = newRow.insertCell();
cell.colSpan = 2;
cell.textContent = "Loading...";
function createPromise(i) {
  return new Promise((resolve, reject) => {
    const delay = Math.random() * 2000 + 1000; // Random delay between 1 and 3 seconds
    setTimeout(() => {
      resolve([`Promise ${i+1}`, delay / 1000]);
    }, delay);
  });
}
/*
// Function to create a promise that resolves after a random time
function createPromise(i) {
  return new Promise((resolve, reject) => {
    const delay = Math.random() * 2000 + 1000; // Random delay between 1 and 3 seconds
    setTimeout(() => {
      resolve([`Promise ${i+1}`, delay / 1000]);
    }, delay);
  });
}

// Create promises
const promises = [createPromise(0), createPromise(1), createPromise(2)];
*/ 

// Wait for all promises to resolve
Promise.all(promises).then((results) => {
  // Clear the table
  output.innerHTML = '';
  // Add results to the table
let total = 0;
  results.forEach((result, i) => {
    const row = output.insertRow();
    const cell1 = row.insertCell();
    cell1.textContent = result[0];
    const cell2 = row.insertCell();
    cell2.textContent = result[1];
	  total+= result[1];
  });

  // Add total time to the table
  // const total = results.reduce((acc, result) => acc + result[1], 0);
  const row = output.insertRow();
  const cell1 = row.insertCell();
  cell1.textContent = 'Total';
  const cell2 = row.insertCell(); 
  cell2.textContent = total.toFixed(3);
}); 

