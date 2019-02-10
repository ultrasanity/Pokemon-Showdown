import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ActiveCard from './ActiveCard'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 300,
    width: 400,
    margin: 20,
    padding: 20
  },
  control: {
    padding: theme.spacing.unit * 2,
    margin: 20
  },
});

class App extends React.Component {
  state = {
    spacing: '16',
    outputData: null,
    player1: null,
    player2: null
  };

  componentDidMount() {
    this.timer = setInterval(()=> this.getItems(), 1000);
  };

  getItems = () => {
    fetch("http://localhost:8081/output")
      .then(res => res.json())
      .then(
        (result) => {
          if(result["output"] !== ""){
            this.setState({
              outputData: result["output"],
              player1: JSON.parse(result["player1"]),
              player2: JSON.parse(result["player2"])
            });
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: error
          });
        }
      )
  }

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    var headerData = this.displayData(null, null)

    if(this.state.outputData != null){
      var headerData = this.displayData(this.state.player1, this.state.player2)
      console.log(this.state.outputData.split("\n"));
      console.log(this.state.player1);
      console.log(this.state.player2);
    }

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
            {[0, 1].map(value => (
              <Grid key={value} item>
                <ActiveCard poke="unown-question"/>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.control}>
            <Grid container>
              <Grid item>
                {this.state.outputData}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
