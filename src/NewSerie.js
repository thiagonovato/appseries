import React, { Component } from 'react'
import api from './Api'
import { Redirect } from 'react-router-dom'

const status = {
    'watched': 'Assistido',
    'watching': 'Assistindo',
    'toWatch': 'Assistir'
}

export default class NewSerie extends Component {

    constructor(props) {
        super(props)

        this.state = {
            genres: [],
            isLoading: false,
            redirect: false
        }

        this.saveSeries = this.saveSeries.bind(this)
        
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        api.loadGenres()
            .then((res) => {
                this.setState({
                    isLoading: false,
                    genres: res.data
                })
            })
    }

    saveSeries() {
        const newSeries = {
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            comments: this.refs.comments.value
        }
        api.saveSeries(newSeries).then((res) => {
            this.setState({
                redirect: '/series/' + this.refs.genre.value
            })
        })
    }

    render() {
        return (
            <section className="intro-section">
            {
                this.state.redirect && <Redirect to={this.state.redirect}></Redirect>
            }
                <h1>Nova Série</h1>
                <form>
                    Nome: <input type="text" ref='name' className="form-control" /><br />
                    Status:
                    <select ref='status'>
                        {
                            Object.keys(status)
                                .map(key => <option key={key} value={key}>{status[key]}</option>)
                        }
                    </select><br />
                    Gênero:
                    <select ref='genre'>
                        {this.state.genres.map(key => <option key={key} value={key}>{key}</option>)}
                    </select><br />
                    Comentários: <textarea type="text" ref='comments' className="form-control" /><br />
                    <button type='button' onClick={this.saveSeries}>Salvar</button>
                </form>
            </section>
        )
    }
}