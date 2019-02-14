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

  render(){
    const { classes } = this.props;
    // console.log(this.props.moves);
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          className={classNames(classes.margin, classes.cssRoot)}
          onClick={() => { this.handleInput(">p1 move 1", null); }}
        >
          {this.props.moves[0]}
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classNames(classes.margin, classes.cssRoot)}
          onClick={() => { this.handleInput(">p1 move 2", null); }}
        >
          {this.props.moves[1]}
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classNames(classes.margin, classes.cssRoot)}
          onClick={() => { this.handleInput(">p1 move 3", null); }}
        >
          {this.props.moves[2]}
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classNames(classes.margin, classes.cssRoot)}
          onClick={() => { this.handleInput(">p1 move 4", null); }}
        >
          {this.props.moves[3]}
        </Button>
      </div>
    );
  }

}

Moves.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Moves);
