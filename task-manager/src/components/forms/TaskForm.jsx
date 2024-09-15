import React, { useState, useEffect } from "react";
import { addTask, updateTask } from "../../apis/taskmanagerapis";
import "../../styles/TaskForm.css";
import { toast } from "react-toastify";

const TaskForm = ({ task, onSave }) => {
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [status, setStatus] = useState(task ? task.status : false); // Changed to boolean
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!title) {
      newErrors.title = "Title is required.";
    } else if (title.length > 255) {
      newErrors.title = "Title cannot be more than 255 characters.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      if (validationErrors.title) {
        toast.error(validationErrors.title);
      }
      return;
    }
    try {
      if (task) {
        await updateTask(task.id, { title, description, status });
      } else {
        await addTask({ title, description, status });
      }
      onSave();
      toast.success(`Task ${task ? "updated" : "saved"} successfully!`);
      clearForm();
    } catch (error) {
      toast.error("Error saving task");
    }
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setStatus(false); // Reset status to false
  };

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  return (
    <div className="task-form-container">
      <h2>{task ? "Edit Task" : "Add New Task"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) {
                setErrors({ ...errors, title: "" });
              }
            }}
            maxLength="255"
          />
          {errors.title && <div className="form-error">{errors.title}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="status">Status:</label>
          <input
            id="status"
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
        </div> */}

        <button type="submit">{task ? "Update" : "Save"}</button>
      </form>
    </div>
  );
};

export default TaskForm;
