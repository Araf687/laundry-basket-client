import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import featureImg from '../../../images/feature.jpg'

const useStyles=makeStyles(theme=>({
    root:{
        backgroundColor:'#03a9f4'
    }
}))
const Feature = () => {
    const classes=useStyles();
    return (
        <section className={classes.root}>
            <Grid container style={{width:'85%',margin:'0 auto'}}>
                <Grid item md={7} xs={12} style={{padding:'2rem 2rem'}}>
                    <div style={{display:'flex', flexDirection: 'column',     justifyContent: 'center',height: '100%'}}>
                        <h2 style={{fontSize:'30px',marginBottom:'10px'}}>We wash your cloth carefully</h2>
                        <p style={{width:'70%'}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.
                        </p>
                    </div>
                </Grid>
                <Grid item md={5} xs={12}>
                    <img style={{height:'auto', width: '100%'}} src={featureImg} alt="" />
                </Grid>
            </Grid>
        </section>
    );
};

export default Feature;