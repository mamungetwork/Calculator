"use-strict";

const displayBtn = document.querySelectorAll(".is_display");
const allOperator = document.querySelectorAll(".operator");
const displayCalculation = document.querySelector(".calculation");
const displayResult = document.querySelector(".result");
const emptyDisplay = document.querySelector(".empty");
const cleanAllBtn = document.getElementById("c");
const backBtn = document.getElementById("backspace");
const equalBtn = document.getElementById("equal");
const modulasBtn = document.getElementById("modulas");

let isModulas = false;
let isResult = false;
let isOperator = false;
let errorText;
let displayText;

let specialChar = ["+", "-", "%", "×", "÷"];
displayBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    displayText = displayCalculation.textContent;
    let btnText = e.target.textContent;
    let btnValue = e.target.value;

    hideZero();

    let lastChar = displayText.slice(-1);
    let isLastCharSpecial = specialChar.includes(lastChar);

    if (btnValue === "%" && isOperator && !isResult) {
      return;
    }

    if (btnValue === "." && !isOperator) {
      if (displayText.includes(".")) {
        return;
      }
    } else if (btnValue === "." && isOperator) {
      let theOperator;
      specialChar.forEach((char) => {
        if (displayText.includes(char)) {
          theOperator = char;
        }
      });

      let displayArray = displayText.split(theOperator);
      let lastItem = displayArray[displayArray.length - 1];

      if (lastItem.includes(".")) {
        return;
      }
    }

    if (lastChar === "." && lastChar === btnValue) {
      return;
    }
    if (
      isModulas &&
      (btnValue === "+" ||
        btnValue === "-" ||
        btnValue === "*" ||
        btnValue === "/" ||
        btnValue === "%")
    ) {
      return;
    }

    if (!isResult) {
      if (specialChar.includes(btnText) && isLastCharSpecial) {
        let modifiedText = displayText.slice(0, -1) + btnText;
        showToDisplayText(modifiedText);
        return;
      }
      showToDisplayText(displayText + btnText);
    } else if (isResult) {
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
  if (displayCalculation.textContent !== "") {
    if (isModulas) {
      modulasHandle();
    } else {
      handleCalculation();
    }
    isModulas = false;
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
  let displayText = displayCalculation.textContent;

  if (displayText.length === 0) {
    showZero();
  }
  isModulas = false;
  isOperator = false;
});

modulasBtn.addEventListener("click", (e) => {
  // let displayText = displayCalculation.textContent;
  if (!isOperator) {
    isModulas = true;
  }

  if (isResult) {
    resultEdit();
  }
});

allOperator.forEach((btn) => {
  if (isResult) {
    btn.addEventListener("click", (e) => {
      resultEdit();
    });
  }

  btn.addEventListener("click", (e) => {
    if (e.target.value != "%") {
      isOperator = true;
    }
  });
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

function showZero() {
  displayResult.classList.add("hide");
  emptyDisplay.classList.remove("hide");
  displayCalculation.classList.remove("clicked");
}

function hideZero() {
  displayCalculation.classList.add("clicked");
  emptyDisplay.classList.add("hide");
}

function backspaceHandle() {
  if (isResult) {
    resultEdit();
  } else {
    if (errorText && isModulas) {
      displayCalculation.textContent = "";
      isModulas = false;
      errorText = false;
      isOperator = false;
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
  isOperator = false;
  displayCalculation.textContent = "";
  showZero();
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
  let currentResult = displayResult.textContent;
  displayCalculation.textContent = currentResult;
  hideToDisplayResult();
  isResult = false;
  isModulas = false;
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
document.addEventListener("keyup", (e) => {
  let inputKey = e.key;
  console.log(inputKey);
});
