import React, {useState, useEffect} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { useSelector, useDispatch } from 'react-redux'
import { getPins } from './redux/actions/pinActions';
import {FaMapMarkerAlt} from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { scaleToZoom } from 'viewport-mercator-project';
import { format} from 'timeago.js'

function App() {

    const pins = useSelector(state => state.pins);
    const dispatch = useDispatch();

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

      const handleMarkerClick = id => {
          setCurrentPlaceId(id)
      }

    return (
        <div>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapStyle="mapbox://styles/simphiwetebe/ckylxwdqienf616n2o6l6b735"
            >
                {
                    pins.length > 0 && pins.map(p => (
                        <div className='pin' key={p._id}>
                        <Marker 
                        latitude={p.lat} 
                        longitude={p.long} 
                        offsetLeft={-20} 
                        offsetTop={-10}>
                        <FaMapMarkerAlt style={{
                            transform: `scale(${viewport.zoom / 5})`,
                            color: '#FF0000',
                            cursor: 'pointer'
                        }}
                        onClick={(id) => handleMarkerClick(p._id)}
                        />
                    </Marker>
                    {p._id === currentPlaceId && (
                        <Popup
                        latitude={p.lat} 
                        longitude={p.long} 
                        closeButton={true}
                        closeOnClick={false}
                        onClose={()=> setCurrentPlaceId(null)}
                        anchor="left" >
                        <div className="card">
                            <h5>Place:</h5>
                            <p>{p.title}</p>
                            <h5>Review:</h5>
                            <p className="review">{p.desc}</p>
                            <h5>Rating:</h5>
                            <span className="rating">
                                <AiFillStar className='star' />
                                <AiFillStar className='star' />
                                <AiFillStar className='star' />
                                <AiFillStar className='star' />
                                <AiFillStar  className='star'/>
                            </span>
                            <h5>Information:</h5>
                            <p className="information">
                                <span className='username'>Created by: <b>{p.username}</b>
                                </span> <span className='date'>{format(p.createdAt)}</span>
                            </p>
                        </div>
                    </Popup>
                    )}
                        </div>
                    ))
                }
            </ReactMapGL>
        </div>
    )
}

export default App
