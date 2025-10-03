import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("usuario");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !senha || !tipoUsuario) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        senha,
        tipo_usuario: tipoUsuario,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("tipo_usuario", response.data.tipo_usuario);
        setError("");


        onLoginSuccess(response.data.token, response.data.tipo_usuario);


        navigate("/", { replace: true });
      }
    } catch (err) {
      setError("Email ou senha inválidos");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f9",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold", color: "#1976d2" }}
        >
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: 2, backgroundColor: "#f4f4f9", borderRadius: "5px" }}
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          fullWidth
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          sx={{ marginBottom: 2, backgroundColor: "#f4f4f9", borderRadius: "5px" }}
        />

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="tipo-usuario-label">Tipo de Usuário</InputLabel>
          <Select
            labelId="tipo-usuario-label"
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
            label="Tipo de Usuário"
            sx={{ backgroundColor: "#f4f4f9", borderRadius: "5px" }}
          >
            <MenuItem value="usuario">Usuário</MenuItem>
            <MenuItem value="administrador">Administrador</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
        </Button>

        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Não tem uma conta?{" "}
            <Link to="/cadastro">
              <Button variant="text" color="primary">
                Cadastre-se
              </Button>
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
