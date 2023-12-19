import React from 'react'
import Container from './Container';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import ProcessGridCrud from './components/ProcessGridCrud';
import ProcessDialog from './components/Dialog';

function ProcesCrudModule() {
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openDialog, setOpenDialog] = React.useState(false)
  const [getRowData,setGetRowData] = React.useState()
  const[getUrl,setUrl]= React.useState(null)


  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClickClose = () => {
    setOpenDialog(false);
  };
  return (
    <Container>
      <ProcessGridCrud/>
      {openDialog && <ProcessDialog dialogState={openDialog} handleClickClose={handleClickClose} getUrl={getUrl} getRowData={getRowData} />}
    </Container>
  )
}

export default ProcesCrudModule