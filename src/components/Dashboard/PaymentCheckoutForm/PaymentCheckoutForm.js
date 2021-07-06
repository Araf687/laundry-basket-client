import React, { useContext } from 'react';
import {CardElement, CardNumberElement,useStripe, useElements} from '@stripe/react-stripe-js';
import Button from '@material-ui/core/Button';
import { UserContextDashboard } from '../Dashboard/Dashboard';

const PaymentCheckoutForm = (props) => {
    const handleConfirmtion=props.confirmation;
    const cost=props.cost;
  
    const stripe = useStripe();
    const elements = useElements();
    const [,,paymentInfo,]=useContext(UserContextDashboard);
  
    const handleSubmit = async (event) => {
      fetch("http://localhost:5000/addCourierDetails", {
          method: "POST",
          body: JSON.stringify(paymentInfo),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then(response => response.json())
        .then(json => console.log(json));



      // Block native form submission.
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }
  
      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const cardElement = elements.getElement(CardElement);
  
      // Use your card Element with other Stripe.js APIs
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
  
      if (error) {
        handleConfirmtion(error.message,"#f20544");
      } else {
        console.log('[PaymentMethod]', paymentMethod);
        handleConfirmtion(`paid successfully by id: ${paymentMethod.id}`,'green');
      }
    };
    
    return (
      <form onSubmit={handleSubmit} >
        <p>Card</p>
        <div style={{backgroundColor:'white',padding:'10px',borderRadius:'7px'}}>
           <CardElement />
        </div>
        <Button variant="contained" style={{marginTop:'20px',width:'100%'}} type="submit" color="primary">
            Pay {cost} Taka
        </Button>
      </form>
    );
};

export default PaymentCheckoutForm;