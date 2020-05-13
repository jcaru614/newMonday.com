import React, { useState } from 'react';
import { Link, navigate} from "@reach/router";
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';

function NewProject() {
    const [formState, setFormState] = useState({
        project: '',
        date: ''
    })

    const [errorState, setErrorState] = useState([])

    const onChangeHandler = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/create', formState)
        .then(res => {
            if (res.data.errors) {
                setErrorState({
                    project: res.data.errors.project ? res.data.errors.project.message : '',
                    date: res.data.errors.date ? res.data.errors.date.message : ''
                })

            } else {
                console.log("created project");
                navigate('/position')
            }
        })
        .catch(err => {
            console.log(err);
        })
    }


    return(
        <div>
        <h1>Project Manager</h1>
        <button className="submit"><Link to="position">Dash<DashboardIcon/></Link></button>
        <h2>Plan a new Project</h2>
        <form onSubmit={onSubmitHandler}>
            <label>Project</label>
            <input type="text" name="project" onChange={onChangeHandler} />
            {errorState.project !== '' ? <p>{errorState.project}</p> : null}
            <label>Due Date</label>
            <input type="date" name="date" onChange={onChangeHandler} />
            {errorState.date !== '' ? <p>{errorState.date}</p> : null}
            <button className="submit" type="submit">Plan Project <AddIcon /></button>
        </form>

        </div>
    )
}

export default NewProject;