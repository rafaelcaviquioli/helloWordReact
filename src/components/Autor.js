import React, { Component } from 'react';
import $ from 'jquery';
import InputCuston from './InputCuston';
import PubSub from 'pubsub-js';

class FormularioAutor extends Component {
    constructor() {
        super();

        this.state = {
            nome: '',
            email: '',
            senha: ''
        };

        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }
    setNome(event) {
        this.setState({ nome: event.target.value });
    }
    setEmail(event) {
        this.setState({ email: event.target.value });
    }
    setSenha(event) {
        this.setState({ senha: event.target.value });
    }

    enviaForm(event) {
        var data = { nome: this.state.nome, email: this.state.email, senha: this.state.senha };
        $.ajax({
            url: "http://localhost:8080/api/autores",
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (resposta) {
                PubSub.publish('atualiza-tabela-autor', resposta);
            },
            error: function (response) {
                console.log('Erro ao salvar');
            }
        });

        event.preventDefault();
    }
    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)}>
                    <InputCuston name="nome" type="text" value={this.state.nome} onChange={this.setNome} label="Nome" />
                    <InputCuston name="email" type="email" value={this.state.email} onChange={this.setEmail} label="Email" />
                    <InputCuston name="senha" type="password" value={this.state.senha} onChange={this.setSenha} label="Senha" />

                    <div className="pure-control-group">
                        <label></label>
                        <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                    </div>
                </form>

            </div>
        )
    }
}

class TabelaAutor extends Component {

    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(function (autor) {
                                return (
                                    <tr key={autor.id}>
                                        <td>{autor.nome}</td>
                                        <td>{autor.email}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default class AutorBox extends Component {
    constructor(){
        super();

        this.state = {
            lista : []
        };
    }
    componentDidMount() {
        $.ajax({
            url: "http://localhost:8080/api/autores",
            dataType: 'json',
            success: function (resposta) {
                this.setState({ lista: resposta });
            }.bind(this)
        });

        PubSub.subscribe('atualiza-tabela-autor', function(mensagem, resposta){
            this.setState({ lista: resposta });
        }.bind(this));
    }
    
    render(){
        return (
            <div>
                <FormularioAutor />
                <TabelaAutor lista={this.state.lista} />
            </div>
        );
    }
}