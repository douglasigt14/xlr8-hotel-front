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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); 

  if (data.length === 0) {
    return <div></div>;
  }

  const headers = Object.keys(data[0]);
  let headerCells: any[] = [];
  labelsHeader.forEach((label) => {
    headerCells.push(<TableCell key={label}>{label}</TableCell>);
  });


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
                header !== "prices" && (
                  <TableCell key={header}>{rowData[header]}</TableCell>
                )
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
