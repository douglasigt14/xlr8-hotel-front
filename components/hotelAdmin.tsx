"use client";

import React, { FC, useState, useEffect } from 'react';
import TableBasic from './table';
import { Box, Button, FormControl, Grid, Input, InputAdornment, Modal, Skeleton, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Faça o que quiser com o arquivo, como enviá-lo para o servidor ou exibir uma visualização
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
	
    alert("Submit");

		/* try {
			const response = await fetch('http://localhost:8080/api/singup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				alertError();
				throw new Error('Erro ao enviar inscrição');
			}

			alertSucess();
		} catch (error) {
			alertError();
		}finally {
			router.push('/');
		  } */
	};


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
                  <TextField required name="name" label="Nome" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <TextField required name="location" label="Endereço" variant="outlined" fullWidth />
                </Grid>
              </Grid>


              <Grid container spacing={2}
                justifyContent="center"
                alignItems="center">
                <Grid item xs={12}>
                  <TextField
                    type="file"
                    label="Imagem"
                    onChange={handleFileUpload}
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