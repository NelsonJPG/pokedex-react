
import React, { Fragment, useEffect, useState } from 'react';
import {
    Grid, Container, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Pokedex from '../../components/Pokedex';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
}));

const TypeContainer = () => {
    const [pokemons, setPokemons] = useState([])
    const [searchpokemon, setSearchPokemon] = useState('');
    const classes = useStyles();
    
    const getPokemons = async () => {
        let {data: { pokemon } } = await axios.get(`https://pokeapi.co/api/v2/type/1`);
        let allpokemon = await axios.all(pokemon.map( async result => await getPokemonExtended(result.pokemon.url)))
        setPokemons(allpokemon);
    }

    const getPokemonExtended = async ( url ) => {
        let {data} = await axios.get(`${url}`);
        return data;
    }
    
    useEffect(() => {
      getPokemons();   
    });

    return (
        <Fragment>
            <Container className={classes.cardGrid} maxWidth="md">
                <Typography variant="h6" gutterBottom>
                    Tipos de Pokemon
                </Typography>
                <Grid container spacing={4}>
                    {pokemons.map((pokemon) => <Pokedex key={pokemon.name} pokemon={pokemon} />)}
                </Grid>
            </Container>
        </Fragment>
    )
    
};  

export default TypeContainer;