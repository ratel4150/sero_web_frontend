import React from 'react'
import Container from './Container'
import ServiceGridCrud from './components/ServiceGridCrud'
import ServiceDialog from './components/Dialog'


/**
 * Functional component representing a module for CRUD operations on services.
 *
 * @component
 * @example
 * // Usage example
 * <ServiceCrudModule />
 *
 * @returns {React.Component} The rendered ServiceCrudModule component.
 */
function ServiceCrudModule() {
  /**
   * State to manage the open/closed state of the dialog.
   *
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [openDialog, setOpenDialog] = React.useState(false)
   /**
   * State to store the data of the row being edited.
   *
   * @type {[object, React.Dispatch<React.SetStateAction<object>>]}
   */
  const [getRowData,setGetRowData] = React.useState()
    /**
   * State to store the URL for data retrieval or submission.
   *
   * @type {[string | null, React.Dispatch<React.SetStateAction<string | null>>]}
   */
  const[getUrl,setUrl]= React.useState(null)
   /**
   * Handles the opening of the dialog.
   *
   * @function
   */
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
/**
   * Handles the closing of the dialog.
   *
   * @function
   */
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