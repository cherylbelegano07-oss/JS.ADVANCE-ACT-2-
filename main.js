const btnInsertUpdate = document.getElementById("btnInsertUpdate");

const btnClearItems = document.getElementById("btnClearItems");

const btnClear = document.getElementById("btnClear");

const btnSaveLocalStorage = document.getElementById("btnSaveLocalStorage");

const tblRecords = document.getElementById("tblRecords");

const sortBy = document.getElementById("sortBy");

const sortOrder = document.getElementById("sortOrder");

const tblTHsLabels = [
  "First Name",
  "Middle Name",
  "Last Name",
  "Age",
  "Action",
];

let arrRecords = getFromLocalStorage("records");

btnInsertUpdate.addEventListener("click", () => {
  const inputTxt = document.getElementsByTagName("input");

  if (btnInsertUpdate.value == "insert") {
    for (const txt of inputTxt) {
      if (txt.value.trim() == "") {
        alert("Please complete all the text inputs!");

        return;
      }
    }

    let infoRecord = {
      fname: inputTxt[0].value,

      mname: inputTxt[1].value,

      lname: inputTxt[2].value,

      age: parseInt(inputTxt[3].value),
    };

    arrRecords.push(infoRecord);

    for (const txt of inputTxt) {
      txt.value = "";
    }

    iterateRecords();
  } else {
    for (const txt of inputTxt) {
      if (txt.value.trim() == "") {
        alert("Please complete all the text inputs!");

        return;
      }
    }

    const index = parseInt(btnInsertUpdate.value);

    arrRecords[index].fname = inputTxt[0].value;

    arrRecords[index].mname = inputTxt[1].value;

    arrRecords[index].lname = inputTxt[2].value;

    arrRecords[index].age = parseInt(inputTxt[3].value);

    for (const txt of inputTxt) {
      txt.value = "";
    }

    btnInsertUpdate.innerHTML = "Insert";

    btnInsertUpdate.value = "insert";

    iterateRecords();
  }
});

btnClear.addEventListener("click", () => {
  const inputTxt = document.getElementsByTagName("input");

  for (const txt of inputTxt) {
    txt.value = "";
  }

  btnInsertUpdate.innerHTML = "Insert";

  btnInsertUpdate.value = "insert";
});

btnSaveLocalStorage.addEventListener("click", () => {
  saveToLocalStorage("records", arrRecords);

  alert("Records successfully saved to Local Storage!");
});

btnClearItems.addEventListener("click", () => {
  arrRecords = [];

  localStorage.removeItem("records");

  iterateRecords();

  alert("All records have been cleared!");
});

sortBy.addEventListener("change", () => {
  sortRecords();
});

sortOrder.addEventListener("change", () => {
  sortRecords();
});

function sortRecords() {
  const field = sortBy.value;

  const order = sortOrder.value;

  arrRecords.sort((a, b) => {
    if (field == "age") {
      if (order == "asc") {
        return a.age - b.age;
      } else {
        return b.age - a.age;
      }
    }

    const valueA = a[field].toString().toLowerCase();

    const valueB = b[field].toString().toLowerCase();

    if (order == "asc") {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });

  iterateRecords();
}

function iterateRecords() {
  while (tblRecords.hasChildNodes()) {
    tblRecords.removeChild(tblRecords.firstChild);
  }

  if (arrRecords.length != 0) {
    document.getElementById("status").style.display = "none";

    const tblHeaderRow = document.createElement("tr");

    const tblHeader = document.createElement("thead");

    tblHeaderRow.style.borderTop = "1px solid black";

    tblHeaderRow.style.borderBottom = "1px solid black";

    for (let i = 0; i < 5; i++) {
      const tblTH = document.createElement("th");

      tblTH.style.padding = "5px";

      if (i != 4) {
        tblTH.style.borderRight = "1px solid black";
      }

      tblTH.innerHTML = tblTHsLabels[i];

      tblHeaderRow.appendChild(tblTH);
    }

    tblHeader.appendChild(tblHeaderRow);

    tblRecords.appendChild(tblHeader);

    const tblBody = document.createElement("tbody");

    arrRecords.forEach((rec, i) => {
      // Create row

      const tblRow = document.createElement("tr");

      const tbdataFname = document.createElement("td");

      const tbdataMname = document.createElement("td");

      const tbdataLname = document.createElement("td");

      const tbdataAge = document.createElement("td");

      const tbdataActionBtn = document.createElement("td");

      const btnDelete = document.createElement("button");

      const btnUpdate = document.createElement("button");

      tbdataFname.style.borderRight = "1px solid black";

      tbdataFname.style.padding = "10px";

      tbdataMname.style.borderRight = "1px solid black";

      tbdataMname.style.padding = "10px";

      tbdataLname.style.borderRight = "1px solid black";

      tbdataLname.style.padding = "10px";

      tbdataAge.style.borderRight = "1px solid black";

      tbdataAge.style.padding = "10px";

      tbdataActionBtn.style.padding = "10px";

      tblRow.style.borderBottom = "1px solid black";

      tbdataFname.innerHTML = rec.fname;

      tbdataMname.innerHTML = rec.mname;

      tbdataLname.innerHTML = rec.lname;

      tbdataAge.innerHTML = rec.age;

      btnDelete.innerHTML = "Delete";

      btnDelete.style.marginRight = "5px";

      btnDelete.onclick = () => {
        deleteData(i);
      };

      btnUpdate.innerHTML = "Edit";

      btnUpdate.style.marginRight = "5px";

      btnUpdate.onclick = () => {
        updateData(i);
      };

      tbdataActionBtn.appendChild(btnDelete);

      tbdataActionBtn.appendChild(btnUpdate);

      tblRow.appendChild(tbdataFname);

      tblRow.appendChild(tbdataMname);

      tblRow.appendChild(tbdataLname);

      tblRow.appendChild(tbdataAge);

      tblRow.appendChild(tbdataActionBtn);

      tblBody.appendChild(tblRow);
    });

    tblRecords.appendChild(tblBody);
  } else {
    document.getElementById("status").style.display = "inline";

    document.getElementById("status").innerHTML = "No Records...";
  }
}

function deleteData(i) {
  arrRecords.splice(i, 1);

  saveToLocalStorage("records", arrRecords);

  iterateRecords();
}

function updateData(i) {
  const inputTxt = document.getElementsByTagName("input");

  inputTxt[0].value = arrRecords[i].fname;

  inputTxt[1].value = arrRecords[i].mname;

  inputTxt[2].value = arrRecords[i].lname;

  inputTxt[3].value = arrRecords[i].age;

  btnInsertUpdate.innerHTML = "Update";

  btnInsertUpdate.value = i;
}

iterateRecords();
