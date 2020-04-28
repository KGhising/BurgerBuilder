import React, { Component } from 'react';

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
                <Toolbar toggleClicked={this.sideDrawerTogglehandler} />
                <Sidedrawer open={this.state.showSideDrawer} closed={this.sideDrawerhandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxilary>
        )
    }
}

export default Layout;