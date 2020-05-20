import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// import Auxilary from '../../hoc/Auxilary';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';
import Spinner from '../../component/UI/Spinner/Spinner';
import Axios from '../../Axios-order'
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import Auxilary from '../../hoc/Auxilary';
import * as actions from '../../store/actions/index';

const BurgerBuidler = props => {
    // you can also add constructor     
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, []);

    // purchase state update
    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el; 
        }, 0);

        return sum > 0;
    }

    // handle order purchase
    const purchaseHandler =  () => {
        if (props.isAuthenticated) {
            setPurchasing(true); 
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    // Purchase cancel handler
    const purchaseCancleHandler = () => {
        setPurchasing(false);
    }

    // Purchase Continue handler
    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }

    const disabledInfo = {
        ...props.ings
    };

    for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if ( props.ings ) {
        burger = (
            <Auxilary>
                <Burger ingredients={props.ings} />
                <BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(props.ings)}
                    ordered={purchaseHandler}
                    isAuth={props.isAuthenticated}
                    price={props.price} />
            </Auxilary>
        );
        orderSummary = <OrderSummary
            ingredients={props.ings}
            price={props.price}
            purchaseCancelled={purchaseCancleHandler}
            purchaseContinued={purchaseContinueHandler} />;
    }
    return (
        <div>
            <Modal show={purchasing} modalClosed={purchaseCancleHandler}>
                {orderSummary}
            </Modal>
            {burger} 
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.error, 
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredient()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuidler, Axios));