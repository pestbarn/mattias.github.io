import React from 'react';
import { Main } from '../containers/';
let dialogPolyfill = require('dialog-polyfill');

class Contact extends React.Component {
    componentDidMount() {
        let dialog = document.querySelector('dialog'),
            showDialogButton = document.querySelector('.show-dialog');

        dialogPolyfill.registerDialog(dialog);

        showDialogButton.addEventListener('click', () => {
            dialog.showModal();
        });

        dialog.querySelector('.dialog-close').addEventListener('click', () => {
            dialog.close();
        });
    }

    render() {
        return (
            <Main locator={true}>
                <div>
                    <p>
                        <strong>Skills:</strong>
                        <span className="primary">CSS</span>
                        <span>PostCSS</span>
                        <span>SCSS</span>
                        <span className="primary">JS</span>
                        <span>ES6</span>
                        <span>React</span>
                        <span>jQuery</span>
                        <span className="primary">HTML5</span>
                        <span className="primary">Adobe CS</span>
                        <span>UX</span>
                        <span>Git</span>
                        <span>Bash</span>
                        <span>Gulp</span>
                        <span>Grunt</span>
                        <span>JSON</span>
                        <span>Haml</span>
                        <span>Jinja2</span>
                        <span>Wordpress</span>
                        <span>Agile</span>
                    </p>
                    <p>
                        <a href="https://github.com/pestbarn/pestbarn.github.io">View source</a>
                    </p>
                    <p className="show-dialog">hello@mattias.pw</p>
                </div>
            </Main>
        );
    }
}

export default Contact;