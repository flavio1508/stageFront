import React, { useState } from "react";
import logo from '../../img/WhatsApp Image 2025-01-24 at 00.39.45.jpeg';
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "../../axiosConfig";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("🚀 Iniciando login");
    console.log("📧 Email digitado:", email);
    console.log("🔒 Senha digitada:", password);

    try {
      const response = await axios.post(
        'https://stagebackend-1.onrender.com/api/users/login',
        {
          email,
          password
        },
        {
          withCredentials: true, // Para enviar cookies
        }
      );

      console.log("✅ Requisição feita com sucesso!");
      console.log("📦 Dados da resposta:", response.data);
      console.log("🔑 Status da resposta:", response.status);

      // Verifica se veio token ou cookies
      // const token = response.data.token;
      // if (token) {
      //   console.log("🔐 Token recebido:", token);
      //   localStorage.setItem("token", token); // Armazena para as próximas requisições
      // } else {
      //   console.warn("⚠️ Nenhum token recebido!");
      // }

      if (response.status === 200 && response.data.redirectUrl) {
        console.log("➡️ Redirecionando para:", response.data.redirectUrl);
        navigate(response.data.redirectUrl);
      } else {
        console.error("❌ Erro na resposta:", response.data.error);
        setError(response.data.error || "Login falhou.");
      }
    } catch (err) {
      console.error("❌ Erro ao fazer login:", err);

      if (err.response) {
        console.error("📡 Status do erro:", err.response.status);
        console.error("📄 Dados do erro:", err.response.data);
        setError(err.response.data.error || "Erro ao fazer login. Verifique as credenciais.");
      } else {
        setError("Erro de rede. Verifique sua conexão.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
        {error && <p className="login-error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="show-password-button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
        <button className="login-button" onClick={handleLogin}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default Login;
