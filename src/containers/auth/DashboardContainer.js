
import React, { Fragment, useState } from 'react';
import {
    Grid, Container, TextField, InputAdornment, CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import clsx from 'clsx';
import Pokedex from '../../components/PokeCard';
import configApp from '../../config-app';
import InfiniteScroll from "react-infinite-scroller";
import SearchIcon from '@material-ui/icons/Search';
import DialogCustom from '../../components/DialogCustom';
import DetailsContainer from './DetailsContainer';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    textField: {
        marginBottom: theme.spacing(3),
    },
    margint:{
        marginTop: theme.spacing(3),
    }
}));

const DashboardContainer = ()  => {
    const [pokemons, setPokemons] = useState([]);
    const [selectedpokemon,  setSelectedPokemon] = useState(null);
   
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState(`${configApp.apiurl}/pokemon/?limit=${configApp.pagination}`);
    const classes = useStyles();
    
    const getPokemonExtended = async ( url ) => {
        let {data} = await axios.get(`${url}`);
        return data;
    }
    const getPokemons = async () => {

        let {data: { results, next} } = await axios.get(` ${url} `);
        if( !results) return false;
        let pokelist = await axios.all(results.map( async result => await getPokemonExtended(result.url)));
        if(pokelist.length){
            let allpokemon = [...new Set(pokelist)];
            setPokemons(prev => [...prev, ...allpokemon])
            setUrl(next? next: '')
        }
    }

    const getPokemonsType = async (urltype) => {
        let {data: { pokemon } } = await axios.get(`${urltype}`);
        let allpokemon = await axios.all(pokemon.map( async result => await getPokemonExtended(result.pokemon.url)))
        setPokemons(allpokemon);
        setUrl('')
    }

    const handleChangeSearchPokemon = async (event) => {

        let search = event.target.value

        if( search) {

            let {data: { results} } = await axios.get(`${configApp.apiurl}/pokemon/?limit=${configApp.pokemoncount}`);
            
            let filtered = results.filter( result => result.name.startsWith(search));
            
            let allpokemon = await axios.all(filtered.map( async result => await getPokemonExtended(result.url)));
            
            setPokemons(allpokemon);
            setUrl('')

        }else{
            
            setPokemons([]);
            setUrl(`${configApp.apiurl}/pokemon/?limit=${configApp.pagination}`)
        }
    }

    const handleClose = () => setOpen(false);
    
    return (
      <Fragment>
          <Container className={classes.cardGrid}  >
                <Grid item sm={12}>
                    <TextField
                        fullWidth
                        label="pokemon"
                        id="outlined-start-adornment"
                        className={clsx(classes.margin, classes.textField)}
                        onChange={handleChangeSearchPokemon}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"> <SearchIcon /></InputAdornment>,
                        }}
                        variant="outlined"
                    />
                </Grid>
                {pokemons ? (
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={getPokemons}
                        hasMore={url? true : false}
                        loader={
                            <Grid container spacing={4}  direction="row" justify="center" key="loader">
                                <CircularProgress className={classes.margint} />
                            </Grid>
                        }
                    >
                        <Grid container spacing={4} >
                            {pokemons.map((pokemon) => <Pokedex key={pokemon.name} pokemon={pokemon} getType={getPokemonsType} openModal={ () =>  setOpen(true)} setSelectedPokemon={setSelectedPokemon} />)}
                        </Grid>
                    </InfiniteScroll>
                ) : (
                    <h1>No Data Pokemon</h1>
        )}
            </Container>
            <DialogCustom open={open} handleClose={handleClose} title={selectedpokemon && selectedpokemon.name}>
                <DetailsContainer pokemon={selectedpokemon} /> 
            </DialogCustom>
      </Fragment>
    );
}

export default DashboardContainer;