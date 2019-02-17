const Sim = require('./../sim');
var express = require('express');
const BattleTurn = require('./battle-turn')
const bodyParser = require('body-parser');
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);


var app = express();

// parse application/json
app.use(bodyParser.json())

var turn = new BattleTurn.BattleTurn();

stream = new Sim.BattleStream();

var appOutput = [];
var output;

(async () => {
    while ((output = await stream.read())) {
        console.log('******************************************************');
        console.log(output);
        messageParser(output);
        console.log('******************************************************');
        turn.transformData(output);
        appOutput.push(output);
    }
})();

stream.write(`>start {"formatid":"gen7ou"}`);
stream.write(`>player p1 {"name":"Me", "team": "Lumineon||focussash|1|defog,scald,icebeam,uturn||85,85,85,85,85,85||||83|]Glaceon||lifeorb||toxic,hiddenpowerground,shadowball,icebeam||81,,85,85,85,85||,0,,,,||83|]Crabominable||choiceband|1|closecombat,earthquake,stoneedge,icehammer||85,85,85,85,85,85||||83|]Toxicroak||lifeorb|1|drainpunch,suckerpunch,gunkshot,substitute||85,85,85,85,85,85||||79|]Bouffalant||choiceband||earthquake,megahorn,headcharge,superpower||85,85,85,85,85,85||||83|]Qwilfish||blacksludge|H|thunderwave,destinybond,liquidation,painsplit||85,85,85,85,85,85||||83|"}`);
stream.write(`>player p2 {"name":"AI", "team": "Lumineon||focussash|1|defog,scald,icebeam,uturn||85,85,85,85,85,85||||83|]Glaceon||lifeorb||toxic,hiddenpowerground,shadowball,icebeam||81,,85,85,85,85||,0,,,,||83|]Crabominable||choiceband|1|closecombat,earthquake,stoneedge,icehammer||85,85,85,85,85,85||||83|]Toxicroak||lifeorb|1|drainpunch,suckerpunch,gunkshot,substitute||85,85,85,85,85,85||||79|]Bouffalant||choiceband||earthquake,megahorn,headcharge,superpower||85,85,85,85,85,85||||83|]Qwilfish||blacksludge|H|thunderwave,destinybond,liquidation,painsplit||85,85,85,85,85,85||||83|"}`);
stream.write(`>p1 team 123456`);
stream.write(`>p2 team 123456`);


var fainted = []
var waitForP1 = false;
var p2LastCommand;

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function messageParser(input) {
  if(/faint\|p1a/.test(input))
    waitForP1 = true;
  else if(/faint\|p2a/.test(input)) {
    if(fainted.length < 5)
      switchOut(true);
  }
}

function invalidChoiceParser(input) {
  if(/error\|\[Invalid choice\]/.test(input)) {
  //  console.log("TRUE!!!");
    console.log(p2LastCommand);
    return true;
  }
  else
  //  console.log("FALSE!!!!");
    return false;
}

function switchOut(faintedSwitch) {
  while (true) {
    var switchChoice = getRndInteger(2,6);

    if(!fainted.includes(switchChoice)) {
      if(faintedSwitch)
        fainted.push(switchChoice);
      if(!invalidChoiceParser(output)) {
        var p2Turn = `>p2 switch ` + switchChoice;
        p2LastCommand = p2Turn;
        stream.write(p2Turn);
        console.log(p2Turn);
      }
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
        if(!invalidChoiceParser(output)) {
          p2Turn = `>p2 move ` + getRndInteger(1,4);
          p2LastCommand = p2Turn;
          stream.write(p2Turn);
          console.log(p2Turn);
        }
      }
      else  {
        if(fainted.length < 5)
          switchOut(false);
        else {
          if(!invalidChoiceParser(output)) {
            p2Turn = `>p2 move ` + getRndInteger(1,4);
            p2LastCommand = p2Turn;
            stream.write(p2Turn);
            console.log(p2Turn);
          }
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

// app.use(bodyParser.urlencoded({ extended: false }));

app.post('/input', function(req, res) {

    var move = req.body.move
    var switchPoke = req.body.switch

    if (move == null){
      console.log(switchPoke);
      stream.write(switchPoke);
    }

    if (switchPoke == null){
      console.log(move);
      stream.write(move);
    }

    var p2Turn;

    if(!waitForP1) {
      if(getRndInteger(0,1) == 0) {
        if(!invalidChoiceParser(output)) {
          p2Turn = `>p2 move ` + getRndInteger(1,4);
          p2LastCommand = p2Turn;
          stream.write(p2Turn);
          console.log(p2Turn);
        }
      }
      else  {
        if(fainted.length < 5)
          switchOut(false);
        else {
          if(!invalidChoiceParser(output)) {
            p2Turn = `>p2 move ` + getRndInteger(1,4);
            p2LastCommand = p2Turn;
            stream.write(p2Turn);
            console.log(p2Turn);
          }
        }
      }
    }
    else
      waitForP1 = false;

    res.send({ status: 'SUCCESS' });
})

app.get('/output', function (req, res, next) {
   res.send(JSON.stringify(
     {"output": appOutput.toString(),
      "player1": JSON.stringify(turn.p1),
      "player2": JSON.stringify(turn.p2)
    }));
   appOutput = [];
})

var server = app.listen(8081, "127.0.0.1",function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s\n", host, port)
})
