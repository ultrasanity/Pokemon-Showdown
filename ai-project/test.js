const Sim = require('./../sim');
var express = require('express');
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);


var app = express();

stream = new Sim.BattleStream();

var appOutput = [];
var output;

(async () => {
    while ((output = await stream.read())) {
        console.log('******************************************************');
        console.log(output);
        messageParser(output);
        console.log('******************************************************');
        appOutput.push(output);
    }
})();

stream.write(`>start {"formatid":"gen7randombattle"}`);
stream.write(`>player p1 {"name":"Me"}`);
stream.write(`>player p2 {"name":"AI"}`);

var fainted = []
var waitForP1 = false;

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function messageParser(input) {
  if(/faint\|p1a/.test(input))
    waitForP1 = true;
  else if(/faint\|p2a/.test(input))
    switchOut(true);
}

function switchOut(faintedSwitch) {
  while (true) {
    var switchChoice = getRndInteger(2,6);

    if(!fainted.includes(switchChoice)) {
      if(faintedSwitch)
        fainted.push(switchChoice);
      var p2Turn = `>p2 switch ` + switchChoice;
      stream.write(p2Turn);
      console.log(p2Turn);
      break;
    }
  }
}

rl.setPrompt('');
rl.prompt();
rl.on('line', function(line) {
    var p2Turn;

    stream.write(line);

    if(!waitForP1) {
      if(getRndInteger(0,1) == 0) {
        p2Turn = `>p2 move ` + getRndInteger(1,4);
        stream.write(p2Turn);
        console.log(p2Turn);
      }
      else  {
        if(fainted.length < 5)
          switchOut(false);
        else {
          p2Turn = `>p2 move ` + getRndInteger(1,4);
          stream.write(p2Turn);
          console.log(p2Turn);
        }
      }
    }
    else
      waitForP1 = false;
    rl.prompt();
}).on('close', function() {
    console.log('Have a great day!');
    process.exit(0);
});



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/output', function (req, res, next) {
   res.send(JSON.stringify({"output": appOutput.toString()}));
   appOutput = [];
})

var server = app.listen(8081, "127.0.0.1",function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s\n", host, port)
})
