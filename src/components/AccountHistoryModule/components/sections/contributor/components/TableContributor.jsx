import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import HomeIcon from "@mui/icons-material/Home";

function TableContributor() {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                    Datos Personales <ContactEmergencyIcon />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableRow>
                <TableCell>Cuenta</TableCell>
                <TableCell>Propietario</TableCell>
                <TableCell>Tipo de Servicio</TableCell>
                <TableCell>Tarifa</TableCell>
                <TableCell>Turno</TableCell>
                <TableCell>Meter Series</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>

                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
                {/* account": "00000007-00000007",
"owner_name": "ANA LUISA ZEPEDA ZEPEDA",
"type_service": "Industrial",
"rate_type": "",
"turn": "No Aplica",
"meter_series": "20415",
"street": "LUIS PASTEUR No EX.07 C, PARQUE INDUSTRIAL LA JOYA, CUAUTITLAN IZCALLI, ESTADO DE MEXICO",
"outdoor_number": "",
"interior_number": "",
"cologne": "PARQUE INDUSTRIAL LA JOYA",
"square": "",
"allotment": "",
"between_street_1": "",
"between_street_2": "",
"reference": "",
"town": "",
"poastal_code": "", */}
              </TableRow>
              <TableRow>
                <TableCell>00000007-00000007</TableCell>
                <TableCell>ANA LUISA ZEPEDA ZEPEDA</TableCell>
                <TableCell>Industrial</TableCell>
                <TableCell>Industrial</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
              </TableRow>
            </TableRow>
            <TableRow>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={16} sx={{ textAlign: "center" }}>
                    Domicilio del contribuyente <HomeIcon />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: "center" }} colSpan={16}>
                  LUIS PASTEUR No EX.07 C, PARQUE INDUSTRIAL LA JOYA, CUAUTITLAN
                  IZCALLI, ESTADO DE MEXICO
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Numero Exterior</TableCell>
                <TableCell>NUMERO INTERIO</TableCell>
                <TableCell>COLONIA</TableCell>
                <TableCell>CUADRA</TableCell>
                <TableCell>ASIGNACIÒN</TableCell>
                <TableCell>ENTRE CALLE</TableCell>
                <TableCell>ENTRE CALLE</TableCell>
                <TableCell>REFERENCIA</TableCell>
                <TableCell>MUNICIPIO</TableCell>
                <TableCell>C.P.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell> 
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{""}</TableCell>
                     <TableCell>{""}</TableCell>
              </TableRow>
              {/*"outdoor_number": "",
"interior_number": "",
"cologne": "PARQUE INDUSTRIAL LA JOYA",
"square": "",
"allotment": "",
"between_street_1": "",
"between_street_2": "",
"reference": "",
"town": "",
"poastal_code  */}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableContributor;
