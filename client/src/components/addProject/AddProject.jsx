import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router";
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import Button from '../button/Button'
import "./addProject.css";

function AddProject() {
    const [userState, setUserState] = useState({})
    const [formState, setFormState] = useState({
        title: '',
        date: '',
        description: '',
        image: ''
    });
    const [errorState, setErrorState] = useState('');
    const [refreshState, setRefreshState] = useState(false);
    const user_id = localStorage.getItem('user_id');
    console.log('locals', localStorage)

    useEffect(() => {
        if (user_id === null) {
            navigate('/');
        } else {
            axios.get(`http://localhost:8000/readOne/${user_id}`)
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
    }, [refreshState])

    console.log('userState', userState)
    const onChangeHandler = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let temp = { ...userState };
        console.log('temptemp', temp);
        temp.projects.unshift(formState)
        axios.patch(`http://localhost:8000/updateOne/${user_id}`, temp)
            .then(res => {
                if (res.data.errors) {
                    setErrorState({
                        title: res.data.errors.title ? res.data.errors.title.message : '',
                        date: res.data.errors.date ? res.data.errors.date.message : ''
                    })

                } else {
                    setRefreshState(!refreshState)
                    console.log("created project");
                    navigate('/position')
                }
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div className="background">
            <h2>Write a user story</h2>
            <form onSubmit={onSubmitHandler}>
                <input className="input" placeholder="Add a title" name="title" onChange={onChangeHandler} />
                {errorState.project !== '' ? <p>{errorState.project}</p> : null}
                <input className="input" type="date" name="date" onChange={onChangeHandler} />
                {errorState.date !== '' ? <p>{errorState.date}</p> : null}
                <textarea className="description" placeholder="Add a description" name="description" onChange={onChangeHandler} ></textarea>
                {errorState.date !== '' ? <p>{errorState.date}</p> : null}
                <input className="input" type="url" placeholder="Add an optional image" name="image" onChange={onChangeHandler} />
                {errorState.date !== '' ? <p>{errorState.date}</p> : null}
                <Button type="submit" border="2px solid white" backgroundColor="transparent" title={<AddIcon />} ></Button>
            </form>
        </div>
    )
}

export default AddProject;
