import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import model1 from '../../../images/bg-remove/model1.png'


const useStyles=makeStyles(theme=>({
    root:{
        zIndex:'1',
        height:'100%',
        width:"100%",
        margin:'0 auto'
    },
    headlines:{
        '& h2':{
            color: '#03a9f4',
            lineHeight: '1.2',
            fontSize: '50px',
            margin: '0',          
        },
        '& h3':{
            color:'#fff',
            fontSize:'18px',
            marginBottom:'0'
        },
    },
    headingSection:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'350px',

    },
    modelSection:{
        textAlign:'center',
    }
}))

const Banner = () => {
    const classes=useStyles();
    return (
        <section className={classes.root}>
            <Grid container style={{height:'100%'}}>
                <Grid item md={6} className={classes.headingSection}>
                    <div className={classes.headlines}>
                        <h3>Welcome to LandryBasket</h3>
                        <h2>Pick easily your <br /> Laundry Services</h2>
                    </div>
                </Grid>
            </Grid>
        </section>
    );
};

export default Banner;