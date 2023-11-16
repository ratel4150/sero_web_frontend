import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

function DebtsSections() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'debt_amount',
          headerName: 'Deuda',
          width: 150,
          editable: true,
        },
        {
          field: 'last_payment_date',
          headerName: 'Ultima Fecha de Pago',
          width: 150,
          editable: true,
        },
        {
          field: 'update_date',
          headerName: 'Fecha de Actualizacion',
          type: 'number',
          width: 110,
          editable: true,
        },
        {
            field: 'cutoff_date',
            headerName: 'Fecha de Corte',
            type: 'date',
            width: 110,
            editable: true,
          },
          {
            field: 'last_two_month_payment',
            headerName: 'Ultimos Pagos',
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
    disableRowSelectionOnClick
    />
  )
}

export default DebtsSections