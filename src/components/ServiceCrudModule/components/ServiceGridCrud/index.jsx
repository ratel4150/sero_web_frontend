import { Data } from "@react-google-maps/api";
import React from "react";
import DataGridCrud from "../../../TaskCrudModule/components/DataGridCrud";
import { getAllServices } from "../../../../api/service";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarColumnsButton,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Alert,
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Slide,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import functionsCustom from "../../../../helpers";
import { BiSolidImageAdd } from "react-icons/bi";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { GridToolbarDensitySelector } from "@mui/x-data-grid";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import axios from "axios";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { listObjects, uploadToS3 } from "../../../../services/s3.service";

const useFakeMutation = () => {
  /*  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (user.nombre?.trim() === '') {
            reject();
          } else if(user?.activo=== undefined){
            reject()

          } else if(user?.id_proceso=== undefined){
            reject()

          

          }else {
            console.log(user);
            resolve(user);

           
          }
        }, 200);
      }),
    [],
  ); */
  return React.useCallback(async (user, _action) => {
   /*  console.log(user); */

    try {
      // Simulating a 200 ms pause with setTimeout
      await new Promise((timeoutResolve) => setTimeout(timeoutResolve, 200));

      let apiUrl = "";

      console.log(_action);

      switch (_action) {
        case "update":
          if (
            user.nombre?.trim() === "" /* ||
            user.activo === undefined ||
            user.id_proceso === undefined */
          ) {
            throw new Error("Invalid user data");
          }
          apiUrl = `http://localhost:3000/api//services/${user.id_servicio}`;
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
    /*  try {
      // Simulando una pausa de 200 ms con setTimeout
      await new Promise((timeoutResolve) => setTimeout(timeoutResolve, 200));

      if (
        user.nombre?.trim() === "" ||
        user.activo === undefined ||
        user.id_proceso === undefined
      ) {
        throw new Error("Invalid user data");
      }

      // Utilizando Axios para realizar la solicitud HTTP con método PUT
      const response = await axios.put(
        `http://localhost:3000/api/tasks/${user.id_tarea}`,
        user
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Manejar errores de Axios o errores de validación
      console.error(error);
      throw error;
    } */
  }, []);
};
const AvatarImage = ({
  data,
  handleClickOpen,
  setUrl,
  setGetRowData,
  getDataRow,
  field,
}) => {
  if (!data) {
    return (
      <IconButton onClick={()=>{
        handleClickOpen();
        switch (field) {
          case "imagen":
           
            setGetRowData({ ...getDataRow, field: field });
            
            break;

            case "icono_app_movil":
           
            setGetRowData({ ...getDataRow, field: field });
            
            break;
        
          default:
            break;
        }
      }} aria-label="delete">
        <BiSolidImageAdd />
      </IconButton>
    );
  } else {

    return (
      <Avatar
        onClick={(e) => {
          handleClickOpen();
          setUrl(e.target.src);
          switch (field) {
            case "imagen":
             
              setGetRowData({ ...getDataRow, field: field });
              
              break;

              case "icono_app_movil":
             
              setGetRowData({ ...getDataRow, field: field });
              
              break;
          
            default:
              break;
          }
          
          
        }}
        alt="Remy Sharp"
        src={
          data 
        }
      />
    );
  }
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

function ServiceGridCrud({ handleClickOpen, setUrl, setGetRowData }) {
  const [open, setOpen] = React.useState(false);
  const noButtonRef = React.useRef(null);
  const [rows, setRows] = React.useState([]);
  const mutateRow = useFakeMutation();
  const [promiseArguments, setPromiseArguments] = React.useState(null);
  const [snackbar, setSnackbar] = React.useState(null);

  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedImage2, setSelectedImage2] = React.useState(null);

  const [serviceData, setServiceData] = React.useState({
    nombre: "",
    imagen: "",
    activo: Boolean(""),
    orden: Number(""),
    icono_app_movil: "",
  });

  const handleInputOnChange = (event) => {
    const { name, value, type, checked } = event.target;
    // Actualiza el estado serviceData con el nuevo valor del campo Servicio
    const newValue = type === "checkbox" ? checked : value;
    setServiceData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

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

      setServiceData((prevData) => {
        // Update the 'imagen' property in the state with the new fileUrl
        return { ...prevData, imagen: fileUrl };
      });
    } catch (error) {
      console.error("Error al subir archivo:", error.message);
      // Handle the error according to your requirements
    }
  };

  const handleFileChange2 = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage2(reader.result);
      };
      reader.readAsDataURL(file);
    }

    try {
      const fileUrl = await uploadToS3(file);
      console.log("URL del archivo subido:", fileUrl);

      setServiceData((prevData) => {
        // Update the 'imagen' property in the state with the new fileUrl
        return { ...prevData, icono_app_movil: fileUrl };
      });
    } catch (error) {
      console.error("Error al subir archivo:", error.message);
      // Handle the error according to your requirements
    }
  };

  const handleCloseDialogForm = () => {
    setOpen(false);
  };

  const handleOpenDialogForm = () => {
    setOpen(true);
  };

  const handleCloseSnackbar = () => setSnackbar(null);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Aquí deberías hacer tu solicitud de red para obtener los datos
        // Reemplaza 'TU_URL_DE_DATOS' con la URL real de tus datos
        const response = await getAllServices();

        const data = response.data.services;
        console.log(data);

        // Agrega el campo 'id_tarea' a cada fila usando el índice como valor único
        const rowsWithId = data.map((row, index) => ({
          ...row,
          id: row.id_servicio || index.toString(),
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
    /*  if (newRow.activo !== oldRow.activo) {
      return `¿Realmente deseas cambiar el estado de 'Activo' de '${
        oldRow.activo ? "✅" : "❎" || ""
      }' a '${newRow.activo ? "✅" : "❎" || ""}'?`;
    }
  
    if (newRow.id_proceso !== oldRow.id_proceso) {
      return `Proceso from '${oldRow.id_proceso || ""}' to '${
        newRow.id_proceso || ""
      }'`;
    } */
    return null;
  }

  

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

  const handleGuardar = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/services",
        serviceData
      );

      // Aquí puedes manejar la respuesta de la solicitud si es necesario
      console.log("Respuesta de la API:", response.data);

      // Cerrar el diálogo, actualizar el estado, o realizar otras acciones necesarias
    } catch (error) {
      console.error("Error al guardar datos:", error);
      // Aquí puedes manejar el error según tus necesidades
    }
  };

  const handleDeleteClick = async (id) => {
   /*  console.log(id); */

    try {
      // Make the HTTP request to save in the backend
      const response = await axios.delete(`http://localhost:3000/api/services/${id}`);
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
          onClick={handleOpenDialogForm}
          startIcon={<AddOutlinedIcon />}
        >
          Agregar Nuevo Servicio
        </Button>
      </GridToolbarContainer>
    );
  }

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

      if (newRow.id_proceso !== oldRow.id_proceso) {
        return `Proceso from '${oldRow.id_proceso || ""}' to '${
          newRow.id_proceso || ""
        }'`;
      }
      return null;
    }
    const handleNo = () => {
      const { oldRow, resolve } = promiseArguments;
      resolve(oldRow); // Resolve with the old row to not update the internal state
      setPromiseArguments(null);
    };
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
          <Button color="secondary" ref={noButtonRef}  onClick={handleNo} >
            No
          </Button>
          <Button color="secondary" onClick={handleYes}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

/*   console.log(serviceData); */

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
        width: 180,
        editable: true,
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
        width: 200,
        editable: false,
        renderCell: (params) => (
          <AvatarImage
            setGetRowData={setGetRowData}
            getDataRow={params.row}
            data={params.row.imagen}
            handleClickOpen={handleClickOpen}
            setUrl={setUrl}
            field={"imagen"}
          />
        ),
      },
      {
        field: "icono_app_movil",
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>
            {"Icono de App Movil"}
            {/*    <span role="img" aria-label="task" style={{color:"#5EBFFF"}}>
        📃
        </span> */}
          </strong>
        ),
        width: 200,
        editable: true,
        renderCell: (params) => (
          <AvatarImage
            setGetRowData={setGetRowData}
            getDataRow={params.row}
            data={params.row.icono_app_movil}
            handleClickOpen={handleClickOpen}
            setUrl={setUrl}
            field={"icono_app_movil"}
          />
        ),
      },
      {
        field: "activo",
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>
            {"Estado"}
            {/*    <span role="img" aria-label="task" style={{color:"#5EBFFF"}}>
        📃
        </span> */}
          </strong>
        ),
        width: 80,
        type: "boolean",
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
        width: 100,
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
    ];

    return columns;
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
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: CustomToolbar }}
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
                Servicio Nuevo
              </Typography>
              <Button autoFocus color="inherit" onClick={handleGuardar}>
                Guardar
              </Button>
            </Toolbar>
          </AppBar>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box sx={{ padding: "2rem" }}>
                <Typography variant="h6">Imagen</Typography>

                {
                  <img
                    className="rounded-full w-96 h-96"
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
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ padding: "1rem" }}>
                {/*       <Typography variant="h6">Imagen</Typography> */}
                <TextField
                  /*   helperText={help?"Informaciòn del propietario":null} */
                  color="secondary"
                  sx={{ width: "100%", marginBottom: "2rem" }}
                  id="input-with-icon-textfield-servicio"
                  label="Servicio"
                  name="nombre"
                  value={serviceData.nombre || ""}
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
                <Stack direction={"row"} spacing={2}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch name="activo" defaultChecked />}
                      label="Activo"
                      onChange={handleInputOnChange}
                    />
                  </FormGroup>
                  <TextField
                    /*   helperText={help?"Informaciòn del propietario":null} */
                    color="secondary"
                    sx={{ width: "100%", marginBottom: "2rem" }}
                    id="input-with-icon-textfield-servicio"
                    label="Servicio"
                    type="number"
                    name="orden"
                    value={serviceData.orden || ""}
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
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ padding: "1rem" }}>
                <Typography variant="h6">icono de app movil</Typography>
                {
                  <img
                    className="rounded-full w-96 h-96"
                    src={
                      selectedImage2 ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFYZkovo6Uq69lsMtG9ZPzszPBTa55NlR85uUqbmjNRy6Zvdh7WSBwLFpivd_70aNtmU&usqp=CAU"
                    }
                    alt="Imagen seleccionada"
                    style={{
                      marginTop: "10px",
                      /*     maxWidth: "100%",
                      height: "200px", */
                    }}
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
                  onChange={handleFileChange2}
                />
                {/*   <Button
                  sx={{ height: "3.3rem" }}
                  size="large"
                  variant="contained"
                  color="primary"
                  component="span"
                >
                  Upload
                </Button> */}

                {/* Mostrar la imagen seleccionada */}
              </Box>
            </Grid>
          </Grid>
        </Dialog>
      )}
    </Box>
  );
}

export default ServiceGridCrud;
