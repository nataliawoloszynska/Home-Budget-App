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

let ENTRY_LIST = [];
let balance = 0,
  income = {},
  expenses = {};
let sumIncome = 0,
  sumExpenses = 0;
console.log(ENTRY_LIST);

// Sum, edit, delete elements from income list

addIncomeButton.addEventListener(
  "click",
  (addIncomePosition = () => {
    let i = 0;
    if (incomeTitle.value && incomeAmount.value != "") {
      const listItem = document.createElement("li");
      if (ENTRY_LIST.length != 0) {
        i = ENTRY_LIST[ENTRY_LIST.length - 1].id + 1;
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
        let indexToDelete = ENTRY_LIST.findIndex(
          (object) => object.id == entry.id
        );
        sumIncome = sumIncome - ENTRY_LIST[indexToDelete].value;
        ENTRY_LIST.splice(indexToDelete, 1);
        entry.parentElement.removeChild(entry);
        accountStatus();
      });

      editButton.addEventListener("click", (e) => {
        const target = e.target;
        const entry = target.parentNode;
        let indexToEdit = ENTRY_LIST.findIndex(
          (object) => object.id == entry.id
        );
        incomeTitle.value = ENTRY_LIST[indexToEdit].name;
        incomeAmount.value = ENTRY_LIST[indexToEdit].value;
        sumIncome = sumIncome - ENTRY_LIST[indexToEdit].value;
        ENTRY_LIST.splice(indexToEdit, 1);
        entry.parentElement.removeChild(entry);
        const saveButton = addSaveIncomeButton();
        addIncomeButton.replaceWith(saveButton);

        saveButton.addEventListener("click", () => {
          addIncomePosition();
          saveButton.replaceWith(addIncomeButton);
        });
      });

      ENTRY_LIST.push(income);
      incomeTitle.value = "";
      incomeAmount.value = "";
      incomeInfo.textContent = `Suma przychodów: ${sumIncome} złotych`;
    }
    accountStatus();
  })
);

// Sum, edit, delete elements from expenses list

addExpensesButton.addEventListener(
  "click",
  (addExpensesPosition = () => {
    let i = 0;
    if (expensesTitle.value && expensesAmount.value != "") {
      const listItem = document.createElement("li");
      if (ENTRY_LIST.length != 0) {
        i = ENTRY_LIST[ENTRY_LIST.length - 1].id + 1;
      }

      listItem.setAttribute("id", i);
      document.querySelector("#expenses-list").appendChild(listItem);
      listItem.textContent = `${expensesTitle.value} - ${expensesAmount.value} zł`;
      listItem.setAttribute("class", "list-item");
      console.log(listItem);
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
        let indexToDelete = ENTRY_LIST.findIndex(
          (object) => object.id == entry.id
        );
        sumExpenses = sumExpenses - ENTRY_LIST[indexToDelete].value;
        ENTRY_LIST.splice(indexToDelete, 1);
        entry.parentElement.removeChild(entry);
        expensesInfo.textContent = sumExpenses;
        accountStatus();
      });

      editButton.addEventListener("click", (e) => {
        const target = e.target;
        const entry = target.parentNode;
        let indexToEdit = ENTRY_LIST.findIndex(
          (object) => object.id == entry.id
        );
        expensesTitle.value = ENTRY_LIST[indexToEdit].name;
        expensesAmount.value = ENTRY_LIST[indexToEdit].value;
        sumExpenses = sumExpenses - ENTRY_LIST[indexToEdit].value;
        ENTRY_LIST.splice(indexToEdit, 1);
        entry.parentElement.removeChild(entry);
        const saveButton = addSaveExpensesButton();
        addExpensesButton.replaceWith(saveButton);
        saveButton.addEventListener("click", () => {
          addExpensesPosition();
          saveButton.replaceWith(addExpensesButton);
        });
      });
      ENTRY_LIST.push(expenses);
      expensesTitle.value = "";
      expensesAmount.value = "";
      expensesInfo.textContent = `Suma wydatków: ${sumExpenses} złotych`;
    }
    accountStatus();
  })
);

// Create button which saving changes after edition of income position

const addSaveIncomeButton = () => {
  const saveIncomeButton = document.createElement("button");
  saveIncomeButton.textContent = "Zapisz";
  saveIncomeButton.setAttribute("class", "save-btn");
  return saveIncomeButton;
};

// Create button which saving changes after edition of expenses position

const addSaveExpensesButton = () => {
  const saveExpensesButton = document.createElement("button");
  saveExpensesButton.textContent = "Zapisz";
  saveExpensesButton.setAttribute("class", "save-btn");
  return saveExpensesButton;
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
