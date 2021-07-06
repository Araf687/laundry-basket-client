import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';
import Button from '@material-ui/core/Button';

const useStyles=makeStyles(theme=>({
    detailContainer:{
        textAlign:'center',
        padding:'1rem',
        
    },
    mainContainer:{
        padding:'2rem',
        backgroundColor: 'white',
        borderRadius:'5px', 
    },
    img:{
        height:'100px',
        margin:'10px 20px'
    },
    exploreBtn:{
        height:'32px',
        backgroundColor: '#03a9f4',
        "&:hover":{
          backgroundColor: '#03a9f4',
        }
    }

}))

const ServiceCard = (props) => {
    const classes=useStyles();
    const [,,,setSelectedService]=useContext(UserContext);
    const {title,description}=props.service;
    const history=useHistory();
    const handleServiceClick=()=>{
        setSelectedService(title);
        history.replace('/dashboard');
    }
    
    return (
            <Grid item md={4}  className={classes.detailContainer}>
                <div className={classes.mainContainer}>
                    <div>
                        <h2 style={{marginTop:'0', color:'#03a9f4'}}>
                            {title}
                        </h2>
                        <p style={{color:'gray'}}>
                            {description}
                        </p>
                        <Button className={classes.exploreBtn} onClick={handleServiceClick} variant="contained" color="primary">
                            Explore
                        </Button>
                    </div>
                </div>
            </Grid>
    );
};

export default ServiceCard;