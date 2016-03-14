var express = require('express');
var router = express.Router();

var path = require('path');
var num1;
var num2;
var operation;

var calculatedValue = 0;
//ajax request route
router.post("/operation", function(req, res){
  //seperate out data values into variables
  var data = req.body;
  num1 = parseFloat(data.num1);
  num2 = parseFloat(data.num2);
  operation = data.operation;
  //check which operation is being done and perform operation on both numbers
  //send the data back down to the client
  if(operation == "multiply"){
    calculatedValue = num1*num2;
    res.send(calculatedValue.toString());
  }
  else if(operation == "divide"){
    calculatedValue = num1/num2;
    res.send(calculatedValue.toString());
  }
  else if(operation == "add"){
    calculatedValue = num1 + num2;
    res.send(calculatedValue.toString());
  }
  else if(operation == "subtract"){
    calculatedValue = num1 - num2;
    res.send(calculatedValue.toString());
  }//catch if someone presses equal when no values are set 
  else if(num1 === 0 && num2 == 0){
    calculatedValue = 0;
    res.send(calculatedValue.toString());
  }
});


router.get("/*", function(req, res){
   var file = req.params[0] || 'views/index.html';
   res.sendFile(path.join(__dirname, '../public' ,file));
});

module.exports = router;
