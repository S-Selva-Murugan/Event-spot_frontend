import { useState, useEffect } from 'react';
import axios from '../Api_Resources/axios';
import { fileConfig } from '../Api_Resources/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Deactivate() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`/api/users`, fileConfig);
                setUsers(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsers();
    }, []);

    const handleToggleActivation = async (userId, isActive) => {
        try {
            const response = await axios.put(`/api/users/${userId}`, { isActive: !isActive }, fileConfig);
            const updatedUser = response.data;
            const updatedUsers = users.map(user =>
                user._id === updatedUser._id ? updatedUser : user
            );
            setUsers(updatedUsers);
            toast.success(`${updatedUser.username} account ${updatedUser.isActive ? 'activated' : 'deactivated'}!!`, {
                position: 'top-center',
                autoClose: 5000
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4" style={{ borderBottom: '3px solid black', paddingBottom: '1px'}} >User List</h1>
            <div className="row">
                {users.map(user => (
                    <div key={user._id} className="col-md-4 mb-4" style={{width:"350px"}}>
                        <div className="card" style={{width:"300px"}}>
                            <div className="card-body">
                                <h5 className="card-title">{user.email}</h5>
                                <p className="card-text">Role: {user.role}</p>
                                <p className="card-text">Username: {user.username}</p>
                                {user.isActive ? (
                                    <button className="btn btn-danger" onClick={() => handleToggleActivation(user._id, true)}>Deactivate</button>
                                ) : (
                                    <button className="btn btn-success" onClick={() => handleToggleActivation(user._id, false)}>Activate</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
}
