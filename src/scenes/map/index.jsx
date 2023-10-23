import React, { useRef, useEffect, useState } from 'react'
import { Map } from "mapbox-gl";

const stylesMap = {
    height: '88vh',
    width: '100vw',
    position: 'fixed',
    top: '12%',
    left: 0,
}


const Mapa = () => {

    const mapDiv = useRef(null)

    useEffect(() => {
        generarMapa()
    }, [])

    const generarMapa = () => {
        const mapStreet = new Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
            center: [-99.212763, 19.651720],
            zoom: 12
        })
        //setMap(map, id_plaza!);
    }

    return (
        <div ref={mapDiv} style={stylesMap}>

        </div>
    )
}

export default Mapa