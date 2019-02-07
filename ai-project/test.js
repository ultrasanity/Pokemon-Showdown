const Sim = require('./../sim');
var express = require('express');
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);

var app = express();
var environmentRoot =  require('path').normalize(__dirname );

stream = new Sim.BattleStream();

var appOutput = [];

(async () => {
    let output;
    while ((output = await stream.read())) {
        console.log(output);
        appOutput.push(output);
    }
})();

stream.write(`>start {"formatid":"gen7randombattle"}`);
stream.write(`>player p1 {"name":"Me"}`);
stream.write(`>player p2 {"name":"AI"}`);

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var fainted = []

rl.setPrompt('');
rl.prompt();
rl.on('line', function(line) {
    stream.write(line);
    if(getRndInteger(0,1) == 0)
      stream.write(`>p2 move ` + getRndInteger(1,4));
    else  {
      if(fainted.length < 5) {
        while (true) {
          var switchChoice = getRndInteger(2,6);

          if(!fainted.includes(switchChoice)) {
            stream.write(`>p2 switch ` + switchChoice);
            break;
          }
        }
      }
      else
        stream.write(`>p2 move ` + getRndInteger(1,4));

    }
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

   console.log("Example app listening at http://%s:%s", host, port)
})
