import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

    state = {
        users: [],
        username: ''
    }

    async componentDidMount() {
        this.getUsers()
    }
    
    getUsers = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASIC_URL_USERS}`)
        this.setState({ users: response.data })
    }

    onChangeUserame = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    onSubmitUsername = async (event) => {
        event.preventDefault()
        await axios.post(
            `${process.env.REACT_APP_BASIC_URL_USERS}`,
            { username: this.state.username }
        )
        this.setState({ username: '' })
        this.getUsers()
    }

    deleteUser = async (id) => {
        await axios.delete(`${process.env.REACT_APP_BASIC_URL_USERS}/${id}`)
        this.getUsers()
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create a new user</h3>
                        <form onSubmit={ this.onSubmitUsername }>
                            <div className="form-group">
                                <input
                                    onChange={ this.onChangeUserame }
                                    value={ this.state.username }
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(user => (
                                <li
                                    key={ user._id }
                                    onDoubleClick={ () => this.deleteUser(user._id) }
                                    className="list-group-item list-group-item-action"
                                >
                                    { user.username }
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
