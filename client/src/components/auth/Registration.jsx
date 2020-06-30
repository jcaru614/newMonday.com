import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import Button from '../button/Button';

function Registration(props) {

    const [registerState, setRegisterState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [errorState, setErrorState] = useState([])

    const onChangeHandler = (e) => {
        setRegisterState({
            ...registerState, [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/create', registerState)
            .then(res => {
                if (res.data.errors) {
                    setErrorState({
                        firstName: res.data.errors.firstName ? res.data.errors.firstName.message : '',
                        lastName: res.data.errors.lastName ? res.data.errors.lastName.message : '',
                        email: res.data.errors.email ? res.data.errors.email.message : '',
                        password: res.data.errors.password ? res.data.errors.password.message : '',
                        confirmPassword: res.data.errors.confirmPassword ? res.data.errors.confirmPassword.message : '',
                    })
                } else if (res.data.msg === "Email already exists") {
                    console.log(res.data.msg)
                    setErrorState({
                        email: 'A user with this email is already register.',
                    })
                } else {
                    localStorage.setItem('user_id', res.data._id)
                    console.log('herhehere', res)
                    console.log(localStorage.getItem('user_id'));
                    console.log('registration Succsesful');
                    navigate('/addProject')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Register to start:</h2>
            <form onSubmit={onSubmitHandler}>
                {errorState.firstName !== '' ? <p className='errors'>{errorState.firstName}</p> : null}
                <input type='text' name='firstName' value={registerState.firstName} onChange={onChangeHandler} placeholder='First Name' style={styles.input} />
                {errorState.lastName !== '' ? <p className='errors'>{errorState.lastName}</p> : null}
                <input type='text' name='lastName' value={registerState.lastName} onChange={onChangeHandler} placeholder='Last Name' style={styles.input} />
                {errorState.email !== '' ? <p className='errors'>{errorState.email}</p> : null}
                <input type='email' name='email' value={registerState.email} onChange={onChangeHandler} placeholder='Email' style={styles.input} />
                {errorState.password !== '' ? <p className='errors'>{errorState.password}</p> : null}
                <input type='password' name='password' value={registerState.password} onChange={onChangeHandler} placeholder='Password' style={styles.input} />
                {errorState.confirmPassword !== '' ? <p className='errors'>{errorState.confirmPassword}</p> : null}
                <input type='password' name='confirmPassword' value={registerState.confirmPassword} onChange={onChangeHandler} placeholder='Confirm Password' style={styles.input} />
                <Button type='submit' title="Register" color='#FFF' backgroundColor='transparent' border="2px solid #FFF" />
            </form>
        </div>
    )
}

export default Registration;

const styles = {
    container: {
        background: 'linear-gradient(162deg, rgba(249,187,148,1) 0%, rgba(231,113,125,1) 54%, rgba(171,85,120,1) 84%)',
        padding: '100px 0px 50px 0px',
        // height: '100vh',
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
