import { Avatar, Box, IconButton } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import React from 'react'
import { getAllSquares } from '../../../../api/square';
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { BiSolidImageAdd } from "react-icons/bi";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
function SquareGridCrud({ handleClickOpen, setUrl, setGetRowData }) {
  const [rows, setRows] = React.useState([]);



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


  
const AvatarImage = ({
  data,
 /*  handleClickOpen,
  setUrl,
  setGetRowData,
  getDataRow,
  field, */
}) => {
  if (!data) {
    return (
      <IconButton
       /*  onClick={() => {
          handleClickOpen();
        
        }} */
        aria-label="delete"
      >
        <BiSolidImageAdd />
      </IconButton>
    );
  } else {
    return (
      <Avatar
       /*  onClick={(e) => {
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
        }} */
        alt="Remy Sharp"
        src={data}
      />
    );
  }
};

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Aquí deberías hacer tu solicitud de red para obtener los datos
        // Reemplaza 'TU_URL_DE_DATOS' con la URL real de tus datos
        const response = await getAllSquares()

        const data = response.data;
        console.log(data);

        // Agrega el campo 'id_tarea' a cada fila usando el índice como valor único
        const rowsWithId = data.map((row, index) => ({
          ...row,
          id: row.id_plaza || index.toString(),
        }));

        setRows(rowsWithId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
      },  {
        field: "imagen",
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>
            {"Imagen"}
            {/*    <span role="img" aria-label="task" style={{color:"#5EBFFF"}}>
        📃
        </span> */}
          </strong>
        ),
        width: 80,
        editable: false,
        renderCell: (params) => (
          <AvatarImage
          /*   setGetRowData={setGetRowData}
            getDataRow={params.row} */
            data={params.row.imagen}
        /*     handleClickOpen={handleClickOpen} */
           /*  setUrl={setUrl} */
          /*   field={"imagen"} */
          />
        ),
      },{
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
      }, {
        field: "orden",
        
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>
            {"Orden"}
            {/*    <span role="img" aria-label="task" style={{color:"#5EBFFF"}}>
            📃
            </span> */}
          </strong>
        ),
        width: 80,
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
        width: 80,
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
        width: 130,
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
        width: 130,
        editable: true,
      },
      {
        field: "estado_republica",
        
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>
            {"Estado de la Repùblica"}
            {/*    <span role="img" aria-label="task" style={{color:"#5EBFFF"}}>
            📃
            </span> */}
          </strong>
        ),
        width: 130,
        editable: true,
      },
      {
        field: "radius",
        
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>
            {"Radio"}
            {/*    <span role="img" aria-label="task" style={{color:"#5EBFFF"}}>
            📃
            </span> */}
          </strong>
        ),
        width: 90,
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
  return (
    <Box sx={{ width: "100%" }}>
        <DataGrid rows={rows}  columns={buildColumns()} /> 
    </Box>
  )
}

export default SquareGridCrud