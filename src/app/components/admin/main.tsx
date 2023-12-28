"use client";

import React, { FC, useState, useEffect } from 'react';
import { Button, CardContent, Grid, IconButton, InputAdornment, Paper, Skeleton, TextField, Typography } from '@mui/material';
import HotelsList from './hotelsList';
import { env } from "../../env";
import HotelIcon from '@mui/icons-material/Hotel';


const Main: FC = () => {
  const [loadding, setLoading] = useState(true);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    show();
  }, []);

  const show = () => {
    const URL = env.backend + '/api/hotels';
    const fetchRequest = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setLoading(false);
        setHotels(data);
      } catch (error) {
        //alertError(error);
      }
    };

    fetchRequest();
  }

  let result =
    <div className="conteiner-card">
      <Typography variant="h4">Lista de Hoteis </Typography>
      <br />
      <Paper sx={{ minHeight: 700 }}>
        <CardContent>
          {(loadding ? <Skeleton
            variant="rectangular"
            width="100%"
            height={500}
          /> :
            (
              <div>
                 <Grid container spacing={2} 
                    justifyContent="space-between"
                      alignItems="center"
                    width="100%">
                   <Grid item xs={2}>
                    <TextField fullWidth
                      label="Hotel ID"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton>
                              <HotelIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    </Grid>
                    <Grid item xs={3}>
                    <TextField fullWidth
                      label="Check in"
                      type="date"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
    
                          </InputAdornment>
                        ),
                      }}
                    />
                    </Grid>
                    <Grid item xs={3}>
                    <TextField fullWidth
                      label="Check Out"
                      type="date"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
    
                          </InputAdornment>
                        ),
                      }}
                    />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField fullWidth
                        label="Nº de Quartos"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconButton>
                                <HotelIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={1}>
                    <Button onClick={() => {
                          }} variant="contained" size="large">Buscar</Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2} 
                    justifyContent="space-between"
                      alignItems="center"
                    width="100%">
                 
                    <Grid item xs={12}>
                        <HotelsList hotels={hotels} />
                    </Grid>
                  </Grid>
               
              </div>
            )
          )}

        </CardContent>
      </Paper>
    </div>;

  return (
    result
  );
};

export default Main;