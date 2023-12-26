"use client";

import React, { FC, useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction,CardContent, Paper, Skeleton, Typography } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HotelIcon from '@mui/icons-material/Hotel';
import PaidIcon from '@mui/icons-material/Paid';
import HotelAdmin from './hotelAdmin';
import RoomAdmin from './roomAdmin';


const Admin: FC = () => {
  const [loadding, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  
  let result = (loadding ? <Skeleton
    variant="rectangular"
    width="100%"
    height={500}
  /> :
    <div className="conteiner-card">
      <Typography variant="h3">Admin CRUD</Typography>
      <br/>
      <Paper sx={{ minHeight: 700 }}>
          <Paper  elevation={3}>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction label="Hotels" icon={<ApartmentIcon />} />
              <BottomNavigationAction label="Quartos" icon={<HotelIcon />} />
          </BottomNavigation>
          </Paper>
          <CardContent>
              {value == 0 ? <HotelAdmin></HotelAdmin> : value == 1 ? <RoomAdmin></RoomAdmin>: null}
          </CardContent>
        
      </Paper>
    </div>);
  return (
    result
  );
};

export default Admin;