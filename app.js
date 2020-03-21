document.querySelector("#update").setAttribute("aria-disabled", "true");
document.querySelector("#update").classList.add("disabled");
var rowToUpdate = null;

document.querySelector("#add").addEventListener("click", () => {
  let name = document.querySelector("#name").value;
  let age = document.querySelector("#age").value;
  let city = document.querySelector("#city").value;
  if (name === "" || age === "" || document.querySelector('input[name="gender"]:checked').value === null || city === "Other") {
    document.querySelector(".formNotValid").style.display = "block";
    setTimeout(() => {
      document.querySelector(".formNotValid").style.display = "none";
    }, 4000);
  } else {
    let gender = document.querySelector('input[name="gender"]:checked').value;

    let tableBody = document.querySelector("tbody");
    let rowData = ` <th scope="row">${name}</th>
                    <td>${gender}</td>
                    <td>${age}</td>
                    <td>${city}</td>
                    <td>
                    <a href="#" onclick="loadData(this.parentNode.parentNode.cells, this.parentNode.parentNode.rowIndex);">Update</a> /
                    <a href="#" onclick="deleteRow(this.parentNode.parentNode.rowIndex);">Remove</a>
                    </td> `;
    let newRow = tableBody.insertRow(tableBody.rows.length);
    newRow.innerHTML = rowData;

    document.querySelector("#name").value = "";
    document.querySelector("#age").value = "";
    document.querySelectorAll(".gender")[0].classList.remove("active");
    document.querySelectorAll(".gender")[1].classList.remove("active");
  }
});

document.querySelector("#reset").addEventListener("click", () => {
  document.querySelector("tbody").innerHTML = "";
  document.querySelector("#name").value = "";
  document.querySelector("#age").value = "";
  document.querySelectorAll(".gender")[0].classList.remove("active");
  document.querySelectorAll(".gender")[1].classList.remove("active");
  document.querySelector("#update").setAttribute("aria-disabled", "true");
  document.querySelector("#update").classList.add("disabled");
  document.querySelector("#add").classList.remove("disabled");
  rowToUpdate = null;
});

document.querySelector("#update").addEventListener("click", () => {
  if (rowToUpdate != null) {
    let name = document.querySelector("#name").value;
    let age = document.querySelector("#age").value;
    let city = document.querySelector("#city").value;
    if (name === "" || age === "" || document.querySelector('input[name="gender"]:checked').value === null || city === "Other") {
      document.querySelector(".formNotValid").style.display = "block";
      setTimeout(() => {
        document.querySelector(".formNotValid").style.display = "none";
      }, 4000);
    } else {
      let gender = document.querySelector('input[name="gender"]:checked').value;

      let tableBody = document.querySelector("tbody");
      let rowData = ` <th scope="row">${name}</th>
                      <td>${gender}</td>
                      <td>${age}</td>
                      <td>${city}</td>
                      <td>
                      <a href="#" onclick="loadData(this.parentNode.parentNode.cells, this.parentNode.parentNode.rowIndex);">Update</a> /
                      <a href="#" onclick="deleteRow(this.parentNode.parentNode.rowIndex);">Remove</a>
                      </td> `;
      let newRow = tableBody.insertRow(rowToUpdate);
      newRow.innerHTML = rowData;
      document.querySelector("tbody").deleteRow(++rowToUpdate);

      document.querySelector("#name").value = "";
      document.querySelector("#age").value = "";
      document.querySelectorAll(".gender")[0].classList.remove("active");
      document.querySelectorAll(".gender")[1].classList.remove("active");
      document.querySelector("#add").classList.remove("disabled");
      document.querySelector("#update").classList.add("disabled");
      rowToUpdate = null;
    }
  }
});

const addField = () => {
  if (document.querySelector("#city").value === "Other") {
    document.querySelector("#newField").style.display = "flex";
    document.querySelector("#add").classList.add("disabled");
  } else {
    document.querySelector("#newField").style.display = "none";
    document.querySelector("#add").classList.remove("disabled");
  }
}

const addOption = () => {
  if (document.querySelector("#newCity").value === "") {
    document.querySelector(".cityNotValid").style.display = "block";
  } else {
    let option = document.createElement("option");
    option.value = document.querySelector("#newCity").value;
    option.innerHTML = document.querySelector("#newCity").value;

    document.querySelector("#city").add(option, 0);
    document.querySelector("#add").classList.remove("disabled");
    document.querySelector("#newCity").value = "";
    document.querySelector(".cityNotValid").style.display = "none";
    document.querySelector("#newField").style.display = "none";
    document.querySelector("#city").selectedIndex = 0;
  }
}

const deleteRow = row => {
  document.querySelector("tbody").deleteRow(--row);
  document.querySelector("#add").classList.remove("disabled");
  document.querySelector("#update").classList.add("disabled");
}

const loadData = (data, row) => {
  --row;
  rowToUpdate = row;
  document.querySelector("#name").value = data[0].innerText;
  if(data[1].innerText === "Male") {
    document.querySelectorAll(".gender")[0].classList.add("active");
    document.querySelectorAll(".gender")[1].classList.remove("active");
  } else {
    document.querySelectorAll(".gender")[1].classList.add("active");
    document.querySelectorAll(".gender")[0].classList.remove("active");
  }
  document.querySelector("#age").value = data[2].innerText;
  document.querySelector("#city").value = data[3].innerText;
  document.querySelector("#add").classList.add("disabled");
  document.querySelector("#update").classList.remove("disabled");
}
