"use-strict";
let allFirstDigits = [];
let allLastDigits = [];
let theOperator = false;
let selectedOparator = [];
let finalResult = 0;

const allNumberDigit = document.querySelectorAll(".number");
const allOperator = document.querySelectorAll(".operator_digit");
const displayFirstDigits = document.querySelector(".first_digit");
const displayLastDigits = document.querySelector(".last_digit");
const backSpaceEl = document.getElementById("backspace");
const clearEverything = document.getElementById("c");
const displayOperator = document.querySelector(".operator");

function showDisplayFirstDigits(theArray) {
  let theFirstNumber = theArray.join("");
  displayFirstDigits.textContent = theFirstNumber;
  //   console.log(allFirstDigits);
}

function hideDisplayFirstDigits() {
  displayFirstDigits.textContent = "0";
  //   console.log(allFirstDigits);
}

function showDisplayLastDigits(theArray) {
  let theLastNumber = theArray.join("");
  displayLastDigits.textContent = theLastNumber;
  displayLastDigits.style.display = "inline-block";
  //   console.log(allFirstDigits);
}

function hideDisplayLastDigits() {
  displayLastDigits.textContent = "";
  displayLastDigits.style.display = "none";
}

function showDisplaysOperator(operator) {
  displayOperator.textContent = operator;
  displayOperator.style.display = "inline-block";
  theOperator = true;
  console.log(theOperator);
}

function hideDisplaysOperator(operator) {
  displayOperator.textContent = "";
  displayOperator.style.display = "none";
  theOperator = false;
  console.log(theOperator);
}

function backSpace(allFirstDigits) {
  allFirstDigits.pop();
}

allNumberDigit.forEach((digit) => {
  digit.addEventListener("click", (e) => {
    if (!theOperator) {
      let selectedDigit = Number(e.target.textContent);
      allFirstDigits.push(selectedDigit);
      showDisplayFirstDigits(allFirstDigits);
      console.log();
    } else {
      let selectedDigit = Number(e.target.textContent);
      allLastDigits.push(selectedDigit);
      showDisplayLastDigits(allLastDigits);
      console.log(allLastDigits);
    }
  });
});

allOperator.forEach((digit) => {
  digit.addEventListener("click", (e) => {
    let operatorSymbol = e.target.textContent;
    let operatorType = e.target.id;
    selectedOparator.push(operatorType);
    showDisplaysOperator(operatorSymbol);
    console.log(selectedOparator);
  });
});

backSpaceEl.addEventListener("click", (e) => {
  if (!theOperator) {
    allFirstDigits.pop();
    showDisplayFirstDigits(allFirstDigits);
    console.log(allFirstDigits);
    if (allFirstDigits.length === 0) {
      showDisplayFirstDigits([0]);
    }
  } else if (theOperator && allLastDigits.length === 0) {
    hideDisplaysOperator();
  } else if (theOperator && allLastDigits.length !== 0) {
    allLastDigits.pop();
    showDisplayLastDigits(allLastDigits);
    console.log(allLastDigits);
  }
});

clearEverything.addEventListener("click", (e) => {
  allFirstDigits = [];
  hideDisplayFirstDigits(allFirstDigits);

  allLastDigits = [];
  hideDisplayLastDigits(allLastDigits);

  hideDisplaysOperator();
  console.log(allFirstDigits, allLastDigits);
});
