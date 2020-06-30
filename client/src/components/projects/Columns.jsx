import React from 'react';
import './projects.css'


const Columns = (props) => {

    const title = {
            backgroundColor: props.color,
            width: '250px',
            height: '35px',
    }

    return (
        <table>
            <thead>
                <tr>
                    <th style={title}>{props.title}</th>
                </tr>
            </thead>
            {props.position1}
            {props.position2}
            {props.position3}
        </table>
    )
}



export default Columns;

