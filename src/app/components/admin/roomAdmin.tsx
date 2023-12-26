"use client";

import React, { FC, useState, useEffect } from 'react';
import TableBasic from '../table';
import { Box, Button, FormControl, Grid, Input, InputAdornment, Modal, Skeleton, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { alertError, alertSucess, alertWarning } from "../alerts";
import {styleModal} from "../../styles/styles";

const RoomAdmin: FC = () => {
  const [loadding, setLoading] = useState(true);
  const labelsHeader = ["#", "Tipo de Quarto", "Nº de Quartos","Editar", "Apagar"];
  const [hotels, setHotels] = useState([]);
  const [open, setOpen] = useState(false);
  const [openPrices, setOpenPrices] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    room_type: '',
    number_of_rooms: '',
    hotel_id: null
  });
  const [listPrices, setListPrices] = useState([]);
  const [titleModal, setTitleModal] = useState("Inserir");

  useEffect(() => {
    show();
  }, []);

  const show = () => {
    const URL = 'http://localhost:8081/api/hotels/details';
    const fetchRequest = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();

        data.forEach(hotel => {
          hotel.rooms.forEach(item => {
            item.buttom_edit = (
              <Button
                key={`edit-${item.id}`}
                onClick={() => {
                  handleOpen();
                  setFormData({
                    id: item.id,
                    room_type: item.room_type,
                    number_of_rooms: item.number_of_rooms,
                    hotel_id: hotel.id
                  });
                  setTitleModal("Editar");
                }}
                size="small"
                variant="contained"
              >
                <EditIcon />
              </Button>
            );
            
            item.buttom_delete = (
              <Button
                key={`buttom_delete-${item.id}`}
                onClick={() => {
                  deleteForId(item.id);
                }}
                size="small"
                variant="contained"
              >
                <DeleteIcon />
              </Button>
            );
          });
        });
        setLoading(false);
        setHotels(data);
      } catch (error) {
        alertError(error);
      }
    };

    fetchRequest();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    let URL = titleModal == "Inserir" ? 'http://localhost:8081/api/rooms' : 'http://localhost:8081/api/rooms/' + formData.id;
    let METHOD = titleModal == "Inserir" ? 'POST' : 'PUT';

    try {
      const response = await fetch(URL, {
        method: METHOD,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer a request');
      }
      const data = await response.json();
      alertSucess(data.msg);
      show();
    } catch (error) {
      alertError(error);

    } finally {
      clear();
    }
  };

  const deleteForId = async (id) => {
    try {
      const response = await fetch('http://localhost:8081/api/rooms/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer a request');
      }
      const data = await response.json();
      alertWarning(data.msg);
      show();
    } catch (error) {
      alertError(error);

    } finally {
      clear();
    }
  }

  const clear = () => {
    setOpen(false);
    setFormData({
      id: null,
      room_type: '',
      number_of_rooms: '',
      hotel_id: null
    });
  }

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false)
    clear();
  };


  const handleOpenPrices = () => {
    setOpenPrices(true);
  }
  const handleClosePrices = () => {
    setOpenPrices(false)
    clear();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };


  let result = (loadding ? <Skeleton
    variant="rectangular"
    width="100%"
    height={500}
  /> :
    <div className="content">
      <Typography variant="h4">Quartos</Typography>
      {hotels.map((hotel, index) =>
      (
        <div key={index}>
          <div className='content-header'>
            <div>
              <Typography variant="h5">{hotel.name}</Typography>
            </div>
            <div>
              <Button onClick={() => {
                setFormData((prevData) => ({
                  ...prevData,
                  ['hotel_id']: hotel.id,
                }));
                handleOpen();
                setTitleModal("Inserir");
              }} variant="contained">+</Button>
            </div>
          </div>
          {
            hotel.rooms.length > 0 ? (
            <div  className='content-table'>
            <Grid  container spacing={2}>
              <Grid   item xs={12}>
                <TableBasic  labelsHeader={labelsHeader} data={hotel.rooms}></TableBasic>
              </Grid>
            </Grid>

          </div>) : (<p>Nada</p>) 
          }
          
        </div>
      ))}


      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {titleModal}
          </Typography>
          <form onSubmit={handleSubmit} className='body-modal'>
            <FormControl fullWidth>
              <Grid container spacing={2}
                justifyContent="center"
                alignItems="center">
                <Grid item xs={6}>
                  <TextField onChange={handleChange} required name="room_type" value={formData.room_type} label="Tipo de Quarto" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <TextField onChange={handleChange} required name="number_of_rooms" value={formData.number_of_rooms} label="Nº de Quartos" variant="outlined" fullWidth />
                </Grid>
              </Grid>

              <br/><br/>
              <br/><br/>
              <br/><br/>
              <Grid container spacing={2}
                justifyContent="space-around"
                alignItems="end">
                <Grid item xs={4}>
                  <Button onClick={() => { setOpen(false) }} fullWidth variant="text">Cancelar</Button>
                </Grid>
                <Grid item xs={4}>
                  <Button onClick={handleOpen} type="submit" fullWidth variant="contained">Salvar</Button>
                </Grid>
              </Grid>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </div>
  );
  return (
    result
  );
};

export default RoomAdmin;