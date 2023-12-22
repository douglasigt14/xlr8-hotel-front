"use client";

import React, { FC, useState, useEffect } from 'react';
import TableBasic from './table';
import { Card, CardContent, Skeleton, Typography } from '@mui/material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';


const HotelAdmin: FC = () => {
  const [data, setData] = useState([]);
  const [loadding, setLoading] = useState(false);
  const labelsHeader = ["Nome"];
  
  let result = (loadding ? <Skeleton
    variant="rectangular"
    width="100%"
    height={500}
  /> :
    <div className="content">
       <Typography variant="h5">Lista de Hoteis</Typography>
      <TableBasic  labelsHeader={labelsHeader} data={data}></TableBasic>
    </div>);
  return (
    result
  );
};

export default HotelAdmin;