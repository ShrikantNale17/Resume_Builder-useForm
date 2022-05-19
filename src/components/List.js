import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { v4 as uuidv4 } from 'uuid';

function List() {
    const navigate = useNavigate();
    const [data, setData] = useState(localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [])

    const handleDelete = (index) => {
        const confirm = window.confirm('Are you sure');
        if (confirm) {
            const localdata = JSON.parse(localStorage.getItem('data'))
            const update = localdata.filter((itm, ind) => ind !== index)
            localStorage.setItem('data', JSON.stringify(update))
            setData(update)
        }
    }

    return (
        <div className="container my-4">
            <main>
                <div className="py-5">
                    <h2>
                        Candidates List
                        <Link to="/add" className="btn btn-primary float-end">Add Candidate</Link>
                    </h2>
                </div>

                <div className="row">
                    <div className="col-12 ms-auto me-auto">
                        <div className="card">
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Number of Skills</th>
                                            <th>Total Work Experience (in months)</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((formdata, index) => {
                                                const duration = formdata.prof_info.experience.map((exp) => exp.duration)

                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{formdata.firstname + " " + formdata.lastname}</td>
                                                        <td>{formdata.email}</td>
                                                        <td>{formdata.prof_info.skills.length}</td>
                                                        <td>{duration.reduce((month, value) => month + value)}</td>
                                                        <td>
                                                            <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/edit', { state: { data: formdata, index: index } })}>Edit</span>
                                                            <span style={{ cursor: 'pointer' }} className="text-danger ms-2" onClick={() => handleDelete(index)}>Delete</span>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                            )
                                        }
                                    </tbody>
                                    {/* <tr>
                                        <td>1</td>
                                        <td>Abhijit Borade</td>
                                        <td>abhijit@angularminds.com</td>
                                        <td>5</td>
                                        <td>60</td>
                                        <td>
                                            <span>Edit</span>
                                            <span className="text-danger ms-2">Delete</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Abhijit Borade</td>
                                        <td>abhijit@angularminds.com</td>
                                        <td>5</td>
                                        <td>60</td>
                                        <td>
                                            <span>Edit</span>
                                            <span className="text-danger ms-2">Delete</span>
                                        </td>
                                    </tr> */}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default List