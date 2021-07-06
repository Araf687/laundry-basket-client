import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles=makeStyles(theme=>({
    root:{
        backgroundColor:'#00386814',
        borderRadius:'10px'
    },
    inputBox:{
        width:'350px',
        margin:'10px',
        backgroundColor:'white'
    },
    inputFile:{
         width:'150px',
         overflow:'hidden',
         padding:'10px',
        
    },
    inputsAlign:{
        
        padding:'10px'
    },
    button:{
    }
}))

const AddService = () => {
    const classes=useStyles();
    const [confirmationMessage,setConfirmationMessage]=useState({msg:'',clr:''});
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const {title,description}=data;
        console.log(title,description);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        fetch('http://localhost:5000/addService', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data){
                setConfirmationMessage({msg:"Added Service Successfully",clr:'green'});
            }
            else{
                setConfirmationMessage({msg:"Something went wrong!Check the title and submit again",clr:'red'});
            }
        })
        .catch(error => {
            console.error(error)
        })
            };
    return (
        <div> 
            <div className={classes.root}><form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                        <Grid item md={5} className={classes.inputsAlign}>
                            <TextField className={classes.inputBox} label="Title" variant="outlined"  {...register("title", { required: true })}/> <br />
                            {errors.title && <span style={{marginLeft:'10px'}}>This field is required</span>} <br />
                        </Grid>
                        
                        <Grid item md={5} className={classes.inputsAlign}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows={4}
                                defaultValue=" "
                                variant="outlined"
                                className={classes.inputBox}
                                {...register("description", { required: true })}
                            /> <br />
                            {errors.description && <span style={{marginLeft:'10px'}}>This field is required</span>}
                        </Grid>
                        <Grid item md={12}>
                            
                            <Button type="submit" variant="contained" style={{margin:'20px',backgroundColor:'#003868',color:'white',cursor:'pointer'}}>
                                SUBMIT
                            </Button> <br />
                        
                        </Grid>
                    
                    
                </Grid></form>
            </div>
            {confirmationMessage &&<p style={{textAlign:'center',color:confirmationMessage.clr,fontWeight:'600'}}>{confirmationMessage.msg}</p>}
        </div>
    );
};

export default AddService;