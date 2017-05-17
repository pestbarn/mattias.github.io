import React from 'react';
import { Locator } from '../components/';

const ContactContainer = props => {
    return (
        <dialog className={props.className} style={props.style}>
            {props.children}
        </dialog>
    );
};

const Experience = props => {
    return (
        <section>
            {props.children}
        </section>
    );
};

const Header = props => {
    return (
        <header>
            {props.children}
            {props.locator === true && <Locator />}
        </header>
    );
};

const Main = props => {
    return (
        <main>
            {props.children}
            {props.locator === true && <Locator />}
        </main>
    );
};

export { ContactContainer, Experience, Header, Main };