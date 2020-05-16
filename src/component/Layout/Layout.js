import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxilary from '../../hoc/Auxilary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }
    sideDrawerhandler = () => {
        this.setState({showSideDrawer: false});
    }
    sideDrawerTogglehandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render () {
        return (
            <Auxilary>
                <Toolbar
                    isAuth={this.props.isAuthenticated} 
                    toggleClicked={this.sideDrawerTogglehandler} />
                <Sidedrawer
                    isAuth={this.props.isAuthenticated} 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerhandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxilary>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);