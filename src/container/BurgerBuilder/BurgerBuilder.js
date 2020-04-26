import React, { Component } from 'react';

import Auxilary from '../../hoc/Auxilary';
import Burger from '../../component/Burger/Burger';

class BurgerBuidler extends Component{
    // you can also add constructor     
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }
    render() {
        return (
            <Auxilary>
                <Burger ingredients={this.state.ingredients} />
            </Auxilary>
        );
    }
}

export default BurgerBuidler;