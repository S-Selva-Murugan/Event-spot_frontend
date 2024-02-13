import {jwtDecode} from 'jwt-decode'; // Corrected import statement
import { useState, useEffect } from 'react';
import Admin from './Admin';
import Organizer from './Organizer';
import Customer from './Customer';
export default function UserProfile() {
  // const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // const initialRole = token ? jwtDecode(token).role : "";
  const [role, setRole] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const { role } = jwtDecode(token);
      console.log(role);
      if (role === "Admin" || role === "Organiser" || role === "Customer") { // Handling all possible roles
        setRole(role);
        setIsLoggedIn(true);
      } else {
        console.log("Invalid role:", role); // Log invalid roles for debugging
        setIsLoggedIn(false); // Set isLoggedIn to false if role is invalid
      }
    } catch (e) {
      console.log("Invalid or expired token");
      setIsLoggedIn(false); // Set isLoggedIn to false if there's an error decoding the token
    }
  }, [token]);

  return (
    <div>
      {role === "Admin" ? (
        <Admin />
      ) : null}
      {role === "Organiser" ? (
        <Organizer />
      ) : null}
      {role === "Customer" ? (
        <Customer />
      ) : null}
    </div>
  );
}



