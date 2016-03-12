var express = require('express');
var app = express();
var index = require('./routes/index');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use("/",index);

app.listen(3000, function() {
console.log("Listening on port: 3000");
});
