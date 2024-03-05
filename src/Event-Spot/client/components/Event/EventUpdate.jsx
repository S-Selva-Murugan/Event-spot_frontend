import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import axios from "../Api_Resources/axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Carousel, Spinner, ProgressBar, Row, Col, Form, Card, ListGroup, Badge, Button, InputGroup, CardText, Alert } from 'react-bootstrap';

import "./EventForm.css"
import NotFound from '../Utils/NotFound/NotFound'
import { startCreateEvent, startUpdateEvent } from "../../react-redux/action/eventAction"
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MyContext } from '../../ContextApi/Context';
import { toast } from 'react-toastify';
import { startOragniserEvents } from '../../react-redux/action/organiserAction';
// https://www.dhiwise.com/post/zod-and-react-a-perfect-match-for-robust-validation

function formatDateToTimeLocal(dateString){
    const date = new Date(dateString);
      date.setDate(15);
      date.setUTCHours(17); 
      date.setUTCMinutes(6); 
      const formattedDate = date.toISOString().substring(0, 16);
    return formattedDate
  
  }
  console.log("In the event")
  
const EventForm = () => {
    const { userData } = useContext(MyContext)
    const { eventId } = useParams()

    const [event, setEvent] = useState([])
    const [errors, setErrors] = useState({});
    const [serverErrors, setServerErrors] = useState()
    const [ticketErrors, setTicketErrors] = useState([])
    const [ticketStartHelp, setTicketStartHelp] = useState(false)
    const [ticketEndHelp, setTicketEndHelp] = useState(false)
    const [edit, setEdit] = useState(false)


    const events = useSelector((state)=>state?.organiserDetails.organiserEvents)
    useEffect(() => {
        dispatch(startOragniserEvents())
      }, [])



    const [form, setForm] = useState({
        eventStartDateTime: "",
        title:event?.title ?  event?.title : " ",
        description: " ",
        categoryId: null,
        ticketType: [
            { ticketName: " ", ticketPrice: " ", ticketCount: '', remainingTickets: '' },
        ],
        venueName: "",
        ticketSaleStartTime: "",
        ticketSaleEndTime: "",
    })

    const [poster, setPoster] = useState({
        Clip: { name: '', file: null },
        Brochure: { name: '', file: null },
    })
    const [youTube, setYouTube] = useState({
        title: "", url: "",
    })
    const [actors, setActors] = useState([{ name: " " }])
    const [allCategory, setAllCategory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [locObj, setLocObj] = useState({
        address: '',
        place_id: '',
        lonlat: ['', ''],
        city: ''
    });
    const [searchResults, setSearchResults] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        // console.log(events.length,"in useEffect")
        // console.log(events,"organiserEvents")
        if (events?.length > 0 ) {
            console.log(events,"all")
            console.log(eventId,"id")
            
            const foundEvent =  events.find((event)=>event._id===eventId)
            const eventData = events.find((ele) => ele._id === eventId);
            console.log(eventData)
            // localStorage.setItem('eventData', JSON.stringify(foundEvent))
            console.log(foundEvent)
            setEvent(foundEvent)
            setEdit(true)
            setForm({
                title: foundEvent?.title && foundEvent?.title,
                 eventStartDateTime:foundEvent?.eventStartDateTime && formatDateToTimeLocal(foundEvent?.eventStartDateTime),
                description:foundEvent?.description || "", 
                categoryId:foundEvent?.categoryId || "", 
                ticketType:foundEvent?.ticketType?.map(ticket => ({
                  ticketName: ticket?.ticketName || "",
                  ticketPrice: parseInt(ticket?.ticketPrice) || 0,
                  ticketCount: parseInt(ticket?.ticketCount) || 0
                })) || [],
                venueName:foundEvent.venueName || "",
                ticketSaleStartTime:foundEvent?.ticketSaleStartTime && formatDateToTimeLocal(foundEvent?.ticketSaleStartTime),
                ticketSaleEndTime:foundEvent?.ticketSaleEndTime && formatDateToTimeLocal(foundEvent?.ticketSaleEndTime),
              });
        
               setPoster({
                Clip: { name:foundEvent?.posters?.ClipName
                    , file: null },
                Brochure: { name:foundEvent?.posters?.Brochure ,
                     file: null },
              });
               setYouTube({
                title:foundEvent?.youTube?.title,
                url:foundEvent?.youTube?.url 
              });
        
        
               setLocObj(prevState => ({
                ...prevState,
                address: foundEvent?.addressInfo?.address || "",
                city: foundEvent?.addressInfo?.city || ""
              }));


 
              setActors(foundEvent?.actors?.map(actor => ({
                name: actor.name || "",

              })) || [])
      
              console.log(edit,"in the edit useEffect")
              console.log(youTube,poster)
        }


    }, [events])

    useEffect(() => {

            console.log("Inside the useEffect")
            console.log(event,"Event")
            // const storedEventData = JSON.parse(localStorage.getItem('eventData'))

        // Check if event data exists in local storage
        // if (storedEventData ) {
        //     // Update state variables with stored event data
        //     setForm(storedEventData?.form);
        //     setPoster(storedEventData?.poster);
        //     setYouTube(storedEventData?.youTube);
        //     setActors(storedEventData?.actors);
        //     setAllCategory(storedEventData?.allCategory);
        //     setSearchTerm(storedEventData?.searchTerm);
        //     setLocObj(storedEventData?.locObj);
        //     setSearchResults(storedEventData?.searchResults);
        //     setSelectedAddress(storedEventData?.selectedAddress);
        // }
        
        
        
    
        
    }, [event])

    const dispatch = useDispatch()

    const handleYouTubeChange = (e) => {
        const { name, value } = e.target;
        setYouTube((prevYouTube) => ({
            ...prevYouTube,
            [name]: value,
        }));
    };

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`/api/categoryall`)
                const modifiedCategory = response.data.map((category) => ({
                    label: category.name,
                    value: category._id,
                }));
                setAllCategory(modifiedCategory);
            } catch (err) {
                console.log('Error fetching the Category', err)
            }
        };

        fetchCategory();
    }, []);

    const fetchAddresses = async () => {

        try {
            const response = await axios.get(
                `https://geocode.maps.co/search?q=${searchTerm}&api_key=${process.env.REACT_APP_GEO_API}`
            );//add this in the .env webpack
            setSearchResults(response.data);
            if (response.data.length === 0) {
                setSearchResults([
                    { place_id: '404', display_name: 'Try typing different or check typo' }
                ]);
            }
        } catch (error) {
            console.error('Error fetching addresses:', error)
        }
    };
    useEffect(() => {
        console.log(ticketErrors)
    }, [errors])
    
    const handleAddressSelect = (selectedOption) => {
        setSelectedAddress(selectedOption);

        const selectedResult = searchResults.find(
            (result) => result.place_id === selectedOption.value
        );
        console.log(selectedResult, 'full data 42');

        setLocObj((prev) => ({
            ...prev,
            address: selectedResult.display_name,
            place_id: selectedResult.place_id,
            lonlat: [selectedResult.lon, selectedResult.lat],
            city: prev.city
        }));

    };
    const handleInputChange = (index, field, e) => {
        const updatedTicketTypes = [...form.ticketType];
        updatedTicketTypes[index][field] = e.target.value;

        const errors = updatedTicketTypes.map((ticket) => ({
            ticketName: !ticket.ticketName,
            ticketPrice: !ticket.ticketPrice,
            ticketCount: !ticket.ticketCount,
        }));

        setForm((prevForm) => ({
            ...prevForm,
            ticketType: updatedTicketTypes.map((ticket) => ({
                ...ticket,
                remainingTickets: ticket.ticketCount,
            })),
        }));
        setTicketErrors(errors)
    };

    const handleCategoryChange = (selectedCategory) => {
        setForm((prevForm) => ({
            ...prevForm,
            categoryId: selectedCategory.value,
        }))
    }


    // handle the form obj
    const handleNameValueChange = (name, value) => {
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const validateActorName = (name) => {
        if (!name || name.trim() === " ") {
            return "Actor name is Required"
        }
    }
    //handle the Actors name
    const handleActorChange = (index, propertyName, value) => {
        const updatedActors = [...actors]
        updatedActors[index][propertyName] = value

        const actorNameError = validateActorName(value)
        const updatedErrors = { ...errors }
        updatedErrors[`actorName${index}`] = actorNameError
        setActors(updatedActors)
        setErrors(updatedErrors)
    }

    const validateStep = async () => {
        let stepErrors = {};

        if (!form.title?.trim()) {
            stepErrors.title = "Title is required";
        }
        if (!form.description?.trim()) {
            stepErrors.description = "Description is required";
        }
        if (!form.ticketSaleStartTime) {
            stepErrors.ticketSaleStartTime = "Ticket Sale Start Time is required";
        }
        if (!form.eventStartDateTime) {
            stepErrors.eventStartDateTime = "Event Start Time is required";
        }
        if (!form.ticketSaleEndTime) {
            stepErrors.ticketSaleEndTime = "Ticket Sale End Time is required";
        }
        if (!form.venueName?.trim()) {
            stepErrors.venueName = "Venue Name is required";
        }
        if (form.ticketSaleStartTime && form.eventStartDateTime && form.ticketSaleStartTime > form.eventStartDateTime) {
            stepErrors.ticketSaleStartTime = "Ticket sale should be greater than Event start time";
        }
  
        const ticketTypeErrors = form.ticketType.map((ticket, index) => ({
            ticketName: typeof ticket.ticketName === 'string' && !ticket.ticketName.trim(),
            ticketPrice: typeof ticket.ticketPrice === 'string' && !ticket.ticketPrice.trim(),
            ticketCount: typeof ticket.ticketCount === 'string' && !ticket.ticketCount.trim(),
        }));
        
        if (ticketTypeErrors.some(ticket => Object.values(ticket).some(value => value))) {
            stepErrors.ticketType = ticketTypeErrors;
        }

        if (!youTube.title?.trim()) {
            stepErrors.youTubeName = "YouTube Name or Title is required";
        }
        if (!youTube.url?.trim()) {
            stepErrors.youTubeUrl = "YouTube URL is required";
        }

        actors.forEach((actor, index) => {
            if (!actor.name?.trim()) {
                stepErrors[`actorName${index}`] = `Actor ${index + 1} Name is required`;
            }
        });

        // Set errors and return result
        setErrors({ ...stepErrors });
        return Object.keys(stepErrors).length === 0;
    };
    const handleSubmit = async () => {
        console.log(form, poster, youTube, actors, locObj);
        const isValid = await validateStep();
        if (isValid) {
          const eventFormData = {
            eventStartDateTime: form.eventStartDateTime,
            title: form.title,
            description: form.description,
            venueName: form.venueName,
            ticketSaleStartTime: form.ticketSaleStartTime,
            ticketSaleEndTime: form.ticketSaleEndTime,
            ticketType: form.ticketType.map((ticket) => ({
              ticketName: ticket.ticketName,
              ticketPrice: ticket.ticketPrice,
              ticketCount: ticket.ticketCount,
              remainingTickets: ticket.ticketCount,
            })),
            Actors: actors.map((actor) => ({ name: actor.name })),
            youTube: { title: youTube.title, url: youTube.url },
          };
          console.log(eventFormData)
          try {
            dispatch(startUpdateEvent(eventFormData, eventId))
          } catch (err) {
            toast.error(err);
          }
        }
      };
      


    return (
        <div style={{ minHeight: "100vh" }}>
            <Container>
                <h1 style={{ textAlign: 'center', marginTop: "30px", color: "#333", backgroundColor: "#fff", padding: "10px", boxShadow: "2px 2px 5px 0px rgba(0, 0, 0, 0.2)", borderRadius: "8px" }}>Event Update Form</h1>

            </Container>
            <div>
                <Container style={{ textAlign: 'center', marginTop: "30px", color: "#333", backgroundColor: "#fff", padding: "50px", boxShadow: "2px 2px 5px 0px rgba(0, 0, 0, 0.2)", borderRadius: "8px" }}>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3 " controlId="title">
                                    <Form.Label className="title">Title:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={form?.title}
                                        name="title"
                                        onChange={(e) => handleNameValueChange(e.target.name, e.target.value)}
                                        isInvalid={!!errors.title}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.title && <div>{errors.title}</div>}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="eventStartDateTime">
                                    <Form.Label className="title">Event Start Time:</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        value={form?.eventStartDateTime}
                                        name="eventStartDateTime"
                                        onChange={(e) => handleNameValueChange(e.target.name, e.target.value)}
                                        isInvalid={!!errors.eventStartDateTime}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.eventStartDateTime && <div>{errors.eventStartDateTime}</div>}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label className="title">Description:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={form?.description}
                                name="description"
                                onChange={(e) => handleNameValueChange(e.target.name, e.target.value)}
                                isInvalid={!!errors.description}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.description && <div>{errors.description}</div>}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="ticketSaleStartTime">
                                    <Form.Label className="title">Ticket Sale Start Time:</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        value={form?.ticketSaleStartTime}
                                        name="ticketSaleStartTime"
                                        onChange={(e) => handleNameValueChange(e.target.name, e.target.value)}
                                        isInvalid={!!errors.ticketSaleStartTime}
                                        onFocus={() => setTicketStartHelp(true)}
                                        onBlur={() => setTicketStartHelp(false)}
                                    />
                                    {ticketStartHelp &&
                                        <Form.Text muted>Ticket Sale Start Time where users can start booking the event.</Form.Text>
                                    }
                                    <Form.Control.Feedback type="invalid">
                                        {errors.ticketSaleStartTime && <div>{errors.ticketSaleStartTime}</div>}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="ticketSaleEndTime">
                                    <Form.Label className="title">Ticket Sale End Time:</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        value={form?.ticketSaleEndTime}
                                        name="ticketSaleEndTime"
                                        onChange={(e) => handleNameValueChange(e.target.name, e.target.value)}
                                        isInvalid={!!errors.ticketSaleEndTime}
                                        onFocus={() => setTicketEndHelp(true)}
                                        onBlur={() => setTicketEndHelp(false)}
                                    />
                                    {ticketEndHelp && <Form.Text muted>
                                        <span>Ticket Sale End Time where users cannot buy tickets for your event.</span>
                                    </Form.Text>}
                                    <Form.Control.Feedback type="invalid">
                                        {errors?.ticketSaleEndTime && <div>{errors.ticketSaleEndTime}</div>}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="venueName">
                                    <Form.Label className="title">Venue Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={form?.venueName}
                                        name="venueName"
                                        onChange={(e) => handleNameValueChange(e.target.name, e.target.value)}
                                        isInvalid={!!errors.venueName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.venueName && <div>{errors.venueName}</div>}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="category">
                                    <Form.Label className="title">Category:</Form.Label>
                                    <Select
                                        id="category"
                                        name="category"
                                        options={allCategory}
                                        value={allCategory?.find((option) => option.value === form?.categoryId)}
                                        onChange={handleCategoryChange}
                                        isSearchable
                                        placeholder="Select Categories"
                                        style={{ width: "200px !important" }}
                                    />
                                    <div className="errors">
                                        {errors.category && <span>{errors.category}</span>}
                                    </div>
                                </Form.Group>

                            </Col>
                        </Row>

                        <Form.Group controlId="ticketInfo">
                            <Form.Label className="title">Ticket Info</Form.Label>
                            {form?.ticketType?.map((ticket, index) => (
                                <Row key={index} className="mb-3">
                                    <Col>
                                        <Form.Label>Name:</Form.Label>
                                        <Form.Control type="text" value={ticket?.ticketName} onChange={(e) => handleInputChange(index, 'ticketName', e)} />
                                        {errors && errors.ticketType && errors.ticketType[index] && errors.ticketType[index].ticketName && <div className="errors">Ticket name cannot be empty</div>}
                                    </Col>

                                    <Col>
                                        <Form.Label>Price:</Form.Label>
                                        <Form.Control type="text" value={ticket?.ticketPrice} onChange={(e) => handleInputChange(index, 'ticketPrice', e)} />
                                        {errors && errors.ticketType && errors.ticketType[index] && errors?.ticketType[index]?.ticketPrice && <div className="errors">Ticket Price cannot be empty</div>}
                                    </Col>
                                    <Col>
                                        <Form.Label>Total Seat:</Form.Label>
                                        <Form.Control type="text" value={ticket?.ticketCount} onChange={(e) => handleInputChange(index, 'ticketCount', e)} />
                                        {errors && errors.ticketType && errors.ticketType[index] && errors?.ticketType[index]?.ticketCount && <div className="errors">Ticket seat cannot be empty</div>}
                                    </Col>
                                </Row>
                            ))}

                        </Form.Group>
                        <Row>
                            <Col>

                            </Col>
                            <Col>
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="clipName">
                                    <Form.Label className="title">Clip Title:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={poster.Clip.name}
                                        onChange={handleClipNameChange}
                                        isInvalid={!!errors.clipName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.clipName && <div>{errors.clipName}</div>}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="clipUpload">
                                    <Form.Label className="title">Upload Clip:</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={handleClipFileChange}
                                        isInvalid={!!errors.clipUpload}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.clipUpload && <div>{errors.clipUpload}</div>}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="brochureName">
                                    <Form.Label className="title">Image Title:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={poster.Brochure.name}
                                        onChange={handleBrochureNameChange}
                                        isInvalid={!!errors.brochurename}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.brochurename && <div>{errors.brochurename}</div>}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="brochureUpload">
                                    <Form.Label className="title">Upload Image:</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={handleBrochureFileChange}
                                        isInvalid={!!errors.brochureUpload}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.brochureUpload && <div>{errors.brochureUpload}</div>}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row> */}
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="youTubeName">
                                    <Form.Label className="title">Youtube Title:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={youTube?.youTubeName}
                                        onChange={handleYouTubeChange}
                                        isInvalid={!!errors.youTubeName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.clipUpload && <div>{errors.clipUpload}</div>}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="youTubeURL">
                                    <Form.Label className="title" >URL:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="url"
                                        value={youTube?.url || " "}
                                        onChange={handleYouTubeChange}
                                        isInvalid={!!errors.youTubeUrl}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.youTubeUrl && <div>{errors.youTubeUrl}</div>}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        {/* <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="searchAddress">
                                    <Form.Label className="title">Search Addresses:</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Type to search addresses"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onFocus={() => setLocObj((prevLocObj) => ({ ...prevLocObj, selectedAddress: "" }))}
                                            isInvalid={!!errors.searchTerm}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.searchTerm && <div className='errors'> {errors.searchTerm}</div>}
                                        </Form.Control.Feedback>
                                        <Button variant="outline-secondary" onClick={fetchAddresses}>
                                            Search
                                        </Button>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="cityName">
                                    <Form.Label className="title">City Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={locObj.city}
                                        onChange={(e) => setLocObj((prev) => ({ ...prev, city: e.target.value }))}
                                        isInvalid={!!errors.cityName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.cityName && <div>{errors.cityName}</div>}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row><Col><Form.Group controlId="selectAddress">
                            <Form.Label className="title">Select an Address:</Form.Label>
                            <Select
                                options={searchResults.map((addr) => ({
                                    label: addr.display_name,
                                    value: addr.place_id
                                }))}
                                value={selectedAddress}
                                onChange={handleAddressSelect}
                                isSearchable
                                placeholder="Select an address"
                                className={errors.selectedAddress && 'border'}
                            />
                        </Form.Group>
                            <div className='errors '>
                                {errors.selectedAddress && <div>{errors.selectedAddress}</div>}
                            </div>
                        </Col>
                            
                        </Row> */}
                        <Col style={{width:"20%"}}>
                                <div className="actors">
                                    {actors.map((actor, index) => (
                                        <div className="actor" key={index}>
                                            <Form.Group controlId={`actorName${index}`}>
                                                <Form.Label className="title">Enter the Actor name:</Form.Label>
                                                <Form.Control type="text" value={actor?.name} onChange={(e) => handleActorChange(index, "name", e.target.value)} isInvalid={!!errors[`actorName${index}`]} />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors[`actorName${index}`] && <div>{errors[`actorName${index}`]}</div>}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                        </div>
                                    ))}

                                </div>
                            </Col>
                        <div className="serverErrors">
                            {serverErrors && (
                                <Alert variant="danger" onClose={() => setServerErrors(null)} dismissible>
                                    <Alert.Heading>Error</Alert.Heading>
                                    <p>{serverErrors.data && JSON.stringify(serverErrors.data)}</p>
                                </Alert>
                            )}
                        </div>
                        <Row className="mb-3">

                            <Col>
                                <Button variant="primary" style={{ height: "40px", width: "150px" ,marginTop:"50px"}} onClick={handleSubmit}>Confirm Edit</Button>
                            </Col>
                        </Row>

                    </Form>

                </Container>
            </div>
        </div>
    );
}




export default EventForm;