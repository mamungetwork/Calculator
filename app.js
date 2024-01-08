"use-strict";
let allFirstDigits = [];
let allLastDigits = [];
let theOperator = false;
let isPoint = false;
let selectedOparator = [];
let operatorType;
let isResult = false;
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
const calculationAfter = document.querySelector(".calculation");

function showDisplayFirstDigits(displayText) {
  // let theFirstNumber = theArray.join("");
  displayFirstDigits.textContent = displayText;
}

function hideDisplayFirstDigits() {
  displayFirstDigits.textContent = "0";
}

function showDisplayLastDigits(displayText) {
  // let theLastNumber = theArray.join("");
  displayLastDigits.textContent = displayText;
  displayLastDigits.style.display = "inline-block";
}

function hideDisplayLastDigits() {
  displayLastDigits.textContent = "";
  displayLastDigits.style.display = "none";
}

function showDisplaysOperator(operator) {
  displayOperator.textContent = operator;
  displayOperator.style.display = "inline-block";
  theOperator = true;
}

function hideDisplaysOperator(operator) {
  displayOperator.textContent = "";
  displayOperator.style.display = "none";
  theOperator = false;
}

function showDisplaysResult(result) {
  isResult = true;
  resultType = Math.floor(result) === result;
  let finalResult;
  resultType ? (finalResult = result) : (finalResult = result.toFixed(2));
  displayResult.textContent = "";
  displayResult.textContent = finalResult;
  displayResult.style.display = "block";

  calculationAfter.classList.add("have_result");
}

function hideDisplaysResult(result) {
  isResult = false;
  displayResult.textContent = "";
  displayResult.style.display = "none";
  calculationAfter.classList.remove("have_result");
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
    } else if (theOperator && !isPoint) {
      let selectedDigit = Number(e.target.textContent);

      theDigit =
        allLastDigits.length !== 0
          ? `${allLastDigits[0] + selectedDigit}`
          : `${selectedDigit}`;

      allLastDigits[0] = theDigit;
      showDisplayLastDigits(allLastDigits);
    } else if (theOperator && isPoint) {
      let selectedDigit = Number(e.target.textContent);
      theModifiedNumber = `${theModifiedNumber + selectedDigit}`;
      allLastDigits[0] = theModifiedNumber;
      showDisplayLastDigits(allLastDigits);
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
  });
});

equalBtn.addEventListener("click", (e) => {
  firstDigitNumber = Number(allFirstDigits);
  lastDigitNumber = Number(allLastDigits);
  if (allLastDigits.length > 0) {
    switch (operatorType) {
      case "sum":
        finalResult = firstDigitNumber + lastDigitNumber;
        break;

      case "sub":
        finalResult = firstDigitNumber - lastDigitNumber;
        break;

      case "multiply":
        finalResult = firstDigitNumber * lastDigitNumber;
        break;

      case "divide":
        finalResult = firstDigitNumber / lastDigitNumber;
        break;
    }
    showDisplaysResult(finalResult);
  }
});

backSpaceEl.addEventListener("click", (e) => {
  if (isResult) {
    getClearAll();
  } else if (!isResult) {
    if (!theOperator) {
      // allFirstDigits.pop();

      if (allFirstDigits[0] == "") {
        allFirstDigits = [];
        showDisplayFirstDigits([0]);
      } else if (!(allFirstDigits[0] == "") && allFirstDigits.length > 0) {
        allFirstDigits[0] = allFirstDigits[0].slice(0, -1);
        showDisplayFirstDigits(allFirstDigits);
      }
    } else if (theOperator && isPoint) {
      allLastDigits[0] = allLastDigits[0].slice(0, -1);
      showDisplayLastDigits(allLastDigits);

      if (allLastDigits[0].length < 1) {
        allLastDigits = [];
        theModifiedNumber = "";
      }
    } else if (theOperator && allLastDigits.length !== 0) {
      allLastDigits[0] = allLastDigits[0].slice(0, -1);
      showDisplayLastDigits(allLastDigits);
    }
  }
});

function getClearAll() {
  allFirstDigits = [];
  hideDisplayFirstDigits(allFirstDigits);

  allLastDigits = [];
  hideDisplayLastDigits(allLastDigits);

  hideDisplaysOperator();
  hideDisplaysResult();

  theModifiedNumber = 0;
  isPoint = false;

  calculationAfter.classList.remove("have_result");
}

clearEverything.addEventListener("click", getClearAll);
