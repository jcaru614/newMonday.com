import React from 'react';
import './button.css';

const Button = (props) => {

    const btn = {
        margin: '20px 0',
        padding: '5px 20px',
        fontSize: '20px',
        borderRadius: '10px',
        border: props.border,
        backgroundColor: props.backgroundColor,
        color: props.color,
    }

    return (

        <button className="btn" style={btn}>{props.title}</button>

    )
}

export default Button;

