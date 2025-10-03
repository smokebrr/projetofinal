import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Container, Grid } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Charts = () => {
  const [dayChartData, setDayChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReserveData = async () => {
    try {
      const response = await fetch('http://localhost:3001/reserve'); 
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados da API');
      }
      const data = await response.json();

      const dayData = processDayData(data);
      setDayChartData(dayData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const processDayData = (data) => {
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const weeklyReservations = new Array(7).fill(0);

    data.forEach((reservation) => {
      const createdDate = new Date(reservation.criado_em);
      const dayOfWeek = createdDate.getDay();
      weeklyReservations[dayOfWeek] += 1;
    });

    return {
      labels: daysOfWeek,
      datasets: [
        {
          label: 'Reservas por Dia da Semana',
          data: weeklyReservations,
          backgroundColor: 'rgba(75,192,192,0.5)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    };
  };

  useEffect(() => {
    fetchReserveData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
      },
    },
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Gráfico de Reservas por Dia da Semana
              </Typography>
              {loading && <Typography variant="body1">Carregando dados...</Typography>}
              {error && <Typography variant="body1" color="error">Erro: {error}</Typography>}
              {dayChartData && <Bar data={dayChartData} options={{ ...options, title: { text: 'Reservas por Dia da Semana' } }} />}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Charts;
