import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

function PaymentsSections() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'refernce',
          headerName: 'Referencia',
          width: 150,
          editable: true,
        },
        {
          field: 'description',
          headerName: 'Descripcion',
          width: 150,
          editable: true,
        },
        {
          field: 'amount_paid',
          headerName: 'Monto a Pagar',
          type: 'number',
          width: 110,
          editable: true,
        },
        {
            field: 'payment_date',
            headerName: 'Fecha de Pago',
            type: 'number',
            width: 110,
            editable: true,
          },
          {
            field: 'payment_period',
            headerName: 'Periodo de Pago',
            type: 'number',
            width: 110,
            editable: true,
          },
      /*   {
          field: 'payment_date',
          headerName: 'Fecha de Pago',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        }, */
      ];
      
      const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ];
  return (
    <DataGrid
    rows={rows}
    columns={columns}
    initialState={{
      pagination: {
        paginationModel: {
          pageSize: 5,
        },
      },
    }}
    pageSizeOptions={[5]}
    checkboxSelection
    disableRowSelectionOnClick/>
  )
}

export default PaymentsSections