import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import ServiceCard from '../ServiceCard/ServiceCard';


const useStyles=makeStyles(theme=>({
    root:{
        padding:'4rem 0rem',
        backgroundColor: '#eef3f7',
    },

}))


const Services= () => {
    const classes=useStyles();
    const [service, setServices]=useState([]);
    useEffect(()=>{
        fetch("http://localhost:5000/getServices")
        .then(response => response.json())
        .then(json => setServices(json));
    },[])
    return (
        <section className={classes.root}>
            <div>
                <h2 style={{textAlign:'center',fontSize:'24px',marginBottom:'1rem',color:'#000'}}>Pick Our Services</h2>
            </div>
            <Grid container spacing={4} style={{width:'90%',margin:'0 auto'}}>
                {service[0] && service.map(data=> <ServiceCard service={data}></ServiceCard> )}
            </Grid>
        </section>
    );
};

export default Services;