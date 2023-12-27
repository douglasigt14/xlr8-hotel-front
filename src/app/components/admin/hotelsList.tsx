// HotelLandingPage.js
import React, { useState } from 'react';
import { Box, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { styleHotelsList, styleTextList } from '@/app/styles/styles';
import { env } from "../../env";

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
                      <ListItemText secondary="Quartos Disponíveis">

                      <Grid container spacing={2} 
                          justifyContent="space-between"
                           alignItems="center"
                          width="100%">
                        <Grid item xs={11}>
                          <span style={styleTextList}>{hotel.name}</span> 
                        </Grid>
                      {(
                         hotel.image_url ? 
                            <Grid item xs={1} justifyContent="flex-end">
                            <img
                              src={`${env.backend}/${hotel.image_url}`}
                              alt={hotel.name}
                              style={{ maxWidth: '100%', maxHeight: '80px' }}
                              loading="lazy"/>
                              </Grid>
                            : null
                         )}
                         </Grid>
                      </ListItemText>
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
