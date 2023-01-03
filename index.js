// Global Constants

const balanceTitle = document.querySelector("#result-info");

const incomeTitle = document.querySelector("#income-name-input");
const incomeAmount = document.querySelector("#income-amount-input");
const addIncomeButton = document.querySelector("#add-income-btn");
const incomeInfo = document.querySelector("#sum-income");

const expensesTitle = document.querySelector("#expenses-name-input");
const expensesAmount = document.querySelector("#expenses-amount-input");
const addExpensesButton = document.querySelector("#add-expenses-btn");
const expensesInfo = document.querySelector("#sum-expenses");

let entryList = [];
let balance = 0,
  income = {},
  expenses = {};
let sumIncome = 0,
  sumExpenses = 0;

// Sum, edit, delete elements from income list

addIncomeButton.addEventListener(
  "click",
  (addIncomePosition = () => {
    let i = 0;
    if (incomeTitle.value && incomeAmount.value != "") {
      const listItem = document.createElement("li");
      if (entryList.length != 0) {
        i = entryList[entryList.length - 1].id + 1;
      }

      listItem.setAttribute("id", i);
      document.querySelector("#income-list").appendChild(listItem);
      listItem.textContent = `${incomeTitle.value} - ${incomeAmount.value} zł`;
      listItem.setAttribute("class", "list-item");
      const editButton = addEditButton();
      listItem.appendChild(editButton);
      const deleteButton = addDeleteButton();
      listItem.appendChild(deleteButton);
      income = {
        id: i,
        name: incomeTitle.value,
        value: incomeAmount.value,
      };

      sumIncome = sumIncome + Number(incomeAmount.value);

      deleteButton.addEventListener("click", (e) => {
        const target = e.target;
        const entry = target.parentNode;
        let indexToDelete = entryList.findIndex(
          (object) => object.id == entry.id
        );
        sumIncome = sumIncome - entryList[indexToDelete].value;
        entryList.splice(indexToDelete, 1);
        entry.parentElement.removeChild(entry);
        accountStatus();
        incomeInfo.textContent = `Suma przychodów: ${sumIncome} zł`;
      });

      editButton.addEventListener("click", (e) => {
        const target = e.target;
        const entry = target.parentNode;
        let indexToEdit = entryList.findIndex(
          (object) => object.id == entry.id
        );
        incomeTitle.value = entryList[indexToEdit].name;
        incomeAmount.value = entryList[indexToEdit].value;
        sumIncome = sumIncome - entryList[indexToEdit].value;
        entryList.splice(indexToEdit, 1);
        entry.parentElement.removeChild(entry);
        const saveButton = addSaveButton();
        addIncomeButton.replaceWith(saveButton);
        incomeInfo.textContent = `Suma przychodów: ${sumIncome} zł`;

        saveButton.addEventListener("click", () => {
          addIncomePosition();
          saveButton.replaceWith(addIncomeButton);
        });
      });

      entryList.push(income);
      incomeTitle.value = "";
      incomeAmount.value = "";
      incomeInfo.textContent = `Suma przychodów: ${sumIncome} zł`;
    }
    accountStatus();
    event.preventDefault();
  })
);

// Sum, edit, delete elements from expenses list

addExpensesButton.addEventListener(
  "click",
  (addExpensesPosition = () => {
    let i = 0;
    if (expensesTitle.value && expensesAmount.value != "") {
      const listItem = document.createElement("li");
      if (entryList.length != 0) {
        i = entryList[entryList.length - 1].id + 1;
      }

      listItem.setAttribute("id", i);
      document.querySelector("#expenses-list").appendChild(listItem);
      listItem.textContent = `${expensesTitle.value} - ${expensesAmount.value} zł`;
      listItem.setAttribute("class", "list-item");
      const editButton = addEditButton();
      listItem.appendChild(editButton);
      const deleteButton = addDeleteButton();
      listItem.appendChild(deleteButton);
      expenses = {
        id: i,
        name: expensesTitle.value,
        value: expensesAmount.value,
      };

      sumExpenses = sumExpenses + Number(expensesAmount.value);

      deleteButton.addEventListener("click", (e) => {
        const target = e.target;
        const entry = target.parentNode;
        let indexToDelete = entryList.findIndex(
          (object) => object.id == entry.id
        );
        sumExpenses = sumExpenses - entryList[indexToDelete].value;
        entryList.splice(indexToDelete, 1);
        entry.parentElement.removeChild(entry);
        expensesInfo.textContent = `Suma wydatków: ${sumExpenses} złotych`;
        accountStatus();
      });

      editButton.addEventListener("click", (e) => {
        const target = e.target;
        const entry = target.parentNode;
        let indexToEdit = entryList.findIndex(
          (object) => object.id == entry.id
        );
        expensesTitle.value = entryList[indexToEdit].name;
        expensesAmount.value = entryList[indexToEdit].value;
        sumExpenses = sumExpenses - entryList[indexToEdit].value;
        entryList.splice(indexToEdit, 1);
        entry.parentElement.removeChild(entry);
        const saveButton = addSaveButton();
        addExpensesButton.replaceWith(saveButton);
        expensesInfo.textContent = `Suma wydatków: ${sumExpenses} złotych`;
        saveButton.addEventListener("click", () => {
          addExpensesPosition();
          saveButton.replaceWith(addExpensesButton);
        });
      });
      entryList.push(expenses);
      expensesTitle.value = "";
      expensesAmount.value = "";
      expensesInfo.textContent = `Suma wydatków: ${sumExpenses} złotych`;
    }
    accountStatus();
    event.preventDefault();
  })
);

// Create button which saving changes after edition of income and expenses position

const addSaveButton = () => {
  const saveButton = document.createElement("button");
  saveButton.textContent = "Zapisz";
  saveButton.setAttribute("class", "save-btn");
  return saveButton;
};

//Create edit button

const addEditButton = () => {
  const editButton = document.createElement("button");
  editButton.textContent = "Edytuj";
  editButton.setAttribute("class", "options-btn");
  return editButton;
};

// Create delete button

const addDeleteButton = () => {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Usuń";
  deleteButton.setAttribute("class", "options-btn");
  return deleteButton;
};

//Count account status

const accountStatus = () => {
  balance = sumIncome - sumExpenses;
  if (balance > 0) {
    return (balanceTitle.textContent = `Mozesz jeszcze wydac ${balance} złotych`);
  } else if (balance === 0) {
    return (balanceTitle.textContent = `Bilans wynosi zero`);
  } else {
    return (balanceTitle.textContent = `Bilans jest ujemny. Jesteś na minusie ${balance} złotych`);
  }
};
