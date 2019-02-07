class BattleTurn {
  constructor(outputData) {
    this.currentTurn = null;
    this.p1 = {
      name: null,
      id: null,
      team: []
    }
    this.p2 = {
      name: null,
      id: null,
      team: []
    }

  }

  transformData(outputData){
    var lines = outputData.split("\n")
    console.log(lines);
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

    // console.log("Turn: " + lines[lines.length-1].split("|")[2]);
    // console.log(lines[1]);
    // console.log(lines[5]);
    for(var i = 0; i < lines.length; i++){
      // if(lines[i].startsWith("|"))
      var currentLine = lines[i].split("|");
      switch(currentLine[0]){
        case "update":
          break;

        default:
          console.log(currentLine[0]);
      }

    }

  }
}
