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

function getColors(condition){
 var themes = {}
 if(condition == "0 fnt"){
   return createMuiTheme({
     palette: {
       primary: {
         main: typeColors["fainted"]
       },
     },
     typography: {
       useNextVariants: true,
     },
   });
 } else {
   return createMuiTheme({
     palette: {
       primary: {
         main: typeColors["okay"]
       },
     },
     typography: {
       useNextVariants: true,
     },
   });
 }
}

const typeColors = {
 "fainted": "#C03028",
 "okay": "#6890F0",
}

class Team extends React.Component {

 handleInput = (move, switchPoke) => {
   if(this.props.playerid == "P1"){
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
 }

 render(){
   const { classes } = this.props;
   return (
     <div>
       {this.props.pokemon.slice(1, 6).map(value => (
         <MuiThemeProvider key={this.props.pokemon.indexOf(value)} theme={getColors(value.condition)}>
           <Button
             variant="contained"
             color="primary"
             className={classes.margin}
             onClick={() => { this.handleInput(null, ">p1 switch "+(this.props.pokemon.indexOf(value)+1)); }}
           >
             {value.details.split(",")[0]}
           </Button>
         </MuiThemeProvider>
       ))}
     </div>
   );
 }

}

Team.propTypes = {
 classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Team);
