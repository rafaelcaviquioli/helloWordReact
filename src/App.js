import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';

import AutorBox from './components/Autor';

class App extends Component {


    render() {

        return (
            <html lang="en">
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="description" content="A layout example with a side menu that hides on mobile, just like the Pure website." />
                    <title>React - Alura</title>
                </head>
                <body>
                    <div id="layout">
                        <a href="#menu" id="menuLink" className="menu-link">
                            <span></span>
                        </a>
                        <div id="menu">
                            <div className="pure-menu">
                                <a className="pure-menu-heading" href="#">React</a>

                                <ul className="pure-menu-list">
                                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autores</a></li>
                                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livros</a></li>
                                </ul>
                            </div>
                        </div>
                        <div id="main">
                            <div className="header">
                                <h1>Autor</h1>
                                <h2>Cadastro de autores</h2>
                            </div>

                            <div className="content">

                                <AutorBox />

                            </div>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}

export default App;
