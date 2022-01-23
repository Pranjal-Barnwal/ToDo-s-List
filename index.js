
function getAndUpdate() {
    console.log("Updating ToDo's List...");
    let tit = document.getElementById("title").value;
    let des = document.getElementById("description").value;
    console.log(tit, des);

    // here 'itemsJson' is the key corresponding to which we are storing Notes in the itemJsonArray(Array)
    // each item in itemJsonArray is itself an array of [title, description] 

    if (localStorage.getItem("itemsJson") == null) {
        let itemJsonArray = [];
        itemJsonArray.push([tit, des]);
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    }
    else {
        let itemJsonArrayStr = localStorage.getItem("itemsJson");   //will be a string and need to be converted to JSON for further processing
        let itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, des]);
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    }
    update();
}

function update() {
    console.log("Updating ToDo's List...");

    // Populating the Table
    let tableBody = document.getElementById("tableBody");
    let str = "";
    let itemJsonArrayStr = localStorage.getItem("itemsJson");
    if (itemJsonArrayStr == "[]") {
        str += `
            <tr>
                        <th scope="row">1</th>
                        <td>Your Title will appear here</td>
                        <td>First step is always terrifying, but we have tailored the experince for you. Your NOTES will appear here. <br> This Help-Note will get auto-deleted upon creation of a note.</td>
                        <td><button class="btn btn-outline-info btn-sm">Do Nothing</button></td>
                    </tr>`;
        tableBody.innerHTML = str;
        return;
    }
    let itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.forEach((element, index) => {
        str += `
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td>${element[0]}</td>
                            <td>${element[1]}</td>
                            <td><button class="btn btn-outline-danger btn-sm" onclick="deleted(${index})">Delete</button></td>
                            </tr>`;
        tableBody.innerHTML = str;
    });
}

let add = document.getElementById("addNote");
add.addEventListener("click", getAndUpdate);
update();

function deleted(itemIndex) {
    console.log("Deleted: Item-" + (itemIndex + 1) + `( ${title} )`);
    let itemJsonArrayStr = localStorage.getItem("itemsJson");
    let itemJsonArray = JSON.parse(itemJsonArrayStr);

    // Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1);     // want to delete from itemIndex and 1 element from there

    // Updating the internal Database
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));

    // Updation in UI
    update();
}

function clearAll() {
    if (confirm("Do you really want to clear the List & Delete all the Notes. \n\nNOTE: We won't clear the local cache or any other local storage. It will only clear the Notes once and for all.")) {
        localStorage.setItem("itemsJson", "[]");
        update();
    }
    else {

    }
}