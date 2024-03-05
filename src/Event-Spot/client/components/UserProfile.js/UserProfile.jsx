import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Corrected import statement
import Admin from './Admin';
import Organizer from './Organizer';
import Customer from './Customer';

export default function UserProfile() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const decodedToken = jwtDecode(token);
      const { role } = decodedToken;
      console.log(role);
      if (role === "Admin" || role === "Organiser" || role === "Customer") { 
        setRole(role);
        setIsLoggedIn(true);
      } else {
        console.log("Invalid role:", role); 
        setIsLoggedIn(false); 
      }
    } catch (e) {
      console.log("Invalid or expired token");
      setIsLoggedIn(false); 
    }
  }, [token]);

  const updateToken = (newToken) => {
    setToken(newToken);
  };

  return (
    <div>
      {isLoggedIn && (
        <div>
          {role === "Admin" && <Admin />}
          {role === "Organiser" && <Organizer />}
          {role === "Customer" && <Customer />}
        </div>
      )}
    </div>
  );
}
