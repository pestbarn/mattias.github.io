import React from 'react';
import Locator from './Locator';

const Header = props => {
    return (
        <header>
            {props.children}
            <Locator />
        </header>
    );
};

export default Header;
