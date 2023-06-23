let inputField = document.getElementById("displayBox");
const keyCodeMap = {
  '0': "0",
  '1': "1",
  '2': "2",
  '3': "3",
  '4': "4",
  '5': "5",
  '6': "6",
  '7': "7",
  '8': "8",
  '9': "9",
  "+": "+",
  "-": "-",
  "^": "^",
  "%": "%",
  "s": "sin(",
  "c": "cos(",
  "t": "tan(",
  "(": "(",
  ")": ")",
  ".": ".",
  "*": "*",
};
const resultsKeys = {
  Enter: "enter",
  "=": "enter",
  Backspace: "clear",
};
const splActionOperators = {
  r: "sqrt",
};
let textdata = "0";
inputField.value = textdata;
const StoreHistory = [];
let currentIndex = StoreHistory.length - 1;

function eventdata(input) {
  textdata = textdata == "0" ? "" : textdata;
  inputField.value = textdata;
  if (
    inputField.value.includes("sin") ||
    inputField.value.includes("cos") ||
    inputField.value.includes("tan")
  ) {
    textdata == "0" ? (textdata = input) : (textdata += input);
    inputField.value = textdata;
  } else if (
    inputField.value !== "" &&
    (input == "sin" || input == "cos" || input == "tan" || input == "%")
  ) {
    inputField.value = validateSpecialoperators(input, textdata);
    textdata = inputField.value;
  } else {
    textdata == "0" ? (textdata = input) : (textdata += input);
    inputField.value = textdata;
  }
}
function validateSpecialoperators(operator, val) {
  try {
    let res = null;
    if (operator.includes("sin")) {
      res = Math.sin(Number(val));
    } else if (operator.includes("cos")) {
      res = Math.cos(Number(val));
    } else if (operator.includes("tan")) {
      res = Math.tan(Number(val));
    } else if (operator.includes("%")) {
      res = Number(val) / 100;
    }
    return res;
  } catch {
    return NaN;
  }
}
function result() {
  try {
    if (
      textdata.includes("sin(") ||
      textdata.includes("cos(") ||
      textdata.includes("tan(")
    ) {
      let dataNum = Number(textdata.split("(")[1].replace(")", ""));
      let leftVal = textdata.split("(")[0].replace(")", "");
      inputField.value = eval(validateSpecialoperators(leftVal, dataNum));
      StoreHistory.push(textdata);
      currentIndex = StoreHistory.length - 1;
      textdata = eval(inputField.value);

      inputField.value = eval(textdata);
      textdata = inputField.value;
    } else if (textdata.includes("^")) {
      let dataArr = textdata.split("^");
      let x = Number(dataArr[0]);
      let y = Number(dataArr[1]);
      inputField.value = eval(Math.pow(x, y));
      StoreHistory.push(textdata);
      currentIndex = StoreHistory.length - 1;
      textdata = inputField.value;
    } else {
      StoreHistory.push(textdata);
      currentIndex = StoreHistory.length - 1;
      inputField.value = eval(textdata);
      textdata = inputField.value;
    }
  } catch {
    inputField.value = NaN;
  }
}
function reset() {
  textdata = "0";
  inputField.value = textdata;
}
function actionOperator(type) {
  switch (type) {
    case "sqrt":
      inputField.value = Math.sqrt(eval(inputField.value));
      textdata = inputField.value;
      break;
    case "openBrace":
      textdata += "(";
      inputField.value += "(";
      break;
    case "closeBrace":
      textdata += ")";
      inputField.value += ")";
      break;
  }
}

document.onkeydown = function (event) {
  if (event.keyCode == 38 || event.keyCode == 40) {
    showHistory(event.keyCode);
  }
  var key = event.key;
  if (keyCodeMap[key]) {
    eventdata(keyCodeMap[key]);
  } else if (resultsKeys[key]) {
    resultsKeys[key] == "clear" ? reset() : result();
  } else if (splActionOperators[key]) {
    actionOperator(splActionOperators[key]);
  }
};

function showHistory(num) {
  if (num == 38) {
    if (currentIndex > 0) {
      currentIndex -= 1;
    }
    inputField.value = StoreHistory[currentIndex];
  } else {
    if (currentIndex < StoreHistory.length - 1) {
      currentIndex += 1;
    }
    inputField.value = StoreHistory[currentIndex];
  }
}
/* 
########################################################################
###################################################
#####################################
                    Name: Sai Hemanth
                   BlazerId: Smaremal 
#####################################
##################################################
########################################################################
*/
