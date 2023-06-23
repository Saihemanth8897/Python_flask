let inputField = document.getElementById("displayBox");
let textdata = "0";
inputField.value = textdata;
function eventdata(input) {
  if (
    inputField.value.includes("sin(") ||
    inputField.value.includes("cos(") ||
    inputField.value.includes("tan(")
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
      textdata = eval(inputField.value);
      inputField.value = eval(textdata);
      textdata = inputField.value;
    } else if (textdata.includes("^")) {
      let dataArr = textdata.split("^");
      let x = Number(dataArr[0]);
      let y = Number(dataArr[1]);
      inputField.value = eval(Math.pow(x, y));
      textdata = inputField.value;
    } else {
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