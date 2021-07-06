import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles=makeStyles(theme=>({
    root:{
        padding:'2rem',
    },
    historyContainer:{
        backgroundColor:'white',
        padding:'20px',
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        borderRadius:'10px',
    },
    receiverInfoSection:{
        color:'black',
        '& span':{
            fontWeight:'600',
            marginRight:'10px',
        },
        '& p':{
            margin:'5px 10px'
        },
        '& h5':{
            marginTop:'0',
            marginBottom:'10px',
        }

        
    },
    orderInfoSection:{
        color:'black',
        '& span':{
            fontWeight:'600',
            marginRight:'10px',
        },
        '& p':{
            margin:'5px 10px',
           
        },
        '& h5':{
            marginTop:'0',
            marginBottom:'10px'

        }
        
        
    }
}))

const HistoryCard = (props) => {
    const classes=useStyles();
    console.log(props.historyData);
    const {PickupAddress,cost,date,numberOfClothes,customerName,customerPhone,_id}=props.historyData;
    return (
        <Grid item md={6} xs={12} className={classes.root}>
            <div className={classes.historyContainer}>
                <div>
                    <h3 style={{margin:'0',textAlign:'center'}}>{date}</h3>
                </div> <br />
                <div className={classes.receiverInfoSection}>
                    <h5>Customer Information</h5>
                    <p><small><span>Name:</span> {customerName} </small></p>
                <p><small><span>Mobile:</span>{customerPhone}</small></p>
                    <hr />

                </div>
                <div className={classes.orderInfoSection}>
                <h5>Service Information</h5>
                    <p><small><span>Order No:</span>{_id} </small></p>
                    <p><small><span>Address:</span>{PickupAddress} </small></p>
                    <p><small><span>Number Of Clothes:</span>{numberOfClothes} </small></p>
                    <p><small><span>Service Cost:</span>{cost} Taka</small></p>
                    <p><small><span>Pay With:</span>Credit Card </small></p>

                </div>
            </div>
        </Grid>
    );
};

export default HistoryCard;