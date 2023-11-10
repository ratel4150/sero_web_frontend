//import './styles/Fotografia.css'
import { useState } from "react";
import React from "react";
import "./styles/Fotografia.css";
import {
  Card,
  CardContent,
  IconButton,
  Checkbox,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  Paper,
  Box,
} from "@mui/material";

import HighlightOffIcon from "@mui/icons-material/HighlightOff"; // Icono de desactivación
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Icono de activación
import useStore from "./store/useStore.";
import replaceItemAtIndex from "./utils/replaceItemAtIndex";

const classNames = {
  parentContainer: "fotografias-tomadas",
  container: "fotografias-tomada",
  containerDisabled: "fotografias-tomada",
  image: "imagen",
  icons: "icons",
  iconLike: "icon like",
  iconDislike: "icon dislike",
};

const Fotografia = ({ image, onClick, index }) => {
  // const [isEnabled, setIsEnabled] = useState(true);
  // const handleClick = () => {};
  const { setFotosFuncion } = useStore();
  const [isEnabled, setIsEnabled] = useState(image.isActive);
  const handleClickImage = (e) => {
    if (onClick) onClick(e);
  };
  const handleClick = () => {
    const isActive = !isEnabled;
    setIsEnabled(isActive);
    setFotosFuncion((fotos) => {
      const foto = {
        ...fotos[index],
        isActive,
      };
      console.log({ nuevafoto: foto });
      // fotos[index] = foto;
      return replaceItemAtIndex(fotos, foto, index);
    });
  };
  /* 
  rediseñemos el microcomponente ,
  el parte superior estara la imagen 
  y la parte inferior una carda para fecha y descripcion
  ademas de dos botones de 50% width , de desactivar/activar,
  las imagenes desactivadas tendran un icono de mui que lo represente
  
  */
  return (
    <ImageListItem className={classNames.container}>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: 400,
          justifyContent: "flex-end",
        }}
      >
        <Box m={1}>
          <img
            onClick={handleClickImage}
            className={classNames.image}
            src={image.url}
            alt={image.description}
          />
        </Box>
        <CardContent>
          <div>
            <Typography
              variant="body1"
              component="span"
              fontWeight={500}
              pr={1}
            >
              Fecha:
            </Typography>
            <Typography variant="body1" component="span">
              {image.date}
            </Typography>
          </div>
          <div>
            <Typography
              variant="body1"
              component="span"
              fontWeight={500}
              pr={1}
            >
              Descripción:
            </Typography>
            <Typography variant="body1" component="span">
              {image.description}
            </Typography>
          </div>
        </CardContent>
        <Box
          display={"flex"}
          justifyContent={"center"}
          gap={0}
          width={"100%"}
          mb={1}
        >
          <IconButton onClick={handleClick} style={{ width: "25%" }}>
            {isEnabled ? <CheckCircleIcon /> : <HighlightOffIcon />}
          </IconButton>
          <IconButton
            size="small"
            onClick={handleClick}
            style={{ width: "50%" }}
          >
            {isEnabled ? "Desactivar" : "Activar"}
          </IconButton>
        </Box>
      </Card>
    </ImageListItem>
  );
};
export default Fotografia;
