import React from 'react'
import Container from './Container';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import ProcessGridCrud from './components/ProcessGridCrud';
import ProcessDialog from './components/Dialog';
/**
 * React component for managing processes in CRUD operations.
 *
 * @component
 * @returns {React.Component} The rendered ProcesCrudModule component.
 */
function ProcesCrudModule() {
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
/**
 * State variables in the ProcesCrudModule component:
 * 
 * - `openDialog` (@type {boolean}): Represents the state of the dialog, determining whether it is open or closed.
 * - `getRowData` (@type {any | null}): Holds the data associated with the selected row. Initially set to null.
 * - `getUrl` (@type {string | null}): Stores the URL associated with the data. It is set to `null` by default and gets updated during CRUD operations.
 */
  const [openDialog, setOpenDialog] = React.useState(false)
  const [getRowData,setGetRowData] = React.useState()
  const[getUrl,setUrl]= React.useState(null)


  /**
   * Opens the dialog for CRUD operations.
   */
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  /**
   * Closes the dialog for CRUD operations.
   */
  const handleClickClose = () => {
    setOpenDialog(false);
  };
  return (
    <Container>
        {/* Componente de grilla para la visualización de procesos */}
      <ProcessGridCrud   handleClickOpen={handleClickOpen} setUrl={setUrl} setGetRowData={setGetRowData}/>
       {/* Componente de diálogo, renderizado solo si openDialog es true */}
      {openDialog && <ProcessDialog dialogState={openDialog} handleClickClose={handleClickClose} getUrl={getUrl} getRowData={getRowData} />}
    </Container>
  )
}

export default ProcesCrudModule