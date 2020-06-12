import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

function UserLogin(props) {
    const [loginState, setLoginState] = useState({
        email: '',
        password: '',
    });

    const [errorState, setErrorState] = useState([])

    const onChangeHandler = (e) => {
        setLoginState({
            ...loginState,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/login', loginState)
            .then(res => {
                // console.log('is this one?',res);
                if (res.data.errors) {
                    setErrorState({
                        email: res.data.errors.email ? res.data.errors.email.message : '',
                        password: res.data.errors.password ? res.data.errors.password.message : '',
                    })
                } else if (res.data.msg !== 'success') {
                    console.log(res.data.msg)
                    setErrorState({
                        email: "This email doesn't exist or password is incorect",
                    })

                } else {
                    localStorage.setItem('userId', res.data._id)
                    console.log(localStorage.getItem('userId'));
                    console.log('login succsesful');
                    navigate('/addProject')
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const styles = {
        container: {
            padding: '50px 0',
        },
        title: {
            color: '#E7717D',
        },
        input: {
            width: '250px',
            border: '2px solid #E7717D',
            height: '40px',
            borderRadius: '10px',
            display: 'block',
            margin: '20px 0',
        },
        btn: {
            outside: {
                margin: '20px 0'
            },
            inside: {
                padding: '5px 20px',
                fontSize: '20px',
                borderRadius: '10px',
                border: '2px solid #E7717D',
                background: 'transparent',
                color: '#E7717D'
            }

        }
    }

    return (
        <div className='login_form' id='login' style={styles.container}>
            <h2 style={styles.title}>Login:</h2>
            <form onSubmit={onSubmitHandler}>
                <input type='email' name='email' value={loginState.email} onChange={onChangeHandler} placeholder="Email" style={styles.input} />
                <input type='password' name='password' value={loginState.password} onChange={onChangeHandler} placeholder="Password" style={styles.input} />
                <div style={styles.btn.outside}>
                    <button type='submit' style={styles.btn.inside}>Login</button>
                </div>
            </form>
            {errorState.email !== '' ? <p className='errors'>{errorState.email}</p> : null}
        </div>
    )
}

export default UserLogin;