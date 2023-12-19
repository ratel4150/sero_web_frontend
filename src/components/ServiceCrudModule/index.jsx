import React from 'react'
import Container from './Container'
import ServiceGridCrud from './components/ServiceGridCrud'
import ServiceDialog from './components/Dialog'


function ServiceCrudModule() {

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
    <ServiceGridCrud handleClickOpen={handleClickOpen} setUrl={setUrl} setGetRowData={setGetRowData}/>
    {openDialog && <ServiceDialog dialogState={openDialog} handleClickClose={handleClickClose} getUrl={getUrl} getRowData={getRowData} />}
   </Container>
 
  )
}

export default ServiceCrudModule