import { AppBar, Button, Grid, IconButton, Input, InputLabel, Toolbar, Typography } from '@mui/material';
import React from 'react'
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
function ProcessDialog() {

    const [selectedFile, setSelectedFile] = React.useState(null);
    const [singnedUrl,setSignedUrl] = React.useState(null)
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
  )
}

export default ProcessDialog