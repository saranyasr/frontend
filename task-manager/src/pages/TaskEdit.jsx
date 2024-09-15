import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import TaskForm from "../components/forms/TaskForm";
import { getOneTask, updateTask } from "../apis/taskmanagerapis";

const TaskEdit = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await getOneTask(taskId);
        setTask(taskData);
      } catch (error) {
        toast.error("Error fetching task");
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSave = async (updatedTask) => {
    try {
      await updateTask(taskId, updatedTask);
      toast.success("Task updated successfully!");
      navigate("/tasks");
    } catch (error) {
      toast.error("Error updating task");
    }
  };

  return task ? (
    <TaskForm task={task} onSave={handleSave} />
  ) : (
    <div>Loading...</div>
  );
};

export default TaskEdit;
