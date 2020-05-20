import React, { useState } from 'react';
import Axios from '../../../Axios-order';
import { connect } from 'react-redux';

import Button from '../../../component/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../component/UI/Spinner/Spinner';
import Input from '../../../component/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidation } from '../../../shared/utility';

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input', 
            elementConfig: {
                type: 'text',
                placeholder: 'Your name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }, 
        address: {
            elementType: 'input', 
            elementConfig: {
                type: 'text',
                placeholder: 'Address',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        postal: {
            elementType: 'input', 
            elementConfig: {
                type: 'text',
                placeholder: 'Postal Code',
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select', 
            elementConfig: {
                option: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'},
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true
        }
        })
        const [formIsVaild, setFormIsValid] = useState(false);

    const orderHandler = (event) => {  
        event.preventDefault();

        const formData = {};
        for(let formElmentIdentifier in orderForm) {
            formData[formElmentIdentifier] = orderForm[formElmentIdentifier].value; 
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderDate: formData,
            userId: props.userId
        }
        props.onOrderBurger(order, props.token);
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidation(event.target.value, orderForm[inputIdentifier].validation),
            touched: true,
        });
        const updatedOrderForm = updateObject(orderForm, {   
            [inputIdentifier]: updatedFormElement
        });

        let formIsVaild = true;
        for(let inputIdentifier in updatedOrderForm) {
            formIsVaild = updatedOrderForm[inputIdentifier].valid && formIsVaild;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsVaild);
    }
    
    const formElementArray = [];
    for(let key in orderForm) {
        formElementArray.push({
            id: key,
            config: orderForm[key]
        });
    }

    let form = (
        <form onSubmit={orderHandler}>
            {formElementArray.map(formElement => (
                <Input
                    key={formElement.id} 
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)} />
            ))}
            <Button btnType="Success" disabled={!formIsVaild}>Order</Button>
        </form>
    );
    if(props.loading) {
        form = <Spinner />
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your personal data.</h4>
            {form}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderDate, token) => dispatch(actions.purchaseBurger(orderDate, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, Axios));