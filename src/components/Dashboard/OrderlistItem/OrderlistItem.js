import { Grid, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';

const BootstrapInput = withStyles((theme) => ({
    margin:'5px',
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 14,
      padding: '4px 8px',
      width:'70px',
      height:'20px',
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
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);
  

const useStyles=makeStyles(theme=>({
    body:{
        '& p':{
            fontWeight:'600',
            fontSize:'14px'
        },

    },
}))

const OrderlistItem = (props) => {
    const classes=useStyles();
    const {email,customerName,service}=props.data;
    const [action,setAction]=useState('pending');

    const handleChange = (event) => {
        setAction(event.target.value);
      };

    return (
        <div>
            <Grid container className={classes.body}>
                <Grid item md={3}><p>{customerName}</p></Grid>
                <Grid item md={3}><p>{email}</p></Grid>
                <Grid item md={2}><p>{service.service}</p></Grid>
                <Grid item md={2}><p>{'Credit Card'}</p></Grid>
                <Grid item md={2} style={{display:'flex',alignItems:'center'}}>
                    <FormControl>
                        <Select
                        id="demo-customized-select-native"
                        value={action}
                        onChange={handleChange}
                        input={<BootstrapInput />}
                        defaultValue="pending"
                        >
                            <MenuItem value={'pending'}>Pending</MenuItem>
                            <MenuItem value={'On Going'}>On Going</MenuItem>
                            <MenuItem value={"Done"}>Done</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            
        </div>
    );
};

export default OrderlistItem;