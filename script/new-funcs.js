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

const handleEquals = (e) => {
  if (
    equalsOperationPerformed(secondaryDisplay) ||
    hasUnsuitableContent(primaryDisplay) ||
    findDisplayElementsWithContent().toString() === "sd" ||
    !findDisplayElementsWithContent().length
  ) {
    return;
  } else if (findDisplayElementsWithContent().toString() === "pd") {
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
