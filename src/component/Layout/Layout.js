import React, { useState } from 'react';
import { connect } from 'react-redux';

import Auxilary from '../../hoc/Auxilary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

const Layout = props => {

    const [sideDrawerIsVisible, setsideDrawerIsVisible] = useState(false);

    const sideDrawerhandler = () => {
        setsideDrawerIsVisible(false);
    }
    const sideDrawerTogglehandler = () => {
        setsideDrawerIsVisible(!sideDrawerIsVisible);
    }

    return (
        <Auxilary>
            <Toolbar
                isAuth={props.isAuthenticated} 
                toggleClicked={sideDrawerTogglehandler} />
            <Sidedrawer
                isAuth={props.isAuthenticated} 
                open={sideDrawerIsVisible} 
                closed={sideDrawerhandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxilary>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);