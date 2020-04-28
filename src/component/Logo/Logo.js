import React from 'react';

import burgerLogo from '../../assets/images/Burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (   
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="Burgerlogo" />
    </div>
);

export default logo;