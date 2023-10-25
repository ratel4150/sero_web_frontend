import React, { useRef, useEffect, useState } from 'react'
import { Map } from "mapbox-gl";
import { useParams } from 'react-router-dom'
import { getPlaceById } from '../../services/place.service';

import { useDispatch } from 'react-redux'
import { setDraw } from '../../redux/featuresSlice'
import { setPlazaMapa } from '../../redux/plazaMapa.Slice'
import { setMapa } from '../../redux/mapaSlice'
import { setFeatures, setCoordinates, setPuntosInPoligono } from '../../redux/featuresSlice'
import MapboxDraw from "@mapbox/mapbox-gl-draw";

import * as turf from '@turf/turf'

const stylesMap = {
    height: '88vh',
    width: '100vw',
    position: 'fixed',
    top: '12%',
    left: 0,
}



const Mapa = () => {

    const dispatch = useDispatch()


    const mapDiv = useRef(null)

    const { place_id } = useParams();

    const [plaza, setPlaza] = useState([])
    const [poligonosDibujados, setPoligonosDibujados] = useState([]);
    const [seleccionPoligonoPuntos, setSeleccionPoligonoPuntos] = useState([]);
    const [ultimoPoligonoCreado, setUltimoPoligonoCreado] = useState('');

    useEffect(() => {
        getPlazaById()
    }, [])

    useEffect(() => {
        if (Object.keys(plaza).length > 0) {
            generarMapa()
        }
    }, [plaza])

    const getPlazaById = async () => {

        const res = await getPlaceById(place_id)
        console.log(res[0])
        dispatch(setPlazaMapa(res[0]))
        setPlaza(res[0])
  
    }

    const generarMapa = () => {
        const mapa = new Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
            center: [plaza.longitud, plaza.latitud],
            zoom: 12
        })

        dispatch(setMapa(mapa))

        const draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                trash: true
            },
        })

        mapa.addControl(draw)

        dispatch(setDraw(draw))

        mapa.on('draw.create', (e) => {
            setSeleccionPoligonoPuntos([]);
            const data = draw.getAll();
            if (data.features.length > 0) {
                let idPoligono = data.features[0].id
                setUltimoPoligonoCreado(idPoligono);
                setPoligonosDibujados([...poligonosDibujados, idPoligono]);
            } else {
                if (e.type !== 'draw.delete')
                    alert('Click the map to draw a polygon.');
            }
        })

        mapa.on('draw.delete', (e) => {
            setSeleccionPoligonoPuntos([]);
            const data = draw.getAll();
            dispatch(setPuntosInPoligono([]))
            if (data.features.length > 0) {
                let idPoligono = data.features[0].id
                setUltimoPoligonoCreado(idPoligono);
                setPoligonosDibujados([...poligonosDibujados, idPoligono]);
            } else {
                if (e.type !== 'draw.delete')
                    alert('Click the map to draw a polygon.');
            }
        })

        mapa.on('click', e => {

            setSeleccionPoligonoPuntos([]);

            var bbox = [
                [e.point.x - 1, e.point.y - 1],
                [e.point.x + 1, e.point.y + 1]
            ];


            var features = mapa.queryRenderedFeatures(bbox)

            if (features.length > 0) {

                if (features[0].layer.type === 'fill' || features[0].layer.type === 'circle') {

                    var draw_polygon = turf.bbox(features[0]);

                    var southWest = [draw_polygon[0], draw_polygon[1]];
                    var northEast = [draw_polygon[2], draw_polygon[3]];

                    var northEastPointPixel = mapa.project(southWest);
                    var southWestPointPixel = mapa.project(northEast);

                    var featuresB = mapa.queryRenderedFeatures([southWestPointPixel, northEastPointPixel])


                    let puntos = featuresB.filter((f) => f.layer.type === 'circle')
                    puntos.forEach(p => {
                        p.id = ultimoPoligonoCreado
                    })

                    puntos = quitarDuplicados(puntos);
                    console.log(puntos)

                    dispatch(setPuntosInPoligono(puntos))
                    dispatch(setFeatures(features[0].properties))
                    if (features[0].geometry.type === 'Polygon') {
                        let coordenadasArray = [];
                        let latitud = features[0].properties.latitud;
                        let longitud = features[0].properties.longitud;
                        coordenadasArray.push(longitud);
                        coordenadasArray.push(latitud);
                        dispatch(setCoordinates(coordenadasArray))
                        //setInformacionBuscada([]);
                    } else if (features[0].geometry.type === 'Point') {
                        let coordenadas = features[0].geometry.coordinates;
                        dispatch(setCoordinates(coordenadas))
                        // setInformacionBuscada([]);
                    }

                } else {

                    setCoordinates([]);
                    setFeatures([]);
                    // setInformacionBuscada([]);
                }

            }

        })

    }


    const quitarDuplicados = (array) => {
        //console.log(array)
        var hash = {};
        let arrayTemp = array.filter(function (current) {
            var exists = !hash[current.properties.id_contribuyente];
            hash[current.properties.id_contribuyente] = true;
            return exists;
        });
        return arrayTemp;
    }

    return (
        <div ref={mapDiv} style={stylesMap}>

        </div>
    )
}

export default Mapa