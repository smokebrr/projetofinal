import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const Reserva = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [sala, setSala] = useState("");
  const [reserva, setReserva] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 

  const listRef = useRef(null);

  const getUserToken = () => localStorage.getItem("token");

  const handleReserva = async () => {
    const token = getUserToken();
    if (!token) {
      setError("Você precisa estar logado para fazer uma reserva.");
      return;
    }

    if (!nome || !email || !data || !hora || !sala) {
      setError("Todos os campos devem ser preenchidos.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3001/reserve",
        {
          descricao: nome,
          data_reserva: data,
          hora_inicio: hora,
          hora_fim: hora,
          sala_id: sala,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchReservas();
      setNome("");
      setEmail("");
      setData("");
      setHora("");
      setSala("");
      setError("");
      setSuccessMessage("Reserva realizada com sucesso!"); 
      setTimeout(() => setSuccessMessage(""), 5000); 
    } catch {
      setError("Erro ao fazer a reserva. Tente novamente.");
    }
  };

  const fetchReservas = async () => {
    const token = getUserToken();
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:3001/reserve", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReserva(response.data);

      if (listRef.current) {
        listRef.current.scrollTo({
          top: listRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    } catch {
      console.error("Erro ao carregar as reservas");
    }
  };

  const handleRemoveReserva = async (indexToRemove) => {
    const token = getUserToken();
    if (!token) {
      setError("Você precisa estar logado para remover uma reserva.");
      return;
    }

    try {
      const reservaId = reserva[indexToRemove].reserva_id;
      await axios.delete(`http://localhost:3001/reserve/${reservaId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReserva(reserva.filter((_, index) => index !== indexToRemove));
      setMessage("Reserva removida com sucesso!");
      setTimeout(() => setMessage(""), 5000); 
    } catch {
      setMessage("Erro ao tentar remover a reserva.");
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "150vh",
        backgroundColor: "#f4f4f9",
        overflow: "auto",
      }}
    >
      <Paper
        elevation={12}
        sx={{
          padding: 5,
          borderRadius: "12px",
          width: "80%",
          maxWidth: "800px",
          background: "#ffffff",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "#1976d2",
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
            letterSpacing: 1.3,
          }}
        >
          Faça uma Reserva
        </Typography>

      
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ marginBottom: 2 }}>
            {successMessage}
          </Alert>
        )}
        {message && ( 
          <Alert severity="success" sx={{ marginBottom: 2 }}>
            {message}
          </Alert>
        )}

        <Grid container spacing={2}>
   
          <Grid item xs={12}>
            <TextField
              label="Nome"
              variant="outlined"
              fullWidth
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Data"
              type="date"
              variant="outlined"
              fullWidth
              value={data}
              onChange={(e) => setData(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Hora"
              type="time"
              variant="outlined"
              fullWidth
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!error}>
              <InputLabel id="sala-label">Sala</InputLabel>
              <Select
                labelId="sala-label"
                id="sala"
                value={sala}
                onChange={(e) => setSala(e.target.value)}
                label="Sala"
              >
                <MenuItem value="1">Sala 1</MenuItem>
                <MenuItem value="2">Sala 2</MenuItem>
                <MenuItem value="3">Sala 3</MenuItem>
              </Select>
              {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleReserva}
              fullWidth
              startIcon={<AddIcon />}
            >
              Reservar
            </Button>
          </Grid>
        </Grid>

        {/* Lista de Reservas */}
        <Box
          ref={listRef}
          mt={4}
          sx={{
            maxHeight: "300px",
            overflowY: "auto",
            padding: "15px",
            borderRadius: "12px",
            backgroundColor: "#f9f9f9",
            boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Reservas Ativas
          </Typography>
          {reserva.length > 0 ? (
            reserva.map((r, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "#ffffff",
                  marginBottom: "12px",
                  padding: "12px",
                  borderRadius: "8px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" fontWeight="bold">
                    {r.descricao}
                  </Typography>
                  <Typography variant="body2">{r.data_reserva}</Typography>
                  <Typography variant="body2">
                    {r.hora_inicio} - {r.hora_fim}
                  </Typography>
                </Box>
                <Button
                  onClick={() => handleRemoveReserva(index)}
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  Remover
                </Button>
              </Box>
            ))
          ) : (
            <Typography variant="body1" align="center" color="textSecondary">
              Nenhuma reserva encontrada.
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Reserva;
