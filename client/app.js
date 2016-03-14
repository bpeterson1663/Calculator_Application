
//create all variables
var num1 = "0";
var num2 = "0";
var currentNumber = "0";
var operation = "";
var allData = {};
var finalAnswer = "";

$(document).ready(function(){
  //Call functions to load to the Dom
  showDisplay();
  loadNumPad();
  loadOperatorPad();
  //Create listeners for buttons when clicked
  $('.numPad').on('click', 'button', numClick);
  $('.calculator').on('click', '.operator', operatorClicked);
  $('.calculator').on('click', '.equal', equalClicked);
  $('.calculator').on('click', '.reset', resetValues);
  $('.calculator').on('click', '.clear', clearValue);

});
//append a DIV as the Display of the calculator that we will append the numbers to as a string
function showDisplay(){
  $('.results').append('<div class="numberOne">First Number value: <span>0</span></div>');
  $('.results').append('<div class="operatorValue">Operation: <span></span></div>');
  $('.results').append('<div class="numberTwo">Second Number value: <span>0</span></div>');
  $('.results').append('<div class="calculatedNumber">Calculated Number: <span>0</span></div>');
  $('.display').text(currentNumber);//sets the text of the display to currentNumber variable

}
//Load the number butons
function loadNumPad(){
  //create a seperate numPad Div
  $('.calculator').append('<div class="numPad"></div>');
  //append buttons giving them a specific number class to be referenced later
  for(var i = 1; i < 10; i++){
    $('.numPad').append('<button class="btn btn'+i+' btn-info active">'+i+'</button>');
    $('.btn'+i).data('buttonValue',i);
  }
    //append 0 button after to make it look more like a calculater along with a decimal button
    $('.numPad').append('<button class="btn btn0 btn-info active">0</button>');
    $('.btn0').data('buttonValue',0);
    $('.numPad').append('<button class="btn btnDecimal btn-info active">.</button>');
    $('.btnDecimal').data('buttonValue','.');
    $('.btn3').after('<br/>');//break after 3 buttons for formating purposes
    $('.btn6').after('<br/>');
    $('.btn9').after('<br/>');
};

//load the operator buttons in a seperate div
function loadOperatorPad(){
  $('.calculator').append('<div class="operatorPad"></div>')
  //Create operator buttons and use data method to pull the value of each button
  $('.operatorPad').append('<button class="btn operator multiply btn-info active"> x </button>');
  $('.multiply').data('operator', "multiply");

  $('.operatorPad').append('<button class="btn operator divide btn-info active"> &divide; </button>');
  $('.divide').data('operator', "divide");

  $('.operatorPad').append('<button class="btn operator subtract btn-info active"> &ndash; </button>');
  $('.subtract').data('operator', "subtract");

  $('.operatorPad').append('<button class="btn operator add btn-info active"> + </button>');
  $('.add').data('operator', "add");
  //Create a div for the equal, reset and clear button
  $('.calculator').append('<div class="equalDiv"></div>')
  $('.equalDiv').append('<button class="btn equal btn-info active"> = </button>');
  $('.equalDiv').append('<button class="btn reset btn-info active">Reset</button>');
  $('.equalDiv').append('<button class="btn clear btn-info active">Clear</button>');
}
//create event listener function for when the number buttons are pressed pulling the value from the data and concantinating it each time to act as a display
function numClick(){
  var value = $(this).data('buttonValue');//referencing each individual button and storing it in a local variable to concantinate to the currentNumber each time
  currentNumber += value;
  $('.display').text(currentNumber);
}

function operatorClicked(){
  num1 = currentNumber;//sets the text for Number One as num1
  currentNumber = "0";//resets currentNumber
  $('.display').text(currentNumber);//displays currentNumber as 0
  operation = $(this).data('operator'); //stores the value of the operator clicked
  $('.numberOne span').text(num1);//sets the span tag for Number One value
  $('.operatorValue span').text(operation); //sets the span tag for the operation
  allData.num1 = num1; //stores the data into the object that will be sent to the server
  allData.operation = operation;
  num1 = "0"; //reset num1

}

function equalClicked(){
  num2 = currentNumber; //when equal is pressed sets the currentNumber equal to num2
  currentNumber = "0"; //resets currentNumber
  $('.display').text(currentNumber);
  $('.numberTwo span').text(num2);//sets span to num2 value
  allData.num2 = num2;//saves num2 to object
  //make ajax request to server and sends allData object
  $.ajax({
    type: 'POST',
    url: '/operation',
    data: allData,
    success: function(data){
      //final calculated answer is returned and saved in finalAnswer
      finalAnswer = data;
      //call function to append final answer to dom
      appendCalculatedValue();

    }
  });

}
function appendCalculatedValue(){
  console.log("The data being returned: ", finalAnswer);
  $('.calculatedNumber span').text(finalAnswer);
}
//when reset is clicked
function resetValues(){
  //set all values to zero and redisplay them on the dom
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
//when clear button is clicked
function clearValue(){
  //reset just the currentNumber equal to zero
  currentNumber ="0";
  $('.display').text(currentNumber);
}
