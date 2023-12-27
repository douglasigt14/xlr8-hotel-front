"use client";

import React, { FC, useState, useEffect } from 'react';
import {CardContent, Paper, Skeleton, Typography } from '@mui/material';
import HotelsList from './hotelsList';



const Main: FC = () => {
  const [loadding, setLoading] = useState(false);
  const [hotels, setHotels] = useState([]);
  
  let result = (loadding ? <Skeleton
    variant="rectangular"
    width="100%"
    height={500}
  /> :
    <div className="conteiner-card">
      <Typography variant="h4">Lista de Hoteis </Typography>
      <br/>
      <Paper sx={{ minHeight: 700 }}>
          <CardContent>
          <div>
            <HotelsList hotels={hotels} />
          </div>
          </CardContent>
      </Paper>
    </div>);

  return (
    result
  );
};

export default Main;