"use client";

import React, { FC, useState, useEffect } from 'react';
import { CardContent, Paper, Skeleton, Typography } from '@mui/material';
import HotelsList from './hotelsList';
import { env } from "../../env";


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
            <HotelsList hotels={hotels} />
          )}

        </CardContent>
      </Paper>
    </div>;

  return (
    result
  );
};

export default Main;