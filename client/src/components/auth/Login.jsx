import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import Button from '../button/Button'

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
                console.log('res =>',res);
                if (res.data.errors) {
                    setErrorState({
                        email: res.data.errors.email ? res.data.errors.email.message : '',
                        password: res.data.errors.password ? res.data.errors.password.message : '',
                    })
                } else if (res.status !== 200) {
                    console.log('here =>',res)
                    setErrorState({
                        email: "This email doesn't exist or password is incorect",
                    })

                } else {
                    localStorage.setItem('user_id', res.data.info._id)
                    localStorage.setItem('firstName', res.data.info.firstName)
                    localStorage.setItem('lastName', res.data.info.lastName)
                    console.log('login succsesful');
                    navigate('/addProject')
                }
            })
            .catch(err => {
                console.log('thisone?',err);
            })
    }



    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Login:</h2>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <input type='email' name='email' value={loginState.email} onChange={onChangeHandler} placeholder="Email" style={styles.input} />
                </div>
                <input type='password' name='password' value={loginState.password} onChange={onChangeHandler} placeholder="Password" style={styles.input} />
                <Button type='submit' title="Login" color='white' backgroundColor='#E7717D' border="2px solid #E7717D" />
            </form>
            {errorState.email !== '' ? <p className='errors'>{errorState.email}</p> : null}
        </div>
    )
}

export default UserLogin;

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
        // display: 'block',
        margin: '20px 0 0',
    }
}