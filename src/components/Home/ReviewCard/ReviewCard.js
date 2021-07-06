import { Grid, makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { useState } from 'react';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles=makeStyles(theme=>({
    cardSection:{
        padding:'2rem',
    },
    mainSection:{
        boxShadow: "0 4px 8px 0 rgb(0 0 0 / 6%), 0 0px 0px 0 rgb(0 0 0 / 0%)",
        padding:'25px',
        borderRadius:'5px',
        backgroundColor:'#fbfbfb'
    },
    profileSection:{
        display:'flex',
        marginBottom: '20px',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
    }
}))

const ReviewCard = (props) => {
    const classes=useStyles();
    const {name,companyName,description,date,image,rating}=props.reviewData;
    return (
        <Grid item md={4} xs={12} className={classes.cardSection}>
            <div className={classes.mainSection}>
                <div className={classes.profileSection}>
                    <div><Avatar src={image} style={{width:'100px', height:'100px'}}/></div>
                    <div style={{margin:'0px 20px',}}>
                        <h2 style={{margin:'5px 0', fontSize: '18px',}}>{name}</h2>
                        <small style={{backgroundColor: '#03a9f4', color: '#fff', padding: '3px 10px', borderRadius: '100px'}}>{companyName}</small> 
                    </div>
                </div>         
                    <p style={{color:'gray', textAlign:'center', fontSize:'15px'}}>{description}</p>
                    <Box component="fieldset" style={{margin:'0',padding:'0', textAlign: 'center'}} borderColor="transparent">
                        <Rating size="small" name="read-only" value={Number(rating)} readOnly emptyIcon={<StarBorderIcon fontSize="28px!important" />} />
                    </Box>
            </div>
            
        </Grid>
    );
};

export default ReviewCard;