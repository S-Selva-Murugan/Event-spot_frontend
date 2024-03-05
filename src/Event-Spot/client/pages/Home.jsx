import { useContext, useEffect, useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import EventInMap from '../components/Location/EventInMap';
import Dashboard from "../components/Dashboard/admin/Dashboard"
import { MyContext } from "../ContextApi/Context";
import "./Home.css"
import OrganiserHomeDashboard from "../components/Dashboard/organiser/OrganiserHomeDashboard"

export default function Home() {
const {userData} = useContext(MyContext)

  return (
    <div>
      <div className="header">
      </div>
      <div className="body">
          {console.log(userData,"asdfas")}
          {userData.role === "Admin" ? <Dashboard />
          : userData.role === "Organiser" ? <OrganiserHomeDashboard />
          : <EventInMap />
      }
      
 
        
      </div>
      <div className="footer">
        {(userData.role === "Customer" || userData.role === "Organiser") && <Footer />}
      </div>
    </div>
  );
}
