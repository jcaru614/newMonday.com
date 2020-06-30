import React, { useEffect, useState } from 'react';
import './projects.css'
import Columns from './Columns'
import axios from 'axios';

const Projects = () => {
    const [usersProjects, setUsersProjects] = useState([])
    console.log("usersprojects ", usersProjects)
    const [refreshState, setRefreshState] = useState(false)
    // const allProjects = [];
    // const moreProjects = [];
    // console.log(moreProjects);


    useEffect(() => {
        axios.get('http://localhost:8000/readOne/5ef3c660bce44114b7fbaed6')
            .then(res => setUsersProjects(res.data.projects))
            .catch(err => console.log(err))
    }, [refreshState])

    // projects.forEach((test) => {
    //     allProjects.push(test.projects)
    // })

    // for (let i = 0; i < allProjects.length; i++) {
    //     for (let j = 0; j < allProjects[i].length; j++) {
    //         moreProjects.push(allProjects[i][j])
    //     }
    // }

    const onProgressHandler = (e, item) => {
        console.log("our item", item);
        axios.patch(`http://localhost:8000/updateOne/${item._id}`, { 'position': [false, true, false] })
            .then(() => setRefreshState(!refreshState))
            .catch(err => console.log(err))
    }

    const onCompleteHandler = (e, item) => {
        axios.patch(`http://localhost:8000/updateOne/${item._id}`, { 'position': [false, false, true] })
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
            <Columns title="Open" color="#E7717D"
                position1={<tbody >
                    {usersProjects.map((item, index) => (
                        item.position[0] === true ?
                            <tr key={index}>
                                <td>
                                    <p>{item.title}</p><br /><p>Due: {item.date.substring(0, 10)}</p><br />
                                    <button onClick={(e) => onProgressHandler(e, item)}>To Progress</button>
                                </td>
                            </tr>
                            : null
                    ))}
                </tbody>}
            />
            <Columns title="In Progress" color="#AB5578"
            position2={<tbody >
                {usersProjects.map((item, index) => (
                    item.position[1] === true ?
                        <tr key={index}>
                            <td>
                                <p>{item.title}</p><br /><p>Due: {item.date.substring(0, 10)}</p><br />
                                <button onClick={(e) => onCompleteHandler(e, item)}>To Complete</button>
                            </td>
                        </tr>
                        : null
                ))}
            </tbody>}
            />
            <Columns title="Complete" color="#AFD275"
            position3={<tbody >
                {usersProjects.map((item, index) => (
                    item.position[2] === true ?
                        <tr key={index}>
                            <td>
                                <p>{item.title}</p><br /><p>Due: {item.date.substring(0, 10)}</p><br />
                                <button onClick={(e) => onDeleteHandler(e, item)}>To Delete</button>
                            </td>
                        </tr>
                        : null
                ))}
            </tbody>}
            />
        </div>

    )
}

export default Projects;
