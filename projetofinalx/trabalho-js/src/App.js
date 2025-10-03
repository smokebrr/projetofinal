import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cadastro from "./components/Cadastro";
import Login from "./components/Login";
import Reserva from "./components/Reserva";
import Charts from "./components/Charts";
import CadastroSala from "./components/CadastroSala";
import AlterarUsuario from "./components/AlterarUsuario";

import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";

function App() {
  const [token, setToken] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null);

  const fetchAuthData = () => {
    const userToken = localStorage.getItem("token");
    const userType = localStorage.getItem("tipo_usuario");
    setToken(userToken);
    setTipoUsuario(userType);
  };

  useEffect(() => {
    fetchAuthData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tipo_usuario");
    setToken(null);
    setTipoUsuario(null);
  };

  return (
    <Router>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Sistema de Reservas
          </Typography>
          
         
          {token && (
            <Button color="inherit" component={Link} to="/">
              Reserva
            </Button>
          )}

 
          {tipoUsuario === "administrador" && (
            <>
              <Button color="inherit" component={Link} to="/cadastro-sala">
                Cadastrar Sala
              </Button>
              <Button color="inherit" component={Link} to="/alterar-usuario">
                Alterar Usuário
              </Button>
            </>
          )}

 
          <Button color="inherit" component={Link} to="/charts">
            Gráficos
          </Button>

         
          {token ? (
            <Button color="inherit" onClick={handleLogout}>
              Sair
            </Button>
          ) : (
            <>
             
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/cadastro">
                Cadastro
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ marginTop: "20px" }}>
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: 2,
            padding: 4,
          }}
        >
          <Routes>
            <Route path="/" element={<Reserva />} />
            <Route path="/charts" element={<Charts />} />
            <Route
              path="/login"
              element={<Login onLoginSuccess={fetchAuthData} />}
            />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/cadastro-sala" element={<CadastroSala />} />

            {tipoUsuario === "administrador" && (
              <Route path="/alterar-usuario" element={<AlterarUsuario />} />
            )}
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
