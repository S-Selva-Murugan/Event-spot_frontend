
import Profile from './Profile'
// import Profile from '../UserProfile.js/DisplayUser'

export default function Customer({ profileData }){
    return(
            <div className="container mt-5">
      <div> {/* Add 'bg-light' class for a greyish background, and 'p-3' for padding */}
        <h1 style={{ borderBottom: '3px solid black', paddingBottom: '1px'}}>Customer Profile</h1>     
        <Profile/>
        </div>  
        </div>
        
    )
}