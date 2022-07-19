//query selectors
//for display areas
const secondaryDisplay = document.querySelector(".secondary-display__value");
const primaryDisplay = document.querySelector(".primary-display__value");

//for buttons
const numbers = document.querySelectorAll(".main__button--primary");
const point = document.querySelector("#point");
const equals = document.querySelector("#equals");
const operators = document.querySelectorAll(".main__button--operator");
const minus = document.querySelector("#minus");
const root = document.querySelector("#root");
const clear = document.querySelector("#clear");
const clearEntry = document.querySelector("#clear-entry");

// pure funcs

// add content to the existing content of a dom element
const appendInnerHTML = (
  firstDomElement,
  secondDomElement,
  equalsOperation = false,
) => {
  secondDomElement.innerHTML += equalsOperation
    ? ` ${firstDomElement.innerHTML}`
    : firstDomElement.innerHTML;
};

// clear a dom element
const clearInnerHTML = (domElement) => (domElement.innerHTML = "");

// delete last character in a dom element
const clearOneChar = (domElement) => {
  const content = domElement.innerHTML;
  domElement.innerHTML = content.substring(0, content.length - 1);
};

// identify which of a set of dom elements have content in them
const findElementsWithContent = (domElementsArr) => {
  const elementsWithContent = [];
  domElementsArr.forEach((domElement) => {
    if (domElement.innerHTML !== "") {
      elementsWithContent.push(domElement.id);
    }
  });
  return elementsWithContent;
};

//move a value from one dom element to another and add an operator if necessary
const moveValue = (
  targetDomElement,
  startDomElement,
  operatorInnerHTML = "",
) => {
  targetDomElement.innerHTML = operatorInnerHTML
    ? `${startDomElement.innerHTML} ${operatorInnerHTML}`
    : startDomElement.innerHTML;
  clearInnerHTML(startDomElement);
};

// perform a claculation
const performCalculation = (xDomElementContent, yDomElementContent) => {
  const xAndOperator = xDomElementContent.split(" ");
  const xValue = Number(xAndOperator[0]);
  const yValue = Number(yDomElementContent);
  switch (xAndOperator[1]) {
    case "-":
      return xValue - yValue;
    case "+":
      return xValue + yValue;
    case "x":
      return xValue * yValue;
    case "/":
      return xValue / yValue;
    case "÷":
      return xValue / yValue;
    case "^":
      return Math.pow(xValue, yValue);
  }
};

// perform a square root operation
const findSquareRoot = (domElement) => {
  if (domElement.innerHTML[0] === "-") {
    const number = Number(domElement.innerHTML.substring(2));
    return `-${Math.pow(number, 0.5).toString()}`;
  }
  const number = Number(domElement.innerHTML.substring(1));
  return Math.pow(number, 0.5).toString();
};

// display the calculation result with operator if necessary
const displayResult = (displayLocation, result, operatorInnerHTML = "") => {
  displayLocation.innerHTML = operatorInnerHTML
    ? `${result} ${operatorInnerHTML}`
    : result;
};

// identify whether or not the equals button has been pressed (i.e. whether the whole calculation is displayed in the secondary display)
const equalsOperationPerformed = (domElement) => {
  const lastChar = domElement.innerHTML[domElement.innerHTML.length - 1];
  return lastChar === "0" || Number(lastChar);
};

// identify whether the dom element contains content that means another item can't be added on (e.g. to avois two consecutive points)
const hasUnsuitableContent = (domElement) => {
  return (
    domElement.innerHTML[domElement.innerHTML.length - 1] === "." ||
    domElement.innerHTML === "-" ||
    domElement.innerHTML === "√"
  );
};

// identify whether the calculation result is NaN or infinity
const hasError = (result) => {
  return !isFinite(result);
};

// handler funcs interacting with specific dom elements

//identify which of the primary and secondary displays have content in them
const findDisplayElementsWithContent = () => {
  return findElementsWithContent([primaryDisplay, secondaryDisplay]);
};

//display square root result in primary display
const handleDisplayRoot = () => {
  console.log("6");
  const squareRoot = findSquareRoot(primaryDisplay);
  primaryDisplay.innerHTML = squareRoot;
};

//if the calc resut is NaN or infinity, display NaN in primary display and show the calculation in the secondary display, else clear primary display and show result and operator in secondary display
const handleError = (e, result) => {
  if (!hasError(result)) {
    displayResult(secondaryDisplay, result, e.target.innerHTML);
    clearInnerHTML(primaryDisplay);
  } else {
    appendInnerHTML(primaryDisplay, secondaryDisplay, true);
    primaryDisplay.innerHTML = "NaN";
  }
};

//append content to primary display
const handleAppendHTMLToPrimaryDisplay = (e) =>
  appendInnerHTML(e.target, primaryDisplay);

// clear all the displays
const handleClearAll = () => {
  clearInnerHTML(primaryDisplay);
  clearInnerHTML(secondaryDisplay);
};

//clear last character in prmary display unless the equals button has been pressed (don't want to be able to delete result)
const handleClearOneCharFromPrimaryDisplay = () => {
  if (!equalsOperationPerformed(secondaryDisplay)) {
    clearOneChar(primaryDisplay);
  }
};

// when number is clicked, add it to primary display after clearing everything if a full operation has already been performed, or just clearing zero if necessary
const handleNum = (e) => {
  if (equalsOperationPerformed(secondaryDisplay)) {
    handleClearAll();
  } else if (primaryDisplay.innerHTML === "0") {
    clearInnerHTML(primaryDisplay);
  } else if (
    primaryDisplay.innerHTML === "-0" ||
    primaryDisplay.innerHTML.substring(-2) === "√0"
  ) {
    clearOneChar(primaryDisplay);
  }
  handleAppendHTMLToPrimaryDisplay(e);
};

// if point is clicked, add it to primary display after clearing everything if a full operation has already been performed. Don't add it if there is already a point or other unsuitable content in primary display
const handlePoint = (e) => {
  if (equalsOperationPerformed(secondaryDisplay)) {
    handleClearAll();
  } else if (
    hasUnsuitableContent(primaryDisplay) ||
    primaryDisplay.innerHTML.includes(".")
  ) {
    return;
  }
  handleAppendHTMLToPrimaryDisplay(e);
};

// if equals is clicked, nothing should happen if a complete calculation has been performed or the primary display has unsuitable content or is empty. If the primary display includes a root operator, then the root operation should be caulated and moved to the secondary display while the result is displayed in the primary display. Else if there is content only in the primary display then nothing should happen. If both the primary and secondary displays have content, the calculation should be performed (including any root operation if there is a root operator in the primary display), and the entire operation should be displayed in the secondary display while the result is displayed in the primary display.
const handleEquals = (e) => {
  if (
    equalsOperationPerformed(secondaryDisplay) ||
    hasUnsuitableContent(primaryDisplay) ||
    findDisplayElementsWithContent().toString() === "sd" ||
    !findDisplayElementsWithContent().length
  ) {
    return;
  }
  if (findDisplayElementsWithContent().toString() === "pd") {
    if (primaryDisplay.innerHTML.includes("√")) {
      appendInnerHTML(primaryDisplay, secondaryDisplay);
      handleDisplayRoot();
    } else {
      return;
    }
  } else {
    if (primaryDisplay.innerHTML.includes("√")) {
      const squareRoot = findSquareRoot(primaryDisplay);
      primaryDisplay.innerHTML = squareRoot;
    }
    const result = performCalculation(
      secondaryDisplay.innerHTML,
      primaryDisplay.innerHTML,
    );
    appendInnerHTML(primaryDisplay, secondaryDisplay, true);
    if (!hasError(result)) {
      displayResult(primaryDisplay, result);
    } else {
      primaryDisplay.innerHTML = "NaN";
    }
  }
};

//general function that applies to all operators including minus (except root) - if complete calulation finished then move result of it up to secondary display with operator (extra complexity if it involves a root value), else perform whatever operation is stated in the secondary display and move the result and operator up there
const handleAllOperatorsExceptRoot = (e) => {
  if (
    equalsOperationPerformed(secondaryDisplay) ||
    findDisplayElementsWithContent().toString() === "pd"
  ) {
    if (primaryDisplay.innerHTML.includes("√")) {
      handleDisplayRoot();
    }
    moveValue(secondaryDisplay, primaryDisplay, e.target.innerHTML);
  } else if (primaryDisplay.innerHTML.includes("√")) {
    const squareRoot = findSquareRoot(primaryDisplay);
    const result = performCalculation(secondaryDisplay.innerHTML, squareRoot);
    handleError(e, result);
  } else {
    const result = performCalculation(
      secondaryDisplay.innerHTML,
      primaryDisplay.innerHTML,
    );
    handleError(e, result);
  }
};

// function for all operators except minus and root - if the priary display is empty or has unsuitable content, then the operator should not do anything. Else apply the handleAllOperatorsExceptRoot function above
const handleSimpleOperator = (e) => {
  if (
    primaryDisplay.innerHTML === "NaN" ||
    !findDisplayElementsWithContent().length ||
    findDisplayElementsWithContent().toString() === "sd" ||
    hasUnsuitableContent(primaryDisplay)
  ) {
    return;
  }
  handleAllOperatorsExceptRoot(e);
};

// if minus is clicked, do nothing if the content of the primary display is unsuitable. If primary display says NaN, clear everything and display minus in the primary display. If primary display is empty, display minus in primary display. In all other cases, apply the handleAllOperators Except Root funnction above.
const handleMinus = (e) => {
  if (hasUnsuitableContent(primaryDisplay)) {
    return;
  }
  if (primaryDisplay.innerHTML === "NaN") {
    handleClearAll();
    handleAppendHTMLToPrimaryDisplay(e);
  } else if (
    !findDisplayElementsWithContent().length ||
    findDisplayElementsWithContent().toString() === "sd"
  ) {
    handleAppendHTMLToPrimaryDisplay(e);
  } else {
    handleAllOperatorsExceptRoot(e);
  }
};

//if root is clicked, add it to primary display after clearing everything if a full operation has already been performed. Don't add it if there is already anything in the primary display except a minus
const handleRoot = (e) => {
  if (equalsOperationPerformed(secondaryDisplay)) {
    handleClearAll();
  } else if (primaryDisplay.innerHTML && primaryDisplay.innerHTML !== "-") {
    return;
  }
  handleAppendHTMLToPrimaryDisplay(e);
};

//event listeners
numbers.forEach((number) => {
  if (number.id !== "point") {
    number.addEventListener("click", handleNum);
  }
});

point.addEventListener("click", handlePoint);

equals.addEventListener("click", handleEquals);

operators.forEach((operator) => {
  if (operator.id !== "root" && operator.id !== "minus") {
    operator.addEventListener("click", handleSimpleOperator);
  }
});

minus.addEventListener("click", handleMinus);

root.addEventListener("click", handleRoot);

clear.addEventListener("click", handleClearAll);

clearEntry.addEventListener("click", handleClearOneCharFromPrimaryDisplay);
