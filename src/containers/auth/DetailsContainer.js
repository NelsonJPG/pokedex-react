import React, { Fragment, /* useState, useEffect*/ } from 'react';
import {Grid} from '@material-ui/core';
//import axios from 'axios';
//import configApp from '../../config-app';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    CardMedia 
  } from '@material-ui/core';
  import { typeColors } from '../../constant'

  const useStyles = makeStyles((theme) => ({
    pokeimg: {
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
        backgroundSize: 'contain',
        [theme.breakpoints.down('sm')]: {
            width: 400,
        },
    },
}));

const DetailsContainer = ({pokemon}) => {
    const classes = useStyles();
    /*
    const [evolutions, setEvolutions] = useState([])

    const getEvolutions = async () => {

        let {data } = await axios.get(`${configApp.apiurl}/evolution-chain/${pokemon.id}`);
        console.log(findAllByKey(data.chain, 'species'))
       
    }

    useEffect(() => {
       getEvolutions();

    });*/
      
    return (
        <Fragment>
            <Grid container alignItems={"center"} justify={"center"}   style={{backgroundColor: typeColors[pokemon.types[0].type.name].background, color: typeColors[pokemon.types[0].type.name].background}}>
                <Grid item md={6}>
                <CardMedia
                className={classes.cardMedia}
              
                image={pokemon.sprites.other["official-artwork"].front_default? pokemon.sprites.other["official-artwork"].front_default: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"}
                title={pokemon.name}
                />
                </Grid>
                <Grid item md={6}>
             
                    <Table>
                        
                        <TableBody>
                        {_.values(pokemon.stats).map((stats, index) => {

                        
                            return(
                                <TableRow
                                hover
                                key={index}
                                >
                            <TableCell>
                            <Typography variant="h6">{stats.stat.name}</Typography>
                             
                            </TableCell>
                            <TableCell>
                            {stats.base_stat}
                            </TableCell>
                            
                          
                            </TableRow>
                        )})}
                        
                        </TableBody>
                    </Table>
      
                    
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default DetailsContainer;