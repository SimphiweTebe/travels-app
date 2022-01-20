import React, {useState, useEffect} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { useSelector, useDispatch } from 'react-redux'
import { getPins } from './redux/actions/pinActions';
import {FaMapMarkerAlt} from 'react-icons/fa';
import { scaleToZoom } from 'viewport-mercator-project';
import Card from './components/Card/Card';

function App() {

    const pins = useSelector(state => state.pins);
    const currentUser = "Zama";
    const dispatch = useDispatch();
    const [newPlace, setNewPlace] = useState(null);
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: -34.040278,
        longitude: 18.677778,
        zoom: 10
      });

      const [currentPlaceId, setCurrentPlaceId] = useState(null);

      useEffect(()=>{
          dispatch(getPins())
      },[])

      const handleMarkerClick = (id,lat,long) => {
          setCurrentPlaceId(id);
          setViewport({...viewport, latitude: lat, longitude: long})
      }

      const handleAddClick = (e)=> {
          const [long, lat] = e.lngLat;
          setNewPlace({lat, long});
      }

    return (
        <div>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapStyle="mapbox://styles/simphiwetebe/ckylxwdqienf616n2o6l6b735"
                onDblClick={handleAddClick}
                transitionDuration="200"
            >
                {
                    pins.length > 0 && pins.map(p => (
                        <div className='pin' key={p._id}>
                            {/* custome marker */}
                            <Marker 
                                latitude={p.lat} 
                                longitude={p.long} 
                                offsetLeft={-20} 
                                offsetTop={-10}
                            >
                            <FaMapMarkerAlt style={{
                                transform: `scale(${viewport.zoom / 5})`,
                                color: p.username === currentUser ? "tomato" : "slateBlue",
                                cursor: 'pointer',
                                }}
                                onClick={(id) => handleMarkerClick(p._id,p.lat,p.long)}
                            />
                            </Marker>
                            {/* popup logic for clicked marker */}
                            {p._id === currentPlaceId && (
                                <Popup
                                latitude={p.lat} 
                                longitude={p.long} 
                                closeButton={true}
                                closeOnClick={false}
                                onClose={()=> setCurrentPlaceId(null)}
                                anchor="left" 
                                >
                                    <Card pin={p}/>
                                </Popup>
                            )}
                            {/* popup logic for adding place */}
                            {
                                newPlace && (
                                    <Popup
                                        latitude={newPlace.lat} 
                                        longitude={newPlace.long} 
                                        closeButton={true}
                                        closeOnClick={false}
                                        onClose={()=> setNewPlace(null)}
                                        anchor="left" 
                                    >
                                        <div className="add">
                                            <form className="add-form">
                                                <label>Title:</label>
                                                <input type="text" name="title" placeholder='Enter a title' />
                                                <label>Review:</label>
                                                <textarea name="desc" placeholder='Say something about this place.' />
                                                <label>Rating:</label>
                                                <select>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                                <button className="submit-btn">Add Pin</button>
                                            </form>
                                        </div>
                                    </Popup>
                                )
                            }
                        </div>
                    ))
                }
            </ReactMapGL>
        </div>
    )
}

export default App
