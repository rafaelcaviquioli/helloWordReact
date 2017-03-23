import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class InputCuston extends Component {
    constructor() {
        super();
        this.state = { erro: '' };
    }
    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input {...this.props} />
                <span className="error">{this.state.erro}</span>
            </div>
        )
    }
    componentDidMount() {
        PubSub.subscribe('erros-validacao', function (topico, erros) {
            for (var i = 0; i < erros.length; i++) {
                if(erros[i].field === this.props.name){
                    this.setState({erro : erros[i].defaultMessage});
                }
            }            
        }.bind(this));

        PubSub.subscribe("limpa-erros",function(topico){                        
            this.setState({erro:''});                        
        }.bind(this)); 
    }
}