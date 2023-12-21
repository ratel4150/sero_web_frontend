import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Input,
  InputLabel,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import { uploadToS3 } from "../../../../services/s3.service";
import axios from "axios";
function ProcessDialog({ dialogState, handleClickClose, getUrl, getRowData }) {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [singnedUrl, setSignedUrl] = React.useState(null);

  const handleSave = async () => {
    try {
      // Assuming getRowData is an object you want to update and getUrl is the API endpoint

      // Modify the getRowData object with the new getUrl value

      // Make a PUT request using the updatedRowData
      /*    console.log(updatedRowData);
       */
      let updatedRowData = { ...getRowData, imagen: singnedUrl };

      const response = await axios.put(
        `http://localhost:3000/api/processes/${getRowData.id}`,
        updatedRowData
      );
      // You can handle the response as needed
      console.log("Save successful:", response.data);
      // If you want to close something after successful save, uncomment the following line
      handleClickClose();
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
    }
  };
  /**
   * Handles the change of the selected file.
   *
   * @function
   * @name handleFileChange
   * @param {Object} event - File change event.
   * @returns {Promise<void>} Promise that resolves after processing the file change.
   */
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    }

    try {
      const fileUrl = await uploadToS3(file);
      console.log("URL del archivo subido:", fileUrl);
      setSignedUrl(fileUrl);
    } catch (error) {
      console.error("Error al subir archivo:", error.message);
      // Handle the error according to your requirements
    }
  };
  return (
    <Dialog
      sx={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      fullScreen
      open={dialogState}
      onClose={handleClickClose}
      /*     TransitionComponent={Transition} */
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClickClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{ ml: 2, flex: 1 }}
            variant="h6"
            component="div"
            color={"secondary"}
          >
            Cambiar imagen
          </Typography>
          <Button autoFocus color="secondary" onClick={handleSave}>
            Guardar
          </Button>
        </Toolbar>
      </AppBar>
      <Grid sx={{ padding: "2rem" }} container spacing={2}>
        <Grid item xs={6}>
          <img
            style={{
              width: "100%",
              height: "300px",
              boxShadow:
                "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
            }}
            src={selectedFile || getUrl}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel htmlFor="file-input">Choose a file</InputLabel>
          <Input id="file-input" type="file" onChange={handleFileChange} />
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default ProcessDialog;
