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

function ContainedButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classNames(classes.margin, classes.cssRoot)}
        onClick={() => { console.log('onClick'); }}
      >
        Move 1
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classNames(classes.margin, classes.cssRoot)}
      >
        Move 2
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classNames(classes.margin, classes.cssRoot)}
      >
        Move 3
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classNames(classes.margin, classes.cssRoot)}
      >
        Move 4
      </Button>
    </div>
  );
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainedButtons);
