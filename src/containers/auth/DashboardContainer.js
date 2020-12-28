
import React, { Fragment, useState } from 'react';
import {
    Grid, Container, TextField, InputAdornment
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import clsx from 'clsx';
import Pokedex from '../../components/Pokedex';
import configApp from '../../config-app';
import InfiniteScroll from "react-infinite-scroller";

const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    textField: {
        marginBottom: theme.spacing(1),
    }
}));


const DashboardContainer = ()  => {
    const [pokemons, setPokemons] = useState([]);
    //const [search, setSearch] = useState('');
    const [url, setUrl] = useState(`${configApp.apiurl}/pokemon/?limit=${configApp.pagination}`);
    const classes = useStyles();
    const getPokemonExtended = async ( url ) => {
        let {data} = await axios.get(`${url}`);
        return data;
    }
    const getPokemons = async () => {


        let {data: { results, next} } = await axios.get(` ${url} `);
        let allpokemon = await axios.all(results.map( async result => await getPokemonExtended(result.url)));
      
        setPokemons(prev => [...prev, ...allpokemon])
        setUrl(next)
    }

    return (
      <Fragment>
          <Container className={classes.cardGrid}>
                <Grid item sm={12}>
                    <TextField
                        fullWidth
                        label="pokemon"
                        id="outlined-start-adornment"
                        className={clsx(classes.margin, classes.textField)}
                        //onChange={(event) => setSearch(event.target.value)}
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
        {pokemons ? (

            <InfiniteScroll
              pageStart={0}
              loadMore={getPokemons}
              hasMore={url? true : false}
              loader={
                  <div className="loader" key={0}>
                  Loading ...
                </div>
              }
            >
            <Grid container spacing={4}>
                {pokemons.map((pokemon) => <Pokedex key={pokemon.name} pokemon={pokemon} />)}
            </Grid>
            </InfiniteScroll>
        ) : (
            <h1>Loading Pokemon</h1>
            )}
            </Container>
      </Fragment>
    );
}

export default DashboardContainer;