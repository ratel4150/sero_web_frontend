import React from 'react'
import Container from './components/Container'
import DataGridCrud from './components/DataGridCrud'
import DialogCrudForm from './components/Dialog'






function TaskCrudModule() {
  const [openDialog, setOpenDialog] = React.useState(false);

  
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
   <Container>
      <DataGridCrud handleOpenDialog={handleOpenDialog}/>
      <DialogCrudForm openDialog={openDialog} handleCloseDialog={handleCloseDialog}  />
   </Container>

  )
}

export default TaskCrudModule