function initListeners() {
    const buttons = document.querySelectorAll("button");

    buttons.forEach((buttonObject) => {
        buttonObject.addEventListener("click", () => getAction(buttonObject.textContent, buttonObject.id));
    });
}

function updateNumbers(givenNumber) {
    const parsedNumber = Number(givenNumber); // Handles both integers and floats
    if (numberflag) {
        numberOne = parsedNumber;
    } else {
        numberTwo = parsedNumber;
    }
}

function getAction(givenString, id) {
    if (!isNaN(givenString) && givenString.trim() !== "") {
        // Append number to display
        display.textContent += givenString;
    } else {
        // Call function to handle operations
        switchFunction(id);
    }
}

function getResult() {
    switch (actionID) {
        case "divide":
            numberResult = numberTwo !== 0 ? numberOne / numberTwo : "Error"; // Handle divide by zero
            break;
        case "multiply":
            numberResult = numberOne * numberTwo;
            break;
        case "subtract":
            numberResult = numberOne - numberTwo;
            break;
        case "add":
            numberResult = numberOne + numberTwo;
            break;
        default:
            numberResult = "Invalid Operation";
            break;
    }
}

function switchFunction(givenFunctionID) {
    switch (givenFunctionID) {
        case "backspace":
            // Remove last character from display
            display.textContent = display.textContent.slice(0, -1);
            break;
        case "allClear":
            // Reset all numbers and display
            numberOne = 0;
            numberTwo = 0;
            numberResult = 0;
            display.textContent = "";
            numberflag = true;
            actionID = null;
            break;
        case "point":
            // Add decimal point if it doesn't exist already
            if (!display.textContent.includes('.')) {
                display.textContent += ".";
            }
            break;
        case "equals":
            // Calculate the result
            updateNumbers(display.textContent);
            getResult();
            display.textContent = numberResult;
            numberflag = true; // Reset flag for next input
            break;
        default:
            // Handle operator input
            updateNumbers(display.textContent);
            actionID = givenFunctionID;
            numberflag = false; // Prepare for second number input
            display.textContent = ""; // Clear display for new input
            break;
    }
}

// Initial DOM selection
const display = document.querySelector("#display");

// Initial variables
let numberOne = 0;
let numberTwo = 0;
let numberResult;
let numberflag = true;
let actionID = null;

// Initialize listeners on page load
initListeners();
