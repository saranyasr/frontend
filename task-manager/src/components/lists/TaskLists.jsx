import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTasks,
  deleteTask,
  getOneTask,
  updateTask,
} from "../../apis/taskmanagerapis";
import "../../styles/TaskList.css";
import { toast } from "react-toastify";
import Pagination from "../pagination/Pagination";
import TaskForm from "../forms/TaskForm";
import TaskModal from "../modals/TaskModal";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(10);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const navigate = useNavigate();

  const openModal = async (task) => {
    try {
      const taskDetails = await getOneTask(task.id);
      setSelectedTask(taskDetails);
      setIsModalOpen(true);
    } catch (error) {
      toast.error("Error fetching task details");
    }
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks({
          title: searchQuery,
          status:
            statusFilter === "completed"
              ? "True"
              : statusFilter === "pending"
              ? "False"
              : undefined,
          page: currentPage,
        });
        setTasks(data);
      } catch (error) {
        toast.error("Error fetching tasks");
      }
    };

    fetchTasks();
  }, [searchQuery, statusFilter, currentPage]);

  const handleDelete = async (taskId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (isConfirmed) {
      try {
        await deleteTask(taskId);
        setTasks(tasks.filter((task) => task.id !== taskId));
        toast.success("Task deleted successfully!");
      } catch (error) {
        toast.error("Error deleting task");
      }
    }
  };

  const handleSave = async () => {
    try {
      const data = await getTasks({
        search: searchQuery,
        status:
          statusFilter === "completed"
            ? true
            : statusFilter === "pending"
            ? false
            : undefined,
        page: currentPage,
      });
      setTasks(data);
      setEditingTask(null);
      setIsAddingTask(false);
    } catch (error) {
      toast.error("Error saving task");
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
      toast.success("Task status updated successfully!");
    } catch (error) {
      toast.error("Error updating task status");
    }
  };

  return (
    <div className="task-list-container">
      <TaskForm onSave={handleSave} />
      <div className="task-list-actions">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding:"4px" , marginRight:"16px" , borderRadius:"4px" }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding:"4px" , marginRight:"16px" , borderRadius:"4px" }}
        >
          <option value="">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-list-item">
            <span>{task.title}</span>
            <div>
              <label htmlFor="" style={{ fontSize: "14px" }}>
                Mark Completion
              </label>
              <input
                type="checkbox"
                checked={task.status}
                onChange={() => handleStatusChange(task.id, !task.status)}
                style={{ marginRight: "20px" }}
              />
              <button onClick={() => openModal(task)}>View</button>
              <button onClick={() => navigate(`/tasks/${task.id}`)}>
                Edit
              </button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && selectedTask && (
        <TaskModal task={selectedTask} onClose={closeModal} />
      )}
      <Pagination
        currentPage={currentPage}
        totalItems={tasks.length} 
        itemsPerPage={tasksPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default TaskList;
