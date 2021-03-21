import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class NotesList extends Component {

    state = {
        users: [],
        notes: []
    }

    async componentDidMount() {
        this.getNotes()
    }

    getNotes = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASIC_URL_NOTES}`)
        this.setState({ notes: response.data })
    }

    deleteNote = async (id) => {
        await axios.delete(`${process.env.REACT_APP_BASIC_URL_NOTES}/${id}`)
        this.getNotes()
    }

    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(note => (
                        <div key={ note._id } className="col-md-4 p-2">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{ note.title }</h5>
                                    <Link className="btn btn-secondary" to={ `/edit/${note._id}` }>
                                        Edit
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p>{ note.content }</p>
                                    <p>{ note.author }</p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={ () => this.deleteNote(note._id) }>
                                        delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
