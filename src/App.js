import React from "react";
import ProjectsSimple from "./Components/pages/ProjectsSimple";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile";
import Payroll from "./Components/Payroll/Payroll";
import { Routes, Route } from "react-router-dom"; // 🔄 tire o BrowserRouter daqui
import NewUser from "./Components/NewUser/NewUser";
import ProjectDetails from "./Components/ProjectsDetails/ProjectsDetails";
import Register from "./Components/Register/Register";
import History from "./Components/History/History";
import Modal from "react-modal";
import ProjectStatus from "./Components/ProjectStatus/ProjectStatus";

Modal.setAppElement("#root");

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/projects" element={<ProjectsSimple />} />
      <Route path="/newUser" element={<NewUser />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/payroll" element={<Payroll />} />
      <Route path="/project/:projectId" element={<ProjectDetails />} />
      <Route path="/history" element={<History />} />
      <Route path="/register" element={<Register />} />
      <Route path="/projectStatus/:projectId" element={<ProjectStatus />} />
    </Routes>
  );
}

export default App;
