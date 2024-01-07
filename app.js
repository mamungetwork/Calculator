"use-strict";

const btnDisplay = document.querySelectorAll(".to_display");
const display = document.querySelector(".display");
const clearEverything = document.getElementById("c");
const backSpace = document.getElementById("backspace");
const equal = document.getElementById("equal");
let displayValue;

btnDisplay.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (display.value == 0 || display.value === "Error") {
      display.value = "";
    }
    displayValue = display.value += btn.value;
    console.log(displayValue);
  });
});

clearEverything.addEventListener("click", () => {
  display.value = "0";
});

backSpace.addEventListener("click", () => {
  const currentDisplay = document.querySelector(".display").value;
  if (!(display.value === "Error")) {
    document.querySelector(".display").value = currentDisplay.slice(0, -1);
  }
  if (currentDisplay.length < 2) document.querySelector(".display").value = "0";
});

equal.addEventListener("click", calculate);
function calculate() {
  const expression = document.getElementById("display").value;
  try {
    const result = Function(`'use strict'; return (${expression});`)();

    if (result === Math.floor(result)) {
      document.getElementById("display").value = result;
    } else {
      document.getElementById("display").value = result.toFixed(2);
    }
  } catch (error) {
    document.getElementById("display").value = "Error";
  }
}
