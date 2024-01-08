"use-strict";

const displayBtn = document.querySelectorAll(".is_display");
const displayCalculation = document.querySelector(".calculation");
const displayResult = document.querySelector(".result");
const cleanAllBtn = document.getElementById("c");
const backBtn = document.getElementById("backspace");
const equalBtn = document.getElementById("equal");
const modulasBtn = document.getElementById("modulas");

let isModulas = false;
let errorText;

displayBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let displayText = displayCalculation.textContent;
    let btnText = e.target.textContent;
    let btnValue = e.target.value;
    showToDisplayText(displayText + btnText);

    if (displayCalculation.clientWidth > 226) {
      displayCalculation.style.fontSize = "28px";
      displayCalculation.style.lineHeight = "30px";
    }
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
});

backBtn.addEventListener("click", (e) => {
  backspaceHandle();
});

modulasBtn.addEventListener("click", (e) => {
  isModulas = true;
});

function showToDisplayText(text) {
  displayCalculation.textContent = text;
}

function showToDisplayResult(result) {
  if (!Number(result)) {
    showToDisplayText("Error");
  } else {
    displayResult.style.display = "block";
    displayResult.textContent = result;
    displayCalculation.classList.add("have_result");
  }
}

function hideToDisplayResult(result) {
  displayResult.style.display = "none";
  displayResult.textContent = "";
  displayCalculation.classList.remove("have_result");
}

function backspaceHandle() {
  if (errorText) {
    displayCalculation.textContent = "";
  } else {
    displayCalculation.textContent = displayCalculation.textContent.slice(
      0,
      -1
    );
  }
}
function cleanAllDisplay() {
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
  } catch (error) {
    showToDisplayText("Error");
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
    showToDisplayText("Error:Please follow this patteren 100%10");
  }
}
