"use client";

import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@mui/material';

export default function TableBasic({ data,  labelsHeader}) {
  // Estado para controlar a página atual e a quantidade de itens por página
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // você pode ajustar isso conforme necessário
  // Verifica se há dados para exibição
  if (data.length === 0) {
    return <div></div>;
  }

  // Obtém as chaves do primeiro objeto para usar como cabeçalhos dinâmicos
  const headers = Object.keys(data[0]);
  let headerCells: any[] = [];
  labelsHeader.forEach((label) => {
    headerCells.push(<TableCell key={label}>{label}</TableCell>);
  });

  

  // Função para lidar com a mudança de página
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Função para lidar com a mudança do número de itens por página
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // resetar a página ao alterar o número de itens por página
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>{headerCells}</TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((rowData, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header) => (
                <TableCell key={header}>{rowData[header]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
