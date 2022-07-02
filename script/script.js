//query selectors
//for display areas
const secondaryDisplay = document.querySelector(".secondary-display__value");
const primaryDisplay = document.querySelector(".primary-display__value");

//for buttons
const numbers = document.querySelectorAll(".main__button--primary");
const point = document.querySelector("#point");
const equals = document.querySelector("#equals");
const operators = document.querySelectorAll(".main__button--operator");
const root = document.querySelector("#root");
const clear = document.querySelector("#clear");
const clearEntry = document.querySelector("#clear-entry");

// pure funcs
const appendInnerHTML = (
  firstDomElement,
  secondDomElement,
  equalsOperation = false,
) => {
  secondDomElement.innerHTML += equalsOperation
    ? ` ${firstDomElement.innerHTML}`
    : firstDomElement.innerHTML;
};

const clearInnerHTML = (domElement) => (domElement.innerHTML = "");

const clearOneChar = (domElement) => {
  const content = domElement.innerHTML;
  domElement.innerHTML = content.substring(0, content.length - 1);
};

const findElementsWithContent = (domElementsArr) => {
  const elementsWithContent = [];
  domElementsArr.forEach((domElement) => {
    if (domElement.innerHTML !== "") {
      elementsWithContent.push(domElement.id);
    }
  });
  return elementsWithContent;
};

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

const performCalculation = (xDomElementContent, yDomElementContent) => {
  const xAndOperator = xDomElementContent.split(" ");
  const xValue = Number(xAndOperator[0]);
  const yValue = Number(yDomElementContent);
  switch (xAndOperator[1]) {
    case "-":
      return xValue - yValue;
      break;
    case "+":
      return xValue + yValue;
      break;
    case "x":
      return xValue * yValue;
      break;
    case "/":
      return xValue / yValue;
      break;
    case "÷":
      return xValue / yValue;
      break;
    case "^":
      return Math.pow(xValue, yValue);
      break;
  }
};

const findSquareRoot = (domElement) => {
  if (domElement.innerHTML[0] === "-") {
    const number = Number(domElement.innerHTML.substring(2));
    return `-${Math.pow(number, 0.5)}`;
  } else {
    const number = Number(domElement.innerHTML.substring(1));
    return Math.pow(number, 0.5).toString();
  }
};

const displayResult = (displayLocation, result, operatorInnerHTML = "") => {
  displayLocation.innerHTML = operatorInnerHTML
    ? `${result} ${operatorInnerHTML}`
    : result;
};

const equalsOperationPerformed = (domElement) => {
  const lastChar = domElement.innerHTML[domElement.innerHTML.length - 1];
  if (lastChar === "0" || Number(lastChar)) {
    return true;
  } else {
    return false;
  }
};

const hasUnsuitableContent = (domElement) => {
  return domElement.innerHTML[domElement.innerHTML.length - 1] === "." ||
    domElement.innerHTML === "-" ||
    domElement.innerHTML === "√"
    ? true
    : false;
};

const hasError = (result) => {
  if (!isFinite(result)) {
    return true;
  } else {
    return false;
  }
};

// handler funcs
const handleAppendHTMLToPrimaryDisplay = (e) =>
  appendInnerHTML(e.target, primaryDisplay);

const handleClearAll = () => {
  clearInnerHTML(primaryDisplay);
  clearInnerHTML(secondaryDisplay);
};

const handleClearOneCharFromPrimaryDisplay = () => {
  if (!equalsOperationPerformed(secondaryDisplay)) {
    clearOneChar(primaryDisplay);
  }
};

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

const handlePoint = (e) => {
  if (equalsOperationPerformed(secondaryDisplay)) {
    handleClearAll();
    handleAppendHTMLToPrimaryDisplay(e);
  } else if (
    hasUnsuitableContent(primaryDisplay) ||
    primaryDisplay.innerHTML.includes(".")
  ) {
    return;
  } else {
    handleAppendHTMLToPrimaryDisplay(e);
  }
};

const handleEquals = (e) => {
  const elementsWithContent = findElementsWithContent([
    primaryDisplay,
    secondaryDisplay,
  ]);
  if (
    equalsOperationPerformed(secondaryDisplay) ||
    hasUnsuitableContent(primaryDisplay) ||
    elementsWithContent.toString() === "sd" ||
    !elementsWithContent.length
  ) {
    return;
  } else if (elementsWithContent.toString() === "pd") {
    if (primaryDisplay.innerHTML.includes("√")) {
      const squareRoot = findSquareRoot(primaryDisplay);
      appendInnerHTML(primaryDisplay, secondaryDisplay);
      primaryDisplay.innerHTML = squareRoot;
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

const handleOperator = (e) => {
  if (primaryDisplay.innerHTML === "NaN") {
    return;
  } else {
    const elementsWithContent = findElementsWithContent([
      primaryDisplay,
      secondaryDisplay,
    ]);
    if (
      !elementsWithContent.length ||
      elementsWithContent.toString() === "sd"
    ) {
      if (e.target.innerHTML === "-") {
        handleAppendHTMLToPrimaryDisplay(e);
      } else {
        return;
      }
    } else if (hasUnsuitableContent(primaryDisplay)) {
      return;
    } else if (
      equalsOperationPerformed(secondaryDisplay) ||
      elementsWithContent.toString() === "pd"
    ) {
      if (primaryDisplay.innerHTML.includes("√")) {
        const squareRoot = findSquareRoot(primaryDisplay);
        primaryDisplay.innerHTML = squareRoot.toString();
      }
      moveValue(secondaryDisplay, primaryDisplay, e.target.innerHTML);
    } else if (primaryDisplay.innerHTML.includes("√")) {
      const squareRoot = findSquareRoot(primaryDisplay);
      const result = performCalculation(secondaryDisplay.innerHTML, squareRoot);
      if (!hasError(result)) {
        displayResult(secondaryDisplay, result, e.target.innerHTML);
        clearInnerHTML(primaryDisplay);
      } else {
        primaryDisplay.innerHTML = squareRoot;
        appendInnerHTML(primaryDisplay, secondaryDisplay, true);
        primaryDisplay.innerHTML = "NaN";
      }
    } else {
      const result = performCalculation(
        secondaryDisplay.innerHTML,
        primaryDisplay.innerHTML,
      );
      if (!hasError(result)) {
        displayResult(secondaryDisplay, result, e.target.innerHTML);
        clearInnerHTML(primaryDisplay);
      } else {
        appendInnerHTML(primaryDisplay, secondaryDisplay, true);
        primaryDisplay.innerHTML = "NaN";
      }
    }
  }
};

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
  if (operator.id !== "root") {
    operator.addEventListener("click", handleOperator);
  }
});

root.addEventListener("click", handleRoot);

clear.addEventListener("click", handleClearAll);

clearEntry.addEventListener("click", handleClearOneCharFromPrimaryDisplay);
