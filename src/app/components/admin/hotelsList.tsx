// HotelLandingPage.js
import React, { useState } from 'react';
import { Box, Divider, Grid, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
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
                    <ListItemText>

                      <Grid container spacing={2}
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        width="100%">
                        <Grid item xs={7}>
                          <span style={styleTextList}>{hotel.id} - {hotel.name}</span><br/>
                          {hotel.location}
                        </Grid>
                        <Grid item xs={2} justifyContent="flex-start">
                          {(
                            hotel.image_url ?
                              (

                                <img
                                  src={`${env.backend}/${hotel.image_url}`}
                                  alt={hotel.name}
                                  style={{ maxWidth: '100%', maxHeight: '80px' }}
                                  loading="lazy" />)

                              : null
                          )}
                        </Grid>
                        <Grid item xs={2} justifyContent="flex-start">
                          <TextField fullWidth
                            type="date"
                            label="data"
                            size="small"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">

                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
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
