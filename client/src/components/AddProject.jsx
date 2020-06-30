import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router";
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import Button from './button/Button'

function AddProject() {
    const [userState, setUserState] = useState({})
    const [formState, setFormState] = useState({
        title: '',
        date: ''
    });
    const [errorState, setErrorState] = useState('');
    // const [refreshState, setRefreshState] = useState(false);
    console.log('local',localStorage.getItem('user_id'));
    useEffect(() => {
        if (localStorage.getItem('user_id') === null) {
            navigate('/');
        } else {
        axios.get(`http://localhost:8000/readOne/5ef3c660bce44114b7fbaed6`)
        // 5efa3c32c32652053c485889
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
        axios.patch(`http://localhost:8000/updateOne/5ef3c660bce44114b7fbaed6`, temp)
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
        <div style={styles.container}>
            <h2>Write a user story</h2>
            <form onSubmit={onSubmitHandler}>
                <input style={styles.input} type="text" placeholder="Add a description..." name="title" onChange={onChangeHandler} />
                {errorState.project !== '' ? <p>{errorState.project}</p> : null}
                <input style={styles.input} classname='test' type="date" name="date" onChange={onChangeHandler} />
                {errorState.date !== '' ? <p>{errorState.date}</p> : null}
                <Button type="submit" border="2px solid white" backgroundColor="transparent" title={<AddIcon />} ></Button>
            </form>
        </div>
    )
}

export default AddProject;

const styles = {
    container: {
        background: 'linear-gradient(162deg, rgba(249,187,148,1) 0%, rgba(231,113,125,1) 54%, rgba(171,85,120,1) 84%)',
        padding: '200px 0px 50px 0px',
        height: '90vh',
    },
    title: {
        color: '#FFF'
    },
    input: {
        width: '250px',
        border: 'transparent',
        height: '40px',
        borderRadius: '10px',
    }
}