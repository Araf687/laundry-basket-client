 import { Box, Grid, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import firebase from "firebase/app";
import "firebase/auth";
import './Login.css';

import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Button from '@material-ui/core/Button';

import firebaseConfig from '../../firebase.config';
import { useHistory, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

import '../../utilities/databaseManager';

import { RiGoogleFill } from 'react-icons/ri'

const useStyles=makeStyles(theme=>({
    root:{
        width:"400px",
        padding:'20px',
        borderRadius:'10px'
        
    },
    margin: {
        margin: theme.spacing(1),
      },
      withoutLabel: {
        marginTop: theme.spacing(3),
      },
      InputBox:{
          width:"100%",
          marginBottom:'5px'
      },
      link:{  
        '&:hover':{
            cursor:"pointer",
            color:'#033662',
        },
      },
      forM:{
          padding:'25px',
          margin:'5px',
          borderRadius:'15px',
          boxShadow: "0 4px 8px 0 rgb(0 0 0 / 0%), 0 6px 20px 0 rgb(0 0 0 / 8%)",
          textAlign:'center',
          '& h2':{
              color:'#03a9f4',
          }
      },
      button:{
          marginTop:'10px',
          width:'95%',
          backgroundColor:'#03a9f4',
          '&:hover':{
              backgroundColor:'#06a5ec'
          }
      },
      googleButton:{
          display:'flex',
          border: '2px solid #03a9f4',
          borderRadius: '30px',
          paddingTop: '2px',
          margin:'27px 12px',
          color:'#03a9f4',
          '& h4':{
              margin:'2px',
              marginLeft:'20%',
              fontSize:'18px'
          },
          '&:hover':{
              cursor:'pointer',
              backgroundColor:'#03a9f4',
              color:'white' 
            },   
        },
      googleIcon:{
          fontSize:'25px',
          paddingLeft:'6px',
      },
      errMsg:{
          color:'red',
      }

}))
 
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }
 
 const Login = () => {

    const classes = useStyles();
    const history = useHistory();
    const location=useLocation();       
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [haveAccount,setHaveAccount]=useState(true);
    const [confirmation,setConfirmation]=useState({message:"",error:""});

    const [,setLoggedInUser]=useContext(UserContext);

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
      let { from } = location.state || { from: { pathname: "/" } }; 
    
     const provider = new firebase.auth.GoogleAuthProvider();
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const onSubmit = data =>{
        
        const {email,password,confirmPassword}=data;
        console.log(email,password,confirmPassword);
        if(haveAccount)
        {
            console.log('click in login');
            setConfirmation(({message:"",error:""}));
            loginAccount(email,password);
        }
        else{
            console.log(verifyEmail_Pass(email,password,confirmPassword));
            if(verifyEmail_Pass(email,password,confirmPassword) ){
                console.log('click in create');
                setConfirmation(({message:"",error:""}));
                createAccount(email,password);
            }
            else{
                setConfirmation({error:"invalid mail or password"});
            }

        }
    }

    const createAccount=(email,password)=>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const message="Account Created Successfully";
            setConfirmation({message:message});
        })
        .catch((error) => {
            var errorMessage = error.message;
            setConfirmation({error:errorMessage});
        });
    }
    const loginAccount=(email,password)=>{
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const userDetails={email:email,password:password};
            const message="Logged In Successfully";
            setLoggedInUser(userDetails);
            setConfirmation({message:message});
            saveUser(userDetails);
            history.replace(from);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            setConfirmation({error:errorMessage});
        });
    }
    const verifyEmail_Pass=(email,pass,confirmPass)=>{
        const checkPass=pass.length>6&&pass==confirmPass;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (re.test(String(email).toLowerCase())&&checkPass);
    }
    const handleSignInWithGoogle=()=>{
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            var user = result.user;
            const {displayName,email,photoURL}=user;
            const message="Logged In Successfully";
            setConfirmation({message:message});
            const userDetails={name:displayName,email:email,photoURL:photoURL};
            setLoggedInUser(userDetails);
            saveUser(userDetails);
            history.replace(from);
        }).catch((error) => {
            // var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    }
     
    const saveUser=(userDetails)=>{
        sessionStorage.setItem('user',JSON.stringify(userDetails)); 
    }
     return (
         <div>
             <Grid container>
                 <Grid item xs={3}></Grid>
                 <Grid  item xs={6} style={{display:'flex',justifyContent:'center',justifyItems:'center',alignItems:'center'}}>
                    <div style={{width:'80%',padding:'25px 30px'}}>
                        <div className={classes.forM}>
                            <form onSubmit={handleSubmit(onSubmit)} >

                                { haveAccount&& 
                                <div>
                                    <h2>Login</h2>
                                    <TextField className={classes.InputBox}  label="Email*" {...register("email", { required: true })}/> <br />
                                    {errors.email && <span className={classes.errMsg}>This field is required</span>} <br />
                                    <TextField className={classes.InputBox}  label="Password*" {...register("password", { required: true })}/> <br />
                                    {errors.password && <span className={classes.errMsg}>This field is required</span>} <br />
                                </div>
                                } 

                                {!haveAccount&&
                                <div>
                                    <h2>Register</h2>
                                    <TextField className={classes.InputBox}  label="Name*" {...register("name", { required: true })}/> <br />
                                    {errors.name && <span className={classes.errMsg}>This field is required</span>} <br />
                                    <TextField className={classes.InputBox}  label="Email*" {...register("email", { required: true })}/> <br />
                                    {errors.email && <span className={classes.errMsg}>This field is required</span>} <br />
                                    <TextField className={classes.InputBox} type="password"  label="Password*" {...register("password", { required: true })}/> <br />
                                    {errors.password && <span className={classes.errMsg}>This field is required</span>} <br />
                                    <TextField className={classes.InputBox} type="password" label="Confirm Password*" {...register("confirmPassword", { required: true })}/> <br />
                                    {errors.confirmPassword && <span className={classes.errMsg}>This field is required</span>} <br />
                                        
                                </div>
                                }
                                <Button type="Submit" className={classes.button} variant="contained" color="secondary">
                                        {haveAccount?"Login":"register"}
                                </Button>

                                {haveAccount&&<p style={{fontWeight:'600'}}>Do you have an account?<span className={classes.link} onClick={()=>{setHaveAccount(false);setConfirmation(({message:"",error:""}));}}> Create Account</span></p>}
                                {!haveAccount&&<p style={{fontWeight:'600'}}>Already have an account?<span className={classes.link} onClick={()=>{setHaveAccount(true);setConfirmation(({message:"",error:""}));}}> LogIn</span></p>}
                            </form>
                        </div>
                        {confirmation.message && <p style={{color:"green",fontWeight:'600'}}><small>{confirmation.message}</small></p> }
                        {confirmation.error && <p style={{color:"red",fontWeight:'600'}}> <small> {confirmation.error}</small></p> }
                        <div className={classes.googleButton} onClick={handleSignInWithGoogle}>
                            <div className={classes.googleIcon} >
                                <RiGoogleFill/>
                            </div>
                            <h4>Sign In With Google</h4>
                        </div>
                    </div>
                 </Grid>
             </Grid>
         </div>
     );
 };
 
 export default Login;