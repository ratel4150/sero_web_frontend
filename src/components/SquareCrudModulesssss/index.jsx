import React from "react";
import Container from "./Conatiner";
import SquareGridCrud from "./components/SquareGridCrud";

function SquareCrudModule() {
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
  return <Container>
     <SquareGridCrud handleClickOpen={handleClickOpen} setUrl={setUrl} setGetRowData={setGetRowData}/> 
  </Container>;
}

export default SquareCrudModule;
