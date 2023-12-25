"use client";

import React, { FC, useState, useEffect } from 'react';
import TableBasic from '../table';
import { Box, Button, FormControl, Grid, Input, InputAdornment, Modal, Skeleton, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {alertError,alertSucess} from "../alerts"; 

const styleModal = {
  position: 'absolute' as 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const HotelAdmin: FC = () => {
  const [loadding, setLoading] = useState(true);
  const labelsHeader = ["Nome", "Endereço", "Imagem", "Editar", "Apagar"];
  const [hotels, setHotels] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({
		name: '',
		location: '',
		image_url: null
	});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /* const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Faça o que quiser com o arquivo, como enviá-lo para o servidor ou exibir uma visualização
  }; */

  const handleChange = (e) => {
		const { name, value } = e.target;
		const updatedValue = value;
    
		setFormData((prevData) => ({
			...prevData,
			[name]: updatedValue,
		}));
    console.log(formData);
	};

  useEffect(() => {
    const URL = 'http://localhost:8081/api/hotels';
    const fetchHotels = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();

        data.forEach( item => {
          item.buttom_edit = <Button size="small" variant="contained"><EditIcon></EditIcon> </Button>;
          item.buttom_delete = <Button size="small" variant="contained"><DeleteIcon></DeleteIcon> </Button>;
        });
        setLoading(false);
        setHotels(data);
      } catch (error) {
        console.error('Erro ao buscar hotéis:', error);
      }
    };

    fetchHotels();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:8081/api/hotels', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				alertError('Erro ao fazer a request');
				throw new Error('Erro ao fazer a request');
			}

			alertSucess('Hotel Cadastrado');
		} catch (error) {
			alertError('Erro ao fazer a request');
      
		}finally {
      clear();
		  }
	};

  const clear = () => {
    setOpen(false);
    setFormData({
      name: '',
      location: '',
      image_url: null
    });
  }


  let result = (loadding ? <Skeleton
    variant="rectangular"
    width="100%"
    height={500}
  /> :
    <div className="content">

      <div className='content-header'>
        <div>
          <Typography variant="h5">Lista de Hoteis</Typography>
        </div>
        <div>
          <Button onClick={handleOpen} variant="contained">+</Button>
        </div>
      </div>
      <div className='content-table'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TableBasic labelsHeader={labelsHeader} data={hotels}></TableBasic>
          </Grid>
        </Grid>

      </div>


      {/* Modal Inserir */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Inserir
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
                      <Button onClick={() => { setOpen(false)}} fullWidth variant="text">Cancelar</Button>
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