import React, { useState } from "react";
import "./Card.css";

const Card = ({ task, id, titleHandler, bodyHandler, closeHandler }) => {
  const dragstart = (e) => {
    const target = e.target;
    e.dataTransfer.setData("card_id", target.id);
    console.log("target Id - ", target.id);
    setTimeout(() => {
      target.style.display = "none";
    }, 0);
  };

  const dragover = (e) => e.stopPropagation();

  const [color, setColorClass] = useState("setColorYellow");

  return (
    <div
      className="notesWrapper"
      draggable
      onDragStart={dragstart}
      onDragOver={dragover}
      id={id}
    >
      <div className="notes">
        <div className={"note " + color}>
          <div className="note__header">
            <span
              className="note__check"
              onClick={(e) => setColorClass("setColorOrange")}
            >
              <i className="fa fa-tasks" aria-hidden="true"></i>
            </span>
            <span
              className="note__check"
              onClick={(e) => setColorClass("setColorGreen")}
            >
              <i className="fa fa-check" aria-hidden="true"></i>
            </span>

            <span className="note__close" onClick={() => closeHandler(task.id)}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="note__title">
            <input
              className="input__title"
              type="text"
              placeholder={task.title}
              onChange={(e) => titleHandler(e.target.value, task.id)}
            ></input>
          </div>
          <div className="note__body">
            <textarea
              className="input__body"
              type="text"
              placeholder={task.body}
              onChange={(e) => bodyHandler(e.target.value, task.id)}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
