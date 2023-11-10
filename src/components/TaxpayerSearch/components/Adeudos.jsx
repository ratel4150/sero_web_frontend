//import './styles/Adeudo.css'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";

const TableHeader = ({ cellsText: cellsText }) => (
  <TableHead>
    <TableRow>
      {cellsText.map((text) => (
        <TableCell key={text}>{text}</TableCell>
      ))}
    </TableRow>
  </TableHead>
);

const DataRow = ({ item }) => (
  <TableRow>
    <TableCell>{item.fechaActualizacion}</TableCell>
    <TableCell>{item.fechaCorte}</TableCell>
    <TableCell>{item.montoAdeudo}</TableCell>
  </TableRow>
);

const DataTable = ({ filas }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHeader
        cellsText={[
          "Fecha de Actualización",
          "Fecha de Corte",
          "Monto de Adeudo",
        ]}
      />
      <TableBody>
        {filas?.map((item, index) => (
          <DataRow key={index} item={item} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
const Adeudos = DataTable;

export default Adeudos;
