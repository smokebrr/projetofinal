import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography, Table, TableHead, TableRow, TableCell, TableBody, TextField, Select, MenuItem, FormControl, InputLabel, Paper, Alert, IconButton } from "@mui/material";
import { Edit as EditIcon, Cancel as CancelIcon } from "@mui/icons-material";

const AlterarUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("usuario");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const token = localStorage.getItem("token");


  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setUsuarios(response.data);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
        setError("Erro ao carregar a lista de usuários.");
      }
    };

    fetchUsuarios();
  }, [token]);

  const selecionarUsuario = (usuario) => {
    setUsuarioSelecionado(usuario);
    setNome(usuario.nome);
    setEmail(usuario.email);
    setTipoUsuario(usuario.tipo_usuario);
    setError("");
  };

  const salvarAlteracoes = async () => {
    if (!nome || !email) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3001/user/${usuarioSelecionado.usuario_id}`, {
        nome,
        email,
        tipo_usuario: tipoUsuario,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((u) =>
            u.usuario_id === usuarioSelecionado.usuario_id ? { ...u, nome, email, tipo_usuario: tipoUsuario } : u
          )
        );
        setSuccess(true);
        setError("");
        setUsuarioSelecionado(null);
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      setError("Erro ao salvar alterações. Tente novamente.");
      setSuccess(false);
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f9f9f9' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Gerenciar Usuários
      </Typography>

      {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ marginBottom: 2 }}>Usuário atualizado com sucesso!</Alert>}

      <Paper elevation={6} sx={{ padding: 3, marginBottom: 4, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Tipo de Usuário</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.usuario_id}>
                <TableCell>{usuario.usuario_id}</TableCell>
                <TableCell>{usuario.nome}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.tipo_usuario}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => selecionarUsuario(usuario)}
                    startIcon={<EditIcon />}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      paddingX: 3,
                      paddingY: 1,
                      '&:hover': {
                        backgroundColor: '#1976d2',
                      },
                    }}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {usuarioSelecionado && (
        <Paper elevation={6} sx={{ padding: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Editar Usuário: {usuarioSelecionado.nome}
          </Typography>

          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            sx={{ marginBottom: 2 }}
            InputLabelProps={{
              style: { color: '#1976d2' }
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
            InputLabelProps={{
              style: { color: '#1976d2' }
            }}
          />
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Tipo de Usuário</InputLabel>
            <Select
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
              label="Tipo de Usuário"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            >
              <MenuItem value="administrador">Administrador</MenuItem>
              <MenuItem value="usuario">Usuário</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={salvarAlteracoes}
              sx={{
                borderRadius: 2,
                paddingX: 4,
                paddingY: 1,
                '&:hover': {
                  backgroundColor: '#1976d2',
                },
              }}
            >
              Salvar
            </Button>
            <IconButton
              onClick={() => {
                setUsuarioSelecionado(null);
                setError("");
              }}
              sx={{
                color: '#f44336',
                backgroundColor: '#fff',
                borderRadius: '50%',
                '&:hover': {
                  backgroundColor: '#f44336',
                  color: '#fff',
                }
              }}
            >
              <CancelIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default AlterarUsuario;
