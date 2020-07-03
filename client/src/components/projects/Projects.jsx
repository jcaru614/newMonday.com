import React, { useEffect, useState } from "react";
import "./projects.css";
import Columns from "./Columns";
import axios from "axios";


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

  // const dragStart = e => {
  //   const target = e.target;
  //   e.dataTransfer.setData('card_id', target.id)
  //   setTimeout(() => {
  //     target.style.display = "none";
  //   }, 0)
  // }

  // const dragOver = e => {
  //   e.stopPropagation();
  // }
  // // 
  // const drop = e => {
  //   e.preventDefault();
  //   const card_id = e.dataTransfer.getData('card_id')
  //   const card = document.getElementById(card_id);
  //   card.style.display = 'block';
  //   e.target.appendChild(card)
  // }

  // const dragitOver = e => {
  //   e.preventDefault();
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
    if (item._id) {
      positionHandler(item, [false, true, false], { ...user });
    }
    axios.patch(`http://localhost:8000/updateOne/${user_id}`, { ...user })
      .then(() => setRefreshState(!refreshState))
      .catch((err) => console.log(err));
  };

  const onCompleteHandler = (e, item) => {
    if (item._id) {
      positionHandler(item, [false, false, true], { ...user })
    }
    axios.patch(`http://localhost:8000/updateOne/${user_id}`, { ...user })
      .then(() => setRefreshState(!refreshState))
      .catch((err) => console.log(err));
  };

  const onDeleteHandler = (e, item) => {
    if (item._id) {
      positionHandler(item, [false, false, false], { ...user })
    }
    axios.patch(`http://localhost:8000/updateOne/${user_id}`, { ...user })
      .then(() => setRefreshState(!refreshState))
      .catch((err) => console.log(err));
  };

const onDrag = (e) => {
  e.preventDefault()
}

//  use state on the item you want. when invoking on drag call a function that will set the item state to the item
// that way on drop you invoke on progress or complete handler and pass in the item in state
  return (
    <div>
      <Columns title="Open" color="#E7717D" position1={
        <tbody >
          {user.projects ? user.projects.map((item, index) => item.position[0] === true ? (
              <tr key={item._id} draggable onDrag={(e) => onProgressHandler(e, item)} >
                <td>
                  <p>{item.title}</p>
                  <p>Due: {item.date.substring(0, 10)}</p>
                  <button onClick={(e) => onProgressHandler(e, item)}>
                    To Progress
                        </button>
                </td>
              </tr>
          ) : null
          )
            : null}
        </tbody>
      }
      />
      <Columns title="In Progress" color="#AB5578" position2={
        <tbody >
          {user.projects ? user.projects.map((item, index) => item.position[1] === true ? (
              <tr key={item._id} draggable onDrag={(e) => onCompleteHandler(e, item)} >
                <td>
                  <p>{item.title}</p>
                  <p>Due: {item.date.substring(0, 10)}</p>
                  <button onClick={(e) => onCompleteHandler(e, item)}>
                    To Complete
                        </button>
                </td>
              </tr>
          ) : null
          )
            : null}
        </tbody>
      }
      />
      <Columns title="Complete" color="#AFD275" position3={
        <tbody >
          {user.projects ? user.projects.map((item, index) => item.position[2] === true ? (
              <tr key={item._id} draggable onDrag={(e) => onDeleteHandler(e, item)} >
                <td>
                  <p>{item.title}</p>
                  <p>Due: {item.date.substring(0, 10)}</p>
                  <button onClick={(e) => onDeleteHandler(e, item)}>
                    To Delete
                        </button>
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
