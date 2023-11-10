import { FormControlLabel, Switch, textFieldClasses } from "@mui/material"
import adeudosPrueba from "./components/Custom/adeudos"
import { contribuyente as contribuyentePrueba } from "./components/Custom/contribuyente"
import { domicilio } from "./components/Custom/domicilios"
import fotosTomadasPrueba from "./components/Custom/fotos.tomadas"
import pagosPrueba from "./components/Custom/pagos"
import FormularioBuscarContribuyente from "./components/FormularioBuscarContribuyente"
import Navegacion from "./components/Navegacion.jsx"
import { useEffect, useState } from "react"
import FormularioDatosFaltantes from "./components/FormularioDatosFaltantes"
import { ROL_VISIBILIDAD_FORMULARIO } from "./components/Custom/roles"
import FormularioSubirImagen from "./components/FormularioSubirImagen"
import datosPrueba from "./components/Custom/datosPrueba"

const coordenadas = [-71.098326, 42.345573];

const formFields = [
  { name: "nombre", label: "Nombre", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "mensaje", label: "Mensaje", type: "textarea" },
];
const columnNames = [
  "cuenta",
  "clave_catastral",
  "propietario",
  "calle",
  "colonia",
  "latitud",
  "longitud",
  "tipo_de_servicio",
  "tipo_tarifa",
  "giro",
  "serie_medidor",
  "servicio",
  "recibo",
  "descripcion",
  "tipo_pago",
  "periodo",
  "año_inicio",
  "bimestre_inicio",
  "año_fin",
  "bimestre_fin",
  "promocion",
  "deuda",
  "fecha de pago",
  "total_pagado",
  "% pagado",
  "% descuento",
  "$ descuento",
  "gestor",
  "tarea_gestionada",
  "fecha_de_gestion",
  "tipo de gestion",
  "tabla_gestion",
  "estatus_predio",
  "estatus de gestion valida",
  "estatus en nuestra cartera",
  "estatus de la cuenta",
  "bimestre_valido",
  "foto fachada predio",
  "urlImagenFachada",
  "foto evidencia predio",
  "urlImagenEvidencia",
]
const index = ({ params, setNuevosDatos }) => {
  const [plaza, setPlaza] = useState("Naucalpan" /* "Cuatitlan"*/)
  const [servicio, setServicio] = useState("");
  const [rol, setRol] = useState('Gestor' /*|| 'Coordinador'*/)
  const [cuenta, setCuenta] = useState();
  const [sevicio, setSevicio] = useState()
  const [esRolSuperior, setEsRolSuperior] = useState(false);
  const [datosFaltantes, setDatosFaltantes] = useState([]);
  const [coordenadas, setCoordenadas] = useState(datosPrueba.coordenadas)
  const [contribuyente, setContribuyente] = useState(datosPrueba.contribuyente)
  const [domicilio, setDomicilio] = useState(datosPrueba.domicilio)
  const [adeudo, setAdeudo] = useState(datosPrueba.adeudo);
  const [pagos, setPagos] = useState(datosPrueba.pagos)
  const [fotosTomadas, setFotosTomadas] = useState(datosPrueba.fotosTomadas)
  const [data, setData] = useState();

  const handleProcessData = (data) => {
    const { } = data;
    // data.map();
    Object.keys(key => {
      console.log({ key })
    })
  }
  useEffect(() => {
    const newData = params?.slice(-1).pop();
    // if (params?.[0] === newData) return;
    const row = newData?.row;
    if (!row) return;
    const data = {
      "cuenta": row?.["cuenta"],
      "clave_catastral": row?.["clave_catastral"],
      "propietario": row?.["propietario"],
      "calle": row?.["calle"],
      "colonia": row?.["colonia"],
      "latitud": row?.["latitud"],
      "longitud": row?.["longitud"],
      "tipo_de_servicio": row?.["tipo_de_servicio"],
      "tipo_tarifa": row?.["tipo_tarifa"],
      "giro": row?.["giro"],
      "serie_medidor": row?.["serie_medidor"],
      "servicio": row?.["servicio"],
      "recibo": row?.["recibo"],
      "descripcion": row?.["descripcion"],
      "tipo_pago": row?.["tipo_pago"],
      "periodo": row?.["periodo"],
      "año_inicio": row?.["año_inicio"],
      "bimestre_inicio": row?.["bimestre_inicio"],
      "año_fin": row?.["año_fin"],
      "bimestre_fin": row?.["bimestre_fin"],
      "promocion": row?.["promocion"],
      "deuda": row?.["deuda"],
      "fecha de pago": row?.["fecha de pago"],
      "total_pagado": row?.["total_pagado"],
      "% pagado": row?.["% pagado"],
      "% descuento": row?.["% descuento"],
      "$ descuento": row?.["$ descuento"],
      "gestor": row?.["gestor"],
      "tarea_gestionada": row?.["tarea_gestionada"],
      "fecha_de_gestion": row?.["fecha_de_gestion"],
      "tipo de gestion": row?.["tipo de gestion"],
      "tabla_gestion": row?.["tabla_gestion"],
      "estatus_predio": row?.["estatus_predio"],
      "estatus de gestion valida": row?.["estatus de gestion valida"],
      "estatus en nuestra cartera": row?.["estatus en nuestra cartera"],
      "estatus de la cuenta": row?.["estatus de la cuenta"],
      "bimestre_valido": row?.["bimestre_valido"],
      "foto fachada predio": row?.["foto fachada predio"],
      "urlImagenFachada": row?.["urlImagenFachada"],
      "foto evidencia predio": row?.["foto evidencia predio"],
      "urlImagenEvidencia": row?.["urlImagenEvidencia"],
    }
    setData(row);
    setServicio(data.servicio);
    console.log({ newData })
    console.log({ data })
    // console.log({ params, asd: newData });
    //* Longitud, Latitud
    const nuevasCoordenadas = [data.longitud, data.latitud];


    console.log({ nuevasCoordenadas });
    setCoordenadas(nuevasCoordenadas);
    //* Cuenta
    setContribuyente({
      "Cuenta": data.cuenta,
      "Clave Catastral": '',
      "Propietario": data.propietario,
      "Tipo de Servicio": data.tipo_de_servicio,
      "Tipo de Tarifa": '',
      "Giro": '',
      "Serie del medidor": data.serie_medidor,
      "Servicio": data.servicio,
      "Domicilio": '',
    });

    setDomicilio({
      "Calle": data.cuenta,
      "Numero Exterior": 222,
      "Numero Interior": 10,
      "Colonia": "Colonia E",
      "Poblacion": "Ciudad E",
      "Codigo Postal": "54321",
      "Manzana": "M5",
      "Lote": "L5",
      "Entre Calle 1": "Entre Calle Z",
      "Entre Calle 2": "Entre Calle V",
      "Referencia": data.calle
    });
    setAdeudo([{
      fechaActualizacion: '',//"2023-10-01",
      fechaCorte: data.bimestre_inicio, //"2023-09-30",
      montoAdeudo: data.deuda,
    }]);
    setPagos([{
      fechaDePago: data["fecha de pago"],
      descripcion: data.descripcion,
      montoPagado: data.total_pagado,
    }]);
    const getIsValidValue = (value) => (value || value != 'NULL');

    const clavesInvalidas = [];

    for (const [clave, valor] of Object.entries(params)) {
      const isValid = getIsValidValue(valor);
      if (isValid) continue;
      clavesInvalidas.push(clave);
    };
    for (const columnName of columnNames) {
      const valor = data?.[columnName];
      const clave = columnName;

      if (valor && getIsValidValue(valor)) continue;

      clavesInvalidas.push(clave);
    }


    console.log({ datosFaltantes: clavesInvalidas });
    setDatosFaltantes(clavesInvalidas);
  }, [params?.[0]]);
  if (!(contribuyente && domicilio && adeudo && datosFaltantes)) return;
  return (
    <div className="contenedor-busqueda-contribuyente" style={{ position: "initial" }}>
      {JSON.stringify(data?.row)}
      {/* <FormularioDatosFaltantes formFields={
        datosFaltantes?.map(dato => ({
          name: dato,
          label: dato.replace(/[-_]/g, ' '),
          type: "text"
        }))} /> */}
      <FormControlLabel
        control={
          <Switch checked={esRolSuperior}
            onChange={() => {
              const esSuperior = !esRolSuperior;
              setEsRolSuperior(esSuperior);
              const nuevoRol = esSuperior ? ROL_VISIBILIDAD_FORMULARIO : 'Gestor';
              setRol(nuevoRol);
            }}
            name="gilad"
          />
        }
        label="Es coordinador"
      />
      <FormularioBuscarContribuyente
        plaza={plaza}
        setPlaza={({ index, text }) => setPlaza(text)}
        cuenta={cuenta}
        setCuenta={({ index, text }) => setCuenta(text)}
        servicio={servicio}
        setServicio={
          ({ index, text }) => {
            // setContribuyente((state) => ({ ...state, Servicio: text }));
            setServicio(text);
          }
        }
      />
      <Navegacion
        coordenadas={coordenadas}
        contribuyente={contribuyente}
        domicilio={domicilio}
        adeudos={adeudo}
        pagos={pagos}
        plaza={plaza}
        fotos={fotosTomadas}
        rol={rol}
        datosFaltantes={{
          campos: datosFaltantes,
          setNuevosCampos: (newPartialData) => {
            const newData = { ...data, ...newPartialData };
            console.log({ row: data.row })
            setData(newData);
            if (setNuevosDatos) setNuevosDatos(newData);
          }
        }}
      ></Navegacion>
      <FormularioSubirImagen />
    </div >
  )
};

const TaxPayerSearch = index;
export default TaxPayerSearch;