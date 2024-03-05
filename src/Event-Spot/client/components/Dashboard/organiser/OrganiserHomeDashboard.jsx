import React ,{useContext, useEffect} from 'react'
import ViewHisEvents from '../../ProfileHelpers/ViewHisEvents'
import { MyContext } from '../../../ContextApi/Context'
import OrganiseHomeCharts from './OrganiseHomeCharts'
import BookedUserInfo from './BookedUserInfo'

const OrganiserHomeDashboard = () => {
  const {userData} = useContext(MyContext)

  return (
    <div>
      <h2 style={{textAlign:"center",margin:" 2% 0 2% 0",textDecoration:"underline"}}>DashBoard </h2>
      {userData.role == "Organiser" &&  
      <div>
        <OrganiseHomeCharts/>
        <ViewHisEvents />
        </div>}
    </div>
  )
}

export default OrganiserHomeDashboard
