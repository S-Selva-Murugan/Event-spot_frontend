import { useContext, useEffect, useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import EventInMap from '../components/Location/EventInMap';
import {jwtDecode} from "jwt-decode"; // Correct import
import Dashboard from "../components/Dashboard/Dashboard";
import {Context} from "../ContextApi/Context";

export default function Home() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const { role } = jwtDecode(token);
      setRole(role);
    }
  }, []);

  return (
    <div>
      <div className="header">
      </div>
      <div className="body">
        {role && role === "Admin" ? <Dashboard /> :
        
         <EventInMap />}
      </div>
      <div className="footer">
        {(role === "Customer" || role === "Organiser") && <Footer />}
      </div>
    </div>
  );
}
