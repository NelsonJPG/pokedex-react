
import React, { Fragment, useEffect, useState } from 'react';
import {
    Grid, Container, TextField, InputAdornment
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import clsx from 'clsx';
import Pokedex from '../../components/Pokedex';
import configApp from '../../config-app';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
}));

const DashboardContainer = () => {
    const [searchpokemon, setSearchPokemon] = useState('');
    const [url, setUrl] = useState(`${configApp.apiurl}/pokemon/${ searchpokemon }`);
    const [pokemons, setPokemons] = useState([])
    const classes = useStyles();
    
    const getPokemons = async () => {
        
        let {data: { results} } = await axios.get(` ${url} `);
  
        let allpokemon = await axios.all(results.map( async result => await getPokemonExtended(result.url)));

        return allpokemon;
    }

    const getPokemonExtended = async ( url ) => {
        let {data} = await axios.get(`${url}`);
        return data;
    }
    
    useEffect(() => {
        let mounted = true;
        getPokemons().then( allpokemon => {
            if (mounted) {
              setPokemons(allpokemon)
            }
        })   
        return () => {
            mounted = false
        }
        
    }, []);

    console.log(url)

    return (
        <Fragment>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={3}>
                    <Grid item sm={12}>
                        <TextField
                            fullWidth
                            label="pokemon"
                            id="outlined-start-adornment"
                            className={clsx(classes.margin, classes.textField)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                            }}
                            variant="outlined"
                        />
                    </Grid>
                    {/* 
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="zip"
                            name="zip"
                            label="Zip / Postal code"
                            fullWidth
                            autoComplete="shipping postal-code"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="country"
                            name="country"
                            label="Country"
                            fullWidth
                            autoComplete="shipping country"
                        />
                    </Grid>
                    */}
                </Grid>
                <Grid container spacing={4}>
                    {pokemons.map((pokemon) => <Pokedex key={pokemon.name} pokemon={pokemon} />)}
                </Grid>
            </Container>
        </Fragment>
    )
    
};  

export default DashboardContainer;