import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSmmary}>
            <h1>Your Delicious Burger</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <div className={classes.Button}>
                <Button btnType="Danger" clicked={props.checkoutCancelled}>Cancel</Button>
                <Button btnType="Success" clicked={props.checkoutContinued}>Continue</Button>
            </div>
        </div>
    );
}

export default checkoutSummary;