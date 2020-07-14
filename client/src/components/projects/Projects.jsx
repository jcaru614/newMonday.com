import React, { useEffect, useState } from "react";
import "./projects.css";
import Columns from "./Columns";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import axios from "axios";
import AspectRatioIcon from '@material-ui/icons/AspectRatio';

import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import Modal from './Modal'
import { CSSTransition } from "react-transition-group";



const Projects = () => {
  const [user, setUser] = useState({});
  const [refreshState, setRefreshState] = useState(false);
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    axios.get(`http://localhost:8000/readOne/${user_id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [refreshState]);

  console.log("usersprojects ", user);
  console.log("user_id", user_id);


  const positionHandler = (item, arr, user) => {
    user.projects.forEach(el => {
      if (el._id === item._id) {
        el.position = arr;
      }
      return user
    });
  };

  const onProgressHandler = (e, item) => {
    positionHandler(item, [false, true, false], { ...user });
    axios.patch(`http://localhost:8000/updateOne/${user_id}`, { ...user })
      .then(() => setRefreshState(!refreshState))
      .catch((err) => console.log(err));
  };

  const onCompleteHandler = (e, item) => {
    positionHandler(item, [false, false, true], { ...user })
    axios.patch(`http://localhost:8000/updateOne/${user_id}`, { ...user })
      .then(() => setRefreshState(!refreshState))
      .catch((err) => console.log(err));
  };

  const onDeleteHandler = (e, item) => {
    positionHandler(item, [false, false, false], { ...user })
    axios.patch(`http://localhost:8000/updateOne/${user_id}`, { ...user })
      .then(() => setRefreshState(!refreshState))
      .catch((err) => console.log(err));
  };

  const [itemState, setItemState] = useState({})
  const itemHandler = (e, item) => {
    setItemState(item)
  }
  console.log("the item! ", itemState)

  const onDragOver = (e) => {
    e.preventDefault();

  }
  const onBegginingDrag = (e) => {
    positionHandler(itemState, [true, false, false], { ...user });
    axios.patch(`http://localhost:8000/updateOne/${user_id}`, { ...user })
      .then(() => setRefreshState(!refreshState))
      .catch((err) => console.log(err));
  };

  const onProgressDrag = (e) => {
    positionHandler(itemState, [false, true, false], { ...user });
    axios.patch(`http://localhost:8000/updateOne/${user_id}`, { ...user })
      .then(() => setRefreshState(!refreshState))
      .catch((err) => console.log(err));
  };

  const onCompleteDrag = (e) => {
    positionHandler(itemState, [false, false, true], { ...user })
    axios.patch(`http://localhost:8000/updateOne/${user_id}`, { ...user })
      .then(() => setRefreshState(!refreshState))
      .catch((err) => console.log(err));
  };


  const [isModalVis, setModalVis] = useState(false);

  const toggleModal = (e, item) => {
    setItemState(item)
    setModalVis(!isModalVis);
  };

  return (
    <div className="columnsContainer">
      <Columns title="Open" color="#E7717D" position1={
        <tbody onDragOver={(e) => onDragOver(e)} onDrop={(e) => onBegginingDrag(e)}>
          {user.projects ? user.projects.map((item, index) => item.position[0] === true ? (
            <tr className='openItem' key={item._id} draggable onDrag={(e) => itemHandler(e, item)} >
              <td>
                <p>{item.title}</p>
                <p>Due: {item.date.substring(0, 10)}</p>
                <button className="icon" onClick={(e) => toggleModal(e, item)}> <AspectRatioIcon fontSize="large" /> </button>
                <button className="iconNext" onClick={(e) => onProgressHandler(e, item)}> <ArrowForwardIcon fontSize="large" /> </button>
              </td>
            </tr>
          ) : null
          )
            : null}
        </tbody>
      }
      />
      <Columns title="In Progress" color="#AB5578" position2={
        <tbody onDragOver={(e) => onDragOver(e)} onDrop={(e) => onProgressDrag(e)}>
          {user.projects ? user.projects.map((item, index) => item.position[1] === true ? (
            <tr className='progessItem' key={item._id} draggable onDrag={(e) => itemHandler(e, item)} >
              <td>
                <p>{item.title}</p>
                <p>Due: {item.date.substring(0, 10)}</p>
                <button className="icon" onClick={(e) => toggleModal(e, item)}> <AspectRatioIcon fontSize="large" /> </button>
                <button className="iconNext" onClick={(e) => onCompleteHandler(e, item)}> <ArrowForwardIcon fontSize="large" /> </button>
              </td>
            </tr>
          ) : null
          )
            : null}
        </tbody>
      }
      />
      <Columns title="Complete" color="#AFD275" position3={
        <tbody onDragOver={(e) => onDragOver(e)} onDrop={(e) => onCompleteDrag(e)}>
          {user.projects ? user.projects.map((item, index) => item.position[2] === true ? (
            <tr className='completeItem' key={item._id} draggable onDrag={(e) => itemHandler(e, item)} >
              <td>
                <p>{item.title}</p>
                <p>Due: {item.date.substring(0, 10)}</p>
                <button className="icon" onClick={(e) => toggleModal(e, item)}> <AspectRatioIcon fontSize="large" /> </button>
                <button className="iconNext" onClick={(e) => onDeleteHandler(e, item)}> <DeleteSweepIcon fontSize="large" /> </button>
              </td>
            </tr>
          ) : null
          )
            : null}
        </tbody>
      }
      />

      <CSSTransition
        in={isModalVis}
        timeout={350}
        classNames="modal-animation" unmountOnExit 
      >
        <Modal title={itemState.title} date={itemState.date} description={itemState.description} position={itemState.position} image={itemState.image} modalState={isModalVis}
          btn={
            <button className="exiticon" onClick={(e) => toggleModal(e, itemState)}> <FullscreenExitIcon style={{ fontSize: 50 }}/></button>
          }
        />
      </CSSTransition>


    </div>
  );
};

export default Projects;
