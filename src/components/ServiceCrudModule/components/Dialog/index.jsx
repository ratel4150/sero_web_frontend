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
import { Grid, Input, InputLabel } from "@mui/material";
import { Image } from "@mui/icons-material";



export const uploadFile = async (selectedFile, remoteFileName, maxFileSizeMB = 1) => {
    try {
      // Verificar el tamaño del archivo
      const fileSizeBytes = selectedFile.size;
      const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024; // Convertir MB a bytes
  
      if (fileSizeBytes > maxFileSizeBytes) {
        throw new Error(
          `El archivo excede el tamaño máximo permitido de ${maxFileSizeMB} MB.`
        );
      }
  
      // Generar una URL prefirmada para la carga del archivo
      const presignedUrl = await generatePresignedUrl(remoteFileName);
  
      // Leer el contenido del archivo como un ArrayBuffer
      const fileContent = await selectedFile.arrayBuffer();
  
      // Realizar la carga del archivo utilizando la URL prefirmada
      const result = await fetch(presignedUrl, {
        method: 'PUT',
        body: fileContent,
        headers: {
          'Content-Type': selectedFile.type,
        },
      });
  
      // Verificar el éxito de la carga
      if (!result.ok) {
        throw new Error(`Error al cargar el archivo a AWS S3. Código: ${result.status}`);
      }
  
      return result;
    } catch (error) {
      console.error("Error al cargar el archivo a AWS S3:", error);
      throw error; // Puedes lanzar el error nuevamente si es necesario
    }
  };
  
  const generatePresignedUrl = async (key) => {
    // Configurar los parámetros para generar la URL prefirmada
    const params = {
      Bucket: bucketName,
      Key: key,
      ContentType: 'image/jpeg', // Ajustar según el tipo de contenido del archivo
      Expires: 60, // Duración de la URL prefirmada en segundos
    };
  
    // Generar la URL prefirmada utilizando el SDK de AWS S3
    const presignedUrl = await s3.getSignedUrlPromise('putObject', params);
    return presignedUrl;
  };
  

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ServiceDialog({ dialogState, handleClickClose,getUrl }) {

    const [selectedFile, setSelectedFile] = React.useState(null);

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedFile(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    
const handleSave = async () => {
  if (selectedFile) {
    try {
      // Generar un nombre único para el archivo (puedes ajustar esto según tus necesidades)
      const remoteFileName = `nombre-unico-del-archivo-${Date.now()}`;

      // Llamada a la función de carga de archivos en AWS S3
      const result = await uploadFile(selectedFile, remoteFileName);

      // Maneja la respuesta según sea necesario
      console.log("Imagen cargada exitosamente:", result);

      // Cierra el diálogo después de la carga exitosa
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
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" color={"secondary"}>
            Cambiar imagen 
          </Typography>
          <Button autoFocus color="secondary" onClick={handleSave} >
            Guardar
          </Button>
        </Toolbar>
      </AppBar>
      <Grid sx={{ padding: "2rem" }} container spacing={2}>
        <Grid item xs={6}>
           <img  style={{width:"100%",height:"300px",boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"}}  src={selectedFile || getUrl}/>
          </Grid>
        <Grid item xs={6}>
          <InputLabel htmlFor="file-input">Choose a file</InputLabel>
          <Input
            id="file-input"
            type="file"
             onChange={handleFileChange} 
          />
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default ServiceDialog;
