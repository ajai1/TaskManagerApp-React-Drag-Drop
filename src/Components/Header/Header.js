import React from "react";

const Header = ({ setStageToShow }) => {
  return (
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
  );
};

export default Header;
