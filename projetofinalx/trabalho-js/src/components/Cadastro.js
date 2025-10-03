import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('usuario'); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

 
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCadastro = async () => {

    if (!isEmailValid(email)) {
      setError('Por favor, insira um e-mail válido!');
      return;
    }

    if (senha !== confirmSenha) {
      setError('As senhas não coincidem!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/register', { 
        nome, 
        email, 
        senha, 
        tipo_usuario: tipoUsuario 
      });

      if (response.status === 201) {
        setSuccess(true);
        setError(''); 
        setNome('');
        setEmail('');
        setSenha('');
        setConfirmSenha('');
        setTipoUsuario('usuario');
      }
    } catch (error) {
      setError('Erro ao cadastrar. Tente novamente.');
      setSuccess(false); 
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f9',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          borderRadius: 3,
          width: '100%',
          maxWidth: '400px',
          backgroundColor: '#ffffff',
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}
        >
          Cadastro
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Cadastro realizado com sucesso!</Alert>}
        
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          sx={{ marginBottom: 2, backgroundColor: '#f4f4f9', borderRadius: '5px' }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: 2, backgroundColor: '#f4f4f9', borderRadius: '5px' }}
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          fullWidth
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          sx={{ marginBottom: 2, backgroundColor: '#f4f4f9', borderRadius: '5px' }}
        />
        <TextField
          label="Confirmar Senha"
          type="password"
          variant="outlined"
          fullWidth
          value={confirmSenha}
          onChange={(e) => setConfirmSenha(e.target.value)}
          sx={{ marginBottom: 2, backgroundColor: '#f4f4f9', borderRadius: '5px' }}
        />
        
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Tipo de Usuário</InputLabel>
          <Select
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
            label="Tipo de Usuário"
          >
            <MenuItem value="usuario">Usuário</MenuItem>
            <MenuItem value="administrador">Administrador</MenuItem>
          </Select>
        </FormControl>
        
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          onClick={handleCadastro}
        >
          Cadastrar
        </Button>
      </Paper>
    </Box>
  );
};

export default Cadastro;
