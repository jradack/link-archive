// script.js 

// For edit item 
let index = -1;
const table = document.getElementById("table");

// For sorting ascending or descending 
// const flag = { Name: false, Cat: false, Year: false };
// let data = [
//     { Name: "HTML", Cat: "Web", Year: "1993", Type: "ABC" },
//     { Name: "Java", Cat: "Programming", Year: "1995", Type: "ABC" },
//     { Name: "JavaScript", Cat: "Web", Year: "1995", Type: "DEC" },
//     { Name: "MongoDB", Cat: "Database", Year: "2007", Type: "KJL" },
//     { Name: "Python", Cat: "Programming", Year: "1991", Type: "AAA" },
// ];
const flag = { name: false, date_saved: false, date_read: false };
let data = linksData;

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
    c0.innerText = e.name;
    if (e.archive_link == null) {
        c1.innerHTML = "".concat("<a href=\"", e.original_url, "\">Original</a> | Archive");
    } else {
        c1.innerHTML = "".concat("<a href=\"", e.original_url, "\">Original</a> | <a href=\"", e.archive_link, "\">Archive</a>");
    }
    c2.innerText = e.date_saved;
    c3.innerText = e.date_read;
    c4.innerText = e.tags.join(", ");
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
        let fa = a[colName].toLowerCase(),
            fb = b[colName].toLowerCase();
        // console.log(fa, fb);

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
            e.name.toLowerCase().includes(input) ||
            e.date_saved.toLowerCase().includes(input) ||
            e.tags.join().toLowerCase().includes(input)
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

