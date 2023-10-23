const barajar = (array) => {
    let posicionActual = array.length;

    while (0 !== posicionActual) {
        const posicionAleatoria = Math.floor(Math.random() * posicionActual);
        posicionActual--;
        //"truco" para intercambiar los valores sin necesidad de una variable auxiliar
        [array[posicionActual], array[posicionAleatoria]] = [
            array[posicionAleatoria], array[posicionActual]];
    }
    return array;
}


const generarAleatorios = (cantidad) => {
    const caracteres = "0123456789-+%=*".split("");
    barajar(caracteres);
    return caracteres.slice(0, cantidad).join("")
}


const getFechaFormat = (e) => {
    let day = e.$D
    if (day.toString().length === 1) day = '0' + day
    let month = e.$M + 1
    if (month.toString().length === 1) month = '0' + month
    let year = e.$y
    return `${year}-${month}-${day}`
}

const functionsCustom = {
    barajar,
    generarAleatorios,
    getFechaFormat
}


export default functionsCustom