import * as React from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator";
import Snackbar from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { GridToolbarFilterButton } from "@mui/x-data-grid";
import { GridToolbarDensitySelector } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { MdTask } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { deleteTask } from "../../../../api/tasks";

// ✅ Valid
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


   
    try {
      // Simulating a 200 ms pause with setTimeout
      await new Promise((timeoutResolve) => setTimeout(timeoutResolve, 200));

    

      let apiUrl = "";

      console.log(_action);

      switch (_action) {

        case "update":
          if (
            user.nombre?.trim() === "" ||
            user.activo === undefined ||
            user.id_proceso === undefined
          ) {
            throw new Error("Invalid user data");
          }
          apiUrl = `http://localhost:3000/api/tasks/${user.id_tarea}`;
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

export default function DataGridCrudTest({ handleOpenDialog }) {
  console.log(handleOpenDialog);
  const mutateRow = useFakeMutation();
  const noButtonRef = React.useRef(null);
  const [promiseArguments, setPromiseArguments] = React.useState(null);
  const [rows, setRows] = React.useState([]);
  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Aquí deberías hacer tu solicitud de red para obtener los datos
        // Reemplaza 'TU_URL_DE_DATOS' con la URL real de tus datos
        const response = await fetch("http://localhost:3000/api/tasks");
        const data = await response.json();
        // Agrega el campo 'id_tarea' a cada fila usando el índice como valor único
        const rowsWithId = data.map((row, index) => ({
          ...row,
          id: row.id_tarea || index.toString(),
        }));

        setRows(rowsWithId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  /* console.log(rows); */

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

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow,"update");

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

  const handleEntered = () => {
    // The `autoFocus` is not used because, if used, the same Enter that saves
    // the cell triggers "No". Instead, we manually focus the "No" button once
    // the dialog is fully open.
    // noButtonRef.current?.focus();
  };
  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);


    

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
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

  function CustomToolbar(props) {
    const { handleOpenDialog } = props;

    console.log(handleOpenDialog);
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton color="secondary" />
        <GridToolbarFilterButton color="secondary" />
        <GridToolbarDensitySelector color="secondary" />
        <GridToolbarExport color="secondary" />
        <Button
          color="secondary"
          startIcon={<FaTasks />}
          onClick={handleOpenDialog}
        >
          Agregar Nueva Tarea
        </Button>
      </GridToolbarContainer>
    );
  }

  const handleDeleteClick=async (id)=>{


    console.log(id);

   try {
      // Make the HTTP request to save in the backend
      const response = await deleteTask(id)

     /*  setSnackbar({ children: "User successfully deleted", severity: "success" });
      resolve(response); */
      /* setPromiseArguments(null); */
    } catch (error) {
      /* setSnackbar({ children: "Name can't be empty", severity: "error" });
     /*  reject(oldRow); 
      setPromiseArguments(null); */
    


  



   
   
   }}

   
const processes = [
  { id_proceso: 1, nombre: "Carta Invitacion" },
  { id_proceso: 2, nombre: "Notificacion" },
  { id_proceso: 3, nombre: "Inspeccion" },
  { id_proceso: 4, nombre: "Requerimiento 1" },
  { id_proceso: 5, nombre: "Requerimiento 2" },
  { id_proceso: 6, nombre: "Ejecucion fiscal" },
  { id_proceso: 7, nombre: "Cortes" },
  { id_proceso: 8, nombre: "Encuesta" },
  { id_proceso: 10, nombre: "Lecturas" },
];

const columns = [
  {
    field: "nombre",
    renderHeader: () => (
      <strong style={{ color: "#5EBFFF" }}>{"Nombre"}</strong>
    ),
    width: 300,
    editable: true,
  },
  {
    field: "activo",
    renderHeader: () => (
      <strong style={{ color: "#5EBFFF" }}>{"Activo"}</strong>
    ),
    type: "boolean",
    width: 80,
    align: "left",
    headerAlign: "left",
    editable: true,
    renderCell: (params) => <CheckCell data={params.row.activo} />,
  },
  {
    field: "id_proceso",
    renderHeader: () => (
      <strong style={{ color: "#5EBFFF" }}>
        {"Proceso"}
        {/*    <span role="img" aria-label="task" style={{color:"#5EBFFF"}}>
        📃
        </span> */}
      </strong>
    ),
    type: "singleSelect",
    width: 150,
    align: "left",
    headerAlign: "left",
    editable: true,
    valueGetter: ({ row }) => {
      const targetProcess = processes.find(
        (process) => process.id_proceso === row.id_proceso
      );
      return targetProcess ? targetProcess.nombre : "";
    },
    valueOptions: () => processes.map((process) => process.nombre),
    valueParser: (newValue) => {
      const targetProcess = processes.find(
        (process) => process.nombre === newValue
      );
      return targetProcess ? targetProcess.id_proceso : "";
    },
  },
  {
    field: "actions",
    type: "actions",
    renderHeader: () => (
      <strong style={{ color: "#5EBFFF" }}>
        {"Proceso"}
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
           onClick={()=>handleDeleteClick(id)} 
          color="inherit"
        />,
      ];
    },
  },
];


  return (
    <div style={{ height: 400, width: "100%" }}>
      {renderConfirmDialog()}
      <DataGrid
        slots={{ toolbar: CustomToolbar }}
        slotProps={{ toolbar: { handleOpenDialog } }}
        checkboxSelection
        localeText={{
          toolbarColumns: "Columnas",
          toolbarFilters: "Filtros",
          toolbarDensity: "Tamaño Celda",
          toolbarExport: "Exportar",
        }}
        rows={rows}
        columns={columns}
        processRowUpdate={processRowUpdate}
      />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
}

/* const columns = [
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', editable: true },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    type: 'date',
    width: 180,
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    width: 220,
  },
]; */


/* const handleYes = async () => {
  const { newRow, oldRow, reject, resolve } = promiseArguments;

  try {
    // Make the HTTP request to save in the backend
    const response = await mutateRow(newRow,"update");

    setSnackbar({ children: "User successfully saved", severity: "success" });
    resolve(response);
    setPromiseArguments(null);
  } catch (error) {
    setSnackbar({ children: "Name can't be empty", severity: "error" });
    reject(oldRow);
    setPromiseArguments(null);
  }

}; */



/* const rows = [
  {
    id: 1,
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 2,
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 3,
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 4,
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 5,
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
];
  */
