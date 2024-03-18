import React, { useEffect } from 'react'
import './About.css'
import L, { Icon } from 'leaflet'
// import 'leaflet/dist/leaflet-src.esm'
import { MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'

function Map() {

const customIcon = new Icon({
    iconUrl:'https://cdn-icons-png.flaticon.com/128/2875/2875433.png',
    iconSize:[38, 38]
})
const position = [ 6.853674088660931, 37.75918312394459]
  return (
    <div className='map-box'>
    <MapContainer  minZoom={0} boxZoom={true}  className='leafletmap' center={position} zoom={13} scrollWheelZoom={true} style={{width: "450px", height: "400px" , zIndex:'10'}}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'  
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      <Marker  position={position} icon={customIcon}>
        <Popup><p className='popup-text'>Soddo Baptist Church</p></Popup>
      </Marker>
   </MapContainer>
    </div>
  )
}

export default Map