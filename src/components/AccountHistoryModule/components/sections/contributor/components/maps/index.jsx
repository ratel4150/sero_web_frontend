import React from 'react'
import { LoadScript } from "@react-google-maps/api";
import "../maps/GoogleMaps.css";


const classNames = {
  principal: "GoogleMapsPrincipal",
  mapParent: "GoogleMapsPrincipalMapaParent",
  panoramaParent: "GoogleMapsPrincipalPanoramaParent",
  map: "GoogleMapsPrincipalMapa",
  panorama: "GoogleMapsPrincipalPanorama",
  // principal: 'GoogleMapsPrincipal'
};
function GoogleMaps() {
  const lat =19.5404127
  const lng = -99.1785603
  const mapRef = React.useRef(null);
  const panoramaRef = React.useRef(null);
  const [mapLoaded, setMapLoaded] = React.useState(false);

  const onMapLoad = () => {
    setMapLoaded(true);
  };

  React.useEffect(() => {
    if (mapLoaded && mapRef.current && panoramaRef.current) {
      const fenway = { lat, lng };

      const map = new google.maps.Map(mapRef.current, {
        center: fenway,
        zoom: 18,
      });

      const panorama = new google.maps.StreetViewPanorama(panoramaRef.current, {
        position: fenway,
        pov: {
          heading: 34,
          pitch: 10,
        },
      });

      map.setStreetView(panorama);
    }
  }, [mapLoaded, lng, lat]);
  return (
    <div className={classNames.principal}>
    <LoadScript googleMapsApiKey={"AIzaSyBSbHAclLiEeiClEXfeZ2zn9OT850Mw55A"} onLoad={onMapLoad}>
      <div className={classNames.mapParent}>
        <div ref={mapRef} className={classNames.map}></div>
      </div>
      <div className={classNames.panoramaParent}>
        <div ref={panoramaRef} className={classNames.panorama}></div>
      </div>
    </LoadScript>
  </div>
  )
}

export default GoogleMaps