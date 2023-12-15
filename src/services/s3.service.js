
import AWS from "aws-sdk";
const AWS_BUCKET_NAME = import.meta.env.VITE_AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = import.meta.env.AWS_BUCKET_REGION;
const AWS_PUBLIC_KEY = import.meta.env.AWS_PUBLIC_KEY;
const AWS_SECRET_KEY = import.meta.env.AWS_SECRET_KEY;
const AWS_EXPIRE_SECONDS = import.meta.env.AWS_EXPIRE_SECONDS;
const AWS_LIST_MAX_KEYS = import.meta.env.AWS_LIST_MAX_KEYS;




AWS.config.update({
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: AWS_BUCKET_REGION,
  });
  
  const s3 = new AWS.S3();
  const bucketName = AWS_BUCKET_NAME;


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
  