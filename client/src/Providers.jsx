import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Providers (){
    const [providers, setProviders] = useState([{}])
    
    useEffect(() => {
        axios.get('http://localhost:3001')
        .then(result => setProviders(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteProvider/' + id)
        .then(res => {console.log(res)
            window.location.reload()})
        .catch(err => console.log(err))
    }
    return(
        <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
            <div className="w=50 bg-white rounded p-3">
                <Link to="/create" className="btn btn-success">Add Provider</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Country</th>
                            <th>Market share %</th>
                            <th>Renewble energy %</th>
                            <th>Yearly revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            providers.map((provider) => {
                                return <tr>
                                    <td>{provider.name}</td>
                                    <td>{provider.country}</td>
                                    <td>{provider.marketshare}</td>
                                    <td>{provider.renewbleenergypercentage}</td>
                                    <td>{provider.yearlyrevenue}</td>
                                    <td>
                                        <Link to={ `/update/${provider._id}` } className="btn btn-success" >Edit</Link>{" "}
                                        <button className="btn btn-danger" onClick={(e) => handleDelete(provider._id)}>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Providers;