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
import { ImCancelCircle } from "react-icons/im";
import { FaRegCircleCheck } from "react-icons/fa6";




/**
 * Simulates asynchronous mutations for CRUD operations on user data.
 *
 * @typedef {Object} User
 * @property {string} [nombre] - The user's name.
 * @property {boolean} [activo] - The user's active status.
 * @property {string} [id_servicio] - The ID of the service.
 *
 * @callback MutationCallback
 * @param {User} user - The user data.
 * @param {string} action - The CRUD action ('update', 'delete', 'create').
 * @returns {Promise<Object>} - A promise that resolves to the mutation result.
 * @throws {Error} - Throws an error if the user data is invalid.
 *
 * @function
 * @name useFakeMutation
 * @returns {MutationCallback} - The mutation callback function.
 *
 * @example
 * // Usage example
 * const mutateRow = useFakeMutation();
 * try {
 *   const result = await mutateRow({ nombre: 'John', id_servicio: '123' }, 'update');
 *   console.log('Mutation successful:', result);
 * } catch (error) {
 *   console.error('Mutation failed:', error.message);
 * }
 */
const useFakeMutation = () => {
 
  return React.useCallback(async (user, _action) => {
   

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

    
      return response.data;
    } catch (error) {
      // Handle Axios errors or validation errors
      console.error(error);
      throw error;
    }
    
  }, []);
};


/**
 * Avatar image component with conditional rendering based on data presence.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string|null} props.data - The image source URL or null if no image.
 * @param {Function} props.handleClickOpen - Function to handle click and open.
 * @param {Function} props.setUrl - Function to set the URL.
 * @param {Function} props.setGetRowData - Function to set the row data.
 * @param {Object} props.getDataRow - The data of the row.
 * @param {string} props.field - The field identifier.
 * @returns {JSX.Element} - The rendered AvatarImage component.
 *
 * @example
 * // Usage example
 * <AvatarImage
 *   data="/path/to/image.jpg"
 *   handleClickOpen={handleClick}
 *   setUrl={setImageUrl}
 *   setGetRowData={setRowData}
 *   getDataRow={rowData}
 *   field="imagen"
 * />
 */

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
      <IconButton
        onClick={() => {
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
        }}
        aria-label="delete"
      >
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
        src={data}
      />
    );
  }
};

/**
 * CheckCell component for rendering an IconButton with check or clear icon based on data.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.data - Boolean data to determine the icon.
 * @returns {JSX.Element} - The rendered CheckCell component.
 *
 * @example
 * // Usage example
 * <CheckCell data={true} />
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
 * ServiceGridCrud component for managing services using a DataGrid.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.handleClickOpen - Function to handle opening a dialog.
 * @param {Function} props.setUrl - Function to set the URL.
 * @param {Function} props.setGetRowData - Function to set row data.
 * @returns {JSX.Element} - The rendered ServiceGridCrud component.
 *
 * @example
 * // Usage example
 * <ServiceGridCrud
 *   handleClickOpen={handleClickOpen}
 *   setUrl={setUrl}
 *   setGetRowData={setGetRowData}
 * />
 */
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

  const [validateInputs, setValidateInputs] = React.useState({
    nombre: false,
    orden: false,
  });

  /**
 * Handles the change event for input fields, updating the state and performing validation.
 *
 * @function
 * @param {Object} event - The input change event.
 * @param {string} event.name - The name of the input field.
 * @param {string|boolean} event.value - The value of the input field.
 * @param {string} event.type - The type of the input field.
 * @param {boolean} event.checked - The checked status (for checkboxes).
 *
 * @returns {void}
 *
 * @example
 * // Usage example
 * const handleInputOnChange = (event) => {
 *   // ... (function body)
 * };
 */
  const handleInputOnChange = (event) => {
    const { name, value, type, checked } = event.target;
    // Actualiza el estado serviceData con el nuevo valor del campo Servicio
    const newValue = type === "checkbox" ? checked : value;
    setServiceData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));

    switch (name) {
      case "nombre":
        setValidateInputs((prevValidateInputs) => ({
          ...prevValidateInputs,
          [name]: value.length > 0,
        }));

        break;

      case "orden":
        setValidateInputs((prevValidateInputs) => ({
          ...prevValidateInputs,
          [name]: value > 0,
        }));

        break;

      default:
        break;
    }
  };


  /**
 * Handles the change event for file input, updates the selected image preview,
 * uploads the file to Amazon S3, and updates the state with the file URL.
 *
 * @async
 * @function
 * @param {Object} event - The file change event.
 * @param {Object} event.target - The file input element.
 * @param {File} event.target.files[0] - The selected file.
 *
 * @returns {Promise<void>} A promise that resolves when the file is uploaded and state is updated.
 *
 * @example
 * // Usage example
 * const handleFileChange = async (event) => {
 *   // ... (function body)
 * };
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

      setServiceData((prevData) => {
        // Update the 'imagen' property in the state with the new fileUrl
        return { ...prevData, imagen: fileUrl };
      });
    } catch (error) {
      console.error("Error al subir archivo:", error.message);
      // Handle the error according to your requirements
    }
  };

  /**
 * Handles the change event for file input, updates the selected image preview,
 * uploads the file to Amazon S3, and updates the state with the file URL.
 *
 * @async
 * @function
 * @param {Object} event - The file change event.
 * @param {Object} event.target - The file input element.
 * @param {File} event.target.files[0] - The selected file.
 *
 * @returns {Promise<void>} A promise that resolves when the file is uploaded and state is updated.
 *
 * @example
 * // Usage example
 * const handleFileChange = async (event) => {
 *   // ... (function body)
 * };
 */

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
  /**
 * Closes the dialog form by updating the state.
 *
 * @function
 * @returns {void}
 *
 * @example
 * // Usage example
 * const handleCloseDialogForm = () => {
 *   // ... (function body)
 * };
 */

  const handleCloseDialogForm = () => {
    setOpen(false);
  };
/**
 * Closes the dialog form by updating the state.
 *
 * @function
 * @returns {void}
 *
 * @example
 * // Usage example
 * const handleCloseDialogForm = () => {
 *   // ... (function body)
 * };
 */
  const handleOpenDialogForm = () => {
    setOpen(true);
  };

  const handleCloseSnackbar = () => setSnackbar(null);

  /**
 * Fetches data asynchronously and updates the component state with the retrieved data.
 *
 * @function
 * @returns {void}
 *
 * @example
 * // Usage example
 * React.useEffect(() => {
 *   const fetchData = async () => {
 *     try {
 *       // Make a network request to get data
 *       const response = await getAllServices();
 *
 *       // Extract the relevant data from the response
 *       const data = response.data.services;
 *
 *       // Add the 'id_tarea' field to each row using the index as a unique value
 *       const rowsWithId = data.map((row, index) => ({
 *         ...row,
 *         id: row.id_servicio || index.toString(),
 *       }));
 *
 *       // Update the component state with the new data
 *       setRows(rowsWithId);
 *     } catch (error) {
 *       console.error("Error fetching data:", error);
 *     }
 *   };
 *
 *   // Trigger the data fetching when the component mounts (empty dependency array)
 *   fetchData();
 * }, []);
 */
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

  /**
 * Computes a mutation description based on the changes between the new and old row data.
 *
 * @function
 * @param {Object} newRow - The new row data.
 * @param {Object} oldRow - The old row data.
 * @returns {string|null} - A string describing the mutation or null if no changes detected.
 *
 * @example
 * // Usage example
 * const mutationDescription = computeMutation(newRow, oldRow);
 * if (mutationDescription) {
 *   console.log("Mutation:", mutationDescription);
 * } else {
 *   console.log("No changes detected.");
 * }
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


  /**
 * Handles the user's confirmation to update a row.
 *
 * @function
 * @async
 * @throws {Error} Throws an error if the update request fails.
 * @returns {Promise<void>} A Promise that resolves when the update is successful.
 *
 * @example
 * // Usage example
 * try {
 *   await handleYes();
 *   console.log("Update successful");
 * } catch (error) {
 *   console.error("Update failed:", error.message);
 * }
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
  
  };


  /**
 * Process row update by computing the mutation and returning a Promise.
 *
 * @function
 * @param {Object} newRow - The updated row data.
 * @param {Object} oldRow - The original row data.
 * @returns {Promise<Object>} A Promise that resolves with the updated row data or rejects with the original row data if nothing was changed.
 *
 * @example
 * // Usage example
 * const updatedRow = await processRowUpdate(newData, oldData);
 * console.log("Row updated:", updatedRow);
 *
 * @example
 * // Usage example with error handling
 * try {
 *   const updatedRow = await processRowUpdate(newData, oldData);
 *   console.log("Row updated:", updatedRow);
 * } catch (error) {
 *   console.error("Update failed:", error.message);
 * }
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
 * Handle the process of saving data.
 *
 * @function
 * @async
 * @returns {Promise<void>} A Promise that resolves once the data is successfully saved or rejects if an error occurs.
 *
 * @example
 * // Usage example
 * try {
 *   await handleGuardar();
 *   console.log("Data saved successfully!");
 * } catch (error) {
 *   console.error("Error saving data:", error.message);
 * }
 */

  const handleGuardar = async () => {
     // Verificar si todos los campos están validados
  const isFormValid = Object.values(validateInputs).every((isValid) => isValid);

  if (isFormValid) {
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
  } else {
    console.log("Formulario no válido. Por favor, completa todos los campos correctamente.");
    // Puedes mostrar un mensaje al usuario indicando que debe completar todos los campos correctamente.
  }
  };



/**
 * Handle the process of deleting a service by making an HTTP DELETE request to the backend.
 *
 * @function
 * @async
 * @param {string} id - The identifier of the service to be deleted.
 * @throws {Error} Throws an error if the delete operation fails.
 *
 * @example
 * // Usage example
 * try {
 *   const serviceId = "example-service-id";
 *   await handleDeleteClick(serviceId);
 *   console.log("Service deleted successfully!");
 * } catch (error) {
 *   console.error("Error deleting service:", error.message);
 * }
 */
  const handleDeleteClick = async (id) => {
    /*  console.log(id); */

    try {
      // Make the HTTP request to save in the backend
      const response = await axios.delete(
        `http://localhost:3000/api/services/${id}`
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
 * Custom toolbar component for the service grid. It includes various actions like column selection,
 * filtering, density selector, and export. Additionally, it provides a button to open a dialog
 * for adding a new service.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.handleOpenDialog - The function to handle opening the dialog for adding a new service.
 * @returns {React.ReactElement} The rendered component.
 *
 * @example
 * // Usage example
 * const handleOpenDialogFunc = () => {
 *   // Implement the logic to open the dialog for adding a new service
 * };
 *
 * // Render the CustomToolbar component with the handleOpenDialog function
 * <CustomToolbar handleOpenDialog={handleOpenDialogFunc} />
 */
  function CustomToolbar() {
    
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton color="secondary" />
        <GridToolbarFilterButton color="secondary" />
        <GridToolbarDensitySelector color="secondary" />

        <GridToolbarExport color="secondary" />
        {/*    <Button
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


  /**
 * Renders a confirmation dialog based on the changes between the new and old rows.
 * The dialog content is determined by computing the mutation between the rows.
 *
 * @function
 * @returns {?string} The confirmation dialog content or null if no confirmation is needed.
 *
 * @example
 * // Usage example
 * const confirmationDialog = renderConfirmDialog();
 * if (confirmationDialog) {
 *   // Render and display the confirmation dialog
 *   showDialog(confirmationDialog);
 * }
 */

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    function computeMutation(newRow, oldRow) {
      if (newRow.nombre !== oldRow.nombre) {
        return `Nombre de '${oldRow.nombre}' a '${newRow.nombre}'`;
      }
      if (newRow.activo !== oldRow.activo) {
        return `¿Realmente deseas cambiar el estado de 'Activo' de '${
          oldRow.activo ? "✅" : "❎" || ""
        }' a '${newRow.activo ? "✅" : "❎" || ""}'?`;
      }

      if (newRow.orden !== oldRow.orden) {
        return `Proceso de '${oldRow.orden || ""}' a '${
          newRow.orden || ""
        }'`;
      }
      return null;
    }



    /**
 * Handles the 'No' button click in the confirmation dialog.
 * Resolves the promise with the old row to avoid updating the internal state.
 *
 * @function
 * @example
 * // Usage example
 * handleNo();
 */
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
 * Builds an array of columns for a data grid.
 *
 * @function
 * @returns {Array} An array of column configurations for the data grid.
 *
 * @example
 * // Usage example
 * const columns = buildColumns();
 * // Resulting columns array can be used in a data grid component
 * <DataGrid columns={columns} rows={rows} />
 */
  const buildColumns = () => {
      /**
   * The configuration for a column in the data grid.
   *
   * @typedef {Object} ColumnConfig
   * @property {string} field - The field identifier for the column.
   * @property {Function} [renderHeader] - The function to render the header content.
   * @property {number} [width] - The width of the column.
   * @property {boolean} [editable] - Indicates whether the column is editable.
   * @property {Function} [renderCell] - The function to render the cell content.
   * @property {string} [type] - The type of the column (e.g., 'boolean', 'dateTime').
   * @property {string} [cellClassName] - The class name for the cell.
   * @property {Function} [getActions] - The function to get actions for the cell.
   */
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
                    className="rounded-full w-36 h-36"
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
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
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
                {validateInputs.nombre ? (
                  <Stack sx={{ marginTop: "0.2rem" }} direction="row">
                    <FaRegCircleCheck style={{ color: "#14B814" }} />{" "}
                    <Typography color={"secondary"} variant="caption">
                      ¡Gracias por ingresar un proceso!
                    </Typography>
                  </Stack>
                ) : (
                  <Typography sx={{ color: "red" }} variant="caption">
                    * ¡Por favor, ingresa el nombre de un proceso!
                  </Typography>
                )}
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
                    label="Orden"
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
                  {validateInputs.orden ? (
                    <Stack sx={{ marginTop: "0.2rem" }} direction="row">
                      <FaRegCircleCheck style={{ color: "#14B814" }} />{" "}
                      <Typography color={"secondary"} variant="caption">
                        ¡Gracias por ingresar un orden valido!
                      </Typography>
                    </Stack>
                  ) : (
                    <Typography sx={{ color: "red" }} variant="caption">
                      * ¡Por favor, ingresa un orden valido !
                    </Typography>
                  )}
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ padding: "1rem" }}>
                <Typography variant="h6">icono de app movil</Typography>
                {
                  <img
                    className="rounded-full w-36 h-36"
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
