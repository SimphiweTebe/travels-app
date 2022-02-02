import React, {useState, useEffect} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { useSelector, useDispatch } from 'react-redux'
import { createPin } from './redux/actions/pinActions';
import { logOut } from './redux/actions/userActions';
import {FaMapMarkerAlt, FaCompass} from 'react-icons/fa';
import Card from './components/Card/Card';
import axios from 'axios';
import Forms from './components/Forms/Forms';

function App() {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [currentUser, setCurrentUser] = useState(null);
    const [pins, setPins] = useState([]);
    const [newPlace, setNewPlace] = useState(null);
    const [pinData, setPinData] = useState({
        title: '',
        desc: '',
        rating: ''
    })
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: -34.040278,
        longitude: 18.677778,
        zoom: 10
      });
      const [currentPlaceId, setCurrentPlaceId] = useState(null);

      useEffect(()=>{
          const loadPins = async ()=>{
              const res = await axios.get('/pins');
              setPins(res.data)
          }

          setCurrentUser(user.username);
          loadPins()
      },[user, pins])

      const handleMarkerClick = (id,lat,long) => {
          setCurrentPlaceId(id);
          setViewport({...viewport, latitude: lat, longitude: long})
      }

      const handleAddClick = (e)=> {
          const [long, lat] = e.lngLat;
          setNewPlace({lat, long});
      }

      const handleReviewInputs = async (e) => {
        setPinData({...pinData, [e.target.name]: e.target.value})
      }

      const handleSubmit = async (e) => {
        e.preventDefault();

        const newPin = {
            ...pinData, 
            username: currentUser,
            lat: newPlace.lat,
            long: newPlace.long
        }
        
        try{
            dispatch(createPin(newPin));
            setPins([...pins, newPin])
            setNewPlace(null)
        }catch(err){
            console.log(err);
        }
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
                                offsetLeft={-viewport.zoom / 2.5} 
                                offsetTop={-viewport.zoom / 5}
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
                                            <form className="add-form" onSubmit={handleSubmit}>
                                                <label>Title:</label>
                                                <input type="text" name="title" placeholder='Enter a title' onChange={handleReviewInputs}/>
                                                <label>Review:</label>
                                                <textarea name="desc" placeholder='Say something about this place.' onChange={handleReviewInputs}/>
                                                <label>Rating:</label>
                                                <select name="rating" onChange={handleReviewInputs}>
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
                                )}
                        </div>
                    ))
                }
                <div className="nav-bar">
                    <div className="logo">
                        <span><FaCompass className='icon'/></span>
                        <span>Tripshare</span>
                    </div>

                    {
                        Object.entries(user).length !== 0 ? (<button onClick={()=> dispatch(logOut())}>Log out</button>) 
                        : (
                        <>
                            <p>You must be logged in to post a trip</p>
                        </>
                        )
                    }
                </div>
                {
                    Object.entries(user).length === 0 && <Forms />
                }
            </ReactMapGL>
        </div>
    )
}

export default App
