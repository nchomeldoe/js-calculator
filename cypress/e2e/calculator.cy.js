describe("calculator tests", () => {
  it("should give 7 + 9 = 16", () => {
    // 1. ARRANGE - prerequisites - visit the site
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT - write the code that controls user input
    // cy.get - use a css selector to find an element (use target button on cypress site to find best selector)
    cy.get(":nth-child(7)").click();
    cy.get(":nth-child(13)").click();
    cy.get(":nth-child(9)").click();
    cy.get("#equals").click();
    // 3. ASSERT - check that the result is as expected
    //check that 16 is inside the result display and that 7 + 9 appears on display as well
    cy.get("#sd").should("contain", "7 + 9");
    cy.get("#pd").should("contain", "16");
  });

  it("should give 7 - 9 = -2", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get(":nth-child(7)").click();
    cy.get("#minus").click();
    cy.get(":nth-child(9)").click();
    cy.get("#equals").click();
    // 3. ASSERT
    cy.get("#sd").should("contain", "7 - 9");
    cy.get("#pd").should("contain", "-2");
  });

  it("should give 2 x root 16 = 8", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get(".main > :nth-child(2)").click();
    cy.get('[aria-label="times"]').click();
    cy.get("#root").click();
    cy.get(".main > :nth-child(1)").click();
    cy.get(".main > :nth-child(6)").click();
    cy.get("#equals").click();
    // 3. ASSERT
    cy.get("#sd").should("contain", "2 x 4");
    cy.get("#pd").should("contain", "8");
  });

  it("should give 10 / 2.5 = 4", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get(".main > :nth-child(1)").click();
    cy.get(":nth-child(10)").click();
    cy.get('[aria-label="divide"]').click();
    cy.get(".main > :nth-child(2)").click();
    cy.get("#point").click();
    cy.get(".main > :nth-child(5)").click();
    cy.get("#equals").click();
    // 3. ASSERT
    cy.get("#sd").should("contain", "10 / 2.5");
    cy.get("#pd").should("contain", "4");
  });

  it("should give 3 ^ 4 = 81", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get(".main > :nth-child(3)").click();
    cy.get('[aria-label="exponent"]').click();
    cy.get(".main > :nth-child(4)").click();
    cy.get("#equals").click();
    // 3. ASSERT
    cy.get("#sd").should("contain", "3 ^ 4");
    cy.get("#pd").should("contain", "81");
  });

  it("should give root 81 = 9", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get("#root").click();
    cy.get(".main > :nth-child(8)").click();
    cy.get(".main > :nth-child(1)").click();
    cy.get("#equals").click();
    // 3. ASSERT
    cy.get("#sd").should("contain", "√81");
    cy.get("#pd").should("contain", "9");
  });

  it("should keep performing calculations and displaying the results in the secondary display when operators are clicked", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get(".main > :nth-child(1)").click();
    cy.get(":nth-child(13)").click();
    cy.get(".main > :nth-child(2)").click();
    cy.get("#minus").click();
    cy.get(".main > :nth-child(3)").click();
    // 3. ASSERT
    cy.get("#sd").should("contain", "3 -");
    cy.get("#pd").should("contain", "3");
  });

  it("should use the result of the previous calculation as the first element of the next claculation when an operator is clicked after clicking equals", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get(":nth-child(7)").click();
    cy.get("#minus").click();
    cy.get(":nth-child(9)").click();
    cy.get("#equals").click();
    cy.get("#minus").click();
    // 3. ASSERT
    cy.get("#sd").should("contain", "-2 -");
    cy.get("#pd").should("be.empty");
  });

  it("should clear the previous information and start a new calculation if a number is entered after equals has been clicked", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get(":nth-child(7)").click();
    cy.get("#minus").click();
    cy.get(":nth-child(9)").click();
    cy.get("#equals").click();
    cy.get(":nth-child(8)").click();
    // 3. ASSERT
    cy.get("#sd").should("be.empty");
    cy.get("#pd").should("contain", "8");
  });

  it("should clear the previous information and start a new calculation if a point is entered after equals has been clicked", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get(":nth-child(7)").click();
    cy.get("#minus").click();
    cy.get(":nth-child(9)").click();
    cy.get("#equals").click();
    cy.get("#point").click();
    // 3. ASSERT
    cy.get("#sd").should("be.empty");
    cy.get("#pd").should("contain", ".");
  });

  it("should clear the previous information and start a new calculation if a root symbol is entered after equals has been clicked", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get(":nth-child(7)").click();
    cy.get("#minus").click();
    cy.get(":nth-child(9)").click();
    cy.get("#equals").click();
    cy.get("#root").click();
    // 3. ASSERT
    cy.get("#sd").should("be.empty");
    cy.get("#pd").should("contain", "√");
  });

  it("should clear all display areas when AC is clicked", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get(".main > :nth-child(1)").click();
    cy.get(":nth-child(13)").click();
    cy.get(".main > :nth-child(2)").click();
    cy.get("#equals").click();
    cy.get("#clear").click();
    // 3. ASSERT
    cy.get("#sd").should("be.empty");
    cy.get("#pd").should("be.empty");
  });

  it("should clear the last element typed when CE is clicked", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get(".main > :nth-child(1)").click();
    cy.get(".main > :nth-child(2)").click();
    cy.get("#clear-entry").click();
    // 3. ASSERT
    cy.get("#sd").should("be.empty");
    cy.get("#pd").should("contain", "1");
  });

  it("should not clear the result displayed after clicking equals when CE is clicked", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get(":nth-child(7)").click();
    cy.get("#minus").click();
    cy.get(":nth-child(9)").click();
    cy.get("#equals").click();
    cy.get("#clear-entry").click();
    // 3. ASSERT
    cy.get("#sd").should("contain", "7 - 9");
    cy.get("#pd").should("contain", "-2");
  });

  it("should not allow multiple points to be entered one after another", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get("#point").click();
    cy.get("#point").click();
    // 3. ASSERT
    cy.get("#sd").should("be.empty");
    cy.get("#pd").should("not.contain", "..");
  });

  it("should not allow multiple points to be entered in the same number", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get(":nth-child(7)").click();
    cy.get("#point").click();
    cy.get(":nth-child(8)").click();
    cy.get("#point").click();
    // 3. ASSERT
    cy.get("#sd").should("be.empty");
    cy.get("#pd").should("not.contain", "7.8.");
  });

  it("should not allow a point to be entered immediately after a minus", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get("#minus").click();
    cy.get("#point").click();
    // 3. ASSERT
    cy.get("#sd").should("be.empty");
    cy.get("#pd").should("not.contain", "-.");
  });

  it("should not allow a point to be entered immediately after a root operator", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get("#root").click();
    cy.get("#point").click();
    // 3. ASSERT
    cy.get("#sd").should("be.empty");
    cy.get("#pd").should("not.contain", "√.");
  });

  it("should not allow multiple root symbols to be entered one after another", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get("#root").click();
    cy.get("#root").click();
    // 3. ASSERT
    cy.get("#sd").should("be.empty");
    cy.get("#pd").should("not.contain", "√√");
  });

  it("should not allow a root symbol to be entered after a number", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get(":nth-child(7)").click();
    cy.get("#root").click();
    // 3. ASSERT
    cy.get("#sd").should("be.empty");
    cy.get("#pd").should("not.contain", "7√");
  });

  it("should not allow a root symbol to be entered immediately after a point", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get("#point").click();
    cy.get("#root").click();
    // 3. ASSERT
    cy.get("#sd").should("be.empty");
    cy.get("#pd").should("not.contain", ".√");
  });

  it("should not allow multiple minuses to be entered one after another", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get("#minus").click();
    cy.get("#minus").click();
    // 3. ASSERT
    cy.get("#sd").should("be.empty");
    cy.get("#pd").should("not.contain", "--");
  });

  it("should not allow a minus to be entered immediately after a root operator", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get("#root").click();
    cy.get("#minus").click();
    // 3. ASSERT
    cy.get("#sd").should("be.empty");
    cy.get("#pd").should("not.contain", "√-");
  });

  it("should not allow a minus to be entered immediately after a point", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get("#point").click();
    cy.get("#minus").click();
    // 3. ASSERT
    cy.get("#sd").should("be.empty");
    cy.get("#pd").should("not.contain", ".-");
  });

  it("should not allow zero to be the first digit of a number unless it is followed by a point - zero should be replaced by the next number typed", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get(":nth-child(10)").click();
    cy.get(":nth-child(9)").click();
    // 3. ASSERT
    cy.get("#sd").should("be.empty");
    cy.get("#pd").should("not.contain", "0");
  });

  it("should not allow any further calculations to be performed with the result of a previous one if the result was not a number", () => {
    // 1. ARRANGE
    cy.visit("http://127.0.0.1:5500/index.html");
    // 2. ACT
    cy.get(":nth-child(9)").click();
    cy.get('[aria-label="divide"]').click();
    cy.get(":nth-child(10)").click();
    cy.get("#minus").click();
    // 3. ASSERT
    cy.get("#sd").should("contain", "9 / 0");
    cy.get("#pd").should("contain", "NaN");
  });
});
