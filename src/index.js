import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'leaflet/dist/leaflet.css';
  {/* {GeoData.features.map((el, i) => {
          return (
            <FeatureGroup color="purple" key={i}>
              <Marker position={el.geometry.coordinates[0]}>
                <Popup>
                  <p>{el.properties.YARDNAME}</p>
                    <button
                      id="button"
                      className="btn btn-primary"
                      onClick={() => {
                        
                      }}
                    >
                      More Info
                    </button>
                </Popup>
              </Marker>
            </FeatureGroup>
          );
        })} */}
        // {geoData.map((el, i) => (
        //   <Polyline
        //     key={i} 
        //     color={"red"}
        //     positions={el.geometry.coordinates}
        //   />
        // ))}

       






ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
