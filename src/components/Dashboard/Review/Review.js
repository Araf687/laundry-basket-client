import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import { useContext } from 'react';
import { UserContext } from '../../../App';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useState } from 'react';


const useStyles=makeStyles(theme=>({
    root:{
        backgroundColor:'#00386814',
        borderRadius:'10px',
        padding:'20px',
    },
    inputField:{
        width:'450px',
        margin:'12px 0px',
        backgroundColor:'white'
    },
    button:{
        margin:'10px 5px',
        backgroundColor:'#003868',
        color:'white',
        cursor:'pointer',
        ['&:hover']:{
            backgroundColor:'#01315a',
        }
        
    },
    error:{
        color:'#f20544',
        marginLeft:'5px',
    }

}))

const Review = () => {

    const classes=useStyles();
    const [value, setValue] = useState(0);
    const [loggedInUser,]=useContext(UserContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [confirmReview,setConfirmReview]=useState({msg:'',clr:''});
    const onSubmit = data =>{ 
        data.date=new Date().toDateString();
        data.rating=value;
        if(loggedInUser.photoURL){
            data.image=loggedInUser.photoURL
        }
        console.log(data);
        fetch("http://localhost:5000/addReview", {
          method: "POST",
          body: JSON.stringify({data}),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            json?setConfirmReview({msg:"Added Review Successfully",clr:'green'}):setConfirmReview({msg:"Something went wrong!submit again",clr:'red'});
        });
    }
    return (
        <div>
            <section className={classes.root}>
                <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField id="outlined-search" className={classes.inputField} label="Your Name" type="search" variant="outlined" 
                        {...register("name", { required: true })}/><br />
                        {errors.name && <span className={classes.error}>This field is required <br /></span>}

                        <TextField id="outlined-search" className={classes.inputField} label="Company Name" type="search" variant="outlined" 
                        {...register("companyName", { required: true })}/><br />
                        {errors.companyName && <span className={classes.error}>This field is required <br /></span>} 

                        <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={6}
                        variant="outlined"
                        className={classes.inputField}
                        {...register("description", { required: true })}
                        /> <br />
                        {errors.description && <span className={classes.error}>This field is required<br /></span>}
                        <Box style={{marginTop:'20px'}} component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend">Rating</Typography>
                            <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            />
                        </Box>
                        
                        <Button type="submit" variant="contained" className={classes.button}>
                            Submit
                        </Button>
                    </form>
            </section>
        </div>
    );
};

export default Review;