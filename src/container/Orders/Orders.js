import React, { Component } from 'react';

import Axios from '../../Axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import Order from '../../component/Order/Order';
class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    }
    componentDidMount() {
        Axios.get('/orders.json')
            .then(res => {
                const fetchOrder = [];
                for (let key in res.data) {
                    fetchOrder.push({
                        ...res.data[key], 
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchOrder});
            })
            .catch(err => {
                this.setState({loading: false});
            }); 
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, Axios);