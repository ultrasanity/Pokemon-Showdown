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
          <Moves moves={this.props.moves}/>
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
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
              minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
              heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
              browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
              chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
              salt and pepper, and cook, stirring often until thickened and fragrant, about 10
              minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
              without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
              to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
              minutes more. (Discard any mussels that don’t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography>
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
