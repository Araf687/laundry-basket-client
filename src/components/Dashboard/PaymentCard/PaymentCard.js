import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentCheckoutForm from '../PaymentCheckoutForm/PaymentCheckoutForm';
// import PaymentCheckoutForm from '../Dashboard/PaymentCheckoutForm/PaymentCheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51J4vBoDx7Gqq6Eeg13YheJ8bkyZYWhLrVgGvYQwR4RabWcbXgPPQ64mWOUIDAbu4mb8yVlyFuVxWM04qDY4Glgu2005wn98Mh0');

const PaymentCard = (props) => {
    const handleConfirmtion=props.confirmation;
    const cost=props.cost;
    return (
        <div>
            <Elements stripe={stripePromise}>
                <PaymentCheckoutForm cost={cost} confirmation={handleConfirmtion}></PaymentCheckoutForm>
            </Elements>
            
        </div>
    );
};

export default PaymentCard;