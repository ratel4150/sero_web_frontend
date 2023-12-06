import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useTheme,
  useMediaQuery,
  TextField,
  InputAdornment,
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import React, { useEffect } from "react";
import Container from "../Container";
import { tokens } from "../../../../theme";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import PersonIcon from "@mui/icons-material/Person";
import { CheckBox, Favorite, FavoriteBorder } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useStoreZustand } from "../../../../zustan_store/useStoreZustand";
import { ImCancelCircle } from "react-icons/im";
function SearchDialog({ handleCloseDialog }) {
  const { setRowAccount ,setAccountData,plazaNumber,setAlertInfoFromRequest} = useStoreZustand();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [formDataFromInputs, setFormDataFromInputs] = React.useState({
    account: "",
    owner_name: "",
    street: "",
    cologne: "",
  });
  const [alertInfo, setAlertInfo] = React.useState(null);
  const [responseData, setResponseData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const colors = tokens(theme.palette.mode);
  const label = "hol";

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormDataFromInputs({
      ...formDataFromInputs,
      [name]: value,
    });
  };
  React.useEffect(() => {
    const apiUrl = `http://localhost:3000/api/AccountHistoryByParameters/${plazaNumber}/${formDataFromInputs.account}/${formDataFromInputs.owner_name}/${formDataFromInputs.street}/${formDataFromInputs.cologne}`;
    // Aquí puedes realizar la acción de búsqueda con el valor de "cuenta"
    // Por ahora, solo mostraremos el valor en la consola
    

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        setResponseData(data);
      } catch (error) {
        // Manejar errores, por ejemplo, imprimir el mensaje de error en la consola
        console.error("Error al hacer la solicitud:", error.message);
      }
    };

    // Llama a la función para hacer la solicitud al montar el componente
    fetchData();
  }, [
    formDataFromInputs.account,
    formDataFromInputs.owner_name,
    formDataFromInputs.street,
    formDataFromInputs.cologne,
  ]);

  console.log(responseData);

  const columns = [];

  responseData?.forEach((responseDataObject, index) => {
    if (index === 0) {
      for (const key in responseDataObject) {
        switch (key) {
          case "account":
            columns.push({
              field: key,
              headerName: "Cuenta",
              width: 150,
            });
            break;
          case "owner_name":
            columns.push({
              field: key,
              headerName: "Propietario",
              width: 250,
            });
            break;

          case "street":
            columns.push({
              field: key,
              headerName: "Calle",
              width: "auto",
            });
            break;
          case "cologne":
            columns.push({
              field: key,
              headerName: "Colonia",
              width: "auto",
              editable: true,
            });
            break;
          /*      case "cutoffDate":
          columns.push({
            field: key,
            headerName: "Fecha Corte",
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
            headerName: "Pago Dos Meses Anteriores",
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
            headerName: "Deuda",
            width: 150,
            editable: true,
            type:'string',
            valueGetter:({ value }) => {
              return value?`$ ${value}.00`:`$ 00.00`
            }

          });

          break; */

          default:
            break;
        }
      }
    }
  });

  console.log(columns);

  const rows = [];
  responseData?.forEach((responseDataObject, index) => {
    rows.push({ id: index + 1 + "Arturo", ...responseDataObject });
  });

  return (
    <Dialog
      fullScreen={fullScreen}
      open={true}
      onClose={handleCloseDialog}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle
        sx={{ backgroundColor: colors.primary[400] }}
        id="responsive-dialog-title"
 
      >
        {"BUSQUEDA PERSONALIZADA"}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              /*  border: "0.01rem solid white", */
              padding: "2rem",
              borderRadius: "1rem",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
              color="secondary"
                sx={{ marginBottom: "1rem", width: "400px" }}
                id="input-with-icon-textfield-account"
                label="Cuenta"
                onChange={handleChangeInput}
                value={formDataFromInputs.account}
                type="text"
                name="account"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <RecentActorsIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
              <TextField
              color="secondary"
                size="small"
                sx={{ width: "400px", marginBottom: "1rem" }}
                id="input-with-icon-textfield-contributor"
                name="owner_name"
                label="Propietario"
                onChange={handleChangeInput}
                value={formDataFromInputs.owner_name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
              <TextField
               color="secondary"
                size="small"
                sx={{ width: "400px", marginBottom: "1rem" }}
                id="input-with-icon-textfield-street"
                label="Calle"
                name="street"
                onChange={handleChangeInput}
                value={formDataFromInputs.street}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  color="secondary"
                  size="small"
                  sx={{ width: "400px", marginBottom: "1rem" }}
                  id="input-with-icon-textfield-cologne"
                  label="Colonia"
                  name="cologne"
                  onChange={handleChangeInput}
                  value={formDataFromInputs.cologne}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color=""/>
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
                {/*     <FormGroup sx={{display:"flex",flexDirection:"row",justifyContent:"start"}}>
              <FormControlLabel
                  
                  control={<Checkbox />}
                  label="Contenga"
                />
                <FormControlLabel
                  
                  control={<Checkbox />}
                  label="inicie con"
                />
                <FormControlLabel
                  disabled
                  control={<Checkbox />}
                  label="Igual"
                />
              </FormGroup> */}
              </Box>
            </Box>
          </Box>
        </Container>
        {loading ?(<Box sx={{textAlign:"center", padding:"20px"}}>
          <CircularProgress color="secondary" />

        </Box>):responseData ?(
          <DataGrid
            onRowClick={(params) => {
              setLoading(true); // Activa el indicador de carga
              const plaza_id = plazaNumber;
              const account_id = params.row.account;
              const apiUrl = `http://localhost:3000/api/AccountHistoryByCount/${plaza_id}/${account_id}/`;
          
              const fetchData = async () => {
                try {
                  const response = await axios.get(apiUrl);
                  const data = response.data;
          
                  // Hacer algo con los datos, por ejemplo, actualizar el estado del componente
                  setAlertInfoFromRequest({
                    status: response.status,
                    statusText: response.statusText,
                  });
                  setAccountData(data);
                } catch (error) {
                  // Manejar errores, por ejemplo, imprimir el mensaje de error en la consola
                  console.error("Error al hacer la solicitud:", error.message);
                  setAlertInfoFromRequest({
                    status: error.response?.status || 500,
                    statusText: error.message,
                  });
                } finally {
                  setLoading(false); // Desactiva el indicador de carga después de la solicitud
          
                  // Cierra el backdrop después de completar la búsqueda, considerando la duración
                  setTimeout(() => {
                    handelCloseBackDrop();
                  }, 0);
          
                  // Limpia la alerta después de cierto tiempo
                  setTimeout(() => {
                 
                  
                    handleCloseDialog();
                  }, 10);
                  setTimeout(() => {
                 
                    setAlertInfoFromRequest(null);
                   
                  }, 3000);
                }
              };
          
              // Llama a la función para hacer la solicitud al hacer clic en la fila
              fetchData();
            }}
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
        ):(<Box sx={{textAlign:"center", padding:"20px"}}>
          <CircularProgress color="secondary" />

        </Box>)}

        {/*   <DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText> */}
      </DialogContent>
      <DialogActions sx={{ backgroundColor: colors.primary[400] }}>
        <Button autoFocus onClick={handleCloseDialog} color="secondary" startIcon={<ImCancelCircle/>}>
          Cerrar
        </Button>
       {/*  <Button  autoFocus>Agree</Button> */}
      </DialogActions>
    </Dialog>
  );
}

export default SearchDialog;
