import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import {Link} from 'react-router';
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
                                    <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Home</Link></li>
                                    <li className="pure-menu-item"><Link to="/autor" className="pure-menu-link">Autores</Link></li>
                                    <li className="pure-menu-item"><Link to="/livro" className="pure-menu-link">Livros</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div id="main">
                            {this.props.children}
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}

export default App;
