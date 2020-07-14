import React from "react";
import "./projects.css";

const Modal = (props) => {

    return (
        <div className={`modalShowing`}>
            <div className="textSide">
                <h1>{props.title}</h1>
                <p classname="date">{props.date.substring(0, 10)}</p>
                <p className='desc'>{props.description}</p>
                {props.btn}
                

            </div>
            <div className="imageSide">
                <p>You uploaded:</p>
                <img className="modalImg" src={props.image} alt="" />
            </div>

        </div>
    )
}

export default Modal;