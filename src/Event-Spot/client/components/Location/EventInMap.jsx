import './EventInMap.css';
import React, { useContext, useEffect, useState,memo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import eventImage from '../Utils/icon.png';
import userImage from '../Utils/userIcon.png';
import {startGetEvents } from '../../react-redux/action/eventAction';
import 'leaflet/dist/leaflet.css'
import EventCardsDisplay from '../Event/EventCardsDisplay';
import { MyContext } from '../../ContextApi/Context';
import RadiusEventDis from '../Event/RadiusEventDis';
import { Container } from 'react-bootstrap';
import SpinnerComponent from '../Utils/Spinner/SpinnerComponent';
import MultiCarousel from '../Event/multi-Carousel/MultiCarousel';


function reverseLatLon(arr) {
  return [arr[1], arr[0]]
}


function EventInMap() {
  const eventData = useSelector((state) => state.events)
  const [radius, setRadius] = useState(10);
  const [lonlat, setLonLat] = useState([]);
  const [center, setCenter] = useState([]);
  const { raduisEvents, handleGeoWithinEvents, searchQuery,profile } = useContext(MyContext)
  const dispatch = useDispatch();
  const { userData } = useContext(MyContext)
  console.log(profile,"profile")

  const filterRadius = searchQuery && raduisEvents.filter(item => item.title.toLowerCase().includes(searchQuery))
  const filterEvent = searchQuery && eventData.filter(item => item.title.toLowerCase().includes(searchQuery))

useEffect(()=>{
  const profileCo = profile?.location?.coordinates
  if(lonlat.length===0 && userData.role==="Customer" && profileCo?.length > 0 ){
    setLonLat(reverseLatLon(profileCo))
    setCenter(reverseLatLon(profileCo))
  }
},[profile])

  useEffect(() => {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      console.log(latitude,longitude,"in the eventInMap")
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
    handleRadiusChange()
  }, [lonlat]);

  useEffect(() => {
    dispatch(startGetEvents());

  }, []);

  const user = {
    name: `Hello User`,
    coordinates: lonlat?.length > 0 && lonlat,
  }

  const eventIcon = new Icon({
    iconUrl: eventImage,
    iconSize: [38, 38],
  });

  const userIcon = new Icon({
    iconUrl: userImage,
    iconSize: [50, 50],
  });

  const handleRadiusChange = () => {
   
    if(radius && lonlat[1] && lonlat[0]) {
      handleGeoWithinEvents(radius, lonlat[1], lonlat[0])}
    }





  return (
    <div className="div-container">


      {center.length > 0 ? (
        <div>
          <MapContainer center={lonlat} zoom={10} style={{ height: '400px' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Circle center={lonlat} radius={(parseInt(radius) + 1) * 870} /> {/* convert to meters */}

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
    )) : <SpinnerComponent/>   // Added null to handle case when raduisEvents is empty
  )
}

              
            

          </MapContainer>
          <div style={{ }}> 

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
                      <span> {radius} Km</span>

          </div>





        </div>

      ) : (
        <p><SpinnerComponent/>
          Allow Location</p>
      )}
      <div>
        <div>
          <div style={{}}>
            <Container style={{ backgroundColor: "lightblue", borderRadius: "15px 15px 0 15px ", marginBottom: "40px" }}>
              <RadiusEventDis raduisEvents={filterRadius ? filterRadius : raduisEvents} />
            </Container>

          </div>

          <div className="multi-car">
          <MultiCarousel/>

          </div>
          <div className="EventDisplay">
            <Container style={{ color: "blue" }}>

              <EventCardsDisplay />
            </Container>


          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(EventInMap);
