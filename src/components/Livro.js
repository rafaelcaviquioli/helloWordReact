import React, { Component } from 'react';
import $ from 'jquery';
import InputCuston from './InputCuston';
import PubSub from 'pubsub-js';
import TratadorErros from '../TratadorErros';

class FormularioLivro extends Component {
    constructor() {
        super();

        this.state = {
            titulo: '',
            preco: '',
            autorId: '',
            autores: []
        };
        this.enviaForm = this.enviaForm.bind(this);
    }
    componentDidMount() {
        $.ajax({
            url: "http://localhost:8080/api/autores",
            dataType: 'json',
            success: function (resposta) {
                this.setState({ autores: resposta });
            }.bind(this)
        });
    }
    setValue(name, event){
        this.setState({[name] : event.target.value});
    }
    enviaForm(event) {
        var data = { titulo: this.state.titulo, preco: this.state.preco, autorId: this.state.autorId };
        $.ajax({
            url: "http://localhost:8080/api/livros",
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (resposta) {
                PubSub.publish('atualiza-tabela-livro', resposta);

                this.setState({
                    titulo: '',
                    preco: ''
                });
            }.bind(this),
            error: function (response) {
                if (response.status === 400) {
                    new TratadorErros().tratarErros(response.responseJSON);
                } else {
                    console.log('Erro');
                }
            },
            beforeSend() {
                PubSub.publish('limpa-erros');
            }
        });

        event.preventDefault();
    }
    render() {
        return (
            <div className="content">
                <div className="header">
                    <h2>Cadastro de Livros</h2>
                </div>
                <div className="pure-form pure-form-aligned">

                    <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)}>
                        <InputCuston name="titulo" type="text" value={this.state.titulo} onChange={this.setValue.bind(this, 'titulo')} label="Título" />
                        <InputCuston name="preco" type="text" value={this.state.preco} onChange={this.setValue.bind(this, 'preco')} label="Preço" />

                        <div className="pure-control-group">
                            <label htmlFor="autor">Autor</label>
                            <select name="autor" id="autor" onChange={this.setValue.bind(this, 'autorId')}>
                                <option value="">Selecione o autor</option>
                                {
                                    this.state.autores.map(function (autor) {
                                        return (
                                            <option value={autor.id}>{autor.nome}</option>
                                        )
                                    })
                                }
                            </select>
                            <span className="error"></span>
                        </div>

                        <div className="pure-control-group">
                            <label></label>
                            <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                        </div>
                    </form>
                </div>
            </div>);
    }
}
class TabelaAutor extends Component {
    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Preço</th>
                            <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(function (livro) {
                                return (
                                    <tr key={livro.id}>
                                        <td>{livro.titulo}</td>
                                        <td>{livro.preco}</td>
                                        <td>{livro.autor.nome}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>);
    }
}
export default class LivroBox extends Component {
    constructor() {
        super();

        this.state = {
            lista: []
        };
    }
    componentDidMount() {
        $.ajax({
            url: "http://localhost:8080/api/livros",
            dataType: 'json',
            success: function (resposta) {
                this.setState({ lista: resposta });
            }.bind(this)
        });

        PubSub.subscribe('atualiza-tabela-livro', function (mensagem, resposta) {
            this.setState({ lista: resposta });
        }.bind(this));
    }

    render() {
        return (
            <div>
                <FormularioLivro />
                <TabelaAutor lista={this.state.lista} />
            </div>
        );
    }
}