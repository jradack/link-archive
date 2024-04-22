// script.js 

// For edit item 
let index = -1;
const table = document.getElementById("table");

// For sorting ascending or descending 
const flag = { Name: false, Cat: false, Year: false };
let data = [
    { Name: "HTML", Cat: "Web", Year: "1993", Type: "ABC" },
    { Name: "Java", Cat: "Programming", Year: "1995", Type: "ABC" },
    { Name: "JavaScript", Cat: "Web", Year: "1995", Type: "DEC" },
    { Name: "MongoDB", Cat: "Database", Year: "2007", Type: "KJL" },
    { Name: "Python", Cat: "Programming", Year: "1991", Type: "AAA" },
];

// To switch update or add form 
const switchEdit = () => {
    document.getElementById("submitItem").style.display =
        "none";
    document.getElementById("editItem").style.display = "";
};

const switchAdd = () => {
    document.getElementById("submitItem").style.display =
        "";
    document.getElementById("editItem").style.display =
        "none";
};

// To create table 
function addItem(e, i) {
    row = table.insertRow(i + 1);
    let c0 = row.insertCell(0);
    let c1 = row.insertCell(1);
    let c2 = row.insertCell(2);
    let c3 = row.insertCell(3);
    let c4 = row.insertCell(4);
    let c5 = row.insertCell(5);
    let c6 = row.insertCell(6);
    c0.innerText = i + 1;
    c1.innerText = e.Name;
    c2.innerText = e.Cat;
    c3.innerText = e.Year;
    c4.innerText = e.Type;
    c5.innerHTML = "";
    c6.innerHTML = "☒";
    c5.classList.add("zoom");
    c6.classList.add("zoom");
    c5.addEventListener("click", () => edit(c5, i));
    c6.addEventListener("click", () => del(e));
}

// Traverse and insert items to table 
data.map((e, i) => addItem(e, i));

// For sorting in different cases 
function sortItems(title) {
    remove();
    sortStringCol(title);
    data.map((e, i) => addItem(e, i));
}

// Clear the table before updation 
function remove() {
    console.log("removed");
    while (table.rows.length > 1) table.deleteRow(-1);
}

// Sort for string columns
function sortStringCol(colName) {
    data.sort((a, b) => {
        let fa = (a == null) ? null : a[colName].toLowerCase();
        let fb = (b == null) ? null : b[colName].toLowerCase();
        // let fa = a[colName].toLowerCase(),
        //     fb = b[colName].toLowerCase();
        console.log(fa, fb);

        if(fa == null) {
            return 1;
        }
        if(fb == null) {
            return -1;
        }
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
    if (flag[colName]) data.reverse();
    flag[colName] = !flag[colName];
}

// To search and filter items 
function searchItems() {
    let input = document
        .getElementById("searchInput")
        .value.toLowerCase();
    let filterItems = data.filter((e) => {
        return (
            e.Name.toLowerCase().includes(input) ||
            e.Cat.toLowerCase().includes(input) ||
            e.Year.includes(input)
        );
    });

    remove();
    filterItems.map((e, i) => addItem(e, i));
}

// Initiate edit form 
function edit(c, i) {
    console.log(c.classList.value);
    if (c.classList.value === "zoom") {
        c.classList.add("open");
        el = data[i];
        switchEdit();

        let nameInput =
            document.getElementById("nameInput");
        let catInput = document.getElementById("catInput");
        let yearInput =
            document.getElementById("yearInput");
        nameInput.value = el.Name;
        catInput.value = el.Cat;
        yearInput.value = el.Year;
        index = i;
    } else {
        c.classList.value = "zoom";
        switchAdd();

        document.getElementById("nameInput").value = "";
        document.getElementById("catInput").value = "";
        document.getElementById("yearInput").value = "";
        index = -1;
    }
}

// Submit edit data 
function editItem() {
    console.log("edit");
    nameInput = document.getElementById("nameInput");
    catInput = document.getElementById("catInput");
    yearInput = document.getElementById("yearInput");
    data[index] = {
        Name: nameInput.value,
        Cat: catInput.value,
        Year: yearInput.value,
    };
    remove();
    data.map((e, i) => addItem(e, i));

    nameInput.value = "";
    catInput.value = "";
    yearInput.value = "";
    switchAdd();
}

// Add new data 
function submitItem() {
    console.log("submit clicked");
    nameInput = document.getElementById("nameInput").value;
    catInput = document.getElementById("catInput").value;
    yearInput = document.getElementById("yearInput").value;
    if (
        nameInput === "" ||
        catInput === "" ||
        yearInput === ""
    ) {
        window.alert("incomplete input data");
        return;
    }
    data.push({
        Name: nameInput,
        Cat: catInput,
        Year: yearInput,
    });
    document.getElementById("nameInput").value = "";
    document.getElementById("catInput").value = "";
    document.getElementById("yearInput").value = "";
    remove();
    data.map((e, i) => addItem(e, i));
    console.log(data);
}

// Delete specific field 
function del(el) {
    console.log("del clicked", el);
    remove();
    data = data.filter((e) => e.Name !== el.Name);
    data.map((e, i) => addItem(e, i));
}
