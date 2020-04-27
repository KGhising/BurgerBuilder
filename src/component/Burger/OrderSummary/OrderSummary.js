import React from 'react';

import Auxilary from '../../../hoc/Auxilary';
const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
        return <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
        });
    return (
        <Auxilary>
            <h3>Your Order</h3>
            <p>Checkout you delicious Burger:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>CheckOut</p>
        </Auxilary>
    );
};

export default orderSummary;