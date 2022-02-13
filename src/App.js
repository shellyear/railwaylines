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
import { useState, useRef, useEffect } from "react";
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

  }, [activePopup])
  
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
      console.log('line.properties.OBJECTIDasd', line.properties.OBJECTID);
      setActivePopup({
        id: line.properties.OBJECTID,
        name: line.properties.OBJECTID,
        position: line.geometry.coordinates[popupCoordinateIndex].reverse(),
      });
      layer.remove();
      handleClick(e, layer);
    });
  }

  function changeName (newName) {
    console.log('activePopup.idss', activePopup.id);
    console.log('geojsonRef.current.children', geojsonRef.current.children);
    // const layersArr = Object.entries(geojsonRef.current._layers).map(([k, v]) => v);
    const updatedGeoData = geoData.map((item) => {
      if (item.properties.OBJECTID === activePopup.id) {
        console.log('changed', { ...item, properties: { ...item.properties, OBJECTID: newName }});
        return { ...item, properties: { ...item.properties, OBJECTID: newName }};
      }
      return item;
    });

    setGeoData(updatedGeoData);
  };
  console.log(activePopup?.id || 0);
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
        {/* {geoData.map((item) => (
          <GeoJSON 
            onEachFeature={onEachLine}
            attribution="&copy; credits due..."
            data={item}
            style={{ weight: 6 }}
          />
        ))} */}
        {activePopup && (
          <StyledPopup 
            position={activePopup.position} 
            autoClose={false}
            popupclose={() => setActivePopup(null)}
          >
            <Form
              popupId={activePopup.id} 
              changeName={changeName}
              name={activePopup.name} 
            />
          </StyledPopup> 
        )}
      </MapContainer>
    </div>
  );
}
