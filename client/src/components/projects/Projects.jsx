import React, { useEffect, useState } from 'react';
import './projects.css'
import Columns from './Columns'
import axios from 'axios';

const Projects = () => {
    const [user, setUser] = useState({})
    const [refreshState, setRefreshState] = useState(false)
    const user_id = localStorage.getItem('user_id');
    // const allProjects = [];
    // const moreProjects = [];
    // console.log(moreProjects);


    useEffect(() => {
        axios.get(`http://localhost:8000/readOne/${user_id}`)
            .then(res => setUser(res.data))
            .catch(err => console.log(err))
    }, [refreshState])

    console.log("usersprojects ", user)
    console.log("user_id", user_id)
    // projects.forEach((test) => {
    //     allProjects.push(test.projects)
    // })

    // for (let i = 0; i < allProjects.length; i++) {
    //     for (let j = 0; j < allProjects[i].length; j++) {
    //         moreProjects.push(allProjects[i][j])
    //     }
    // }

    const onProgressHandler = (e, item) => {
        let temp = { ...user };
        if (item._id) {
            for (let i = 0; i < temp.projects.length; i++) {
                if (temp.projects[i]._id == item._id) {
                    temp.projects[i].position = [false, true, false]
                    break;
                }
            }
        }
        axios.patch(`http://localhost:8000/updateOne/${user_id}`, temp)
            .then(() => setRefreshState(!refreshState))
            .catch(err => console.log(err))
    }

    const onCompleteHandler = (e, item) => {
        let temp = { ...user };
        if (item._id) {
            for (let i = 0; i < temp.projects.length; i++) {
                if (temp.projects[i]._id == item._id) {
                    temp.projects[i].position = [false, false, true]
                    break;
                }
            }
        }
        axios.patch(`http://localhost:8000/updateOne/${user_id}`, temp)
            .then(() => setRefreshState(!refreshState))
            .catch(err => console.log(err))
    }

    const onDeleteHandler = (e, item) => {
        let temp = { ...user };
        if (item._id) {
            for (let i = 0; i < temp.projects.length; i++) {
                if (temp.projects[i]._id == item._id) {
                    temp.projects[i].position = [false, false, false]
                    break;
                }
            }
        }
        axios.patch(`http://localhost:8000/updateOne/${user_id}`, temp)
            .then(() => setRefreshState(!refreshState))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Columns title="Open" color="#E7717D"
                position1={<tbody >
                    {user.projects ? user.projects.map((item, index) => (
                        item.position[0] === true ?
                            <tr key={index}>
                                <td>
                                    <p>{item.title}</p><br /><p>Due: {item.date.substring(0, 10)}</p><br />
                                    <button onClick={(e) => onProgressHandler(e, item)}>To Progress</button>
                                </td>
                            </tr>
                            : null
                    )) : null}
                </tbody>}
            />
            <Columns title="In Progress" color="#AB5578"
                position2={<tbody >
                    {user.projects ? user.projects.map((item, index) => (
                        item.position[1] === true ?
                            <tr key={index}>
                                <td>
                                    <p>{item.title}</p><br /><p>Due: {item.date.substring(0, 10)}</p><br />
                                    <button onClick={(e) => onCompleteHandler(e, item)}>To Complete</button>
                                </td>
                            </tr>
                            : null
                    )) : null}
                </tbody>}
            />
            <Columns title="Complete" color="#AFD275"
                position3={<tbody >
                    {user.projects ? user.projects.map((item, index) => (
                        item.position[2] === true ?
                            <tr key={index}>
                                <td>
                                    <p>{item.title}</p><br /><p>Due: {item.date.substring(0, 10)}</p><br />
                                    <button onClick={(e) => onDeleteHandler(e, item)}>To Delete</button>
                                </td>
                            </tr>
                            : null
                    )) : null}
                </tbody>}
            />
        </div>

    )
}

export default Projects;
