import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import axios from 'axios';

const CadastroSala = () => {
  const [nome, setNome] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [recursos, setRecursos] = useState('');
  const [localizacao, setLocalizacao] = useState(''); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleCadastroSala = async () => {
    if (!nome || !capacidade || !localizacao) {  
      setError('Os campos Nome, Capacidade e Localização são obrigatórios.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/room', {
        nome,
        capacidade: parseInt(capacidade, 10),
        recursos,
        localizacao,  
      });

      if (response.status === 201) {
        setSuccess(true);
        setError('');
        setNome('');
        setCapacidade('');
        setRecursos('');
        setLocalizacao('');  
      }
    } catch (error) {
      setError('Erro ao cadastrar a sala. Verifique se o nome já está em uso.');
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
        overflow: 'auto', 
      }}
    >
      <Paper
        elevation={12}
        sx={{
          padding: 5,
          borderRadius: '12px',
          width: '100%',
          maxWidth: '400px',
          backgroundColor: '#ffffff',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976d2', mb: 4 }}
        >
          Cadastro de Sala
        </Typography>
        {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
        {success && (
          <Alert severity="success" sx={{ marginBottom: 2 }}>
            Sala cadastrada com sucesso!
          </Alert>
        )}

        <TextField
          label="Nome da Sala"
          variant="outlined"
          fullWidth
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          sx={{
            marginBottom: 2,
            backgroundColor: '#fafafa',
            borderRadius: '12px',
            '& .MuiOutlinedInput-root': {
              '&:hover': {
                borderColor: '#00796b',
              },
            },
          }}
        />
        <TextField
          label="Capacidade"
          type="number"
          variant="outlined"
          fullWidth
          value={capacidade}
          onChange={(e) => setCapacidade(e.target.value)}
          sx={{
            marginBottom: 2,
            backgroundColor: '#fafafa',
            borderRadius: '12px',
            '& .MuiOutlinedInput-root': {
              '&:hover': {
                borderColor: '#00796b',
              },
            },
          }}
        />
        <TextField
          label="Recursos (separados por vírgula)"
          variant="outlined"
          fullWidth
          value={recursos}
          onChange={(e) => setRecursos(e.target.value)}
          sx={{
            marginBottom: 2,
            backgroundColor: '#fafafa',
            borderRadius: '12px',
            '& .MuiOutlinedInput-root': {
              '&:hover': {
                borderColor: '#00796b',
              },
            },
          }}
        />
        <TextField
          label="Localização"
          variant="outlined"
          fullWidth
          value={localizacao}
          onChange={(e) => setLocalizacao(e.target.value)} 
          sx={{
            marginBottom: 2,
            backgroundColor: '#fafafa',
            borderRadius: '12px',
            '& .MuiOutlinedInput-root': {
              '&:hover': {
                borderColor: '#00796b',
              },
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCadastroSala}
          sx={{
            borderRadius: '12px',
            background: '#1976d2',
            '&:hover': {
              background: '#1565c0',
            },
          }}
        >
          Cadastrar Sala
        </Button>
      </Paper>
    </Box>
  );
};

export default CadastroSala;
