import React, { Component } from 'react';

import Auxilary from '../../hoc/Auxilary';
import Burger from '../../component/Burger/Burger';

class BurgerBuidler extends Component{
    // you can also add constructor     
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
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