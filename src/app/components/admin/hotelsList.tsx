// HotelLandingPage.js
import React, { useState } from 'react';
import { Box, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { styleHotelsList, styleTextList } from '@/app/styles/styles';
import { SafetyDivider } from '@mui/icons-material';

const HotelLandingPage = ({ hotels }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <br /><br />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={styleHotelsList}>
            <Divider />
            {hotels.map((hotel, index) => (
              <nav>
                <List>

                  <ListItem key={index}>
                      <ListItemText secondary="Quartos Disponíveis"><span style={styleTextList}>{hotel.name}</span> </ListItemText>
                  </ListItem>
                </List>
                <Divider />
              </nav>
            ))}

          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default HotelLandingPage;
