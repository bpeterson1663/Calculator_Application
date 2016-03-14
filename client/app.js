var num1 = "0";
var num2 = "0";
var currentNumber = "0";
var operation = "";
var allData = {};
var finalAnswer = "";

$(document).ready(function(){
  showDisplay();
  loadNumPad();
  loadOperatorPad();

  $('.numPad').on('click', 'button', numClick);
  $('.calculator').on('click', '.operator', operatorClicked);
  $('.calculator').on('click', '.equal', equalClicked);
  $('.calculator').on('click', '.reset', resetValues);
  $('.calculator').on('click', '.clear', clearValue);
  console.log(num1);
});
//append a DIV as the Display of the calculator that we will append the numbers to as a string
function showDisplay(){
  $('.results').append('<div class="numberOne">First Number value: <span>0</span></div>');
  $('.results').append('<div class="operatorValue">Operation: <span></span></div>');
  $('.results').append('<div class="numberTwo">Second Number value: <span>0</span></div>');
  $('.results').append('<div class="calculatedNumber">Calculated Number: <span>0</span></div>');
  $('.display').text(currentNumber);

}
//Load the number butons
function loadNumPad(){

  $('.calculator').append('<div class="numPad"></div>');

  for(var i = 1; i < 10; i++){
    $('.numPad').append('<button class="btn btn'+i+' btn-info active">'+i+'</button>');
    $('.btn'+i).data('buttonValue',i);
  }
    $('.numPad').append('<button class="btn btn0 btn-info active">0</button>');
    $('.btn0').data('buttonValue',0);
    $('.numPad').append('<button class="btn btnDecimal btn-info active">.</button>');
    $('.btnDecimal').data('buttonValue','.');
    $('.btn3').after('<br/>');
    $('.btn6').after('<br/>');
    $('.btn9').after('<br/>');
};

//load the operator buttons
function loadOperatorPad(){
  $('.calculator').append('<div class="operatorPad"></div>')

  $('.operatorPad').append('<button class="btn operator multiply btn-info active"> x </button>');
  $('.multiply').data('operator', "multiply");

  $('.operatorPad').append('<button class="btn operator divide btn-info active"> &divide; </button>');
  $('.divide').data('operator', "divide");

  $('.operatorPad').append('<button class="btn operator subtract btn-info active"> &ndash; </button>');
  $('.subtract').data('operator', "subtract");

  $('.operatorPad').append('<button class="btn operator add btn-info active"> + </button>');
  $('.add').data('operator', "add");

  $('.calculator').append('<div class="equalDiv"></div>')
  $('.equalDiv').append('<button class="btn equal btn-info active"> = </button>');
  $('.equalDiv').append('<button class="btn reset btn-info active">Reset</button>');
  $('.equal').data('equal', "equal");
  $('.equalDiv').append('<button class="btn clear btn-info active">Clear</button>');
}
//create event listener function for one the number buttons are pressed pulling the value from the data and concantinating it each time
function numClick(){
  var value = $(this).data('buttonValue');
  currentNumber += value;
  $('.display').text(currentNumber);
}
//Operator is clicked and Displays the currentNumber that was being typed in as num1
//resets current Number and pulls the operator of the data of the button being pushed
//sets the text for Number One as num1
//pushs both the first number and the operator to an array to sent to the server
function operatorClicked(){
  num1 = currentNumber;
  currentNumber = "0";
  $('.display').text(currentNumber);
  operation = $(this).data('operator');
  $('.numberOne span').text(num1);
  $('.operatorValue span').text(operation);
  allData.num1 = num1;
  allData.operation = operation;
  num1 = "0";

}
//equal is clicked and currentNumber being typed in is set to num2
//reset currentNumber and update the display of Number Two as num2
//push num2 to array and send that data using an Ajax call to the server
function equalClicked(){
  num2 = currentNumber;
  currentNumber = "0";
  $('.display').text(currentNumber);
  $('.numberTwo span').text(num2);
  console.log("num1 is: ", num1);
  console.log("num2 is: ", num2);
  allData.num2 = num2;
  console.log("All information is: ", allData);
  $.ajax({
    type: 'POST',
    url: '/operation',
    data: allData,
    success: function(data){
      finalAnswer = data;
      appendCalculatedValue();
      //console.log("returned calculated value is: ", data);
    }
  });

}
function appendCalculatedValue(){
  console.log("The data being returned: ", finalAnswer);
  $('.calculatedNumber span').text(finalAnswer);
}

function resetValues(){
  currentNumber ="0";
  allData.num1 = "0";
  num2 = "0";
  finalAnswer = "0";
  $('.calculatedNumber span').text(finalAnswer);
  $('.numberTwo span').text(num2);
  $('.operatorValue span').text("");
  $('.numberOne span').text(num1);
  $('.display').text(currentNumber);
}

function clearValue(){
  currentNumber ="0";
  $('.display').text(currentNumber);
}
