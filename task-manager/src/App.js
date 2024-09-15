import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./guards/PrivateRoute";
import TaskListPage from "./pages/TaskListPage";
import RegistrationPage from "./pages/RegistrationPage";
import TaskEdit from "./pages/TaskEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <TaskListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TaskListPage />
            </PrivateRoute>
          }
        />
        <Route path="/tasks/:taskId" element={<TaskEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
