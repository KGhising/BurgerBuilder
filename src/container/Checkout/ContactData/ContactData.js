import React, { Component } from 'react';
import Axios from '../../../Axios-order';
import { connect } from 'react-redux';

import Button from '../../../component/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../component/UI/Spinner/Spinner';
import Input from '../../../component/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
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
                valid: false
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
            },
        },
        formIsVaild: false,
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for(let formElmentIdentifier in this.state.orderForm) {
            formData[formElmentIdentifier] = this.state.orderForm[formElmentIdentifier].value; 
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderDate: formData
        }
        this.props.onOrderBurger(order);
    }

    checkValidation(value, rules) {
        let isvalid = true;
        if(!rules) {
            return true;
        }
        
        if(rules.required) {
            isvalid = value.trim() !== ' ' && isvalid;
        }
        if (rules.minLength) {
            isvalid = value.length >= rules.minLength && isvalid;
        }
        if (rules.maxLength) {
            isvalid = value.length <= rules.maxLength && isvalid;
        }
        return isvalid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsVaild = true;
        for(let inputIdentifier in updatedOrderForm) {
            formIsVaild = updatedOrderForm[inputIdentifier].valid && formIsVaild;
        }
        this.setState({orderForm: updatedOrderForm, formIsVaild: formIsVaild });
    }

    render () {
        const formElementArray = [];
        for(let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id} 
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsVaild}>Order</Button>
            </form>
        );
        if(this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your personal data.</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderDate) => dispatch(actions.purchaseBurger(orderDate))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, Axios));