import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import "./App.css";
import Card from "./Components/Card/Card";

function App() {
  const [tasks, setTasks] = useState([
    {
      title: "Enter a Title",
      body: "Enter the body",
      id: Date.now(),
    },
  ]);

  const containerRef = useRef();
  const [render, setRender] = useState(false);

  const titleHandler = (title, id) => {
    const allTasks = tasks.map((task) => {
      if (task.id === id) {
        task.title = title;
      }
      return task;
    });
    setTasks(allTasks);
  };

  const bodyHandler = (body, id) => {
    const allTasks = tasks.map((task) => {
      if (task.id === id) {
        task.body = body;
      }
      return task;
    });
    setTasks(allTasks);
  };

  const addNewCard = () => {
    const allTasks = [...tasks];
    allTasks.push({
      title: "Enter a Title",
      body: "Enter the body",
      id: Date.now(),
    });
    setTasks(allTasks);
  };

  const closeHandler = (id) => {
    console.log(tasks, id);
    const allTasks = tasks.filter((task) => {
      if (task.id !== id) {
        return true;
      } else {
        const card = document.getElementById(id);
        console.log("Going to remove ", id);
        if (document.getElementById("containerDiv").contains(card)) {
          console.log("It contains");
          ReactDOM.unmountComponentAtNode(card);
        } else {
          console.log("Card is not there");
        }

        return false;
      }
    });

    setTasks(allTasks);

    console.log("all Task");
    console.log(tasks);
  };

  const drop = (e) => {
    e.preventDefault();
    const card_id = e.dataTransfer.getData("card_id");
    const card = document.getElementById(card_id);
    const containerDiv = document.getElementById("containerDiv");

    if (!e.target) {
      console.log("empty");
    }
    if (card) {
      card.style.display = "block";
      containerDiv.appendChild(card);
    }
    console.log("empty");
    console.log(containerDiv);
  };
  const dragOver = (e) => e.preventDefault();

  return (
    <div className="App">
      <div className="header">
        <h1>Task Manager Application</h1>
      </div>

      <div
        className="container"
        id="containerDiv"
        ref={containerRef}
        onDrop={drop}
        onDragOver={dragOver}
      >
        {tasks.map((task, id) => {
          return (
            <Card
              key={task.id}
              task={task}
              id={task.id}
              titleHandler={titleHandler}
              bodyHandler={bodyHandler}
              closeHandler={closeHandler}
            />
          );
        })}
        <div id="addNewCard" className="notesWrapper">
          <div className="notes">
            <div className="note new__note setColorYellow" onClick={addNewCard}>
              <span>
                <i className="fas fa-plus"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
