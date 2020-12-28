import React from 'react'
import { Typography, Card, 
    CardContent, CardMedia, CardActions, Grid, Avatar,
    Chip, 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';    
import { typeColors } from '../constant'
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'contain'
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));
      
const Pokedex = ( {pokemon}) => {
   // console.log(pokemon.sprites, pokemon.name)
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
            <CardMedia
                className={classes.cardMedia}
                style={{backgroundColor: typeColors[pokemon.types.[0].type.name].color}}
                image={pokemon.sprites.other.["official-artwork"].front_default}
                title={pokemon.name}
                />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {pokemon.name}
                </Typography>
            </CardContent>
            <CardActions>
              {
                _.values(pokemon.types).map(type => (
                  <Chip key={type.type.name} style={{backgroundColor: typeColors[type.type.name].color, color: "#ffffff"}} size="small" label={type.type.name} onClick={() => console.log("hi")} />
                ))
              }
               
            </CardActions>
            </Card>
        </Grid>
    )
 }
 export default Pokedex;