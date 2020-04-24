import React from 'react';

import Auxilary from '../../hoc/Auxilary';
import classes from './Layout.module.css';

const layout = (props) => (
    <Auxilary>
        <div>Toolebar, SlideBar, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Auxilary>
);

export default layout;