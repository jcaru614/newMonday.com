import React, { useEffect, useState } from "react";
import "./projects.css";
import Columns from "./Columns";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import axios from "axios";



const Projects = () => {
  const [user, setUser] = useState({});
  const [refreshState, setRefreshState] = useState(false);
  const user_id = localStorage.getItem("user_id");
  // const [toggle, setToggle] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:8000/readOne/${user_id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [refreshState]);

  console.log("usersprojects ", user);
  console.log("user_id", user_id);

  // const dragStart = e => {
  //   const target = e.target;
  //   e.dataTransfer.setData('card_id', target.id)
  //   setTimeout(() => {
  //     target.style.display = "none";
  //   }, 0)
  // }
  // const drop = e => {
  //   e.preventDefault();
  //   const card_id = e.dataTransfer.getData('card_id')
  //   const card = document.getElementById(card_id);
  //   card.style.display = 'block';
  //   e.target.appendChild(card)
  // }


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

  const onDeleteDrag = (e) => {
    positionHandler(itemState, [false, false, false], { ...user })
    axios.patch(`http://localhost:8000/updateOne/${user_id}`, { ...user })
      .then(() => setRefreshState(!refreshState))
      .catch((err) => console.log(err));
  };

  const styles = {
    open : {
      backgroundColor: 'red',
      border: '2px solid blue',
    },
    close : {
      backgroundColor: 'green',
      border: '2px solid pink',
    }
  }

  return (
    <div className="columnsContainer">
      <Columns title="Open" color="#E7717D" position1={
        <tbody onDragOver={(e) => onDragOver(e)} onDrop={(e) => onBegginingDrag(e)}>
          {user.projects ? user.projects.map((item, index) => item.position[0] === true ? (
            <tr className='openItem' key={item._id} draggable onDrag={(e) => itemHandler(e, item)} >
              <td>
                <p>{item.title}</p>
                <p>Due: {item.date.substring(0, 10)}</p>
                <button className="icon" onClick={(e) => onProgressHandler(e, item)}> <ArrowForwardIcon fontSize="large" /> </button>
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
                <button className="icon" onClick={(e) => onCompleteHandler(e, item)}> <ArrowForwardIcon fontSize="large" /> </button>
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
                <button className="icon" onClick={(e) => onDeleteHandler(e, item)}> <DeleteSweepIcon fontSize="large" /> </button>
              </td>
            </tr>
          ) : null
          )
            : null}
        </tbody>
      }
      />

    </div>
  );
};

export default Projects;
