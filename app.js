function calculator() {
  const NumberButtons = Array.from(document.querySelectorAll("[data-number]"));
  const OperationButtons = Array.from(
    document.querySelectorAll("[data-operation]")
  );
  const equalButton = document.querySelector("[data-equals]");
  const deleteButton = document.querySelector("[data-delete]");
  const clearButton = document.querySelector("[data-all-clear]");
  const error = "You cant divide by 0";

  let previousText = document.querySelector("[data-previous]");
  let currentText = document.querySelector("[data-current]");

  let currentOperand = "";
  let previousOperand = "";
  let operation = undefined;

  function handleButtons() {
    //number buttons
    NumberButtons.map((btn) => {
      btn.addEventListener("click", () => {
        currentOperand === error ? (currentOperand = "") : "";
        currentOperand === 0 ? (currentOperand = "") : "";
        currentOperand = currentOperand.toString();
        if (btn.textContent === "." && currentOperand.includes(".")) return;
        currentOperand += btn.textContent.toString();
        updateDisplay();
      });
    });
    //operation buttons
    OperationButtons.map((btn) => {
      btn.addEventListener("click", () => {
        if (currentOperand === "") return;
        operation = btn.textContent;
        operate();
        updateDisplay();
      });
    });
    //delete button
    deleteButton.addEventListener("click", () => {
      let temp;
      if (currentOperand === error) {
        currentOperand = 0;
        temp = currentOperand;
      } else {
        temp = currentOperand.toString().slice(0, -1);
      }
      if (temp === "" || temp === 0) {
        temp = 0;
        currentOperand = temp;
        updateDisplay();
      } else {
        currentOperand = parseFloat(temp);
        updateDisplay();
      }
    });
    //equal button
    equalButton.addEventListener("click", () => {
      calculateResults();
      updateDisplay();
    });
    clearButton.addEventListener("click", () => {
      currentOperand = 0;
      previousOperand = "";
      operation = undefined;
      updateDisplay();
    });
  }
  function operate() {
    if (currentOperand === " ") return;
    if (previousOperand !== " ") {
      calculateResults();
    }
    previousOperand = `${currentOperand} ${operation}`;
    currentOperand = " ";
  }

  function calculateResults() {
    const curr = parseFloat(currentOperand);
    const prev = parseFloat(previousOperand);
    let result;

    if (isNaN(prev) || isNaN(curr)) return;
    operation === "+"
      ? (result = prev + curr)
      : operation === "-"
      ? (result = prev - curr)
      : operation === "*"
      ? (result = prev * curr)
      : operation === "÷" && curr === 0
      ? (result = error)
      : operation === "÷"
      ? (result = prev / curr)
      : "";

    currentOperand = result;
    operation = undefined;
    previousOperand = "";
  }

  function updateDisplay() {
    currentText.textContent = currentOperand;
    previousText.textContent = previousOperand;
  }

  handleButtons();
}
calculator();
