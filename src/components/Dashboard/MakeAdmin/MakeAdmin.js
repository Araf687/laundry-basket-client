import React,{ useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {
    fade,
    withStyles,
    makeStyles,
  } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { useForm } from "react-hook-form";

const useStyles=makeStyles(them=>({
    root:{
        backgroundColor:'#00386814',
        borderRadius:'10px',
        padding:'10px',
        paddingBottom:'20px'
    }
}))


const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
        
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '300px',
      padding: '9px 12px',
      marginRight:'8px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }))(InputBase);

const MakeAdmin = () => {
    const classes=useStyles();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [confirmAddAdmin,setConfirmAddAdmin]=useState({msg:'',clr:''});
    const onSubmit = data =>{
        const {email}=data;
        console.log(email,typeof(email));
        fetch("http://localhost:5000/makeAdmin", {
          method: "POST",
          body: JSON.stringify({email:email}),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          if(data){
            setConfirmAddAdmin({msg:`Make ${email} as Admin Successfully`,clr:'green'});
        }
        else{
            setConfirmAddAdmin({msg:"Something went wrong!Check your internet or submit again",clr:'red'});
        }
        });
      };
    return (
        <div className={classes.root}>
            <p style={{fontWeight:'600'}}>Email</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <BootstrapInput id="bootstrap-input" {...register("email", { required: true })}/>
                </FormControl>                
                <Button variant="contained" type="submit" color="primary" style={{borderRadius:'6px'}}>
                    Submit
                </Button>
                {errors.email && <span style={{color:"#f20544"}}><br />This field is required</span>} <br></br>
                {confirmAddAdmin &&<p style={{textAlign:'center',color:confirmAddAdmin.clr,fontWeight:'600'}}>{confirmAddAdmin.msg}</p>}
            </form>
        </div>
    );
};

export default MakeAdmin;