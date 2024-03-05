import Create from "../Category/Create";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/all-events');
  };

  const handleDeactivate = () =>{
    navigate('/user-deactivate');
  };

  return (
    <div className="container mt-5">
      <div>
        <h1 style={{ borderBottom: '3px solid black', paddingBottom: '1px'}}>Admin Profile</h1>
      </div>
      <Profile />
      <div style={{marginLeft:'300px', marginTop: '10px'}}> {/* Added marginTop */}
        <button className="btn btn-warning" onClick={onClick}> {/* Added mr-2 class for margin-right */}
          Approve or disapprove events here
        </button>
        <button className="btn btn-warning" style={{marginLeft:'10px'}} onClick={handleDeactivate}>
          Click here to deactivate users
        </button>
      </div>
      <Create />
    </div>
  );
}
