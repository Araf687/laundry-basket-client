import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import OrderlistItem from '../OrderlistItem/OrderlistItem';

const useStyles=makeStyles(theme=>({
    header:{
        '& h4':{
            color:'gray',
        },
    },
    orderROot:{
        backgroundColor:'#00386814',
        borderRadius:'10px',
        padding:'15px',
    },
    orderTable:{
        backgroundColor:'white',
        padding:'0px 15px',
        borderRadius:'10px',
    }
}))

const Orders = () => {
    const classes=useStyles();
    const [courierList,setCourierList]=useState([]);
    useEffect(()=>{
        fetch("http://localhost:5000/getAllCourierDetails")
        .then(response => response.json())
        .then(json => setCourierList(json));
    },[])
    return (
        <section className={classes.orderROot}>
            <Grid container className={classes.header}>
                <Grid item md={3}><h4>Name</h4></Grid>
                <Grid item md={3}><h4>Email Id</h4></Grid>
                <Grid item md={2}><h4>Service</h4></Grid>
                <Grid item md={2}><h4>Pay With</h4></Grid>
                <Grid item md={2}><h4>Status</h4></Grid>
            </Grid>
            <div className={classes.orderTable}>
                {courierList[0] && courierList.map(courierData=><OrderlistItem data={courierData}></OrderlistItem>)}
            </div>
            
            
        </section>
    );
};

export default Orders;