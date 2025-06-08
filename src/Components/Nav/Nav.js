import React, { useState, useEffect } from "react";
import {
  FaUser, FaFileAlt, FaClipboardCheck, FaPlus,
  FaBell, FaSignOutAlt, FaMoneyCheckAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Nav = ({ name, notifications, openModal }) => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");

  const notificationsCount = Array.isArray(notifications) ? notifications.length : 0;

  useEffect(() => {
    const fetchUserRole = async () => {
      console.log("🔍 Iniciando busca pela role do usuário...");

      try {
        const response = await axios.get(
          'https://stagebackend-1.onrender.com/api/users/me',
          { withCredentials: true }
        );

        console.log("✅ Resposta recebida de /api/users/me:", response);
        console.log("👤 Role do usuário:", response.data.role);
        setUserRole(response.data.role);

      } catch (error) {
        console.error("❌ Erro ao buscar informações do usuário:", error);

        if (error.response) {
          console.log("📡 Status de erro:", error.response.status);
          console.log("📄 Dados do erro:", error.response.data);

          if (error.response.status === 401) {
            alert("⚠️ Você não está autenticado. Redirecionando para o login...");
            navigate('/');
          }
        } else if (error.request) {
          console.error("🚫 Requisição enviada mas sem resposta (erro de rede ou CORS).");
        } else {
          console.error("❗ Erro desconhecido:", error.message);
        }
      }
    };

    fetchUserRole();
  }, [navigate]);

  const handleAddUser = () => {
    console.log("➕ Tentando acessar criação de usuários. Role atual:", userRole);
    if (userRole === "Product Manager") {
      navigate("/newuser");
    } else {
      alert("⛔ Acesso negado. Apenas Product Managers podem adicionar usuários.");
    }
  };

  const projects = () => {
    console.log("📁 Navegando para Projects");
    navigate("/projects");
  };

  const handleprofile = () => {
    console.log("👤 Navegando para Profile");
    navigate("/profile");
  };

  const handlePayroll = () => {
    console.log("💰 Tentando acessar folha de pagamento. Role atual:", userRole);
    if (userRole === "Product Manager") {
      navigate("/payroll");
    } else {
      alert("⛔ Acesso negado. Apenas Product Managers podem acessar a folha de pagamento.");
    }
  };

  const handleHistory = () => {
    console.log("🕓 Navegando para histórico");
    navigate("/history");
  };

  const handleLogout = () => {
    console.log("🚪 Fazendo logout. Limpando cookie...");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="sidebar">
        <h1>Simple</h1>
        <ul>
          <li onClick={handleprofile}>
            <FaUser /> Profile
          </li>
          <li onClick={handleHistory}>
            <FaFileAlt /> History
          </li>
          <li onClick={projects}>
            <FaClipboardCheck /> Projects
          </li>
          <li onClick={handleAddUser}>
            <FaUser /><FaPlus /> Users
          </li>
          <li onClick={openModal}>
            <FaBell /> Notification <span>{notificationsCount}</span>
          </li>
          <li onClick={handlePayroll}>
            <FaMoneyCheckAlt /> Payroll
          </li>
          <li className='logout' onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
