import { Alert, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { getAllProcesses } from "../../../../api/process";
import { GridToolbarColumnsButton } from "@mui/x-data-grid";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import axios from "axios";
function ProcessGridCrud() {


    const useFakeMutation = () => {
    
        return React.useCallback(async (user, _action) => {
         /*  console.log(user); */
      
          try {
            // Simulating a 200 ms pause with setTimeout
            await new Promise((timeoutResolve) => setTimeout(timeoutResolve, 200));
      
            let apiUrl = "";
      
           
      
            switch (_action) {
              case "update":
                console.log(user);
                /* if (
                  user.nombre?.trim() === ""  ||
                  user.activo === undefined ||
                  user.id_proceso === undefined 
                ) {
                  throw new Error("Invalid user data");
                } */
                apiUrl = `http://localhost:3000/api/processes/${user.id}`;
                break;
              case "delete":
                apiUrl = `http://localhost:3000/api/tasks/${user}`;
                break;
              case "create":
                apiUrl = "http://localhost:3000/api/createUser";
                break;
              default:
                throw new Error("Unsupported action");
            }
      
            // Utilizing Axios to make the HTTP request based on the action
      
            let method = "";
      
            switch (_action) {
              case "delete":
                method = "delete";
                break;
              case "update":
                method = "put";
                break;
              // You can add more cases if needed for other actions
      
              // Default to "put" for other actions
            }
      
            // Utilizing Axios to make the HTTP request based on the action
            const response = await axios({
              method: method,
              url: apiUrl,
              data: user,
            });
      
            console.log(response.data);
            return response.data;
          } catch (error) {
            // Handle Axios errors or validation errors
            console.error(error);
            throw error;
          }
      
        }, []);
      };
  const [rows, setRows] = React.useState([]);
  const noButtonRef = React.useRef(null);
  const mutateRow = useFakeMutation();
  const [promiseArguments, setPromiseArguments] = React.useState(null);
  const [snackbar, setSnackbar] = React.useState(null);

  const AvatarImage = ({ data }) => {
    return (
      <Avatar
        alt="Remy Sharp"
        src={data}
      />
    );
  };

  const CheckCell = ({ data }) => {
    if (data) {
      return (
        <IconButton aria-label="check" size="small">
          <CheckIcon fontSize="inherit" color="secondary" />
        </IconButton>
      );
    } else {
      return (
        <IconButton aria-label="check" size="small">
          <ClearIcon fontSize="inherit" sx={{ color: "red" }} />
        </IconButton>
      );
    }
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow, "update");

    
      setSnackbar({ children: "User successfully saved", severity: "success" });
      resolve(response);
      setPromiseArguments(null);
    } catch (error) {
      setSnackbar({ children: "Name can't be empty", severity: "error" });
      reject(oldRow);
      setPromiseArguments(null);
    }
    /*  try {
      // Casting the spell of HTTP POST using Axios
      const response = await axios.post('your_api_endpoint', newRow);
      setSnackbar({ children: 'User successfully saved', severity: 'success' });
      resolve(response.data); // Gaze upon the mystical data property!
      setPromiseArguments(null);
    } catch (error) {
      setSnackbar({ children: "Name can't be empty", severity: 'error' });
      reject(oldRow);
      setPromiseArguments(null);
    }
   */
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Aquí deberías hacer tu solicitud de red para obtener los datos
        // Reemplaza 'TU_URL_DE_DATOS' con la URL real de tus datos
        const response = await getAllProcesses();

        const data = response.data;

        // Agrega el campo 'id_tarea' a cada fila usando el índice como valor único
        const rowsWithId = data.map((row, index) => ({
          ...row,
          id: row.id_proceso || index.toString(),
        }));

        setRows(rowsWithId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function computeMutation(newRow, oldRow) {
    if (newRow.nombre !== oldRow.nombre) {
      return `Nombre de '${oldRow.nombre}' a '${newRow.nombre}'`;
    }

    if (newRow.fecha_ingreso !== oldRow.fecha_ingreso) {
      return `Name from '${oldRow.fecha_ingreso}' to '${newRow.fecha_ingreso}'`;
    }

    if (newRow.activo !== oldRow.activo) {
      return `Name from '${oldRow.activo}' to '${newRow.activo}'`;
    }

    if (newRow.orden !== oldRow.orden) {
      return `Orden de '${oldRow.orden}' a '${newRow.orden}'`;
    }

    if (newRow.procedimiento_almacenado_gestion_grafico !== oldRow.procedimiento_almacenado_gestion_grafico) {
        return `Orden de '${oldRow.procedimiento_almacenado_gestion_grafico}' a '${newRow.procedimiento_almacenado_gestion_grafico}'`;
      }

      if (newRow.tabla_gestion !== oldRow.tabla_gestion) {
        return `Orden de '${oldRow.tabla_gestion}' a '${newRow.tabla_gestion}'`;
      }


      if (newRow.url_aplicacion_movil !== oldRow.url_aplicacion_movil) {
        return `Orden de '${oldRow.url_aplicacion_movil}' a '${newRow.url_aplicacion_movil}'`;
      }

  /*   
   

    
     */
    return null;
  }

  const processRowUpdate = React.useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    []
  );

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };


  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    function computeMutation(newRow, oldRow) {
      if (newRow.nombre !== oldRow.nombre) {
        return `Name from '${oldRow.nombre}' to '${newRow.nombre}'`;
      }
      if (newRow.activo !== oldRow.activo) {
        return `¿Realmente deseas cambiar el estado de 'Activo' de '${
          oldRow.activo ? "✅" : "❎" || ""
        }' a '${newRow.activo ? "✅" : "❎" || ""}'?`;
      }

      if (newRow.procedimiento_almacenado_gestion !== oldRow.procedimiento_almacenado_gestion) {
        return `Proceso from '${oldRow.procedimiento_almacenado_gestion || ""}' to '${
          newRow.procedimiento_almacenado_gestion || ""
        }'`;
      }


      if (newRow.procedimiento_almacenado_gestion_grafico !== oldRow.procedimiento_almacenado_gestion_grafico) {
        return `Proceso from '${oldRow.procedimiento_almacenado_gestion_grafico || ""}' to '${
          newRow.procedimiento_almacenado_gestion_grafico || ""
        }'`;
      }

      if (newRow.tabla_gestion !== oldRow.tabla_gestion) {
        return `Proceso from '${oldRow.tabla_gestion || ""}' to '${
          newRow.tabla_gestion || ""
        }'`;
      }


      if (newRow.url_aplicacion_movil !== oldRow.url_aplicacion_movil) {
        return `Proceso from '${oldRow.url_aplicacion_movil || ""}' to '${
          newRow.url_aplicacion_movil || ""
        }'`;
      }





      
      return null;
    }

    return (
      <Dialog
        maxWidth="xs"
        /* TransitionProps={{ onEntered: handleEntered }} */
        open={!!promiseArguments}
      >
        <DialogTitle>¿Esta usted seguro?</DialogTitle>
        <DialogContent dividers>
          {`Presiona 'Ok' , si  ${mutation}.`}
        </DialogContent>
        <DialogActions>
          <Button color="secondary" ref={noButtonRef} onClick={handleNo}>
            No
          </Button>
          <Button color="secondary" onClick={handleYes}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const buildColumns = () => {
    const columns = [
      {
        field: "nombre",
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>
            {"Nombre"}
            {/*    <span role="img" aria-label="task" style={{color:"#5EBFFF"}}>
            📃
            </span> */}
          </strong>
        ),
        width: 130,
        editable: true,
      },
      {
        field: "imagen",
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>
            {"Imagen"}
            {/*    <span role="img" aria-label="task" style={{color:"#5EBFFF"}}>
            📃
            </span> */}
          </strong>
        ),
        width: 100,
        editable: false,
        renderCell: (params) => (
            <AvatarImage
             
              data={params.row.imagen}
             
            />
          ),
      },
      {
        field: "activo",
        type:"boolean",
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>
            {"Estado"}
            {/*    <span role="img" aria-label="task" style={{color:"#5EBFFF"}}>
            📃
            </span> */}
          </strong>
        ),
        width: 80,
        editable: true,
        renderCell: (params) => <CheckCell data={params.row.activo} />,
      },
      {
        field: "procedimiento_almacenado_gestion",
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>
            {"Procedimiento Almacenada"}
            {/*    <span role="img" aria-label="task" style={{color:"#5EBFFF"}}>
            📃
            </span> */}
          </strong>
        ),
        width: 200,
        editable: true,
      },
      {
        field: "procedimiento_almacenado_gestion_grafico",
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>
            {"Procedimiento Almacenado Gestion Grafico"}
            {/*    <span role="img" aria-label="task" style={{color:"#5EBFFF"}}>
            📃
            </span> */}
          </strong>
        ),
        width: 300,
        editable: true,
      },
      {
        field: "tabla_gestion",
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>
            {"Tabla Gestion"}
            {/*    <span role="img" aria-label="task" style={{color:"#5EBFFF"}}>
            📃
            </span> */}
          </strong>
        ),
        width: 180,
        editable: true,
      },
      {
        field: "url_aplicacion_movil",
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>
            {"Url Aplicacion Movil"}
            {/*    <span role="img" aria-label="task" style={{color:"#5EBFFF"}}>
            📃
            </span> */}
          </strong>
        ),
        width: 180,
        editable: true,
      },
      {
        field: "actions",
        type: "actions",
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>
            {"Acciones"}
            {/*    <span role="img" aria-label="task" style={{color:"#5EBFFF"}}>
            📃
            </span> */}
          </strong>
        ),
        width: 100,
        cellClassName: "actions",
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
             /*  onClick={() => handleDeleteClick(id)} */
              color="inherit"
            />,
          ];
        },
      },

      /*  {
            field: "fecha_ingreso",
            type: "dateTime",
            renderHeader: () => (
              <strong style={{ color: "#5EBFFF" }}>
                {"Fecha de Ingreso"}
                
              </strong>
            ),
            valueGetter: ({ value }) => {
              return value && new Date(value);
            },
            width: 180,
            editable: true,
          }, */
    ];

    return columns;
  };

  const handleCloseSnackbar = () => setSnackbar(null);


  function CustomToolbar(props) {
    const { handleOpenDialog } = props;

  /*   console.log(handleOpenDialog); */
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton color="secondary" />
        <GridToolbarFilterButton color="secondary" />
        <GridToolbarDensitySelector color="secondary" />

        <GridToolbarExport color="secondary" />
        {/*  <Button
          color="secondary"
          startIcon={<FaTasks />}
          onClick={handleOpenDialog}
        >
          Agregar Nueva Tarea
        </Button> */}
        <Button
          color="secondary"
          /* onClick={handleOpenDialogForm} */
          startIcon={<AddOutlinedIcon />}
        >
          Agregar Nuevo Proceso
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
         {renderConfirmDialog()}
      <DataGrid
        rows={rows}
        columns={buildColumns()}
       localeText={{
          toolbarColumns: "Columnas",
          toolbarFilters: "Filtros",
          toolbarDensity: "Tamaño Celda",
          toolbarExport: "Exportar",
        }}
        slots={{ toolbar: CustomToolbar }}
         processRowUpdate={processRowUpdate}
          
      />
        {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  );
}

export default ProcessGridCrud;
