import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import ReviewCard from '../ReviewCard/ReviewCard';
const Review = () => {
    const [reviewData,setReviewData]=useState([]);
    useEffect(()=>{
        fetch("http://localhost:5000/getReviews")
        .then(response => response.json())
        .then(json => setReviewData(json));
    },[])
    return (
        <section style={{width:'90%',margin:'50px auto'}}>
            <div style={{textAlign:'center',}}>
                <h2 style={{marginBottom:'3rem',color:'#000'}}>What Our Users Say</h2>
            </div>
            <Grid container>
                {reviewData[0]&& reviewData.map(data=><ReviewCard reviewData={data}></ReviewCard>)}
            </Grid>
            
        </section>
    );
};

export default Review;