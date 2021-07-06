import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContextDashboard } from '../Dashboard/Dashboard';
import PaymentCard from '../PaymentCard/PaymentCard';
import PaymentCheckoutForm from '../PaymentCheckoutForm/PaymentCheckoutForm';

const useStyles=makeStyles(theme=>({
    root:{
        width:'50%',
        margin:'0 auto'
    },
    main:{
        backgroundColor:'#00386814',
        borderRadius:'10px',
        padding:'20px',
        marginTop:'40px'
    }
}))

const PaymentGatewy = () => {
    const classes=useStyles();
    const [,,paymentInfo,]=useContext(UserContextDashboard);
    const {customerName,email,customerPhone,cost}=paymentInfo;
    const [confirmation,setConfirmation]=useState({});
    const handleConfirmtion=(message,color)=>{
        setConfirmation({message:message,color:color});
    }
    return (
        <div className={classes.root}>
            <div className={classes.main}>
                 <h3 style={{textAlign:'center',marginTop:'0',marginBottom:'20px'}}>Payment Card</h3><hr />
                 <h4 style={{margin:'12px 0px'}}>Name:<span style={{float:'right',marginLeft:'150px'}}>{customerName}</span> </h4><hr />
                 <h4 style={{margin:'12px 0px'}}>Email:<span style={{float:'right',marginLeft:'150px'}}>{email}</span></h4><hr />
                 <h4 style={{margin:'12px 0px'}}>Phone:<span style={{float:'right',marginLeft:'150px'}}>{customerPhone}</span></h4><hr />
                 <h4 style={{margin:'12px 0px'}}>Total Cost:<span style={{float:'right',marginLeft:'150px'}}>{cost} Taka</span></h4><hr />
                 <PaymentCard cost={cost} confirmation={handleConfirmtion}></PaymentCard>
            </div>
            {confirmation.message&& <p style={{color:confirmation.color,textAlign:'center',fontWeight:'600'}}>{confirmation.message}</p> }
    
        </div>
    );
};

export default PaymentGatewy;