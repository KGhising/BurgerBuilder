import React, { Component } from 'react';
import Axios from '../../../Axios-order';
import { connect } from 'react-redux';

import Button from '../../../component/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../component/UI/Spinner/Spinner';
import Input from '../../../component/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidation } from '../../../shared/utility';

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
            orderDate: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidation(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true,
        });
        const updatedOrderForm = updateObject(this.state.orderForm, {   
            [inputIdentifier]: updatedFormElement
        });

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