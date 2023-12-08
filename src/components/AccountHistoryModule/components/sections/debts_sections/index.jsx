import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import React from "react";
import { Box } from "@mui/material";
import functionsCustom from "../../../../../helpers";
import useCombinedSlices from "../../../../../hooks/useCombinedSlices";
/**
 * Componente que muestra información sobre deudas.
 *
 * @component
 * @example
 * // Ejemplo de uso
 * <DebtsSections />
 *
 * @returns {JSX.Element} - React component
 */
function DebtsSections() {
  
  const { debts } = useCombinedSlices();
/**
   * Construye las columnas para el componente DataGrid.
   *
   * @returns {Array} - Un array de objetos que representa las columnas.
   */
  const buildColumns = ()=>{


  const columns = [];
  debts?.forEach((debtObject, index) => {
    if (index === 0) {
      for (const key in debtObject) {
        switch (key) {
          
          case "lastPaymentDate":
            columns.push({
              field: key,
              renderHeader: () => (
                <strong style={{color:"#5EBFFF"}}>
                  {"Fecha Ultimo Pago "}
               {/*    <span role="img" aria-label="gestor" style={{color:"#5EBFFF"}}>
                    🧑
                  </span> */}
                </strong>
              ),
              width: 150,
              editable: true,
              type:'dateTime',
              valueGetter:({ value }) => {
                return new Date(value)
              }
           
              
            });
            break;
          case "updateDate":
            columns.push({
              field: key,
              renderHeader: () => (
                <strong style={{color:"#5EBFFF"}}>
                  {"Fecha Actualizaciòn "}
               {/*    <span role="img" aria-label="gestor" style={{color:"#5EBFFF"}}>
                    🧑
                  </span> */}
                </strong>
              ),
              width: 150,
              editable: true,
              type:'dateTime',
              valueGetter:({ value }) => {
                return new Date(value)
              }
            });
            break;
          case "cutoffDate":
            columns.push({
              field: key,
              renderHeader: () => (
                <strong style={{color:"#5EBFFF"}}>
                  {"Fecha de Corte "}
               {/*    <span role="img" aria-label="gestor" style={{color:"#5EBFFF"}}>
                    🧑
                  </span> */}
                </strong>
              ),
              width: 150,
              editable: true,
              type:'dateTime',
              valueGetter:({ value }) => {
                return new Date(value)
              }
            });
            break;
          case "lasTwoMonthPayment":
            columns.push({
              field: key,
              renderHeader: () => (
                <strong style={{color:"#5EBFFF"}}>
                  {"Pago Ultimo Bimestre"}
               {/*    <span role="img" aria-label="gestor" style={{color:"#5EBFFF"}}>
                    🧑
                  </span> */}
                </strong>
              ),
              width: 150,
              editable: true,
              type:'string',
              valueGetter:({ value }) => {
                return value?`$ ${value}.00`:`$ 00.00`
              }
            });
            break;
            case "debtAmount":
            columns.push({
              field: key,
              renderHeader: () => (
                <strong style={{color:"#5EBFFF"}}>
                  {"Deuda "}
               {/*    <span role="img" aria-label="gestor" style={{color:"#5EBFFF"}}>
                    🧑
                  </span> */}
                </strong>
              ),
              width: 150,
              editable: true,
              type:'string',
              valueGetter:({ value }) => {
                return value
                ? `$ ${functionsCustom.formatNumberWithCommas(value)}`
                : `$ 00.00`;
              }

            });

            break;

          default:
            break;
        }
      }
    }
  });

  return columns
}
  
  /* const columns = [
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
         {
          field: 'payment_date',
          headerName: 'Fecha de Pago',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        }, 
      ]; */

   /* const rowsjkh = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35,cutoffDate:"" },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];  */
/*   const de = [];
  debts?.forEach((debtObject,index)=>{
    if (index===0) {
      for (const key in debtObject) {
      rows.push({key:debtObject[key]})
      }
      
    }
   
  })
   */

  
  /**
   * Construye las filas para el componente DataGrid.
   *
   * @returns {Array} - Un array de objetos que representa las filas.
   */
   const buildRows=()=>{

  
  const rows = [];
  /* debts?.forEach((debtObject,index)=>{
    debtObject={...debtObject,id: index + 1}
    rows.push(debtObject)
   

  }) */
  debts?.forEach((debtObject, index) => {
    // Verificar si todas las propiedades del objeto son undefined
    const allUndefined = Object.values(debtObject).every(value => value === undefined);
  
    if (debtObject && !allUndefined) {
     /*  console.log(debtObject); */
      debtObject = { ...debtObject, id: index + 1 };
      rows.push(debtObject);
    }
  });

 return rows
}
/**
   * Componente personalizado para la barra de herramientas del DataGrid.
   *
   * @returns {JSX.Element} - React component
   */

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton color="secondary" />
        <GridToolbarFilterButton color="secondary"/>
        <GridToolbarDensitySelector color="secondary"/>
        <GridToolbarExport color="secondary"/>
      </GridToolbarContainer>
    );
  }
 

  return (
    <Box  sx={{
      height: 300,
      width: "100%",
      "& .cold": {
        color: "red",
      },
      "& .payment": {
        color: "#17E85D",
      },
      "& .secondLetter": {
        color: "#ff9900",
      },
      "& .thirdLetter": {
        color: "#33cc33",
      },
      "& .fourthLetter": {
        color: "#ff0000",
      },
    }}>

    
    <DataGrid
    slots={{ toolbar: CustomToolbar }}
    localeText={{
      toolbarColumns: "Columnas",
      toolbarFilters: "Filtros",
      toolbarDensity: "Tamaño Celda",
      toolbarExport: "Exportar"
    }}
      color
      rows={buildRows()}
      columns={buildColumns()}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5,10,30,50]}
      checkboxSelection
      disableRowSelectionOnClick
      getCellClassName={(params) => {
        if (
          params.value &&
          typeof params.value === "string" &&
          params.value.includes("$")
        ) {
          return "payment";
        }
      }}
    /></Box>
  );
}
DebtsSections.propTypes = {
  /**
   * La lista de deudas.
   */
  debts: PropTypes.array.isRequired,
};

export default DebtsSections;
