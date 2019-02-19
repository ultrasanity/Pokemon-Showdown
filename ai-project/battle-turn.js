const BattleMovedex = require('./moves').BattleMovedex

class BattleTurn {
  constructor() {
    this.currentTurn = null;
    this.p1 = {
      name: null,
      id: null,
      team: [],
      lastEvent: {
        event: null
      },
      active: null,
      activeMoves: null,
      activeMoveTypes: null,
      lastMoveUsed: null
    }
    this.p2 = {
      name: null,
      id: null,
      team: [],
      lastEvent: {
        event: null
      },
      active: null,
      activeMoves: null,
      activeMoveTypes: null,
      lastMoveUsed: null
    }
    this.lines = null

  }

  getMoveNames(moves){
    return moves.map(function(x) {
      if(x.startsWith("hiddenpower")){
        x = x.slice(0, x.length-2);
      }
      return BattleMovedex[x].name
      });
  }

  getMoveTypes(moves){
    return moves.map(function(x) {
      if(x.startsWith("hiddenpower")){
        x = x.slice(0, x.length-2);
      }
      return BattleMovedex[x].type
      });
  }

  transformData(outputData){
    var lines = outputData.split("\n")
    this.outputLines = lines
    // console.log(lines);
    this.currentTurn = lines[lines.length-1].split("|")[2];
    for(var i = 0; i < lines.length; i++){
      if(lines[i].endsWith(",update")){
        lines[i] = lines[i].substring(0, lines[i].indexOf(",update"))
        lines.splice(i+1, 0, "update");
      }
      if(lines[i].endsWith(",sideupdate")){
        lines[i] = lines[i].substring(0, lines[i].indexOf(",sideupdate"))
        lines.splice(i+1, 0, "sideupdate");
      }
    }

    for(var i = 0; i < lines.length; i++){
      var currentLine = lines[i].split("|");
      switch(currentLine[0]){
        case "update":
          var j = i;
          i += 1;
          for(i; i < lines.length; i++){
            if(lines[i] == "sideupdate"){
              i--;
              break;
            }
            var tempLine = lines[i].split("|")
            switch(tempLine[1]){
              case "":
                break;
              case "faint":
                var effected = tempLine[2].split(": ")
                // console.log(effected);
                switch(effected[0].slice(0, 2)){
                  case "p1":
                    this.p1.lastEvent.event = "faint"
                    break;
                  case "p2":
                    this.p2.lastEvent.event = "faint"
                    break;
                  default:
                    ;
                }
                break;
              default:
                if (typeof tempLine[1] == 'undefined'){
                  break;
                };
            }
            // if (typeof tempLine[1] !== 'undefined'){
            //   console.log(tempLine[1])
            // }
          }
          break;

        case "sideupdate":
          var player = lines[i+1]
          var team = lines[i+2]
          var request = JSON.parse(team.split("|")[2])
          switch(player){
            case "p1":
              this.p1.name = request.side.name
              this.p1.id = request.side.id
              this.p1.team = request.side.pokemon
              this.p1.active = request.side.pokemon[0]
              if(request.hasOwnProperty("active")){
                this.p1.activeMoves = request.active[0].moves
                this.p1.activeMoveTypes = this.getMoveTypes(this.p1.active.moves)
              }
              break;
            case "p2":
              this.p2.id = request.side.id
              this.p2.name = request.side.name
              this.p2.team = request.side.pokemon
              this.p2.active = request.side.pokemon[0]
              if(request.hasOwnProperty("active")){
                this.p2.activeMoves = request.active[0].moves
                this.p2.activeMoveTypes = this.getMoveTypes(this.p2.active.moves)
              }
              break;
            default:
              break;
          }


          break;
        default:
          // console.log(currentLine[0]);
          break;
      }

    }

  }
}

module.exports = {
  BattleTurn
}
