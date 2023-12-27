"use client";

import React, { FC, useState, useEffect } from 'react';
import TableBasic from '../table';
import { Box, Button, FormControl, Grid, Input, InputAdornment, Modal, Skeleton, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { alertError, alertSucess, alertWarning } from "../alerts";
import { styleModal } from "../../styles/styles";
import { env } from "../../env";

const HotelAdmin: FC = () => {
  const [loadding, setLoading] = useState(true);
  const labelsHeader = ["#", "Nome", "Endereço", "Imagem", "Editar", "Apagar"];
  const [hotels, setHotels] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    location: '',
    image_url: '',
    file: '',
  });
  const [titleModal, setTitleModal] = useState("Inserir");



  useEffect(() => {
    show();
  }, []);

  const show = () => {
    const URL = env.backend + '/api/hotels';
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
                  image_url: item.image_url,
                  file: '',
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

        if(item.image_url){
          item.image_url = (
            <img
              src={`${env.backend}/${item.image_url}`}
              alt={item.name}
              style={{ maxWidth: '100%', maxHeight: '80px' }}
              loading="lazy"
            />
          );
        }
      });
        setLoading(false);
        setHotels(data);
      } catch (error) {
        //alertError(error);
      }
    };

    fetchRequest();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('location', formData.location);
    if (typeof formData.file !== 'string' && formData.file !== '') {
      formDataToSend.append('image_url', formData.file);
    }

   

    let URL =
      titleModal === 'Inserir'
        ? env.backend + '/api/hotels'
        : env.backend + '/api/hotels/' + formData.id;
    let METHOD = titleModal === 'Inserir' ? 'POST' : 'PUT';

    if(METHOD == 'PUT'){
      formDataToSend.append('_method', 'PUT');
    }

   
    
    try {
      const response = await fetch(URL, {
        method: 'POST',
        body: formDataToSend,
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
      const response = await fetch(env.backend + '/api/hotels/' + id, {
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
      image_url: '',
      file: '',
    });
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    clear();
    setOpen(false)
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image_url') {
      setFormData((prevData) => ({
        ...prevData,
        file: files[0],
        image_url: URL.createObjectURL(files[0]), // Exibe uma visualização da imagem no input (opcional)
      }));
    } else {
      const updatedValue = value;
      setFormData((prevData) => ({
        ...prevData,
        [name]: updatedValue,
      }));
    }
  };


  let result = (loadding ? <Skeleton
    variant="rectangular"
    width="100%"
    height={500}
  /> : 
   
   <div className="content">
        
      {( hotels.length > 0 ? 

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
    :
    <Grid container spacing={2}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height={500}
      >
       <Typography variant="h6" component="h2">
            Você não tem nenhum Hotel, casdastre primeiro para poder cadastrar quartos.
          </Typography>
          <br/>
      <Button onClick={() => {
        handleOpen();
        setTitleModal("Inserir");
      }} variant="contained">Inserir Hotel</Button>
    </Grid>)}


      <div className='content-table'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TableBasic labelsHeader={labelsHeader} data={hotels}></TableBasic>
          </Grid>
        </Grid>

      </div>


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
          <form onSubmit={handleSubmit} className='body-modal' encType="multipart/form-data">
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
                  />

                  {formData.image_url && typeof formData.image_url === 'string' ? (
                    <img src={formData.image_url} alt="Preview" style={{ maxWidth: '100%', maxHeight: '80px' }} />
                  ) : formData.image_url}
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