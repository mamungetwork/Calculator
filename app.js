"use-strict";
let allFirstDigits = [];
let allLastDigits = [];
let theOperator = false;
let isPoint = false;
let selectedOparator = [];
let operatorType;
let finalResult = 0;

const allNumberDigit = document.querySelectorAll(".number");
const allOperator = document.querySelectorAll(".operator_digit");
const displayFirstDigits = document.querySelector(".first_digit");
const displayLastDigits = document.querySelector(".last_digit");
const displayResult = document.querySelector(".result");
const backSpaceEl = document.getElementById("backspace");
const pointDigit = document.getElementById("point");
const equalBtn = document.getElementById("equal");
const clearEverything = document.getElementById("c");
const displayOperator = document.querySelector(".operator");

function showDisplayFirstDigits(displayText) {
  // let theFirstNumber = theArray.join("");
  displayFirstDigits.textContent = displayText;
  //   console.log(allFirstDigits);
}

function hideDisplayFirstDigits() {
  displayFirstDigits.textContent = "0";
  //   console.log(allFirstDigits);
}

function showDisplayLastDigits(displayText) {
  // let theLastNumber = theArray.join("");
  displayLastDigits.textContent = displayText;
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
  // console.log(theOperator);
}

function showDisplaysResult(result) {
  displayResult.textContent = "";
  displayResult.textContent = result;
  displayResult.style.display = "block";
  // console.log(theOperator);
}

function hideDisplaysResult(result) {
  displayResult.textContent = "";
  displayResult.style.display = "none";
  // console.log(theOperator);
}

function backSpace(allFirstDigits) {
  allFirstDigits.pop();
}

allNumberDigit.forEach((digit) => {
  digit.addEventListener("click", (e) => {
    let selectedDigit = Number(e.target.textContent);
    if (!theOperator && !isPoint) {
      // theDigit = allFirstDigits[0] + selectedDigit;

      theDigit =
        allFirstDigits.length !== 0
          ? `${allFirstDigits[0] + selectedDigit}`
          : `${selectedDigit}`;

      allFirstDigits[0] = theDigit;
      showDisplayFirstDigits(allFirstDigits);
      // ***
    } else if (!theOperator && isPoint) {
      theModifiedNumber = `${theModifiedNumber + selectedDigit}`;
      allFirstDigits[0] = theModifiedNumber;
      showDisplayFirstDigits(allFirstDigits);
      // console.log(isPoint);
    } else if (theOperator && !isPoint) {
      let selectedDigit = Number(e.target.textContent);

      theDigit =
        allLastDigits.length !== 0
          ? `${allLastDigits[0] + selectedDigit}`
          : `${selectedDigit}`;

      allLastDigits[0] = theDigit;
      showDisplayLastDigits(allLastDigits);
      console.log(allLastDigits);
    } else if (theOperator && isPoint) {
      let selectedDigit = Number(e.target.textContent);
      theModifiedNumber = `${theModifiedNumber + selectedDigit}`;
      allLastDigits[0] = theModifiedNumber;
      showDisplayLastDigits(allLastDigits);
      console.log(allLastDigits);
    }
  });
});

let theModifiedNumber = 0;
pointDigit.addEventListener("click", (e) => {
  let selectedDigit = e.target.textContent;
  if (!theOperator) {
    if (allFirstDigits.length !== 0) {
      getTheNumber = allFirstDigits.join("");
      theModifiedNumber = `${getTheNumber + selectedDigit}`;
      isPoint = true;
      showDisplayFirstDigits(allFirstDigits + ".");
    } else {
      getTheNumber = allFirstDigits[allFirstDigits.length - 1];
    }
    allFirstDigits = [];
    // showDisplayFirstDigits(allFirstDigits);
  } else {
    if (allLastDigits.length !== 0) {
      getTheNumber = allLastDigits.join("");
      theModifiedNumber = `${getTheNumber + selectedDigit}`;
      isPoint = true;
      console.log(allLastDigits, isPoint);
      showDisplayLastDigits(allLastDigits + ".");
    } else {
      getTheNumber = allLastDigits[allLastDigits.length - 1];
    }
    // allLastDigits = [];
  }
});

allOperator.forEach((digit) => {
  digit.addEventListener("click", (e) => {
    let operatorSymbol = e.target.textContent;
    operatorType = e.target.id;
    selectedOparator.push(operatorType);
    showDisplaysOperator(operatorSymbol);
    isPoint = false;
    console.log(operatorType);
  });
});

equalBtn.addEventListener("click", (e) => {
  firstDigitNumber = Number(allFirstDigits);
  lastDigitNumber = Number(allLastDigits);
  switch (operatorType) {
    case "sum":
      finalResult = firstDigitNumber + lastDigitNumber;
      showDisplaysResult(finalResult);
      break;

    case "sub":
      finalResult = firstDigitNumber - lastDigitNumber;
      showDisplaysResult(finalResult);
      break;

    case "multiply":
      finalResult = firstDigitNumber * lastDigitNumber;
      showDisplaysResult(finalResult);
      break;

    case "divide":
      finalResult = firstDigitNumber / lastDigitNumber;
      showDisplaysResult(finalResult);
      break;
  }
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
  hideDisplaysResult();

  theModifiedNumber = 0;
  isPoint = false;
});
