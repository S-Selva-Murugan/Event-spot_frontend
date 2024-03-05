import React, { useState, useEffect } from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import axios from '../Api_Resources/axios';
import { fileConfig } from '../Api_Resources/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { startGetProfile } from '../../react-redux/action/profileAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

export default function Deactivate() {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const profiles = useSelector((state) => state.profile.allProfile);

    useEffect(() => {
        dispatch(startGetProfile(search));
    }, [search]);

    const handleToggleActivation = async (userId, isActive) => {

        try {
            const response = await axios.put(`/api/users/${userId}`, { isActive: !isActive }, fileConfig);
            const updatedUser = response.data;
            
            // Update the profiles state immediately after deactivation
            const updatedProfiles = profiles.map(profile =>
                profile.userId._id === updatedUser._id ? { ...profile, userId: { ...profile.userId, isActive: updatedUser.isActive } } : profile
            )
            console.log(updatedProfiles,"in deactivate")
            dispatch({ type: 'SET_PROFILES', payload: updatedProfiles }); // Assuming you have a reducer to update the profiles state
            
            toast.success(`${updatedUser.username} account ${updatedUser.isActive ? 'activated' : 'deactivated'}!!`, {
                position: 'top-center',
                autoClose: 5000
            });
        } catch (err) {
            console.log(err);
        }
    
    };
    
    

    return (
        <Container className="mt-5">
            <h1 style={{ borderBottom: '3px solid black', paddingBottom: '1px'}}>Profile List</h1>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search by username"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ width: '40%', marginTop:"10px" }}
                />
                <Button style={{ width: '20%', marginTop:"10px" }} className="btn btn-dark" onClick={() => dispatch(startGetProfile(search))}>Search</Button>
            </InputGroup>
            <Row>
                {profiles.length > 0 ? profiles?.map(profile => (
                    <Col key={profile._id} md={4} className="mb-4">
                        <Card style={{ width: "300px" }}>
                            <Card.Body>
                                <Card.Title>Username: {profile.userId?.username}</Card.Title>
                                {profile?.profilePic ? (
                                    <Card.Img
                                        variant="top"
                                        src={`${process.env.REACT_APP_IMAGE_URL}${profile.profilePic}`}
                                        alt="Profile"
                                        style={{ width: "90px", height: "90px", objectFit: "cover" }}
                                    />
                                ) : (
                                    <FontAwesomeIcon icon={faUserAstronaut} className="mb-3" size="5x" />
                                )}
                                <Card.Text>Email: {profile.userId?.email}</Card.Text>
                                <Card.Text>Role: {profile.userId?.role}</Card.Text>
                                <Card.Text>Address: {profile.addressInfo?.address}</Card.Text>
                                {profile.userId?.isActive ? (
                                    <Button variant="danger" onClick={() => handleToggleActivation(profile.userId?._id, true)}>Deactivate</Button>
                                ) : (
                                    <Button variant="success" onClick={() => handleToggleActivation(profile.userId?._id, false)}>Activate</Button>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                )) : <h1>No User Found</h1>}
            </Row>
            <ToastContainer />
        </Container>
    );
}
