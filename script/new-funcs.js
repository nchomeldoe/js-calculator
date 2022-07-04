const findDisplayElementsWithContent = () => {
  findElementsWithContent([primaryDisplay, secondaryDisplay]);
};

const handleDisplayRoot = () => {
  const squareRoot = findSquareRoot(primaryDisplay);
  primaryDisplay.innerHTML = squareRoot.toString();
};

const handleError = (e, result) => {
  if (!hasError(result)) {
    displayResult(secondaryDisplay, result, e.target.innerHTML);
    clearInnerHTML(primaryDisplay);
  } else {
    appendInnerHTML(primaryDisplay, secondaryDisplay, true);
    primaryDisplay.innerHTML = "NaN";
  }
};

// const handleOperator = (e) => {
//   if (
//     primaryDisplay.innerHTML === "NaN" ||
//     !findDisplayElementsWithContent().length ||
//     findDisplayElementsWithContent().toString() === "sd" ||
//     hasUnsuitableContent(primaryDisplay)
//   ) {
//     return;
//   } else if (
//     equalsOperationPerformed(secondaryDisplay) ||
//     elementsWithContent.toString() === "pd"
//   ) {
//     if (primaryDisplay.innerHTML.includes("√")) {
//       handleDisplayRoot();
//     }
//     moveValue(secondaryDisplay, primaryDisplay, e.target.innerHTML);
//   } else if (primaryDisplay.innerHTML.includes("√")) {
//     const squareRoot = findSquareRoot(primaryDisplay);
//     const result = performCalculation(secondaryDisplay.innerHTML, squareRoot);
//     handleError(e, result);
//   } else {
//     const result = performCalculation(
//       secondaryDisplay.innerHTML,
//       primaryDisplay.innerHTML,
//     );
//     handleError(e, result);
//   }
// };

const handleAllOperators = (e) => {
  if (
    equalsOperationPerformed(secondaryDisplay) ||
    elementsWithContent.toString() === "pd"
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

const handleMinus = (e) => {
  if (hasUnsuitableContent(primaryDisplay)) {
    return;
  } else if (primaryDisplay.innerHTML === "NaN") {
    handleClearAll();
    handleAppendHTMLToPrimaryDisplay(e);
  } else if (
    !findDisplayElementsWithContent().length ||
    findDisplayElementsWithContent().toString() === "sd"
  ) {
    handleAppendHTMLToPrimaryDisplay(e);
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
        primaryDisplay.innerHTML = squareRoot;
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
