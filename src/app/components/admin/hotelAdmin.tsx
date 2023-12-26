"use client";

import React, { FC, useState, useEffect } from 'react';
import TableBasic from '../table';
import { Box, Button, FormControl, Grid, Input, InputAdornment, Modal, Skeleton, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { alertError, alertSucess, alertWarning } from "../alerts";
import {styleModal} from "../../styles/styles";

const HotelAdmin: FC = () => {
  const [loadding, setLoading] = useState(true);
  const labelsHeader = ["#", "Nome", "Endereço", "Imagem", "Editar", "Apagar"];
  const [hotels, setHotels] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    location: '',
    image_url: ''
  });
  const [titleModal, setTitleModal] = useState("Inserir");



  useEffect(() => {
    show();
  }, []);

  const show = () => {
    const URL = 'http://localhost:8081/api/hotels';
    const fetchRequest = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();

        data.forEach(item => {
          item.buttom_edit = 
          <Button 
          onClick={() => {
            handleOpen();
            setFormData({
              id: item.id,
              name: item.name,
              location: item.location,
              image_url: ''
            });
            setTitleModal("Editar");
          }}
          size="small" 
          variant="contained">
            <EditIcon></EditIcon> 
          </Button>;

          item.buttom_delete = <Button onClick={() => {
            deleteForId(item.id);
          }}
            size="small"
            variant="contained">
            <DeleteIcon></DeleteIcon>
          </Button>;
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
 

    let URL = titleModal == "Inserir" ? 'http://localhost:8081/api/hotels' : 'http://localhost:8081/api/hotels/'+formData.id;
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
      const response = await fetch('http://localhost:8081/api/hotels/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error ao realizar a request");
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
      name: '',
      location: '',
      image_url: ''
    });
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    clear();
  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    //const file = event.target.files[0];
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

      <div className='content-header'>
        <div>
          <Typography variant="h5">Hoteis</Typography>
        </div>
        <div>
          <Button onClick={() => {
            handleOpen();
            setTitleModal("Inserir");
          }} variant="contained">+</Button>
        </div>
      </div>
      <div className='content-table'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TableBasic labelsHeader={labelsHeader} data={hotels}></TableBasic>
          </Grid>
        </Grid>

      </div>


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
                  <TextField onChange={handleChange} required name="name" value={formData.name} label="Nome" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <TextField onChange={handleChange} required name="location" value={formData.location} label="Endereço" variant="outlined" fullWidth />
                </Grid>
              </Grid>


              <Grid container spacing={2}
                justifyContent="center"
                alignItems="center">
                <Grid item xs={12}>
                  <TextField
                    type="file"
                    label="Imagem"
                    name="image_url"
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      accept: 'image/*', // Aceita todos os tipos de imagens
                    }}
                    value={formData.image_url}
                  />
                </Grid>
              </Grid>
              <br /><br />
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

export default HotelAdmin;