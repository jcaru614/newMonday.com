import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router";
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import Navbar from './Navbar'

function NewProject() {
    const [userState, setUserState] = useState({})
    const [formState, setFormState] = useState({
        title: '',
        date: ''
    });
    const [errorState, setErrorState] = useState('');
    // const [refreshState, setRefreshState] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('user_id') === null) {
            navigate('/');
        } else {
        axios.get(`http://localhost:8000/readOne/${localStorage.getItem('user_id')}`)
            .then(res => {
                console.log('projects', res);
                setUserState(res.data);
            })
            .catch(err => {
                console.log(err);
                setUserState({});
                setErrorState("Please login to dislay data");
            })
        }
    }, [])

    const onChangeHandler = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let temp = { ...userState };
        console.log('temptemp', temp);
        temp.projects.unshift(formState)
        axios.patch(`http://localhost:8000/updateOne/${localStorage.getItem('user_id')}`, temp)
            .then(res => {
                if (res.data.errors) {
                    setErrorState({
                        title: res.data.errors.title ? res.data.errors.title.message : '',
                        date: res.data.errors.date ? res.data.errors.date.message : ''
                    })

                } else {
                    console.log("created project");
                    navigate('/addProject')
                }
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div>
            <Navbar />
            <h1>Gira</h1>
            <h2>Write a user story</h2>
            <form onSubmit={onSubmitHandler}>
                <label>Project</label>
                <input type="text" name="title" onChange={onChangeHandler} />
                {errorState.project !== '' ? <p>{errorState.project}</p> : null}
                <label>Due Date</label>
                <input type="date" name="date" onChange={onChangeHandler} />
                {errorState.date !== '' ? <p>{errorState.date}</p> : null}
                <button className="submit" type="submit"><AddIcon /></button>
            </form>
        </div>
    )
}

export default NewProject;