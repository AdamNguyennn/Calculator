function getHistory() {
    return document.getElementById("history-value").innerHTML;
}

function printHistoryValue(num) {
    if(num == ""){
        document.getElementById("history-value").innerHTML = num; // when click C at the ouput will show empty instead of 0
    } else {
    document.getElementById("history-value").innerHTML = num;
    }
}

function getOutput() {
    return document.getElementById("output-value").innerHTML;
}

function printOutput(num) {
    if(num == ""){
        document.getElementById("output-value").innerHTML = num; // when click C at the ouput will show empty instead of 0
    } else {
    document.getElementById("output-value").innerHTML = getFormatFunction(num);
    }
}

// this format like this 9,999 ; 9,999,999;..... 
function getFormatFunction(num) {
    if(num == "-"){
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}

//this function will use number without comma 9,666 = 9666
function reverseNumberFormat(num){
    return Number(num.replace(/,/g,''));
}

var operator = document.getElementsByClassName("operator");
for(var i = 0; i < operator.length; i++){
    operator[i].addEventListener('click', function() {
        if(this.id == "clear"){ // when u click C to clear screen
            printHistoryValue("");
            printOutput("");
        }
        if(this.id =="backspace"){
            var output = reverseNumberFormat(getOutput()).toString();
            if(output){//if output has a value
                output = output.substr(0,output.length-1);
                printOutput(output);
            }
        } else{
            var output = getOutput();
            var history = getHistory();
            // this condition make the output and history more clearly 
            if(output == "" && history != ""){    
                if(isNaN(history[history.length - 1])) {
                    history = history.substr(0, history.length - 1);
                }
            }
            if(output != "" || history != "") {
                // condition ? true : false  this condition make the output and history more clearly 
                output = output == "" ? 
                output : reverseNumberFormat(output);
                history = history + output;
                if(this.id == "=") { // show result at the output and erase the history 
                    var result = eval(history);
                    printOutput(result);
                    printHistoryValue("");
                }
                else{
                    history = history + this.id;
                    printHistoryValue(history);
                    printOutput("");
                }
            }
        }
    });
}

var number = document.getElementsByClassName("number");
for(var i = 0; i < number.length; i++){
    number[i].addEventListener('click', function() {
        var output = reverseNumberFormat(getOutput());
        if(output != NaN){ //if output is a number
            output = output + this.id;
            printOutput(output);
        }
    });
}

