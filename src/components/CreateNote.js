import React, { Component } from 'react'
import axios from 'axios'

export default class CreateNote extends Component {

    state = {
        users: [],
        author: '',
        title: '',
        content: '',
        id: ''
    }

    async componentDidMount() {
        this.setState({ id: this.props.match.params.id }, () => this.getUsers())
    }

    getUsers = async () => {
        if (this.state.id) {
            const response = await axios.get(`${process.env.REACT_APP_BASIC_URL_NOTES}/${this.state.id}`)
            this.setState({
                author: response.data.author,
                title: response.data.title,
                content: response.data.content,
                users: [{
                    username: response.data.author,
                    title: response.data.title,
                    content: response.data.content
                }]
            })
        } else {
            const response = await axios.get(`${process.env.REACT_APP_BASIC_URL_USERS}`)
            this.setState({
                users: response.data,
                author: response.data[0].username
            })
        }
    }

    onChangeForm = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmitNote = async (event) => {
        event.preventDefault()
        const newNote = {
            author: this.state.author,
            title: this.state.title,
            content: this.state.content
        }
        if (this.props.match.params.id) {
            const id = this.props.match.params.id
            await axios.put(`${process.env.REACT_APP_BASIC_URL_NOTES}/${id}`, newNote)
        } else {
            await axios.post(`${process.env.REACT_APP_BASIC_URL_NOTES}`, newNote)
        }
        this.setState({
            author: '',
            title: '',
            content: ''
        })
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create a note</h4>
                    <form onSubmit={ this.onSubmitNote }>
                        <div className="form-group">
                            <select
                                onChange={ this.onChangeForm }
                                name="author"
                                value={ this.state.author }
                                className="form-control"
                            >
                                {
                                    this.state.users.map(user => (
                                        <option key={ user._id } value={ user.username }>
                                            { user.username }
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <input
                                onChange={ this.onChangeForm }
                                name="title"
                                value={ this.state.title }
                                placeholder="Title"
                                type="text"
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                onChange={ this.onChangeForm }
                                name="content"
                                value={ this.state.content }
                                placeholder="Content"
                                required
                                className="form-control"
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        )
    }
}
