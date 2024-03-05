import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from "../Api_Resources/axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, ProgressBar,Row, Col, Form, Card, ListGroup, Badge, Button, InputGroup, CardText, Alert } from 'react-bootstrap';

import "./EventForm.css"
import NotFound from '../Utils/NotFound/NotFound';
import { startCreateEvent } from "../../react-redux/action/eventAction"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
// https://www.dhiwise.com/post/zod-and-react-a-perfect-match-for-robust-validation

function getCurrentDateTime(){
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const EventForm = () => {

  const { eventId } = useParams()

  const [event, setEvent] = useState([])
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState()
  const [ticketErrors, setTicketErrors] = useState([])
  const [ticketStartHelp, setTicketStartHelp] = useState(false)
  const [ticketEndHelp, setTicketEndHelp] = useState(false)
  const [edit,setEdit] = useState(false)


  const events = useSelector((state) => {
    return state.events
  })

  const [step, setStep] = useState(1)

  const [form, setForm] = useState({
    eventStartDateTime:"" ,
    eventEndDateTime:"" ,

    title: " ",
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
    title:  "", url: "",
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
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      if (events.length > 0) {
        const foundEvent = events.find(ele => ele._id === eventId);
        setEvent(foundEvent);

      }
    };

    fetchData();
  }, [events])

  const dispatch = useDispatch()

  const handleYouTubeChange = (e) => {
    const { name, value } = e.target;
    setYouTube((prevYouTube) => ({
      ...prevYouTube,
      [name]: value,
    }));
  };

  const handleClipNameChange = (event) => {
    setPoster((prevPoster) => ({
      ...prevPoster,
      Clip: { ...prevPoster.Clip, name: event.target.value },
    }))
  };

  const handleClipFileChange = (event) => {
    const { files } = event.target;
    setPoster((prevPoster) => ({
      ...prevPoster,
      Clip: { ...prevPoster.Clip, file: files[0] },
    }));
  };

  const handleBrochureNameChange = (event) => {
    setPoster((prevPoster) => ({
      ...prevPoster,
      Brochure: { ...prevPoster.Brochure, name: event.target.value },
    }));
  };

  const handleBrochureFileChange = (event) => {
    const { files } = event.target;
    setPoster((prevPoster) => ({
      ...prevPoster,
      Brochure: { ...prevPoster.Brochure, file: files[0] },
    }));
  }

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
        console.log('Error fetching the Category', err);
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
      console.error('Error fetching addresses:', error);
    }
  };

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
  //update the ticket form
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
  };

  const handleRemoveSlot = (i) => {
    if (form.ticketType.length > 1) {
      const updatedForm = { ...form };
      updatedForm.ticketType.splice(i, 1);
      setForm(updatedForm);
    }
  };

  const handleCategoryChange = (selectedCategory) => {
    setForm((prevForm) => ({
      ...prevForm,
      categoryId: selectedCategory.value,
    }))
  }

  const handleAddSlot = () => {
    setForm((prevForm) => ({
      ...prevForm,
      ticketType: [
        ...prevForm.ticketType,
        {
          ticketName: '',
          ticketPrice: '',
          ticketCount: '',
          remainingTickets: '',
        },
      ],
    }));
  };
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

  const hanldeAddActors = () => {
    setActors([...actors, { name: '' }])
  }

  const handleDeleteActor = (index) => {
    const updatedActors = [...actors]
    updatedActors.splice(index, 1);
    setActors(updatedActors);
  };

  useEffect(() => {
    // Retrieve form, youTube, actors, allCategory, searchTerm, locObj, searchResults, selectedAddress from localStorage
    const storedForm = localStorage.getItem('form');
    if (storedForm) {
      setForm(JSON.parse(storedForm));
    }

    const storedYouTube = localStorage.getItem('youTube')
    if (storedYouTube) {
      console.log(storedYouTube)
      setYouTube(JSON.parse(storedYouTube));
    }

    const storedActors = localStorage.getItem('actors');
    if (storedActors) {
      setActors(JSON.parse(storedActors));
    }

    const storedAllCategory = localStorage.getItem('allCategory');
    if (storedAllCategory) {
      setAllCategory(JSON.parse(storedAllCategory));
    }

    const storedSearchTerm = localStorage.getItem('searchTerm');
    if (storedSearchTerm) {
      setSearchTerm(JSON.parse(storedSearchTerm));
    }

    const storedLocObj = localStorage.getItem('locObj');
    if (storedLocObj) {
      setLocObj(JSON.parse(storedLocObj));
    }

    const storedSearchResults = localStorage.getItem('searchResults');
    if (storedSearchResults) {
      setSearchResults(JSON.parse(storedSearchResults));
    }

    const storedSelectedAddress = localStorage.getItem('selectedAddress');
    if (storedSelectedAddress) {
      setSelectedAddress(JSON.parse(storedSelectedAddress));
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // // useEffect to save to localStorage
  useEffect(() => {
    // save  the . form, youTube, actors, allCategory, searchTerm, locObj, searchResults, selectedAddress to lS
    if (form && youTube && actors && allCategory && searchTerm && locObj, searchResults, selectedAddress) {
      localStorage.setItem('form', JSON.stringify(form));
      localStorage.setItem('youTube', JSON.stringify(youTube));
      localStorage.setItem('actors', JSON.stringify(actors));
      localStorage.setItem('allCategory', JSON.stringify(allCategory));
      localStorage.setItem('searchTerm', JSON.stringify(searchTerm));
      localStorage.setItem('locObj', JSON.stringify(locObj));
      localStorage.setItem('searchResults', JSON.stringify(searchResults));
      localStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));
    }
  }, [form, youTube, actors, allCategory, searchTerm, locObj, searchResults, selectedAddress]);



  const validateStep = async () => {
    switch (step) {
      case 1:
        let step1Errors = {}
        if (!form.title?.trim()) {
          step1Errors.title = "Title is required";
        }
        if (!form.eventEndDateTime?.trim()) {
          step1Errors.eventEndDateTime = "eventEndDateTime is required"
        }

        if (form.eventEndDateTime && form.eventStartDateTime) {
          if(form.eventStartDateTime>form.eventEndDateTime ){

            step1Errors.eventStartDateTime = "Event Start should be less than EventEnd Date Time"
          }
        }
        if (!form.description?.trim()) {
          step1Errors.description = "Description is required";
        }
        if (!form.ticketSaleStartTime) {
          step1Errors.ticketSaleStartTime = "Ticket Sale Start Time is required";
        }
        if (!form.eventStartDateTime) {
          step1Errors.eventStartDateTime = "Event Start Time is required";
        }
        if (!form.ticketSaleEndTime) {
          step1Errors.ticketSaleEndTime = "Ticket Sale End Time is required";
        }
        if (!form.venueName?.trim()) {
          step1Errors.venueName = "Venue Name is required";
        } if (form.ticketSaleStartTime && form.eventStartDateTime) { //it can be written in the single line
          if (form.ticketSaleStartTime > form.eventStartDateTime)
            step1Errors.ticketSaleStartTime = "Ticket sale should be greater than Event start time"
        }
        try {

          setErrors({ ...step1Errors })
          return Object.keys(step1Errors).length === 0;
        } catch (err) {
          console.log(err)
        }
        break;


      case 2:
        let step2Errors = {};
        if (!form.categoryId) {
          step2Errors.category = "Category is required";
        }
        setErrors(step2Errors)

        const errors = form.ticketType?.map((ticket) => ({
          ticketName: !ticket.ticketName?.trim(),
          ticketPrice: ! ticket.ticketPrice?.trim(),
          ticketCount: !ticket.ticketCount?.trim()
        }))
        try {
          setTicketErrors([...errors])
          return !step2Errors.category && !ticketErrors.some((error) => Object.values(error).some((value) => value));
        } catch (err) {
          console.log(err)
        }

        break;


      case 3:
        let step3Errors = {}

        if (!poster.Clip.name?.trim()) {
          step3Errors.clipName = "Clip Name is required";
        }
        if (!poster.Clip.file) {
          step3Errors.clipUpload = "Upload Clip is required";
        }
        if (!poster.Brochure.name?.trim()) {
          step3Errors.brochurename = "Brochure Name is required";  // Check if 'brochurename' matches the validation property
        }
        if (!poster.Brochure.file) {
          step3Errors.brochureUplaod = "Brochure Upload is required";
        }
        if (!youTube.title?.trim()) {
          step3Errors.youTubeName = "YouTube Name is required";
        }
        if (!youTube.url?.trim()) {
          step3Errors.youTubeUrl = "YouTube URL is required";
        }
        if (!searchTerm?.trim()) {
          step3Errors.searchAddress = "Search Address is required";
        }
        if (!locObj.city?.trim()) {
          step3Errors.cityName = "Search Address is required";
        }
        if (!selectedAddress) {
          step3Errors.selectedAddress = "Select an Address is required";
        }
        actors.forEach((actor, index) => {
          if (!actor.name?.trim()) {
            step3Errors[`actorName${index}`] = `Actor ${index + 1} Name is required`
          }
        })

        try {
          setErrors({ ...step3Errors })
          console.log("in try catch")
          return Object.keys(step3Errors).length === 0;
        } catch (err) {
          console.log(err)
        }
        break;
      default:
        return true;
    };
  }
  // useEffect(()=>{
  //   validateStep()
  // },[form,poster,youTube,actors,locObj])

  const nextStep = async () => {
    const isValid = await validateStep()
    if (isValid) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = async () => {
    const isValid = await validateStep()
    if (isValid) {

      const eventFormData = new FormData()

      // Append individual fields
      eventFormData.append('eventStartDateTime', form.eventStartDateTime)
      // eventFormData.append('eventEndDateTime', form.eventEndDateTime);
      eventFormData.append('title', form.title)
      eventFormData.append('description', form.description)
      eventFormData.append('venueName', form.venueName)
      eventFormData.append('ticketSaleStartTime', form.ticketSaleStartTime)
      eventFormData.append('ticketSaleEndTime', form.ticketSaleEndTime)
      eventFormData.append('eventEndDateTime',form.eventEndDateTime)

      eventFormData.append('categoryId', form.categoryId)
      // Append ticketType array
      form.ticketType.forEach((ticket, index) => {
        eventFormData.append(`ticketType[${index}][ticketName]`, ticket.ticketName)
        eventFormData.append(`ticketType[${index}][ticketPrice]`, ticket.ticketPrice)
        eventFormData.append(`ticketType[${index}][ticketCount]`, ticket.ticketCount)
        eventFormData.append(`ticketType[${index}][remainingTickets]`, ticket.remainingTickets)
      })

      actors.forEach((actor, index) => {
        eventFormData.append(`Actors[${index}][name]`, actor.name)
      })
      eventFormData.append('ClipName', poster.Clip.name)
      eventFormData.append('ClipFile', poster.Clip.file)

      eventFormData.append('BrochureName', poster.Brochure.name)
      eventFormData.append('BrochureFile', poster.Brochure.file)

      eventFormData.append('youTube[title]', youTube.title)
      eventFormData.append('youTube[url]', youTube.url)

      eventFormData.append(`addressInfo[address]`, locObj.address)
      eventFormData.append(`addressInfo[city]`, locObj.city)
      // Append location coordinates
      eventFormData.append(`location[lon]`, locObj.lonlat[0])
      eventFormData.append(`location[lat]`, locObj.lonlat[1])
      console.log([...eventFormData], "End Result")

      try {
 
        dispatch(startCreateEvent(eventFormData))
        navigate('/')
        setForm("")
        setActors("")
        setPoster("")
        setLocObj("")
        setSelectedAddress("")
        setSearchTerm("")
        setActors("")
        setYouTube("")
        setErrors("")
        setServerErrors("")
        setTicketErrors("")


      } catch (err) {
        toast.error(err)
      }
    };
  }



  const renderFormSection = () =>{
    switch (step) {
      case 1:
        return (

          <div>
            <Container>
              <Form>

              <Row>
    <Form.Group as={Col} className="mb-3" controlId="title">
        <Form.Label>Title:</Form.Label>
        <Form.Control
            type="text"
            value={form.title}
            name="title"
            onChange={(e) => handleNameValueChange(e.target.name, e.target.value)}
            isInvalid={!!errors.title}
        />
        <Form.Control.Feedback type="invalid">
            {errors.title && <div>{errors.title}</div>}
        </Form.Control.Feedback>
    </Form.Group>
</Row>
<Row>
    <Col>
        <Form.Group className="mb-3" controlId="eventStartDateTime">
            <Form.Label>Event Start Time:</Form.Label>
            <Form.Control
                type="datetime-local"
                value={form.eventStartDateTime}
                name="eventStartDateTime"
                min={getCurrentDateTime()}
                onChange={(e) => handleNameValueChange(e.target.name, e.target.value)}
                isInvalid={!!errors.eventStartDateTime}
            />
            <Form.Control.Feedback type="invalid">
                {errors.eventStartDateTime && <div>{errors.eventStartDateTime}</div>}
            </Form.Control.Feedback>
        </Form.Group>
    </Col>
    <Col>
        <Form.Group className="mb-3" controlId="eventEndDateTime">
            <Form.Label>Event End Time:</Form.Label>
            <Form.Control
                type="datetime-local"
                value={form.eventEndDateTime}
                name="eventEndDateTime"
                min={getCurrentDateTime()}

                onChange={(e) => handleNameValueChange(e.target.name, e.target.value)}
                isInvalid={!!errors.eventEndDateTime}
            />
            <Form.Control.Feedback type="invalid">
                {errors.eventEndDateTime && <div>{errors.eventEndDateTime}</div>}
            </Form.Control.Feedback>
        </Form.Group>
    </Col>
</Row>



                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={form.description}
                    name="description"
                    onChange={(e) => handleNameValueChange(e.target.name, e.target.value)}
                    isInvalid={!!errors.description}

                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description && <div>{errors.description}</div>}
                  </Form.Control.Feedback>
                </Form.Group>


                <Row>
                  <Col>                <Form.Group className="mb-3" controlId="ticketSaleStartTime">
                    <Form.Label>Ticket Sale Start Time:</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={form.ticketSaleStartTime}
                      name="ticketSaleStartTime"
                      min={getCurrentDateTime()}

                      onChange={(e) => handleNameValueChange(e.target.name, e.target.value)}
                      isInvalid={!!errors.ticketSaleStartTime}
                      onFocus={() => setTicketStartHelp(true)}
                      onBlur={() => setTicketStartHelp(false)}

                    />
                    {ticketStartHelp &&
                      <Form.Text muted>Ticket Sale Start Time where users can start booking the event.</Form.Text>
                    } <Form.Control.Feedback type="invalid">
                      {errors.ticketSaleStartTime && <div>{errors.ticketSaleStartTime}</div>}
                    </Form.Control.Feedback>
                  </Form.Group>
                  </Col>
                  <Col>                <Form.Group className="mb-3" controlId="ticketSaleEndTime">
                    <Form.Label>Ticket Sale End Time:</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={form.ticketSaleEndTime}
                      name="ticketSaleEndTime"
                      min={getCurrentDateTime()}

                      onChange={(e) => handleNameValueChange(e.target.name, e.target.value)}
                      isInvalid={!!errors.ticketSaleEndTime}
                      onFocus={() => setTicketEndHelp(true)}
                      onBlur={() => setTicketEndHelp(false)}

                    />
                    {ticketEndHelp && <Form.Text muted>

                      <span>Ticket Sale End Time where users cannot buy tickets for your event.</span>
                    </Form.Text>}
                    <Form.Control.Feedback type="invalid">
                      {errors.ticketSaleEndTime && <div>{errors.ticketSaleEndTime}</div>}
                    </Form.Control.Feedback>
                  </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="venueName">
                  <Form.Label>Venue Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.venueName}
                    name="venueName"
                    onChange={(e) => handleNameValueChange(e.target.name, e.target.value)}
                    isInvalid={!!errors.venueName}

                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.venueName && <div>{errors.venueName}</div>}
                  </Form.Control.Feedback>
                </Form.Group>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button variant="primary" style={{ height: "2%", width: "8%" }} onClick={async () => await nextStep()}>
                    Next
                  </Button></div>
              </Form>
            </Container>
          </div>

        )
      case 2:
        return (

          <div>
            <Container>
              <Form>
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Category:</Form.Label>
                  <Select
                    id="category"
                    name="category"
                    options={allCategory}
                    value={allCategory.find((option) => option.value === form.categoryId)}
                    onChange={handleCategoryChange}
                    isSearchable
                    placeholder="Select Categories"
                    style={{ width: "200px !important" }}
                  />
                  <div className="errors">
                    {errors.category && <span>{errors.category}</span>}
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="ticketInfo">
                  <Form.Label>Ticket Info</Form.Label>
                  {form.ticketType.map((ticket, index) => (
                    <Row key={index} className="mb-3">
                      <Col>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                          type="text"
                          value={ticket.ticketName}
                          onChange={(e) => handleInputChange(index, 'ticketName', e)}
                          isInvalid={ticketErrors[index]?.ticketName}
                        />
                        <Form.Control.Feedback type="invalid">
                          Ticket name cannot be empty
                        </Form.Control.Feedback>
                      </Col>
                      <Col>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control
                          type="text"
                          value={ticket.ticketPrice}
                          onChange={(e) => handleInputChange(index, 'ticketPrice', e)}
                          isInvalid={ticketErrors[index]?.ticketPrice}
                        />
                        <Form.Control.Feedback type="invalid">
                          Ticket Price cannot be empty
                        </Form.Control.Feedback>
                      </Col>
                      <Col>
                        <Form.Label>Total Seat:</Form.Label>
                        <Form.Control
                          type="text"
                          value={ticket.ticketCount}
                          onChange={(e) => handleInputChange(index, 'ticketCount', e)}
                          isInvalid={ticketErrors[index]?.ticketCount}
                        />
                        <Form.Control.Feedback type="invalid">
                          Ticket seat cannot be empty
                        </Form.Control.Feedback>
                      </Col>
                      <Col>
                        {index >= 1 && (
                          <Button variant="danger" onClick={() => handleRemoveSlot(index)} style={{ marginTop: "30px" }}>
                            Delete
                          </Button>
                        )}
                      </Col>
                    </Row>
                  ))}
                  {form.ticketType.length < 10 && <Button variant="primary" onClick={handleAddSlot}>
                    + Add
                  </Button>}
                </Form.Group>


                <Row>
                  <Col>
                    <div style={{ display: "flex", justifyContent: "flex-start" }}>

                      <Button variant="secondary" style={{ height: "2%", width: "15%" }} onClick={() => prevStep()}>
                        Previous
                      </Button>
                    </div>
                  </Col>
                  <Col>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button variant="primary" style={{height: "2%", width: "14%" }} onClick={async () => await nextStep()}>
                        Next
                      </Button></div>
                  </Col>
                </Row>
              </Form>
            </Container>
          </div>
        )

      case 3:
        return (

          <div>
            <Container>
              <Form>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="clipName">
                      <Form.Label>Clip Title:</Form.Label>
                      <Form.Control
                        type="text"
                        value={poster.Clip.name}
                        onChange={handleClipNameChange}
                        isInvalid={!!errors.clipName}

                      />
                    </Form.Group>
                    <Form.Control.Feedback type="invalid">
                      {errors.clipName && <div>{errors.clipName}</div>}
                    </Form.Control.Feedback>
                    {errors.clipName && <div>{errors.clipName}</div>}


                  </Col>

                  <Col>
                    <Form.Group className="mb-3" controlId="clipUpload">
                      <Form.Label>Upload Clip:</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        //,"video/*"
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
                      <Form.Label>Image Title:</Form.Label>
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
                      <Form.Label>Upload Image:</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleBrochureFileChange}
                        isInvalid={!!errors.brochureUplaod}

                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.brochureUplaod && <div>{errors.brochureUplaod}</div>}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>

                    <Form.Group className="mb-3" controlId="youTubeName">
                      <Form.Label>Youtube Title:</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={youTube?.youTubeName}
                        onChange={handleYouTubeChange}
                        isInvalid={!!errors.youTubeName}

                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.youTubeName && <div>{errors.youTubeName}</div>}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>

                    <Form.Group className="mb-3" controlId="youTubeURL">
                      <Form.Label>URL:</Form.Label>
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

                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="searchAddress">
                      <Form.Label>Search Addresses:</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          placeholder="Type to search addresses"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onFocus={() => setLocObj((prevLocObj) => ({ ...prevLocObj, selectedAddress: "" }))} ///the select an address is not working in the to empty
                          isInvalid={!!errors.searchTerm}

                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.searchTerm && <div>{errors.searchTerm}</div>}
                        </Form.Control.Feedback>
                        <Button variant="outline-secondary" onClick={fetchAddresses}>
                          Search
                        </Button>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="cityName">
                      <Form.Label>City Name:</Form.Label>
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
                <Form.Group controlId="selectAddress" className='actor-form-group'>
                  <Form.Label>Select an Address:</Form.Label>
                  <Select
                    options={searchResults.map((addr) => ({
                      label: addr.display_name,
                      value: addr.place_id
                    }))}
                    value={selectedAddress}
                    onChange={handleAddressSelect}
                    isSearchable
                    placeholder="Select an address"
                  />
                </Form.Group>

                <div className='errors'>
                  {errors.selectedAddress && <h6>{errors.selectedAddress}</h6>}
                </div>



                <div className="actors" >
                  <div className='actor-div'>
                  {actors.map((actor, index) => (
                    <div className="actor" key={index}>
                      <Form.Group controlId={`actorName${index}`} className='actor-form-group'>
                        <Form.Label>Enter the Actor name:</Form.Label>
                        <Form.Control type="text" value={actor.name} onChange={(e) => handleActorChange(index, "name", e.target.value)} isInvalid={!!errors[`actorName${index}`]} />
                        <Form.Control.Feedback type="invalid">
                          {errors[`actorName${index}`] && <div>{errors[`actorName${index}`]}</div>}
                        </Form.Control.Feedback>
                      </Form.Group>
                      {index >= 1 && (
                        <Button variant="danger" style={{marginTop:"3%",width:"7%",height:"5%",marginRight:"10%"}} onClick={() => handleDeleteActor(index)}>
                          Delete
                        </Button>
                      )}
                    </div>
                  ))}
                  {actors.length < 6 && (
                    <Button variant="primary" onClick={hanldeAddActors} style={{marginTop:"2%"}}>
                      + Actors
                    </Button>
                  )}
                  </div>
                </div>

                <div className="serverErrors">

                  {serverErrors && (
                    <Alert variant="danger" onClose={() => setServerErrors(null)} dismissible>
                      <Alert.Heading>Error</Alert.Heading>
                      <p>{serverErrors.data && JSON.stringify(serverErrors.data)}</p>
                    </Alert>
                  )}
                </div>

                <Row className="mb-3">
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                  <Col>


                      <Button variant="secondary" style={{ height: "100%", width: "20%", marginTop: "2%" }} onClick={() => prevStep()}>
                         Previous
                      </Button>
                  </Col>
                  <Col>
                 <Button variant="primary" style={{ height: "100%", width: "20%" ,marginLeft:"60%"}} onClick={handleSubmit}>Submit</Button> 

                  </Col>
                    </div>
                </Row>
              </Form>
            </Container>
          </div>
        )
      default:
        return "Not found"
    }
  }
  return (
    <div style={{ minHeight: "100vh" }}>
      <Container>
        <h1 style={{ textAlign: 'center', marginTop: "30px", color: "#333", backgroundColor: "#fff", padding: "10px", boxShadow: "2px 2px 5px 0px rgba(0, 0, 0, 0.2)", borderRadius: "8px" }}>Event Form</h1>
        <div style={{ display: "flex", justifyContent: 'center', textAlign: "center", marginBottom: "20px" }}>
        <ProgressBar now={(step / 3) * 100} label={`${step} of ${3}`} style={{width:"300px"}} />
        </div>
      </Container>
      <Container style={{ marginTop: "20px", padding: "20px", backgroundColor: "#fff", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", borderRadius: "5px" }}>
        {renderFormSection()}
      </Container>
      <ToastContainer/>
    </div>
  );
}


export default EventForm