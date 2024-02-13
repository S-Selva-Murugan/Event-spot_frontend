import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import Profile from './Profile';

export default function Organizer() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
          <div style={{width:"400px"}}>
            <h1 style={{ borderBottom: '3px solid black', paddingBottom: '1px'}}>Organiser Profile</h1>
          </div>
        </div>
      <Profile />
    </div>
  );
}
