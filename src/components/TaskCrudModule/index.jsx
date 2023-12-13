import React from 'react'
import Container from './components/Container'
import DataGridCrud from './components/DataGridCrud'
import DialogCrudForm from './components/Dialog'
import DataGridCrudTest from './components/DataGridCrudTest';






function TaskCrudModule() {
  const [openDialog, setOpenDialog] = React.useState(false);

  
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  console.log(true);
  

  return (
   <Container>
      {/* <DataGridCrud handleOpenDialog={handleOpenDialog}/> */}
      <DataGridCrudTest handleOpenDialog={handleOpenDialog}/>
      <DialogCrudForm openDialog={openDialog} handleCloseDialog={handleCloseDialog}  />
   </Container>

  )
}

export default TaskCrudModule