import './EventInMap.css';
import React, { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import eventImage from '../Utils/icon.png';
import userImage from '../Utils/userIcon.png';
import { startRaduisEvents, startGetEvents } from '../../react-redux/action/eventAction';
import 'leaflet/dist/leaflet.css'
import EventCardsDisplay from '../Event/EventCardsDisplay';
import { MyContext } from '../../ContextApi/Context';
import RadiusEventDis from '../Event/RadiusEventDis';
import ViewHisEvents from '../ProfileHelpers/ViewHisEvents';
import { jwtDecode } from 'jwt-decode';


function reverseLatLon(arr) {
  return [arr[1], arr[0]]
}


function EventInMap() {
  const eventData = useSelector((state) => state.events)
  const [radius, setRadius] = useState(1);
  const [lonlat, setLonLat] = useState([]);
  const [center, setCenter] = useState([]);
  const {raduisEvents,handleGeoWithinEvents,searchQuery} = useContext(MyContext)
  const dispatch = useDispatch();
  const {userData} = useContext(MyContext)

  const filterRadius =searchQuery &&  raduisEvents.filter(item=>item.title.toLowerCase().includes(searchQuery))
  const filterEvent =searchQuery && eventData.filter(item=>item.title.toLowerCase().includes(searchQuery))

  

  useEffect(() => {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      console.log(latitude, longitude);
      setCenter([latitude, longitude]);
      setLonLat([latitude, longitude]);
    };

    const error = (error) => {
      console.error(error);
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  }, []);

  useEffect(() => {
    if (radius === 500 || radius >= 5000 || radius >= 50000) {
    }
  }, [radius, lonlat]);

  useEffect(() => {
    dispatch(startGetEvents());

  }, []);

  const user = {
    name: `Hello User`,
    coordinates: lonlat.length >0 && lonlat,
  }

  const eventIcon = new Icon({
    iconUrl: eventImage,
    iconSize: [38, 38],
  });

  const userIcon = new Icon({
    iconUrl: userImage,
    iconSize: [50, 50],
  });

  const handleRadiusChange = ()=>{
    handleGeoWithinEvents(radius, lonlat[1], lonlat[0])

  }

  useEffect(()=>{
    console.log(radius)
  },[radius])

  return (
    <div className="div-container">


      {center.length > 0 ? (
        <div>
        <MapContainer center={lonlat} zoom={7} style={{ height: '400px' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
<Circle center={lonlat} radius={(parseInt(radius) + 1) * 1000} /> {/* Convert to meters */}

          <Marker position={lonlat} icon={userIcon}>
            <Popup >{user.name}</Popup>
          </Marker>
          
          {/* {(raduisEvents.length>=0 ? raduisEvents : eventData)?.map((event) => (
            <Marker
              key={event._id}
              position={reverseLatLon(event.location.coordinates)}
              icon={eventIcon}
            >
              <Popup >{event.title }<br/><Link to={`/event-info/${event._id}`}>View More</Link></Popup>

           </Marker>
          ))} */}
          {
  filterRadius.length > 0 ? filterRadius.map((event) => (
    <Marker
      key={event._id}
      position={reverseLatLon(event.location.coordinates)}
      icon={eventIcon}
    >
      <Popup>{event.title}<br /><Link to={`/event-info/${event._id}`}>View More</Link></Popup>
    </Marker>
  )) : (
    raduisEvents.length > 0 ? raduisEvents.map((event) => (
      <Marker
        key={event._id}
        position={reverseLatLon(event.location.coordinates)}
        icon={eventIcon}
      >
        <Popup>{event.title}<br /><Link to={`/event-info/${event._id}`}>View More</Link></Popup>
      </Marker>
    )) : (
      filterEvent.length > 0 ? filterEvent.map((event) => (
        <Marker
          key={event._id}
          position={reverseLatLon(event.location.coordinates)}
          icon={eventIcon}
        >
          <Popup>{event.title}<br /><Link to={`/event-info/${event._id}`}>View More</Link></Popup>
        </Marker>
      )) : (
        eventData.map((event) => (
          <Marker
            key={event._id}
            position={reverseLatLon(event.location.coordinates)}
            icon={eventIcon}
          >
            <Popup>{event.title}<br /><Link to={`/event-info/${event._id}`}>View More</Link></Popup>
          </Marker>
        ))
      )
    )
  )
}

        </MapContainer>
        <div>
        <input
    type="range"
    id="radiusInput"
    min="1"  
    max="50"  
    step="1"  
    value={radius}
    onBlur={handleRadiusChange}
    onChange={(e) => setRadius(parseInt(e.target.value))}
    style={{ width: "40%", height: "10%" }}
/>
</div>

      <p>Radius: {radius} Km</p>


        </div>
        
      ) : (
        <p>Loading map...</p>
      )}

      <div>
        {userData.role=="Organiser" ?  <ViewHisEvents/> :<div>
      <div>
        <div style={{backgroundColor:'lightskyblue'}}>
        <h1>THESE ARE EVENTS IN RADIUS</h1>
        <RadiusEventDis/>
        </div>
      </div>
      <div className="EventDisplay">
        <EventCardsDisplay/>

      </div>
          
          </div>}
      </div>
    </div>
  );
}

export default EventInMap;
