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

    this.currentTurn = lines[lines.length-1].split("|")[2];

    for(var i; i < lines.length; i++){

    }
  }
}
