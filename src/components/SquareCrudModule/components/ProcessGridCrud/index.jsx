import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { getAllProcesses } from "../../../../api/process";
import { GridToolbarColumnsButton } from "@mui/x-data-grid";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import axios from "axios";
import { uploadToS3 } from "../../../../services/s3.service";
import { ImCancelCircle } from "react-icons/im";
import { FaRegCircleCheck } from "react-icons/fa6";
import { getAllSquares } from "../../../../api/square";
/**
 * Componente que muestra una cuadrícula de procesos y permite realizar operaciones como agregar, editar y eliminar procesos.
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.handleClickOpen - Función para manejar la apertura del diálogo.
 * @param {Function} props.setUrl - Función para establecer la URL.
 * @param {Function} props.setGetRowData - Función para establecer los datos de la fila.
 * @returns {React.ReactElement} El componente `ProcessGridCrud`.
 */
function ProcessGridCrud({ handleClickOpen, setUrl, setGetRowData }) {
  /**
   * Función que simula una mutación en la base de datos.
   * @function
   * @returns {Function} - Función de retorno para realizar la mutación.
   */
  const useFakeMutation = () => {
    return React.useCallback(async (user, _action) => {
      /*  console.log(user); */

      try {
        // Simulating a 200 ms pause with setTimeout
        await new Promise((timeoutResolve) => setTimeout(timeoutResolve, 200));

        let apiUrl = "";

        switch (_action) {
          case "update":
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

        return response.data;
      } catch (error) {
        // Handle Axios errors or validation errors
        console.error(error);
        throw error;
      }
    }, []);
  };

  /**
   * Estados del componente:
   *
   * @typedef {Object} ComponentStates
   * @property {Array} rows - Estado que almacena las filas de datos.
   * @property {Object} noButtonRef - Referencia a un botón (inicializada a `null`).
   * @property {Function} mutateRow - Función de mutación simulada para realizar operaciones en la base de datos.
   * @property {Object|null} promiseArguments - Estado que almacena los argumentos de la promesa.
   * @property {Object|null} snackbar - Estado que maneja el estado de la snackbar.
   * @property {boolean} open - Estado que maneja el estado de un diálogo.
   * @property {boolean} openDialogDelete - Estado que maneja el estado de un diálogo de eliminación.
   * @property {string|null} selectedImage - Estado que almacena la imagen seleccionada.
   * @property {Object} processData - Estado que almacena los datos del proceso.
   * @property {boolean} validateInputs - Estado que maneja la validación de los campos de entrada.
   */
  const [rows, setRows] = React.useState([]);
  const noButtonRef = React.useRef(null);
  const mutateRow = useFakeMutation();
  const [promiseArguments, setPromiseArguments] = React.useState(null);
  const [snackbar, setSnackbar] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [processData, setProcessData] = React.useState({
    nombre: "",
    imagen: "",
    activo: Boolean(""),
    procedimiento_almacenado_gestion: "",
    procedimiento_almacenado_gestion_grafico: "",
    tabla_gestion: "",
    url_aplicacion_movil: "",
  });

  const [validateInputs, setValidateInputs] = React.useState({
    nombre: false,
    procedimiento_almacenado_gestion: false,
    procedimiento_almacenado_gestion_grafico: false,
    tabla_gestion: false,
    url_aplicacion_movil: false,
  });
  /**
   * Función para abrir el diálogo de eliminación.
   *
   * @function
   * @name handleClickOpenDialogDelete
   * @returns {void}
   */
  const handleClickOpenDialogDelete = () => {
    setOpen(true);
  };
  /**
   * Función para cerrar el diálogo de eliminación.
   *
   * @function
   * @name handleClickCloseDialogDelete
   * @returns {void}
   */
  const handleClickCloseDialogDelete = () => {
    setOpen(false);
  };

  /**
   * Maneja el cambio de entrada de datos en los campos del formulario.
   *
   * @function
   * @name handleInputOnChange
   * @param {object} event - Objeto de evento que representa el cambio de entrada.
   * @returns {void}
   */
  const handleInputOnChange = (event) => {
    const { name, value, type, checked } = event.target;
    // Actualiza el estado serviceData con el nuevo valor del campo Servicio
    const newValue = type === "checkbox" ? checked : value;
    setProcessData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));

    // Realiza validación específica para el campo 'nombre'
    if (name === "nombre") {
      const isValid = value.length > 0;

      setValidateInputs((prevValidateInputs) => ({
        ...prevValidateInputs,
        [name]: isValid,
      }));
    }
  };
  /**
   * Componente funcional que representa una imagen de avatar con funcionalidad adicional.
   *
   * @component
   * @name AvatarImage
   * @param {object} props - Propiedades del componente.
   * @param {string} props.data - Datos de la imagen del avatar.
   * @param {Function} props.handleClickOpen - Función para manejar la apertura de un diálogo.
   * @param {Function} props.getDataRow - Función para obtener datos de una fila.
   * @returns {JSX.Element} Elemento JSX que representa la imagen de avatar.
   */
  const AvatarImage = ({ data, handleClickOpen, getDataRow }) => {
    return (
      <Avatar
        onClick={() => {
          handleClickOpen();
          setGetRowData(getDataRow);
        }}
        alt="Remy Sharp"
        src={data}
      />
    );
  };
  /**
   * Componente funcional que representa una celda con marca de verificación o cruz.
   *
   * @component
   * @name CheckCell
   * @param {object} props - Propiedades del componente.
   * @param {boolean} props.data - Datos para determinar si mostrar la marca de verificación o cruz.
   * @returns {JSX.Element} Elemento JSX que representa la celda con marca de verificación o cruz.
   */
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
  /**
   * Maneja el evento de confirmación al hacer clic en "Sí" en el cuadro de diálogo de confirmación.
   *
   * @function
   * @name handleYes
   * @async
   * @throws {Error} Se lanza un error si ocurre un problema al realizar la operación.
   * @returns {Promise<void>} Una promesa que se resuelve después de realizar la operación.
   */
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
  /**
   * Realiza una solicitud para obtener todos los procesos y actualiza el estado con los datos recuperados.
   *
   * @function
   * @name fetchProcesses
   * @async
   * @throws {Error} Se lanza un error si hay un problema al recuperar los datos.
   * @returns {Promise<void>} Una promesa que se resuelve después de actualizar el estado con los datos recuperados.
   */
  const fetchProcesses = React.useCallback(async () => {
    try {
      const response = await getAllSquares();
      const data = response.data;
      const rowsWithId = data.map((row, index) => ({
        ...row,
        id: row.id_plaza || index.toString(),
      }));
      setRows(rowsWithId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
  /**
   * Efecto secundario que se ejecuta después del montaje y cada vez que la función `fetchProcesses` cambia.
   * Inicia la recuperación de procesos al montar el componente o cuando `fetchProcesses` cambia.
   *
   * @function
   * @name useEffectFetchProcesses
   * @memberof Componente
   * @inner
   * @param {Function} fetchProcesses - La función para recuperar procesos.
   * @returns {void}
   */
  React.useEffect(() => {
    fetchProcesses();
  }, [fetchProcesses]);
  /**
   * Función que calcula la mutación entre una fila nueva y una fila antigua.
   *
   * Compara cada propiedad de las filas y devuelve una cadena que describe la mutación.
   * Si no hay cambios, devuelve null.
   *
   * @function
   * @name computeMutation
   * @param {Object} newRow - La nueva fila.
   * @param {Object} oldRow - La fila antigua.
   * @returns {string|null} - Cadena que describe la mutación o null si no hay cambios.
   */
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

    if (
      newRow.procedimiento_almacenado_gestion !==
      oldRow.procedimiento_almacenado_gestion
    ) {
      return `Orden de '${oldRow.procedimiento_almacenado_gestion}' a '${newRow.procedimiento_almacenado_gestion}'`;
    }

    if (
      newRow.procedimiento_almacenado_gestion_grafico !==
      oldRow.procedimiento_almacenado_gestion_grafico
    ) {
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

  /**
   * Función para cerrar el diálogo del formulario.
   *
   * @function
   * @name handleCloseDialogForm
   */

  const handleCloseDialogForm = () => {
    setOpen(false);
  };
  /**
   * Función para abrir el diálogo del formulario.
   *
   * @function
   * @name handleOpenDialogForm
   */
  const handleOpenDialogForm = () => {
    setOpen(true);
  };
  /**
   * Función de retorno de llamada para la actualización de una fila del proceso.
   *
   * @function
   * @name processRowUpdate
   * @param {Object} newRow - Nueva fila de datos.
   * @param {Object} oldRow - Antigua fila de datos.
   * @returns {Promise} Promesa que se resuelve o se rechaza según la mutación calculada.
   */
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
  /**
   * Maneja la acción cuando se hace clic en el botón "No".
   *
   * @function
   * @name handleNo
   */
  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };
  /**
   * Renderiza el diálogo de confirmación con la información de la mutación.
   *
   * @function
   * @name renderConfirmDialog
   * @returns {ReactNode|null} - El componente del diálogo de confirmación o nulo si no hay argumentos de promesa.
   */
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

      if (
        newRow.procedimiento_almacenado_gestion !==
        oldRow.procedimiento_almacenado_gestion
      ) {
        return `Proceso from '${
          oldRow.procedimiento_almacenado_gestion || ""
        }' to '${newRow.procedimiento_almacenado_gestion || ""}'`;
      }

      if (
        newRow.procedimiento_almacenado_gestion_grafico !==
        oldRow.procedimiento_almacenado_gestion_grafico
      ) {
        return `Proceso from '${
          oldRow.procedimiento_almacenado_gestion_grafico || ""
        }' to '${newRow.procedimiento_almacenado_gestion_grafico || ""}'`;
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
  /**
   * Maneja el clic en el botón de eliminación y realiza la eliminación de la fila con el ID proporcionado.
   *
   * @async
   * @function
   * @name handleDeleteClick
   * @param {string} id - El ID de la fila a eliminar.
   * @returns {Promise<void>} - Una promesa que se resuelve después de la eliminación exitosa.
   */
  const handleDeleteClick = async (id) => {
    /*  console.log(id); */

    try {
      // Make the HTTP request to save in the backend
      const response = await axios.delete(
        `http://localhost:3000/api/processes/${id}`
      );
      setSnackbar({ children: "Delete successful", severity: "success" });

      // Handle the response as needed
      /*  console.log('Delete successful:', response.data); */

      /*  setSnackbar({ children: "User successfully deleted", severity: "success" });
       resolve(response); */
      /* setPromiseArguments(null); */
    } catch (error) {
      console.log(error);
      /* setSnackbar({ children: "Name can't be empty", severity: "error" });
      /*  reject(oldRow); 
       setPromiseArguments(null); */
    }
  };
  /**
   * Construye y devuelve las columnas para la tabla de procesos.
   *
   * @function
   * @name buildColumns
   * @returns {Array} - Un array de objetos que representa las columnas de la tabla.
   */
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
            handleClickOpen={handleClickOpen}
            getDataRow={params.row}
            data={params.row.imagen}
          />
        ),
      },
      {
        field: "activo",
        type: "boolean",
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
        field: "orden",
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>
            {"Orden"}
            {/*    <span role="img" aria-label="task" style={{color:"#5EBFFF"}}>
            📃
            </span> */}
          </strong>
        ),
        width: 200,
        editable: true,
      },
      {
        field: "id_horario",
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>
            {"Horario"}
            {/*    <span role="img" aria-label="task" style={{color:"#5EBFFF"}}>
            📃
            </span> */}
          </strong>
        ),
        width: 300,
        editable: true,
      },
      {
        field: "latitud",
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>
            {"Latitud"}
            {/*    <span role="img" aria-label="task" style={{color:"#5EBFFF"}}>
            📃
            </span> */}
          </strong>
        ),
        width: 180,
        editable: true,
      },
      {
        field: "longitud",
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>
            {"Longitud"}
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
              onClick={() => handleDeleteClick(id)}
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
  /**
   * Cierra la notificación (snackbar) actualmente abierta.
   *
   * @function
   * @name handleCloseSnackbar
   */
  const handleCloseSnackbar = () => setSnackbar(null);
  /**
   * Componente que representa la barra de herramientas personalizada para la tabla.
   *
   * @component
   * @name CustomToolbar
   * @returns {JSX.Element} JSX que renderiza la barra de herramientas personalizada.
   */
  function CustomToolbar() {
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
          onClick={handleOpenDialogForm}
          startIcon={<AddOutlinedIcon />}
        >
          Agregar Nuevo Proceso
        </Button>
      </GridToolbarContainer>
    );
  }
  /**
   * Maneja el cambio de archivos en el componente de entrada de archivos.
   *
   * @function
   * @name handleFileChange
   * @param {object} event - Objeto del evento que representa el cambio de archivos.
   * @returns {Promise<void>} Promesa que se resuelve después de manejar el cambio de archivos.
   */
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }

    try {
      const fileUrl = await uploadToS3(file);
      console.log("URL del archivo subido:", fileUrl);

      setProcessData((prevData) => {
        // Update the 'imagen' property in the state with the new fileUrl
        return { ...prevData, imagen: fileUrl };
      });
    } catch (error) {
      console.error("Error al subir archivo:", error.message);
      // Handle the error according to your requirements
    }
  };
/**
 * Maneja el evento de guardar datos al hacer clic en el botón 'Guardar'.
 *
 * @function
 * @name handleGuardar
 * @returns {Promise<void>} Promesa que se resuelve después de intentar guardar los datos.
 */
  const handleGuardar = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/processes",
        processData
      );

      // Aquí puedes manejar la respuesta de la solicitud si es necesario
      handleCloseDialogForm();
      console.log("Respuesta de la API:", response.data);

      // Cerrar el diálogo, actualizar el estado, o realizar otras acciones necesarias
    } catch (error) {
      console.error("Error al guardar datos:", error);
      // Aquí puedes manejar el error según tus necesidades
    }
  };

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

      {open && (
        <Dialog
          fullScreen
          open={open}
          onClose={handleCloseDialogForm}
          /*   TransitionComponent={React.forwardRef(function Transition(
            props,
            ref
          ) {
            return <Slide direction="up" ref={ref} {...props} />;
          })} */
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseDialogForm}
                aria-label="close"
              >
                <CloseOutlinedIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Proceso Nuevo
              </Typography>
              <Button autoFocus color="inherit" onClick={handleGuardar}>
                Guardar
              </Button>
            </Toolbar>
          </AppBar>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  padding: "2rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box>
                  {
                    <img
                      className="rounded-full w-56 h-56"
                      src={
                        selectedImage ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFYZkovo6Uq69lsMtG9ZPzszPBTa55NlR85uUqbmjNRy6Zvdh7WSBwLFpivd_70aNtmU&usqp=CAU"
                      }
                      alt="Imagen seleccionada"
                    />
                  }

                  <TextField
                    type="file"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputProps: {
                        accept: "image/*", // specify accepted file types if needed
                      },
                    }}
                    onChange={handleFileChange}
                  />
                  {/*   <Button
                  sx={{ height: "3.3rem" }}
                  size="large"
                  variant="contained"
                  color="primary"
                  component="span"
                  onClick={()=>{
                    listObjects()
                  }}
                  
                >
                  Upload
                </Button> */}

                  {/* Mostrar la imagen seleccionada */}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ padding: "1rem" }}>
                {/*       <Typography variant="h6">Imagen</Typography> */}
                <TextField
                  /*   helperText={help?"Informaciòn del propietario":null} */
                  color="secondary"
                  sx={{ width: "100%", marginBottom: "2rem" }}
                  id="input-with-icon-textfield-servicio"
                  label="Proceso"
                  name="nombre"
                  value={processData.nombre || ""}
                  onChange={handleInputOnChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MiscellaneousServicesIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
                {validateInputs.nombre ? (
                  <Stack sx={{ marginTop: "0.2rem" }} direction="row">
                    <FaRegCircleCheck style={{ color: "#14B814" }} />{" "}
                    <Typography color={"secondary"} variant="caption">
                      ¡Gracias por ingresar un servicio!
                    </Typography>
                  </Stack>
                ) : (
                  <Typography sx={{ color: "red" }} variant="caption">
                    * ¡Por favor, ingresa el nombre de un servicio!
                  </Typography>
                )}
                <Stack
                  direction={"row"}
                  spacing={2}
                  sx={{ padding: "0.2rem", margin: "0.2rem" }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch name="activo" defaultChecked />}
                      label="Activo"
                      onChange={handleInputOnChange}
                    />
                  </FormGroup>
                </Stack>
                <TextField
                  /*   helperText={help?"Informaciòn del propietario":null} */
                  color="secondary"
                  sx={{ width: "100%", marginBottom: "2rem" }}
                  id="input-with-icon-textfield-servicio"
                  label="Procedimiento almacenado "
                  name="procedimiento_almacenado_gestion"
                  value={processData.procedimiento_almacenado_gestion || ""}
                  onChange={handleInputOnChange}
                  /*  onChange={handle} */
                  /*   value={informationContributor?.["owner_name"] || ""} */
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MiscellaneousServicesIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />

                <TextField
                  /*   helperText={help?"Informaciòn del propietario":null} */
                  color="secondary"
                  sx={{ width: "100%", marginBottom: "2rem" }}
                  id="input-with-icon-textfield-servicio"
                  label="Procedimiento almacenado gestion grafico"
                  name="procedimiento_almacenado_gestion_grafico"
                  value={
                    processData.procedimiento_almacenado_gestion_grafico || ""
                  }
                  onChange={handleInputOnChange}
                  /*  onChange={handle} */
                  /*   value={informationContributor?.["owner_name"] || ""} */
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MiscellaneousServicesIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />

                <TextField
                  /*   helperText={help?"Informaciòn del propietario":null} */
                  color="secondary"
                  sx={{ width: "100%", marginBottom: "2rem" }}
                  id="input-with-icon-textfield-servicio"
                  label="Tabla Gestion"
                  name="tabla_gestion"
                  value={processData.tabla_gestion || ""}
                  onChange={handleInputOnChange}
                  /*  onChange={handle} */
                  /*   value={informationContributor?.["owner_name"] || ""} */
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MiscellaneousServicesIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
                <TextField
                  /*   helperText={help?"Informaciòn del propietario":null} */
                  color="secondary"
                  sx={{ width: "100%", marginBottom: "2rem" }}
                  id="input-with-icon-textfield-servicio"
                  label="Url Aplicacion Movil"
                  name="url_aplicacion_movil"
                  value={processData.url_aplicacion_movil || ""}
                  onChange={handleInputOnChange}
                  /*  onChange={handle} */
                  /*   value={informationContributor?.["owner_name"] || ""} */
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MiscellaneousServicesIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
              </Box>
            </Grid>
          </Grid>
        </Dialog>
      )}
      {openDialogDelete && (
        <Dialog
          open={openDialogDelete}
          onClose={handleClickCloseDialogDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Proceso"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿Quieres borra este proceso?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickCloseDialogDelete}>Cancelar</Button>
            <Button onClick={handleClickOpenDialogDelete} autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

export default ProcessGridCrud;
