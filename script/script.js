//query selectors
//for display areas
const xValueBox = document.querySelector("#x");
const yValueBox = document.querySelector("#y");
const inputOutputBox = document.querySelector("#io");

//for buttons
const numbers = document.querySelectorAll(".main__button--primary");
const point = document.querySelector("#point");
const equals = document.querySelector("#equals");
const operators = document.querySelectorAll(".main__button--operator");
const root = document.querySelector("#root");
const clear = document.querySelector("#clear");
const clearEntry = document.querySelector("#clear-entry");

// pure funcs
const appendInnerHTML = (firstDomElement, secondDomElement) => {
  firstDomElement.id === "root"
    ? (secondDomElement.innerHTML = `√${secondDomElement.innerHTML}`)
    : (secondDomElement.innerHTML += firstDomElement.innerHTML);
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
  console.log("targetDomElement", targetDomElement);
  console.log("startDomElement", startDomElement);
  console.log("operatorinner", operatorInnerHTML);
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
    // case "√":
    //   return Math.pow(yValue, 1 / xValue);
    //   break;
  }
};

const findSquareRoot = (domElement) => {
  number = Number(domElement.innerHTML.substring(1));
  console.log("number", number);
  console.log("root", Math.pow(number, 0.5));
  return Math.pow(number, 0.5);
};

const displayResult = (displayLocation, result, operatorInnerHTML = "") => {
  displayLocation.innerHTML = operatorInnerHTML
    ? `${result} ${operatorInnerHTML}`
    : result;
};

// other funcs
const unsuitableContent = () => {
  return inputOutputBox.innerHTML[inputOutputBox.innerHTML.length - 1] ===
    "." || inputOutputBox.innerHTML === "-"
    ? true
    : false;
};

const findDisplayElementsWithContent = () => {
  const displayElementsWithContent = findElementsWithContent([
    inputOutputBox,
    xValueBox,
    yValueBox,
  ]);
  if (displayElementsWithContent.length === 3) {
    return "all";
  } else if (!displayElementsWithContent.length) {
    return "none";
  } else return displayElementsWithContent;
};

// handler funcs
const handleAppendHTMLToInputOutputBox = (e) =>
  appendInnerHTML(e.target, inputOutputBox);

const handleClearAll = () => {
  clearInnerHTML(inputOutputBox);
  clearInnerHTML(xValueBox);
  clearInnerHTML(yValueBox);
};

const handleClearOneCharFromInputOutputBox = (e) => {
  if (findDisplayElementsWithContent() !== "all") {
    clearOneChar(inputOutputBox);
  }
};

const handleNum = (e) => {
  if (findDisplayElementsWithContent() === "all") {
    handleClearAll();
  } else if (inputOutputBox.innerHTML === "0") {
    clearInnerHTML(inputOutputBox);
  } else if (inputOutputBox.innerHTML === "-0") {
    clearOneChar(inputOutputBox);
  }
  handleAppendHTMLToInputOutputBox(e);
};

const handlePoint = (e) => {
  if (findDisplayElementsWithContent() === "all") {
    handleClearAll();
  } else if (unsuitableContent() || inputOutputBox.innerHTML.includes(".")) {
    return;
  } else {
    handleAppendHTMLToInputOutputBox(e);
  }
};

const handleEquals = (e) => {
  if (
    findDisplayElementsWithContent() === "all" ||
    unsuitableContent() ||
    findDisplayElementsWithContent().toString() === "x"
  ) {
    return;
  } else if (findDisplayElementsWithContent().toString() === "io") {
    if (inputOutputBox.innerHTML.includes("√")) {
      const squareRoot = findSquareRoot(inputOutputBox);
      inputOutputBox.innerHTML = squareRoot.toString();
    } else {
      return;
    }
  } else {
    if (inputOutputBox.innerHTML.includes("√")) {
      const squareRoot = findSquareRoot(inputOutputBox);
      inputOutputBox.innerHTML = squareRoot.toString();
    }
    const result = performCalculation(
      xValueBox.innerHTML,
      inputOutputBox.innerHTML,
    );
    moveValue(yValueBox, inputOutputBox);
    displayResult(inputOutputBox, result);
  }
};

const handleOperator = (e) => {
  if (
    findDisplayElementsWithContent() === "none" ||
    findDisplayElementsWithContent().toString() === "x"
  ) {
    if (e.target.innerHTML === "-") {
      handleAppendHTMLToInputOutputBox(e);
    } else {
      return;
    }
  } else if (unsuitableContent()) {
    return;
  } else if (
    findDisplayElementsWithContent() === "all" ||
    findDisplayElementsWithContent().toString() === "io"
  ) {
    if (inputOutputBox.innerHTML.includes("√")) {
      const squareRoot = findSquareRoot(inputOutputBox);
      inputOutputBox.innerHTML = squareRoot.toString();
    }
    moveValue(xValueBox, inputOutputBox, e.target.innerHTML);
    clearInnerHTML(yValueBox);
  } else {
    if (inputOutputBox.innerHTML.includes("√")) {
      const squareRoot = findSquareRoot(inputOutputBox);
      const result = performCalculation(xValueBox.innerHTML, squareRoot);
      displayResult(xValueBox, result, e.target.innerHTML);
    } else {
      const result = performCalculation(
        xValueBox.innerHTML,
        inputOutputBox.innerHTML,
      );
      displayResult(xValueBox, result, e.target.innerHTML);
    }
    clearInnerHTML(inputOutputBox);
  }
};

const handleRoot = (e) => {
  if (unsuitableContent() || inputOutputBox.innerHTML.includes("√")) {
    return;
  } else if (findDisplayElementsWithContent() === "all") {
    clearInnerHTML(xValueBox);
    clearInnerHTML(yValueBox);
  }
  handleAppendHTMLToInputOutputBox(e);
};

//event listeners
numbers.forEach((number) => {
  if (number.id !== "point") {
    number.addEventListener("click", handleNum);
  }
});

// number.addEventListener("click", handleNum));

point.addEventListener("click", handlePoint);

equals.addEventListener("click", handleEquals);

operators.forEach((operator) => {
  if (operator.id !== "root") {
    operator.addEventListener("click", handleOperator);
  }
});

root.addEventListener("click", handleRoot);

clear.addEventListener("click", handleClearAll);

clearEntry.addEventListener("click", handleClearOneCharFromInputOutputBox);
