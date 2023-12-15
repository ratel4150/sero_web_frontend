import { S3Client, HeadBucketCommand } from "@aws-sdk/client-s3"

const AWS_BUCKET_NAME = "ratelerpp";
const AWS_BUCKET_REGION = "us-east-2";
const AWS_PUBLIC_KEY = "AKIAT5FEWJS6OYP6WLHR";
const AWS_SECRET_KEY = "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";

const client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

const command = new HeadBucketCommand({ Bucket: AWS_BUCKET_NAME });

client.send(command)
  .then(() => console.log("Conexión exitosa a Amazon S3"))
  .catch((err) => console.error("Error al verificar la conexión:", err.message));