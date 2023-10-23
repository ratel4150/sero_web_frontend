
import { useEffect, useState } from 'react'
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

// images
import Portada from '../assets/portada.png'
import PulsoLogo from '../assets/logo_pdm_oscuro.png'
import PulsoVerde from '../assets/pulso_verde.png'
import Final from '../assets/final.png'


Font.register({
    family: 'Open Sans',
    fonts: [
        { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
        { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 'semibold' },
        { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 'bold' },
    ]
});



const PdfView = ({ preguntas = null, tituloEncuesta, grid1, graphicPregunta1, graphicPregunta2 = null, graphicPregunta3 = null, graphicPregunta4 = null, graphicPregunta5 = null }) => {

    const styles = StyleSheet.create({
        // generales
        contenedorImagenPulso: {
            width: '200px',
            margin: '0 auto',
            textAlign: 'center',
            marginTop: '10px'
        },
        imagenPulso: {
            width: '100px',
            textAlign: ' center',
            margin: '0 auto'
        },
        pageNumber: {
            position: 'absolute',
            fontSize: 16,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: '#3da58a',
            fontFamily: 'Open Sans',
            fontWeight: 'bold'
        },
        // pagina 1 - portada
        container: {
            height: '100%',
            position: 'relative',
            display: 'inline-block',
            textAlign: 'center'
        },
        imagenPortada: {
            opacity: '.9',
            height: '100%'
        },
        titleEncuesta: {
            position: 'absolute',
            width: '55%',
            top: '84%',
            left: '23%',
            margin: '0 auto',
            color: '#ffffff',
            fontSize: '20px'
        },

        // pagina 2
        titulo1: {
            fontSize: '22px',
            color: '#3da58a',
            marginTop: '63px',
            marginBottom: '30px',
            textAlign: 'center',
            fontFamily: 'Open Sans',
            fontWeight: 'bold'
        },
        contenedorImagenTexto: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '70%',
            margin: '0 auto',
            marginBottom: '20px',
            fontFamily: 'Open Sans',
            fontWeight: 'semibold'
        },
        thumbail: {
            width: '20px',
            height: '20px',
            marginRight: '5px'
        },
        pregunta: {
            fontSize: '12px',
            fontFamily: 'Open Sans',
            fontWeight: 'bold'
        },

        // pagina 3
        informacionMetodologica: {
            fontSize: '10px',
            fontFamily: 'Open Sans',
            fontWeight: 'semibold'
        },

        // pagina final
        finalAvisoPrivacidad: {
            position: 'absolute',
            width: '55%',
            left: '23%',
            margin: '0 auto',
            color: '#3da58a',
            fontSize: '20px'
        },
        finalEspacio: {
            position: 'absolute',
            width: '55%',
            left: '23%',
            margin: '0 auto',
            color: '#ffffff',
            fontSize: '14px'
        }
    })

    return (
        <Document>
            {/* Portada, esta es siempre la misma */}
            <Page>
                <View size='' style={styles.container}>
                    <Image style={styles.imagenPortada} src={Portada} />
                    <Text style={styles.titleEncuesta}>{tituloEncuesta}</Text>
                </View>
            </Page>

            <Page>
                <View style={{ width: '90%', margin: '0 auto', marginTop: ' 30px', textAlign: 'center' }}>

                    <View style={styles.contenedorImagenPulso}>
                        <Image style={styles.imagenPulso} src={PulsoLogo} />
                    </View>

                    <Text style={styles.titulo1}>
                        Contenido
                    </Text>

                    <View style={styles.contenedorImagenTexto}>
                        <Image style={styles.thumbail} src={PulsoVerde} />
                        <Text style={styles.pregunta}> Información metodológica
                            <Text style={{ color: '#3da58a' }}> P2 </Text>
                        </Text>
                    </View>

                    {/* Este es el bloque que se recorrera segun las preguntas */}
                    {preguntas !== null && preguntas.length > 0 && preguntas.map((pregunta, index) => (
                        <View style={styles.contenedorImagenTexto}>
                            <Image style={styles.thumbail} src={PulsoVerde} />
                            <Text style={styles.pregunta}> {index + 1} - {pregunta?.titulo_pregunta}
                                <Text style={{ color: '#3da58a' }}> P{index + 3} </Text>
                            </Text>
                        </View>
                    ))}


                    <View style={styles.contenedorImagenTexto}>
                        <Image style={styles.thumbail} src={PulsoVerde} />
                        <Text style={styles.pregunta}> Información legal, aviso de privacidad y datos de contacto de
                            <Text style={{ color: '#3da58a' }}> PULSODEMOCRÁTICO P{preguntas.length + 3} </Text>
                        </Text>
                    </View>

                </View>

                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `P${pageNumber - 1}`
                )} fixed />
            </Page>

            <Page>
                <View style={{ width: '100%', margin: '0 auto', marginTop: ' 30px' }}>

                    <View style={styles.contenedorImagenPulso}>
                        <Image style={styles.imagenPulso} src={PulsoLogo} />
                    </View>

                    <View style={{ ...styles.contenedorImagenTexto, width: '90%', marginTop:'10px' }}>
                        <Image style={styles.thumbail} src={PulsoVerde} />
                        <Text style={styles.pregunta}> Información metodológica</Text>
                    </View>

                    <View style={{ backgroundColor: '#F2F0F0', padding: '10px', width: '90%', margin: '0 auto', marginBottom: '15px' }}>
                        <Text style={styles.informacionMetodologica}>
                            Este espacio es para incluir la información metodológica de la encuesta. Aquí se incluirán, además de los datos que arroja el portal en los recuadros de abajo, información en texto sobre la metodología utilizada para la encuesta.
                        </Text>
                    </View>

                    <View style={{ textAlign: 'center' }}>
                        <Image style={{ width: '90%', height: '90%', margin: '0 auto' }} src={grid1} />
                    </View>

                </View>
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `P${pageNumber - 1}`
                )} fixed />
            </Page>

            {preguntas.length > 0 && (
                <>
                    {graphicPregunta1 !== null && (
                        <Page>
                            <View style={{ ...styles.contenedorImagenPulso, marginTop: '40px', marginBottom: '15px' }}>
                                <Image style={styles.imagenPulso} src={PulsoLogo} />
                            </View>
                            <View style={styles.contenedorImagenTexto}>
                                <Image style={styles.thumbail} src={PulsoVerde} />
                                <Text style={styles.pregunta}>
                                    1 - {preguntas[0]?.titulo_pregunta}
                                </Text>
                            </View>
                            <View style={{ textAlign: 'center', width: '100%', height: '80%', margin: '0 auto' }}>
                                <Image style={{ width: '90%', height: '90%', margin: '0 auto' }} src={graphicPregunta1} />
                            </View>
                            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                                `P${pageNumber - 1}`
                            )} fixed />
                        </Page>
                    )}

                    {graphicPregunta2 !== null && (
                        <Page>
                            <View style={{ ...styles.contenedorImagenPulso, marginTop: '40px', marginBottom: '15px' }}>
                                <Image style={styles.imagenPulso} src={PulsoLogo} />
                            </View>
                            <View style={styles.contenedorImagenTexto}>
                                <Image style={styles.thumbail} src={PulsoVerde} />
                                <Text style={styles.pregunta}>
                                    2 - {preguntas[1]?.titulo_pregunta}
                                </Text>
                            </View>
                            <Text>

                            </Text>
                            <View style={{ textAlign: 'center', width: '100%', height: '80%', margin: '0 auto' }}>
                                <Image style={{ width: '90%', height: '90%', margin: '0 auto' }} src={graphicPregunta2} />
                            </View>
                            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                                `P${pageNumber - 1}`
                            )} fixed />
                        </Page>
                    )}

                    {graphicPregunta3 !== null && (
                        <Page>
                            <View style={{ ...styles.contenedorImagenPulso, marginTop: '40px', marginBottom: '15px' }}>
                                <Image style={styles.imagenPulso} src={PulsoLogo} />
                            </View>
                            <View style={styles.contenedorImagenTexto}>
                                <Image style={styles.thumbail} src={PulsoVerde} />
                                <Text style={styles.pregunta}>
                                    3 - {preguntas[2]?.titulo_pregunta}
                                </Text>
                            </View>
                            <View style={{ textAlign: 'center', width: '100%', height: '80%', margin: '0 auto' }}>
                                <Image style={{ width: '90%', height: '90%', margin: '0 auto' }} src={graphicPregunta3} />
                            </View>
                            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                                `P${pageNumber - 1}`
                            )} fixed />
                        </Page>
                    )}

                    {graphicPregunta4 !== null && (
                        <Page>
                            <View style={{ ...styles.contenedorImagenPulso, marginTop: '40px', marginBottom: '15px' }}>
                                <Image style={styles.imagenPulso} src={PulsoLogo} />
                            </View>
                            <View style={styles.contenedorImagenTexto}>
                                <Image style={styles.thumbail} src={PulsoVerde} />
                                <Text style={styles.pregunta}>
                                    4 - {preguntas[3]?.titulo_pregunta}
                                </Text>
                            </View>
                            <View style={{ textAlign: 'center', width: '100%', height: '80%', margin: '0 auto' }}>
                                <Image style={{ width: '90%', height: '90%', margin: '0 auto' }} src={graphicPregunta4} />
                            </View>
                            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                                `P${pageNumber - 1}`
                            )} fixed />
                        </Page>
                    )}

                    {graphicPregunta5 !== null && (
                        <Page>
                            <View style={{ ...styles.contenedorImagenPulso, marginTop: '40px', marginBottom: '15px' }}>
                                <Image style={styles.imagenPulso} src={PulsoLogo} />
                            </View>
                            <View style={styles.contenedorImagenTexto}>
                                <Image style={styles.thumbail} src={PulsoVerde} />
                                <Text style={styles.pregunta}>
                                    5 - {preguntas[4]?.titulo_pregunta}
                                </Text>
                            </View>
                            <View style={{ textAlign: 'center', width: '100%', height: '80%', margin: '0 auto' }}>
                                <Image style={{ width: '90%', height: '90%', margin: '0 auto' }} src={graphicPregunta5} />
                            </View>
                            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                                `P${pageNumber - 1}`
                            )} fixed />
                        </Page>
                    )}

                </>
            )}



            {/* Pagina final */}
            <Page>
                <View size='' style={styles.container}>
                    <Image style={{ ...styles.imagenPortaeda, height: '95%' }} src={Final} />
                    <Text style={{ ...styles.finalAvisoPrivacidad, top: '30%' }}>
                        AVISO DE PRIVACIDAD
                    </Text>
                    <Text style={{ ...styles.finalEspacio, top: '39%' }}>
                        Espacio destinado a incluir información legal, sobre avisos de privacidad,
                        información detallada sobre autorizaciones y licencias para la
                        realización de la presente encuesta; tanto a nivel local como estatal y
                        federal
                    </Text>
                    <Text style={{ ...styles.finalAvisoPrivacidad, top: '55%' }}>
                        EQUIPO TÉCNICO RESPONSABLE
                    </Text>
                    <Text style={{ ...styles.finalEspacio, top: '59%' }}>
                        Mtro. Jhovany Cedillo Cárdenas
                    </Text>
                    <Text style={{ ...styles.finalEspacio, top: '61%' }}>
                        Ing. Antonio Ezequiel Ticante Pérez
                    </Text>
                    <Text style={{ ...styles.finalEspacio, top: '63%' }}>
                        C. Alejandro Aguilar Aldrete
                    </Text>
                    <Text style={{ ...styles.finalEspacio, top: '65%' }}>
                        Entre muchos otros...
                    </Text>
                    <Text style={{ ...styles.finalAvisoPrivacidad, top: '79%' }}>
                        CONTACTO
                    </Text>
                    <Text style={{ ...styles.finalEspacio, top: '83%' }}>
                        contacto@pulsodemocratico.info
                    </Text>
                    <Text style={{ ...styles.finalEspacio, top: '87%' }}>
                        WWW.PULSODEMOCRATICO.INFO
                    </Text>
                    <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                        `P${pageNumber - 1}`
                    )} fixed />
                </View>
            </Page>

        </Document>
    )
}

export default PdfView