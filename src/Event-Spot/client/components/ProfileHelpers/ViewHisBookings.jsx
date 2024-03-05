import FullCalenderInProfile from "./FullCalenderInProfile";
import TicketCard from "./TicketCard"
import {memo} from 'react'

function ViewHisBooking({profileData}) {
  return (
<div>
    <div className="tickets">
    <FullCalenderInProfile profileData={profileData}/>

    </div>
    </div>
  );
}
export default memo(ViewHisBooking)