import React from 'react'
import Box from '@mui/material/Box';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
  randomBoolean,
} from '@mui/x-data-grid-generator';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Button, IconButton } from '@mui/material';
import { MdTask } from "react-icons/md";
import { allTasksRequest } from '../../../../api/tasks';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { red } from '@mui/material/colors';
const roles = ['Market', 'Finance', 'Development'];

const randomRole = () => {
  return randomArrayItem(roles);
};



const buildInitialRows = async()=>{
  try {
    const res_tasks = await allTasksRequest();

  
    
    if (res_tasks.data) {
      const modifiedData = res_tasks.data.map(task => ({
        ...task,
        id: task.id_tarea,
      }));

      return modifiedData;
    }

  } catch (error) {
    console.error('Error en la solicitud de tareas:', error);
    // Puedes manejar el error de alguna manera si es necesario
  }

  /* return []; // O devuelve un valor por defecto si no hay datos */
  
 }





function EditToolbar(props) {
  const { setRows, setRowModesModel,rows } = props;

  const handleClick = async() => {

    const id = rows.length + 1;
    let newTask = { id_tarea:id, nombre: '', activo: '',id_proceso: '',id, isNew: true };
    setRows((oldRows) => [...oldRows, newTask]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'nombre' },
    }));

    try {
      const response = await createTask(newTask);
      console.log(response);
      
    } catch (error) {

      console.error('Error al crear la tarea:', error);

      
    }
  };



  return (
    <GridToolbarContainer>
      <Button color="secondary" startIcon={<AddIcon />} endIcon={<MdTask/>} onClick={handleClick}>
        Agregar Nueva Tarea
      </Button>
    </GridToolbarContainer>
  );
}


function DataGridCrud() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  console.log(rows);
  console.log(rowModesModel);

  React.useEffect(() => {
    const fetchData = async () => {
      const initialRows = await buildInitialRows();
      setRows(initialRows);
    };

    fetchData();
  }, []);


  console.log(rows);
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // ✅ Valid
const CheckCell = ({data}) => {
  
  console.log(data);
  if (data) {
    return (
      <IconButton aria-label="check" size="small">
    <CheckIcon fontSize="inherit" color='secondary'/>
  </IconButton>
    );
    
  }else{
    return (
      <IconButton aria-label="check" size="small">
    <ClearIcon fontSize="inherit" sx={{color:"red"}}/>
  </IconButton>
    );
    
  }
 
};



  const buildColumns = ()=>{
    const processes = [
      { id_proceso: 1, nombre: "Carta Invitacion" },
      { id_proceso: 2, nombre: "Notificacion" },
      { id_proceso: 3, nombre: "Inspeccion" },
      { id_proceso: 4, nombre: "Requerimiento 1" },
      { id_proceso: 5, nombre: "Requerimiento 2" },
      { id_proceso: 6, nombre: "Ejecucion fiscal" },
      { id_proceso: 7, nombre: "Cortes" },
      { id_proceso: 8, nombre: "Encuesta" },
      { id_proceso: 10, nombre: "Lecturas" }
    ];
  const columns = [
    { field: 'nombre',   renderHeader: () => (
      <strong style={{color:"#5EBFFF"}}>
        {"Nombre"}
     {/*    <span role="img" aria-label="task" style={{color:"#5EBFFF"}}>
        📃
        </span> */}
      </strong>
    ), width: 300, editable: true },
    {
      field: 'activo',
      renderHeader: () => (
        <strong style={{color:"#5EBFFF"}}>
          {"Activo"}
       {/*    <span role="img" aria-label="task" style={{color:"#5EBFFF"}}>
          📃
          </span> */}
        </strong>
      ),
      type: 'boolean',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      renderCell:(params)=>(
        <CheckCell data={params.row.activo}/>
      )
    },
    {
      field: 'id_proceso',
      renderHeader: () => (
        <strong style={{color:"#5EBFFF"}}>
          {"Proceso"}
       {/*    <span role="img" aria-label="task" style={{color:"#5EBFFF"}}>
          📃
          </span> */}
        </strong>
      ),
      type: 'number',
      width: 150,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      valueGetter:({row})=>{
        const targetProcess = processes.filter(process => process.id_proceso === row.id_proceso)
        
        return targetProcess[0]?.nombre 

        /* const targetProcess = processes.filter(process => process.id_proceso === row.id_proceso)
        return targetProcess ? targetProcess.nombre : '';
 */
      }
    },
    {
      field: 'actions',
      type: 'actions',
      renderHeader: () => (
        <strong style={{color:"#5EBFFF"}}>
          {"Acciones"}
       {/*    <span role="img" aria-label="task" style={{color:"#5EBFFF"}}>
          📃
          </span> */}
        </strong>
      ),
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon sx={{color:"#3788D8"}}/>}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon sx={{color:"#3788D8"}}/>}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon sx={{color:"#3788D8"}} />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon sx={{color:"#3788D8"}}/>}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },

    },
  ];

  return columns

}

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
        '& .active': {
          color: 'secondary',
        },

      }}
    >
      <DataGrid
      checkboxSelection
        rows={rows}
        columns={buildColumns()}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel,rows },
        }}
        

        getCellClassName={(params) => {

          console.log(params.row.activo);
          if (
            params.row.activo
          ) {
            return "active";
          }
        }}
      />
    </Box>
  )
}

export default DataGridCrud