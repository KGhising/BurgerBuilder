import React, { Component } from 'react';
import Axios from '../../../Axios-order';

import Button from '../../../component/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../component/UI/Spinner/Spinner';
import Input from '../../../component/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postal: '',
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState( {loading: true} );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Kishor Ghising',
                address: 'Katunje, Bhaktapur'
            },
            deliveryMethod: 'Fastest'
        }
        Axios.post('/orders.json', order)
            .then(response => {
                this.setState(  {loading: false} )
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState( {loading: false} )
            });
    }

    render () {
        let form = (
            <form>
                <Input inputtype='input' type="text" name="name" placeholder="Your name" />
                <Input inputtype='input' type="email" name="email" placeholder="Your email" />
                <Input inputtype='input' type="text" name="street" placeholder="Street" />
                <Input inputtype='input' type="number" name="postalCode" placeholder="Postal code" />
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if(this.state.loading) {
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

export default ContactData;