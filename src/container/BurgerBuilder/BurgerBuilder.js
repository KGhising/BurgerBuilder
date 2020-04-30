import React, { Component } from 'react';

// import Auxilary from '../../hoc/Auxilary';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import classes from './BurgerBuilder.module.css';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';
import Axios from '../../Axios-order';

const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 1.5,
    meat: 2,
    bacon: 0.5
}
class BurgerBuidler extends Component{
    // you can also add constructor     
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice:  4,
        purchasable: false,
        purchasing: false
    }

    // purchase state update
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({purchasable: sum > 0});
    }

    // add ingredient
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients, });
        this.updatePurchaseState(updatedIngredients);
    }

    // remove ingredient
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients, });
        this.updatePurchaseState(updatedIngredients);
    }

    // handle order purchase
    purchaseHandler =  () => {
        this.setState({purchasing: true});
    }

    // Purchase cancel handler
    purchaseCancleHandler = () => {
        this.setState({purchasing: false});
    }

    // Purchase Continue handler
    purchaseContinueHandler = () => {
        // alert('Thank you. Order Confirmed!');
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Kishor Ghising',
                address: 'Katunje, Bhaktapur'
            },
            deliveryMethod: 'Fastest'
        }
        Axios.post('/orders.json', order)
            .then(response => console.log(response))
            .catch(err => console.log(err));
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <div>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancleHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        price={this.state.totalPrice}
                        purchaseCanceled={this.purchaseCancleHandler}
                        purchaseContinued={this.purchaseContinueHandler} />
                </Modal>
                <div className={classes.BurgerBuilder}>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo} price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable} /> 
            </div>
            </div>
        );
    }
}

export default BurgerBuidler;