import React from 'react';
import './projects.css'

const Columns = (props) => {

    const title = {
        // backgroundColor: props.color,
        width: '250px',
        height: '35px',
    }

    const test = {
        marginBottom: '10px',
        borderRadius: '5px',
        borderWidth: '3px 1px 1px',
        borderStyle: 'solid',
        borderColor: `${props.color} #D3D3D3 #D3D3D3`,
        boxShadow: '2px 2px #D3D3D3'
    }

    return (
        <table >
            <thead>
                <tr style={test}>
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
