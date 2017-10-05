$(document).ready(function(){

    var numTotal = ""; //variable which holds the value of the current input
    var num1; //variable which holds the value of the first value of the calculation
    var num2; //variable which holds the value of the second value of the calculation
    var operator; //variable which holds the value of the operator which will be used

    $(".numbers").click(function(){
        numTotal += ($(this).attr("data-num"));
        $("#display div:last p").text(numTotal);
    });
    //this click event/method describes the behavior of the number buttons,

    $(".dot").click(function(){
        if(numTotal === ""){
            numTotal = "0.";
        } else if(numTotal.indexOf(".") === -1){
            numTotal += ".";
        };
        $("#display div:last p").text(numTotal);
    });
    //this click event/method describes the functionality of the "." (dot);
    //there is two possibility, the first is the function begins with "0." and the second is that the entire number/line can hold up only one dot.

    $(".negpos").click(function(){
        if(numTotal === ""){
            numTotal = "-";
            $("#display div:last p").text(numTotal);
        } else if(parseInt(numTotal) > 0){
            numTotal = "-" + numTotal;
            $("#display div:last p").text(numTotal);
        } else if(parseInt(numTotal) < 0){
            numTotal = numTotal.replace(/-/, "");
            $("#display div:last p").text(numTotal);
        };
    });
    //this click event/method describes the functionality of the "+/-" positiv and negativ behavior
    //three possible ways: -1 the user hit the "+/- at first" the line/number will start with "-"
    //2. and 3. the user use this button whenever he/she entered the number in this situation the sign will change "- to +" or "+ to -"

    $(".operators").click(function(){
        switch($(this).attr("data-num")){
            case "+":
                setOperator("+");
                break;
            case "-":
                setOperator("-");
                break;
            case "X":
                setOperator("*");
                break;
            case "%":
                setOperator("/");
                break;
        }
    });
    //hitting one of the operator buttons the setOperator function will be invoked on them with an own arguments.

    function setOperator (what){
        operator = what;
        if(num1 === undefined){
            num1 = numTotal;
            displayFunction(num1, operator);
            numTotal = "";
        } else if (num1 !== undefined){
            num2 = numTotal;
            var value = eval(num1 + operator + num2);
            num1 = value;
            displayFunction(value, operator);
            num2 = undefined;
            numTotal = "";
        }
    };
    //the operator variable going to hold whichever operator button is hit.
    // this function examine two situation
    //first: this is the first calculation
    //second: this is the continuation of the previous calculation

    $(".equal").click(function(){
        if(num1 === undefined){
            num1 = numTotal;
            displayFunction(num1, num1);
            numTotal = "";
        } else if (num1 !== undefined){
            num2 = numTotal;
            var value = eval(num1 + operator + num2);
            displayFunction(value, value);
            num1 = value;
            num2 = undefined;
            numTotal = "";
            operator = undefined;
        }
    });
    //the aquality button event/method will examine 2 situation
    //first: the user hit the button without any calculation sign (for example teh user hit a "21" and "=")
    //second the user would like to now the final value
    //in this case the last input will be assigne to the num2 and with the eval method we easily execute the calculation


    $(".ac").click(function(){
        numTotal = "";
        num1 = undefined;
        num2 = undefined;
        operator = undefined;
        displayFunction(0,0);
    });
    //reset everything

    var displayFunction = function(top, bottom){
        $("#display div:first p").text(top);
        $("#display div:last p").text(bottom)
    };
    //a function to display the current calculation to the screen

})
