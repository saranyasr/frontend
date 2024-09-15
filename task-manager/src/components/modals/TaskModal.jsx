import React, { useRef } from "react";
import "../../styles/TaskModal.css";

const TaskModal = ({ task, onClose }) => {
  const modalRef = useRef(null);

  console.log(task);
  

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!task) return null;

  return (
    <div className="task-modal-overlay" onClick={handleOverlayClick}>
      <div className="task-modal-content" ref={modalRef}>
        <h2>{task.title}</h2>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Status:</strong> {task.status ? "completed" : "Pending"}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TaskModal;
