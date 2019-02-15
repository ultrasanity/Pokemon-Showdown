import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
        <Button
          variant="contained"
          color="primary"
          className={classNames(classes.margin, classes.cssRoot)}
          onClick={() => { this.handleInput(">p1 move 1", null); }}
        >
          {names[0]}
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classNames(classes.margin, classes.cssRoot)}
          onClick={() => { this.handleInput(">p1 move 2", null); }}
        >
          {names[1]}
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classNames(classes.margin, classes.cssRoot)}
          onClick={() => { this.handleInput(">p1 move 3", null); }}
        >
          {names[2]}
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classNames(classes.margin, classes.cssRoot)}
          onClick={() => { this.handleInput(">p1 move 4", null); }}
        >
          {names[3]}
        </Button>
      </div>
    );
  }

}

Moves.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Moves);
