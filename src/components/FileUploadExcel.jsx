import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import AlertMessage from './AlertMessage';
function FileUploadExcel({ handleFileUpload, fileValidCallback  }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setSelectedFile(null);    
    setError(null);

    if (file) {
      const allowedExtensions = ['.xlsx', '.xls'];
      const fileExtension = file.name.substring(file.name.lastIndexOf('.'));
  
      if (allowedExtensions.includes(fileExtension)) {
        setSelectedFile(file);
        handleFileUpload(file);
        setError(null);
        fileValidCallback(true);
      } else {        
        setError('El archivo seleccionado no es un archivo Excel válido (.xlsx o .xls).');
        // Puedes mostrar un mensaje de error al usuario o tomar otra acción según tus necesidades.
        e.target.value = ''; // Limpiar la selección para permitir al usuario cargar un archivo válido.     
        fileValidCallback(false);  
      }
    }
  };  

  return (
    <Box>
      <label htmlFor="file-upload-excel">
        <Typography variant="body1" gutterBottom>
          Cargar archivo Excel
        </Typography>
        <Input
          accept=".xlsx, .xls"
          id="file-upload-excel"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
       {error && <AlertMessage message={error} type="error" />} {/* Usa el componente de alerta */}
        <Typography variant="body2">
          Archivo seleccionado: {selectedFile ? selectedFile.name : 'Ningún archivo seleccionado'}
        </Typography>
      </label>
    </Box>
  );
}

export default FileUploadExcel;