// HotelLandingPage.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import { Grid, Typography } from '@mui/material';

const HotelLandingPage = ({ hotels }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Adicione a lógica para buscar tipos de quartos disponíveis e preços para a data selecionada
  };

  return (
    <div>

      {/* Lista de Hotéis */}
      <Grid container spacing={2}>
        {/* Mapeie sua lista de hotéis */}
        {hotels.map((hotel) => (
          <Grid item xs={12} key={hotel.id}>
            <Typography variant="h4" gutterBottom>
              {hotel.name}
            </Typography>

            {/* Seletor de Data */}
            <DatePicker
              label="Selecione a Data"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />

            {/* Exibir tipos de quartos disponíveis e preços */}
            {selectedDate && (
              <div>
                <Typography variant="h6" gutterBottom>
                  Tipos de Quartos Disponíveis e Preços:
                </Typography>
                {/* Adicione a lógica para exibir tipos de quartos e preços */}
              </div>
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HotelLandingPage;
