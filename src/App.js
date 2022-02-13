import {
  MapContainer,
  FeatureGroup,
  Polyline,
  GeoJSON,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMap,
} from "react-leaflet";
import styled from "styled-components";
import { useState, createRef, useEffect, useRef } from "react";
import Form from "./components/Form";
import GeoData from "./MA_rail_lines.json";

const StyledPopup = styled(Popup)``;

export default function App() {
  const geojsonRef = useRef();  
  const [segments, setSegments] = useState([]);
  const [geoData, setGeoData] = useState(GeoData.features);
  const [selectedItems, setSelectedItems] = useState([]);
  const [activePopup, setActivePopup] = useState(null);

  useEffect(() => {
    if (geojsonRef.current) {
      geojsonRef.current.clearLayers().addData(geoData);
    }
  }, [geoData]);
  
  function handleClick(e, layer) {
    layer.setStyle({ color: 'red'});
  }

  function onEachLine(line, layer) {
    layer.on('mouseover', (e) => {
      layer.setStyle({ color: 'yellow'});
    });

    layer.on('mouseout', (e) => {
      layer.setStyle({ color: '#3388ff'});
    });

    layer.on('click', (e) => {
      const popupCoordinateIndex = Math.floor(line.geometry.coordinates.length / 2);
      if (activePopup === null) {
        setActivePopup({
          id: line.properties.OBJECTID,
          name: line.properties.OBJECTID,
          position: line.geometry.coordinates[popupCoordinateIndex].slice().reverse(),
        });
      };
      handleClick(e, layer);
    });
  }

  function changeName (newName) {
    const updatedGeoData = geoData.map((line) => {
      if (line.properties.OBJECTID === activePopup.id) {
        const popupCoordinateIndex = Math.floor(line.geometry.coordinates.length / 2);
        setActivePopup({
          id: newName,
          name: newName,
          position: line.geometry.coordinates[popupCoordinateIndex].slice().reverse(),
        });
        return { ...line, properties: { ...line.properties, OBJECTID: newName }};
      }
      return line;
    });
    setGeoData(updatedGeoData);
  };
  
  return (
    <div className="App">
      <MapContainer
        style={{ height: "100vh" }} 
        center={[42.2, -71.7]} 
        zoom={8}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          ref={geojsonRef}
          onEachFeature={onEachLine}
          attribution="&copy; credits due..."
          data={geoData}
          style={{ weight: 6 }}
        />
        {activePopup && (
          <Popup
            popupId={activePopup.id}  
            position={activePopup.position} 
          >
            <Form
              popupId={activePopup.id} 
              changeName={changeName}
              name={activePopup.name} 
            />
          </Popup> 
        )}
      </MapContainer>
    </div>
  );
}
