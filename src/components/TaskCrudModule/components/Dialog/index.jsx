    import {
        Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputAdornment,
    InputLabel,
    NativeSelect,
    Stack,
    TextField,
    Typography,
    useTheme,
    } from "@mui/material";
    import { Divider } from "antd";
    import React from "react";
    import RecentActorsIcon from "@mui/icons-material/RecentActors";
    import { FaRegCircleCheck } from "react-icons/fa6";
    import { TbZoomCancel } from "react-icons/tb";
    import useMediaQuery from "@mui/material/useMediaQuery";
    import { BiTask } from "react-icons/bi";
    import { createTask } from "../../../../api/tasks";

    const processes = [
        { id_proceso: 1, nombre: "Carta Invitacion" },
        { id_proceso: 2, nombre: "Notificacion" },
        { id_proceso: 3, nombre: "Inspeccion" },
        { id_proceso: 4, nombre: "Requerimiento 1" },
        { id_proceso: 5, nombre: "Requerimiento 2" },
        { id_proceso: 6, nombre: "Ejecucion fiscal" },
        { id_proceso: 7, nombre: "Cortes" },
        { id_proceso: 8, nombre: "Encuesta" },
        { id_proceso: 10, nombre: "Lecturas" }
    ];

    function DialogCrudForm({ openDialog, handleCloseDialog }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));


    const [verificationInputs, setVerificationInputs] = React.useState({
        nameInput: false,
        processInput: false,

        
    });
    const [formDataFromInputs, setFormDataFromInputs] = React.useState({
        name: "",
        active: false,
        process: "",
    
    });


    console.log(formDataFromInputs);
    
    const handleAddRecord = async () => {
        console.log(formDataFromInputs);
        const { name, active, process } = formDataFromInputs;
        console.log(name,active,process);
    // Define tu condición aquí
    if (name) {
        try {
        // Realiza la solicitud POST con Axios
        const response = await createTask({nombre:name,activo:active,id_proceso:Number(process)});

        // Maneja la respuesta según tus necesidades
        console.log('Respuesta del servidor:', response.data);

        // Cierre del diálogo u otras acciones después de agregar el registro
        handleCloseDialog();
        } catch (error) {
        console.error('Error al agregar el registro:', error);
        // Puedes manejar el error de alguna manera si es necesario
        }
    } else {
        // Lanza un error si la condición no se cumple
        throw new Error('Los campos requeridos no están completos. Por favor, completa todos los campos.');
    }
    };



    

    const handleChangeCheckbox = (e) => {
        const { name, checked } = e.target;
    
        setVerificationInputs((prev) => ({
        ...prev,
        [name]: checked,
        }));
    
        setFormDataFromInputs({
        ...formDataFromInputs,
        [name]: checked,
        });
    };


    const handleChangeInput = (e) => {
        const { name, value } = e.target;

        setVerificationInputs((prev) => {
        switch (name) {
            case "name":
            return {
                ...prev,
                [name]: !!value,
                nameInput: value.length > 0 ? true : false,
            };

            case "process":
            return {
                ...prev,
                [name]: value !== "0", // Cambiado aquí
                processInput: value !== "0",
            };
            case "street":
            return {
                ...prev,
                [name]: !!value,
                streetInput: value.length > 0 ? true : false,
            };
            case "cologne":
            return {
                ...prev,
                [name]: !!value,
                townInput: value.length > 0 ? true : false,
            };
            // Agrega más casos si es necesario para otros campos

            /*  default:
            return {
                ...prev,
                [name]: !!value,
            }; */
        }
        });
        setFormDataFromInputs({
        ...formDataFromInputs,
        [name]: value,
        });
    };
    const label="activo"
    return (
        <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleCloseDialog}
        >
        <DialogTitle color={"secondary"} >Agregar nueva tarea </DialogTitle>
        <DialogContent>
            <Stack
            direction="column"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            >
            <TextField
                color="secondary"
                sx={{ marginBottom: "1rem", width: "200px" }}
                id="input-with-icon-textfield-name"
                label="Nombre de la Tarea"
                onChange={handleChangeInput}
                value={formDataFromInputs.name}
                /* 
                value={formDataFromInputs.account} */
                type="text"
                name="name"
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <BiTask/>
                    </InputAdornment>
                ),
                }}
                variant="standard"
            />
            {verificationInputs.nameInput ? (
                    <Stack  direction="row">
                    <FaRegCircleCheck style={{ color: "#14B814" }} />{" "}
                    <Typography color={"secondary"} variant="caption">
                        ¡Gracias por ingresar una tarea!
                    </Typography>
                    </Stack>
                ) : (
                    /* TbZoomCancel */
                    <Stack  direction="row">
                    <TbZoomCancel style={{ color: "red" }} />{" "}
                    <Typography sx={{ color: "red" }} variant="caption">
                        * ¡Por favor, ingresa una tarea!
                    </Typography>
                    </Stack>
                )}
            <Box sx={{display:"flex",flexDirection:"row",alignContent:"center"}}>

        
            <InputLabel sx={{alignSelf:"center"}}>Activo</InputLabel>
            <Checkbox {...label} defaultChecked  onChange={(e) => handleChangeCheckbox(e)} name="active"  size="small" color="secondary"/>
            </Box>
        

            
            <FormControl fullWidth>
            <InputLabel color="secondary" variant="standard" htmlFor="uncontrolled-native">
            Proceso
            </InputLabel>
            <NativeSelect color="secondary"
            defaultValue={30}
            onChange={handleChangeInput}
            inputProps={{
                name: 'process',
                id: 'uncontrolled-native',
            
                
            }}
            
            >
                <option  value={0}>Ingresa un proceso</option>
                {processes.map((process)=>{
                return <option key={process.name} value={process.id_proceso}>{process.nombre}</option>
            })}
        
            </NativeSelect>
        </FormControl>
        {verificationInputs.processInput ? (
                    <Stack  direction="row">
                    <FaRegCircleCheck style={{ color: "#14B814" }} />{" "}
                    <Typography color={"secondary"} variant="caption">
                        ¡Gracias por ingresar una proceso!
                    </Typography>
                    </Stack>
                ) : (
                    /* TbZoomCancel */
                    <Stack  direction="row">
                    <TbZoomCancel style={{ color: "red" }} />{" "}
                    <Typography sx={{ color: "red" }} variant="caption">
                        * ¡Por favor, ingresa un proceso!
                    </Typography>
                    </Stack>
                )}
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button  onClick={handleCloseDialog} color="secondary">
            Cancelar
            </Button>
            <Button  onClick={handleAddRecord}  color="secondary">Agregar</Button>
        </DialogActions>
        </Dialog>
    );
    }

    export default DialogCrudForm;
