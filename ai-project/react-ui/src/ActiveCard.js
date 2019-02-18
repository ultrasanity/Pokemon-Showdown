import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Moves from './Moves';
import Team from './Team';
const BattleItems = require('./data/items').BattleItems
const BattlePokedex = require('./data/pokedex').BattlePokedex

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    // height: 0,
    paddingTop: '56.25%', // 16:9
    width: '400px'
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: "#0000b3",
  },
});

class ActiveCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  formatGifName(poke){
    poke = poke.toLowerCase();

    if(poke.includes(" ")){
      console.log(poke.replace(" ",""));
      return poke.replace(" ","");
    }

    switch(poke){
      case "kommo-o":
        return "kommo";
        break;
      case "mr.mime":
        return "mrmime";
        break;
      case "ho-oh":
        return "hooh";
        break;
      default:
        return poke
    }
  }

  formatPokedexName(poke){
    poke = poke.toLowerCase();

    if(poke.includes("-")){
      return poke.replace("-","");
    }

    if(poke.includes(" ")){
      return poke.replace(" ","");
    }

    return poke
  }

  formatType(types){
    if(types.length == 2){
      return types[0] + "/" + types[1]
    } else{
      return types[0]
    }
  }

  render() {
    const { classes } = this.props;

    var name = this.props.active.details.split(",")[0];
    console.log(this.props.active);

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {this.props.playerid}
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.active.details.split(",")[0]}
          subheader={"Type: " + this.formatType(BattlePokedex[this.formatPokedexName(this.props.active.details.split(",")[0])].types)
                    + ", HP: " + this.props.active.condition
                    + ", Item: " + BattleItems[this.props.active.item]["name"] }
        />
        <div>
          <img
            src={"http://play.pokemonshowdown.com/sprites/xyani/" + this.formatGifName(this.props.active.details.split(",")[0]) + ".gif"}
            alt="new"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </div>
        <CardContent>
          <Moves
                playerid={this.props.playerid}
                moves={this.props.moves}
                types={this.props.types}/>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Team:</Typography>
            <Team playerid={this.props.playerid}
              pokemon={this.props.pokemon}/>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

ActiveCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActiveCard);
