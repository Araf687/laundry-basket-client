import React from 'react';
import error from '../../images/error.png'

const NotFound = () => {
    return (
        <div style={{display:'flex',justifyContent:'center',height:'100vh',alignItems:'center'}}>
            <img src={error} alt="" />
        </div>
    );
};

export default NotFound;