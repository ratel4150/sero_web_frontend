import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Grid, Input, InputLabel, Stack } from "@mui/material";
import { Image } from "@mui/icons-material";
import { uploadToS3 } from "../../../../services/s3.service";
import axios from "axios";
import CropIcon from '@mui/icons-material/Crop';
/**
 * Transition component used for animations, forwarding refs.
 *
 * @component
 * @param {Object} props - The component properties.
 * @param {React.Ref} ref - The ref to attach to the Slide component.
 * @returns {React.Component} The rendered Transition component.
 */
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ServiceDialog({ dialogState, handleClickClose, getUrl, getRowData }) {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [singnedUrl, setSignedUrl] = React.useState(null);

  /**
   * Handles the change event when a file is selected.
   *
   * @async
   * @function
   * @param {Object} event - The event object containing information about the selected file.
   *
   * @example
   * // Usage example
   * <input type="file" onChange={handleFileChange} />
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

  /**
   * Handles the save operation for the updated row data.
   *
   * @async
   * @function
   *
   * @throws {Error} If there is an error during the save operation.
   *
   * @example
   * // Usage example
   * // Assuming getRowData is an object you want to update and getUrl is the API endpoint
   * handleSave();
   */

  const handleSave = async () => {
    /**
     * The updated row data object.
     *
     * @typedef {Object} UpdatedRowData
     * @property {string} id - The unique identifier of the row.
     * @property {string} field - The field to be updated (e.g., "imagen", "icono_app_movil").
     * @property {string} imagen - The updated image URL.
     * @property {string} icono_app_movil - The updated icon URL for the mobile app.
     * @property {string} ... - Other properties of the row data.
     */

    if (getRowData) {
      try {
        // Assuming getRowData is an object you want to update and getUrl is the API endpoint

        // Modify the getRowData object with the new getUrl value

        let updatedRowData;
        switch (getRowData.field) {
          case "imagen":
            updatedRowData = { ...getRowData, imagen: singnedUrl };

            break;

          case "icono_app_movil":
            updatedRowData = { ...getRowData, icono_app_movil: singnedUrl };

            break;

          default:
            // Si field no coincide con ninguna condición, usa un valor predeterminado o maneja según tu lógica
            updatedRowData = { ...getRowData };
            break;
        }

        // Make a PUT request using the updatedRowData
        /*    console.log(updatedRowData);
         */
        const response = await axios.put(
          `http://localhost:3000/api/services/${getRowData.id}`,
          updatedRowData
        );
        // You can handle the response as needed
        console.log("Save successful:", response.data);
        // If you want to close something after successful save, uncomment the following line
        handleClickClose();
      } catch (error) {
        console.error("Error al cargar la imagen:", error);
      }
    }
  };
  return (
    <Dialog
      sx={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      fullScreen
      open={dialogState}
      onClose={handleClickClose}
      TransitionComponent={Transition}
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
          <Stack direction={"row"} spacing={2}>
            <IconButton aria-label="delete">
              <CropIcon />
            </IconButton>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <InputLabel htmlFor="file-input">Choose a file</InputLabel>
          <Input id="file-input" type="file" onChange={handleFileChange} />
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default ServiceDialog;
