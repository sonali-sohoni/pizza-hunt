let db;

//Get listner object after opening the connection
let request = indexedDB.open("pizza-hunt", 1);
//create an object store or table to hold the data
request.onupgradeneeded = function (event) {
	db = event.target.result;
	db.createObjectStore("new-pizza", { autoIncrement: true });
};

//success and error event handlers
request.onsuccess = function (event) {
	//set up global db object when connection gets finalized.
	db = event.target.result;
	if (navigator.onLine) {
		uploadData();
	}
};

request.onerror = function (event) {
	console.log(event.target.errorCode);
};

const saveRecord = function (record) {
	//open a new transaction with the database with read and write permissions
	const transaction = db.transaction(["new-pizza"], "readwrite");
	// access the object store for `new_pizza`
	const pizzaObjectStore = transaction.objectStore("new-pizza");
	pizzaObjectStore.add(record);
};

const uploadData = function () {
	const transaction = db.transaction(["new-pizza"], "readwrite");
	const pizzaObjectStore = transaction.objectStore("new-pizza");
	const getAll = pizzaObjectStore.getAll();
	getAll.onsuccess = function () {
		// if there was data in indexedDb's store, let's send it to the api server
		if (getAll.result.length > 0) {
			fetch("/api/pizzas", {
				method: "POST",
				body: JSON.stringify(getAll.result),
				headers: {
					Accept: "application/json, text/plain, */*",
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((serverResponse) => {
					if (serverResponse.message) {
						throw new Error(serverResponse);
					}
					// open one more transaction
					const transaction = db.transaction(["new_pizza"], "readwrite");
					// access the new_pizza object store
					const pizzaObjectStore = transaction.objectStore("new_pizza");
					// clear all items in your store
					pizzaObjectStore.clear();

					alert("All saved pizza has been submitted!");
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
};
window.addEventListener("online", uploadPizza);
