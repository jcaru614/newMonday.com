import React, { useEffect, useState } from 'react'
import { Link } from "@reach/router";
import AddIcon from '@material-ui/icons/Add';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import axios from 'axios';

function Position() {
    const [projects, setProjects] = useState([])
    const [refreshState, setRefreshState] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8000/readAll')
            .then(res => setProjects([...res.data]))
            .catch(err => console.log(err))
    }, [refreshState])

    const onProgressHandler = (e, item) => {
        axios.put(`http://localhost:8000/updateOne/${item._id}`, { 'position': [false, true, false] })
            .then(() => setRefreshState(!refreshState))
            .catch(err => console.log(err))
    }

    const onCompleteHandler = (e, item) => {
        axios.put(`http://localhost:8000/updateOne/${item._id}`, { 'position': [false, false, true] })
            .then(() => setRefreshState(!refreshState))
            .catch(err => console.log(err))
    }

    const onDeleteHandler = (item) => {
        axios.delete(`http://localhost:8000/deleteOne/${item._id}`)
            .then(() => setRefreshState(!refreshState))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h1>Project Manager</h1>
            <table>
                <thead>
                    <tr>
                        <th className="th1">Backlog</th>
                    </tr>
                </thead>
                <tbody >
                    {projects.map((item, index) => (
                        item.position[0] === true ?
                            <tr key={index}>
                                <td>
                                    <h2>{item.project}</h2><br /><h3>Due: {item.date.substring(0, 10)}</h3><br />
                                    <button className="projbtn1" onClick={(e) => onProgressHandler(e, item)}><ArrowRightAltIcon /></button>
                                </td>
                            </tr>
                            : null
                    ))}

                </tbody>

            </table>
            <table>
                <thead>
                    <tr>
                        <th className="th2">In Progress</th>
                    </tr>
                </thead>
                <tbody >
                    {projects.map((item, index) => (
                        item.position[1] === true ?
                            <tr key={index}>
                                <td>
                                    <h2>{item.project}</h2><br /><h3>Due: {item.date.substring(0, 10)}</h3><br />
                                    <button className="projbtn2" onClick={(e) => onCompleteHandler(e, item)}><ArrowRightAltIcon /></button>
                                </td>
                            </tr>
                            : null
                    ))}

                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th className="th3">Completed</th>
                    </tr>
                </thead>
                <tbody >
                    {projects.map((item, index) => (
                        item.position[2] === true ?
                            <tr key={index}>
                                <td>
                                    <h2>{item.project}</h2><br /><h3>Due: {item.date.substring(0, 10)}</h3><br />
                                    <button className="projbtn3" onClick={() => onDeleteHandler(item)}><ArrowRightAltIcon /></button>
                                </td>
                            </tr>
                            : null
                    ))}

                </tbody>
            </table>
            <Link to="/"><button className="addproj"><AddIcon /></button></Link>
        </div>

    )
}

export default Position;
