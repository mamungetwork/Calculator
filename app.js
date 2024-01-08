"use-strict";

const displayBtn = document.querySelectorAll(".is_display");
const allOperator = document.querySelectorAll(".operator");
const displayCalculation = document.querySelector(".calculation");
const displayResult = document.querySelector(".result");
const cleanAllBtn = document.getElementById("c");
const backBtn = document.getElementById("backspace");
const equalBtn = document.getElementById("equal");
const modulasBtn = document.getElementById("modulas");

let isModulas = false;
let isResult = false;
let errorText;

let specialChar = ["+", "-", "%", "×", "÷", "."];
displayBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let displayText = displayCalculation.textContent;
    let btnText = e.target.textContent;
    let btnValue = e.target.value;

    let lastChar = displayText.slice(-1);
    let isLastCharSpecial = specialChar.includes(lastChar);

    if (!isResult) {
      if (specialChar.includes(btnText) && isLastCharSpecial) {
        let modifiedText = displayText.slice(0, -1) + btnText;
        showToDisplayText(modifiedText);
        return;
      }
      showToDisplayText(displayText + btnText);
    } else {
      let displayText = displayResult.textContent;
      resultEdit();
      showToDisplayText(displayText + btnText);
    }

    displayCalculation.classList.remove("math_error");

    textResize();
    if (displayCalculation.clientWidth > 258) {
      displayCalculation.style.wordBreak = "break-all";
    }
  });
});

equalBtn.addEventListener("click", (e) => {
  if (isModulas) {
    modulasHandle();
  } else {
    handleCalculation();
  }
});

cleanAllBtn.addEventListener("click", (e) => {
  cleanAllDisplay();
  hideToDisplayResult();
  textResize();
});

backBtn.addEventListener("click", (e) => {
  backspaceHandle();
  textResize();
});

modulasBtn.addEventListener("click", (e) => {
  isModulas = true;
});
allOperator.forEach((btn) => {
  if (isResult) {
    btn.addEventListener("click", (e) => {
      resultEdit();
    });
  }
});

function showToDisplayText(text) {
  displayCalculation.textContent = text;
}

function showToDisplayResult(result) {
  if (!Number(result)) {
    showToDisplayText("Error");
  } else {
    displayResult.style.display = "block";
    displayCalculation.classList.add("have_result");
    isResult = true;
    let isDecimalResult = result > Math.floor(result);
    if (!isDecimalResult) {
      displayResult.textContent = result;
    } else if (isDecimalResult) {
      let tempResult = parseFloat(result);
      tempResult = tempResult.toString();
      tempResult.length > 4
        ? (tempResult = Number(tempResult).toFixed(2))
        : tempResult;

      displayResult.textContent = tempResult;
    }
  }
}

function hideToDisplayResult(result) {
  displayResult.style.display = "none";
  displayResult.textContent = "";
  displayCalculation.classList.remove("have_result");
}

function backspaceHandle() {
  if (isResult) {
    resultEdit();
  } else {
    if (errorText && isModulas) {
      displayCalculation.textContent = "";
      isModulas = false;
      errorText = false;
    } else {
      displayCalculation.textContent = displayCalculation.textContent.slice(
        0,
        -1
      );
    }
  }
}
function cleanAllDisplay() {
  isModulas = false;
  isResult = false;
  displayCalculation.textContent = "";
}

function handleCalculation() {
  try {
    let theString = displayCalculation.textContent;
    let newArray = theString.split(/([+\-%÷×])/);

    newArray.forEach((arr, index) => {
      if (arr === "×") {
        newArray[index] = "*";
      } else if (arr === "÷") {
        newArray[index] = "/";
      }
    });
    theResult = new Function("return " + newArray.join(""))();
    showToDisplayResult(theResult);
    displayCalculation.classList.remove("math_error");
  } catch (error) {
    displayCalculation.classList.add("math_error");
    errorText = error;
    console.log(error);
  }
}

function modulasHandle() {
  // isModulas = true;
  let a, b, c;
  let theString = displayCalculation.textContent;
  let newArray = theString.split(/([%])/);
  if (newArray.length <= 3) {
    [a, b, c] = newArray;
    a = Number(a);
    c = Number(c);

    theResult = (a * c) / 100;
    showToDisplayResult(theResult);
  } else {
    showToDisplayText("Error: Please follow this patteren - 100%10");
    displayCalculation.classList.add("is_error");
    errorText = true;
  }
}

function resultEdit() {
  isResult = false;
  isModulas = false;
  let currentResult = displayResult.textContent;
  displayCalculation.textContent = currentResult;
  hideToDisplayResult();
}

function textResize() {
  if (displayCalculation.textContent.length > 8) {
    displayCalculation.style.fontSize = "28px";
    displayCalculation.style.lineHeight = "30px";
  } else {
    displayCalculation.style.fontSize = "";
    displayCalculation.style.lineHeight = "";
  }
}
