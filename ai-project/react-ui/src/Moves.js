import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  cssRoot: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }
});

function getColors(typeColors){
  console.log(typeColors);
  var themes = {}
  for(var i in Object.keys(typeColors)){
    var color = Object.keys(typeColors)[i];
    themes[color] = createMuiTheme({
      palette: {
        primary: {
          main: typeColors[color]
        },
      },
      typography: {
        useNextVariants: true,
      },
    });
  }
  return themes
}

const typeColors = {
  "Bug": "#A8B820",
	"Dark": "#705848",
	"Dragon": "#7038F8",
	"Electric": "#F8D030",
	"Fairy": "#EE99AC",
	"Fighting": "#C03028",
	"Fire": "#F08030",
	"Flying": "#A890F0",
	"Ghost": "#705898",
	"Grass": "#78C850",
	"Ground": "#E0C068",
	"Ice": "#98D8D8",
	"Normal": "#A8A881",
	"Poison": "#A040A0",
	"Psychic": "#F85888",
	"Rock": "#B8A038",
	"Steel": "#B8B8D0",
	"Water": "#6890F0",
}

const theme =  getColors(typeColors);

class Moves extends React.Component {

  handleInput = (move, switchPoke) => {
    fetch("http://localhost:8081/input", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        move: move,
        switch: switchPoke,
      })
    });
  }

  getMoveNames(moves){
    return moves.map(function(x) {
      if(x.move.startsWith("Return")){
        x.move = x.move.slice(0, x.move.length - 4);
      }
      return x.move
      });
  }

  render(){
    const { classes } = this.props;
    var names = this.getMoveNames(this.props.moves)
    return (
      <div>
        <MuiThemeProvider theme={theme[this.props.types[0]]}>
          <Button
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={() => { this.handleInput(">p1 move 1", null); }}
          >
            {names[0]}
          </Button>
        </MuiThemeProvider>
        <MuiThemeProvider theme={theme[this.props.types[1]]}>
          <Button
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={() => { this.handleInput(">p1 move 2", null); }}
          >
            {names[1]}
          </Button>
        </MuiThemeProvider>
        <MuiThemeProvider theme={theme[this.props.types[2]]}>
          <Button
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={() => { this.handleInput(">p1 move 3", null); }}
          >
            {names[2]}
          </Button>
        </MuiThemeProvider>
        <MuiThemeProvider theme={theme[this.props.types[3]]}>
          <Button
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={() => { this.handleInput(">p1 move 4", null); }}
          >
            {names[3]}
          </Button>
        </MuiThemeProvider>
      </div>
    );
  }

}

Moves.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Moves);
