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
    console.log(user);

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
const AvatarImage = ({ data, handleClickOpen, setUrl }) => {
  if (!data) {
    return (
      <IconButton aria-label="delete">
        <BiSolidImageAdd />
      </IconButton>
    );
  } else {
    console.log(data);
    return (
    
        <Avatar  onClick={(e) => {
          handleClickOpen();
          setUrl(e.target.src);
        }}
          alt="Remy Sharp"
          src={data||"data:image/jpeg;base64,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EXT6Hq81IJBs5ucAWblNg6I3uD5yC37o87/BkqwGkgF2UEkAgXO7zNyi/Dx2Nj+vlHtfAbHJKBexJa2zfWx/K50Uuh2iilkMYD2mxcC9oAcBrca9NdbJZrgLrmebJakDUE+2SC1txd7N2ARpYNc4mwJ8PPgfls9U5viZ4/syGgENPiZmJfe41z6dBwX6zamAvAyyBhOUSlloyfW9/wAF+v2lj3ro2RTyZXZHPjjuwOvaxN+vklnyF1zPqGWo5A21PibYuN2Xba5yjWQD0Hx+awymZ2UTCMWD7X8Y0N47ezbQaeIgu6C8bbnGn0tN9jpK82a7LcNta510vbhdeOzO0Ac6KmlfLLM5jpN4+JsYyhzhYtBuLZemqWdrkXV9k9XGYA5hPmyNBAJs55y+K7NGhvPLqTm0Nhf2ru8WYI8+8ymzxfIbN8O8bYAOc4i4NwACb340eP7f5IS+licXNmMTjKw5PC251Y7jqLX6OV5T7VwvqKeAMlD52OezMwNADc984JzA/ZnlzClqSV7EKUdLgGcOGQS2zXZvCbZQ1vhfa5u5+YXPBtz0Bs8LMmQiUWcHEXvfNzuOg1Nh0sqCo29pmMmcWSkQz93dZrNX+PVvi9n7N3n5L0/24p8jHNZM5zy7JGGDeOaz7waSPCeWtzyCjZlyJ2o8zUosjiG1WenjlpDYmURvbI3xNu1xsRy4cVrlVxa1LqSegREUEhERAEREAREQBERAEREAREQBYDDJaqY1zGBkoFRfd1Fy0xHeDK0HQatafgt+vwBWTsQ1cwVJsfI90r3sipw5mURxElpcCHAkdLtHBWtPhNQ91OJxG1kFspYdXWtb/KOi1KI5tlVBLQy8WCSiikhsM7pMw1HCzefwKk1OEOfPE7QMEJjcb6glrhoOftK/RNpk7KMqcFndE2mdkELXXzg3cRcnh/ePJedZgczpS6JjInF996yR3C/NnAnqtcibbGwij2uw6SopTFFYuJF7kDQXvqfgq7GcJqhWRVdII3OEe7c2QkAcddOI8XI8lrURSaDimc2dsbUuoJ4XZN66ffDxeF4yZTr906kj+SmYrhFe+ekro44RUxtcx8RecliXgEHmMrzfXj1W9RTvGV3a99DmFXsXVup6phEb3y1LJg4EMBAa/OcuttX2sb6G/FaPHcFn73DWUgY6Rke73bzZttRcH0c7mOXHULWIm2yd2vfQxNLs9UNY+RzYXzSztle03ysAzkZfO7z8Oq2yIquVyyikERFBIREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREB//Z"}
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

function ServiceGridCrud({ handleClickOpen, setUrl }) {
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

  const handleInputOnChange = (event)=>{
    const{name,value,type,checked} = event.target
     // Actualiza el estado serviceData con el nuevo valor del campo Servicio
     const newValue = type ==='checkbox' ? checked:value
  setServiceData((prevState) => ({
    ...prevState,
    [name]: newValue,
  }));

  }

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



  const handleFileChange2 = async(event) => {
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

  console.log(rows);

  function computeMutation(newRow, oldRow) {
    if (newRow.nombre !== oldRow.nombre) {
      return `Name from '${oldRow.nombre}' to '${newRow.nombre}'`;
    }

    if (newRow.fecha_ingreso !== oldRow.fecha_ingreso) {
      return `Name from '${oldRow.fecha_ingreso}' to '${newRow.fecha_ingreso}'`;
    }

    if (newRow.activo !== oldRow.activo) {
      return `Name from '${oldRow.activo}' to '${newRow.activo}'`;
    }

    if (newRow.orden !== oldRow.orden) {
      return `Name from '${oldRow.orden}' to '${newRow.orden}'`;
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

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow, "update");

      console.log(response);

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
            data={params.row.imagen}
            handleClickOpen={handleClickOpen}
            setUrl={setUrl}
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
            data={params.row.icono_app_movil}
            handleClickOpen={handleClickOpen}
            setUrl={setUrl}
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

  const handleGuardar = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/services', serviceData)
  
      // Aquí puedes manejar la respuesta de la solicitud si es necesario
      console.log('Respuesta de la API:', response.data);
  
      // Cerrar el diálogo, actualizar el estado, o realizar otras acciones necesarias
    } catch (error) {
      console.error('Error al guardar datos:', error);
      // Aquí puedes manejar el error según tus necesidades
    }
  };

  const handleDeleteClick = async (id) => {
    console.log(id);

    try {
      // Make the HTTP request to save in the backend
      const response = await deleteTask(id);

      /*  setSnackbar({ children: "User successfully deleted", severity: "success" });
      resolve(response); */
      /* setPromiseArguments(null); */
    } catch (error) {
      /* setSnackbar({ children: "Name can't be empty", severity: "error" });
     /*  reject(oldRow); 
      setPromiseArguments(null); */
    }
  };

  function CustomToolbar(props) {
    const { handleOpenDialog } = props;

    console.log(handleOpenDialog);
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

  console.log(serviceData);

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
                <Stack direction={"row"} spacing={2} >
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
