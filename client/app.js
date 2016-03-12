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
  console.log(num1);
});
//append a DIV as the Display of the calculator that we will append the numbers to as a string
function showDisplay(){
  $('.container').append('<div class="display"></div>');
  $('.container').append('<div class="numberOne">First Number value: <span></span></div>');
  $('.container').append('<div class="numberTwo">Second Number value: <span></span></div>');
  $('.container').append('<div class="calculatedNumber">Calculated Number: <span></span></div>');
  $('.display').text(currentNumber);

}
//Load the number butons
function loadNumPad(){

  $('.calculator').append('<div class="numPad"></div>');

  for(var i = 1; i < 10; i++){
    $('.numPad').append('<button class="btn btn'+i+'">'+i+'</button>');
    $('.btn'+i).data('buttonValue',i);
  }
    $('.numPad').append('<button class="btn btn0">0</button>');
    $('.btn0').data('buttonValue',0);
    $('.btn3').after('<br/>');
    $('.btn6').after('<br/>');
    $('.btn9').after('<br/>');
};

//load the operator buttons
function loadOperatorPad(){
  $('.calculator').append('<div class="operatorPad"></div>')

  $('.operatorPad').append('<button class="btn operator multiply"> * </button>');
  $('.multiply').data('operator', "multiply");

  $('.operatorPad').append('<button class="btn operator divide"> / </button>');
  $('.divide').data('operator', "divide");

  $('.operatorPad').append('<button class="btn operator subtract"> - </button>');
  $('.subtract').data('operator', "subtract");

  $('.operatorPad').append('<button class="btn operator add"> + </button>');
  $('.add').data('operator', "add");

  $('.operatorPad').append('<button class="btn equal"> = </button>');
  $('.equal').data('equal', "equal");
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
  console.log("num2 is: ", num2);
  allData.num2 = num2;
  console.log("All information is: ", allData);
  //Start Here
  $.ajax({
    type: 'POST',
    url: '/operation',
    data: allData
  });
  $.ajax({
    type: 'GET',
    url: '/calculatedValue',
    success: function(data){
      appendCalculatedValue(data);
      console.log("returned calculated value is: ", data);
    }
  });
  num2 = "0";

}
function appendCalculatedValue(data){
  $('.calculatedNumber span').text(data);
}
