import { useEffect, useState } from 'react'
import { memo } from 'react';

import moment from 'moment'
import QrGenerator from "./QrGenerator"

const ExpiryTime = ({ detailsInfo, expiryTime }) => {

  return (
    <div style={{width:"100%",height:"100%"}}>
     <QrGenerator QrData={detailsInfo} />
    </div>
  )
}

export default memo(ExpiryTime)
