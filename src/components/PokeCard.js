import React from 'react'
import { Typography, Card, 
    CardContent, CardMedia, Grid,
    Chip, IconButton, CardHeader,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';    
import { typeColors } from '../constant'
import _ from 'lodash';
import Pokeball from './Pokeball';

const useStyles = makeStyles((theme) => ({

  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 16,
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
      
const Pokedex = ( {pokemon, getType, openModal, setSelectedPokemon}) => {
    const classes = useStyles();
    const handleSelectedPokemon = () => {
      openModal(true);
      setSelectedPokemon(pokemon);

    }

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card} elevation={2}>
            <CardHeader
              avatar={
                <IconButton aria-label="share" onClick={handleSelectedPokemon}>
                  <Pokeball />
                </IconButton>
              }
             
            title={ <Typography gutterBottom variant="h5" component="h2">{pokemon.name}</Typography>}
            />
            <CardMedia
                className={classes.cardMedia}
                style={{backgroundColor: typeColors[pokemon.types[0].type.name].background}}
                image={pokemon.sprites.other["official-artwork"].front_default? pokemon.sprites.other["official-artwork"].front_default: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"}
                title={pokemon.name}
                />
            <CardContent className={classes.cardContent}>
              {
                _.values(pokemon.types).map((type, index) => (
                  <Chip key={type.type.name + index} style={{backgroundColor: typeColors[type.type.name].background, color: "#ffffff"}} size="small" label={type.type.name} onClick={(value) => getType(type.type.url)} />
                ))
              }
            </CardContent>
           
            </Card>
        </Grid>
    )
 }
 export default Pokedex;