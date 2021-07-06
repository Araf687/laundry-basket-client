import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import MakeAdmin from '../MakeAdmin/MakeAdmin'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
  } from "react-router-dom";
import Orders from '../Orders/Orders';
import AddService from '../AddService/AddService';
import { useState } from 'react';
import BookBasket from '../BookBasket/BookBasket';
import BookHistory from '../BookHistory/BookHistory';
import Review from '../Review/Review';
import { createContext } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../../App';
import Avatar from '@material-ui/core/Avatar';
import PaymentGatewy from '../PaymentGateway/PaymentGatewy';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import IconButton from '@material-ui/core/IconButton';

import './Dashboard.css';
import { processOrder } from '../../../utilities/databaseManager';
import ManageService from '../ManageService/ManageService';
const useStyles=makeStyles(theme=>({
    header:{
        padding:'1px 20px'
    }
}))

export const UserContextDashboard=createContext({});

const Dashboard = () => {
    const classes=useStyles();
    const [isAdmin,setIsAdmin]=useState(false);
    const [paymentInfo,setPaymentInfo]=useState(0);
    const [selectedOption,setSelectedOption]=useState("");
    const [loggedInUser,setLoggedInUser,,]=useContext(UserContext);
    const history=useHistory();
        useEffect(()=>{
            fetch("http://localhost:5000/isAdmin", {
                method: "POST",
                body: JSON.stringify({email:loggedInUser.email}),
                headers: {
                "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response=>response.json())
            .then(result=>{
                console.log(result);
                setIsAdmin(result);
                result?setSelectedOption("Basket List"):setSelectedOption("Book Basket");
                })
        },[])
        const handleExit=()=>{
            setLoggedInUser({});
            sessionStorage.clear();
            history.replace('/home');
        }


    return (
        <UserContextDashboard.Provider value={[isAdmin,setIsAdmin,paymentInfo,setPaymentInfo]}>
            <Router>
                <Grid style={{paddingLeft:'30px',paddingTop:'1px'}} container maxWidth="lg">
                    <Grid item xs={12} md={2}>
                        <Sidebar option={setSelectedOption}></Sidebar>
                    </Grid>
                    <Grid item xs={12} md={9}>
                            <Grid container >
                                <Grid><h2 style={{color:'#024783',textAlign:'left'}}>{selectedOption}</h2></Grid>
                                <Grid item xs></Grid>
                                <Grid>
                                    <div style={{display:'flex',marginTop:'20px'}}>
                                        <Avatar src={loggedInUser.photoURL} />
                                        <h4 style={{margin:'7px',marginLeft:'10px'}}>{loggedInUser.name||loggedInUser.email}</h4>
                                        <IconButton onClick={()=>handleExit()} style={{psdding:'0',fontSize:'30'}} color="secondary" aria-label="add an alarm">
                                            <ExitToAppIcon  />
                                        </IconButton>

                                    </div>
                                    
                                </Grid>
                            </Grid>
                            
                            <Switch>
                                <Route path="/orders">
                                    <Orders></Orders>
                                </Route>
                                <Route path="/addService">
                                    <AddService></AddService>
                                </Route>
                                <Route path="/makeAdmin">
                                    <MakeAdmin></MakeAdmin>
                                </Route>
                                <Route path="/manageService">
                                    <ManageService></ManageService>
                                </Route>
                                <Route path="/bookBasket">
                                   <BookBasket></BookBasket>
                                </Route>
                                <Route path="/bookingHistory">
                                   <BookHistory></BookHistory>
                                </Route>
                                <Route path="/review">
                                   <Review></Review>
                                </Route>
                                <Route path="/payment">
                                   <PaymentGatewy></PaymentGatewy>
                                </Route>
                                <Route exact path="/dashboard">
                                   {isAdmin?<Orders></Orders>:<BookBasket></BookBasket>}
                                </Route>
                                
                            </Switch>
                    </Grid>
                </Grid>
            </Router>
        </UserContextDashboard.Provider>
    );
};

export default Dashboard;