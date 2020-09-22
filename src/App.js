import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./App.css";
import Card from "./Components/Card/Card";

function App() {
  const [tasks, setTasks] = useState([
    {
      title: "Enter a Title",
      body: "Enter the body",
      id: Date.now(),
      stage: "todo",
    },
  ]);

  const [stageToShow, setStageToShow] = useState("");

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

  const stageHandler = (stage, id) => {
    const allTasks = tasks.map((task) => {
      if (task.id === id) {
        task.stage = stage;
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
      stage: "todo",
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
  };

  const drop = (e) => {
    if (!e.preventDefault()) {
      e.preventDefault();
      const card_id = e.dataTransfer.getData("card_id");
      const card = document.getElementById(card_id);
      const containerDiv = document.getElementById("containerDiv");
      const addNewCard = document.getElementById("addNewCard");
      const afterElement = getDragAfterElement(
        containerDiv,
        e.clientX,
        e.clientY
      );
      if (card) {
        card.style.display = "block";
        ReactDOM.unmountComponentAtNode(addNewCard);
        if (afterElement == null) {
          containerDiv.appendChild(card);
        } else {
          containerDiv.insertBefore(card, afterElement);
        }
        containerDiv.appendChild(addNewCard);
      }
    }
  };

  function getDragAfterElement(container, x, y) {
    const draggableElements = [
      ...container.querySelectorAll(
        ".notesWrapper:not(.dragging):not(.new__note)"
      ),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offsetX = x - (box.left + box.width / 2);
        const offsetY = y - (box.top + box.height / 2);
        const offset = (offsetX + offsetY) / 2;

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  const dragOver = (e) => e.preventDefault();

  return (
    <div className="App">
      <div className="header">
        <div>
          <span className="showComplete">
            <i
              onClick={() => setStageToShow("complete")}
              className="fas fa-check-circle"
            ></i>
          </span>
          <span className="showProgress">
            <i
              onClick={() => setStageToShow("inprogress")}
              className="fas fa-tasks"
            ></i>
          </span>
          <span className="showAll">
            <i onClick={() => setStageToShow("")} className="fas fa-eye"></i>
          </span>
        </div>

        <h1>Task Manager Application</h1>
      </div>

      <div
        className="container"
        id="containerDiv"
        onDrop={drop}
        onDragOver={dragOver}
      >
        {tasks.map((task, id) => {
          if (task.stage === stageToShow || stageToShow == "") {
            return (
              <Card
                key={task.id}
                task={task}
                id={task.id}
                stageHandler={stageHandler}
                titleHandler={titleHandler}
                bodyHandler={bodyHandler}
                closeHandler={closeHandler}
              />
            );
          } else {
            return null;
          }
        })}
        <div id="addNewCard" className="notesWrapper">
          <div className="notes">
            <div className="note new__note todo" onClick={addNewCard}>
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
