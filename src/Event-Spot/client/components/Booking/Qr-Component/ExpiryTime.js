import { useEffect, useState } from 'react'
import moment from 'moment'
import QrGenerator from "./QrGenerator"

const ExpiryTime = ({ detailsInfo, expiryTime }) => {
  const [qrData, setQrData] = useState('')

  useEffect(() => {
    const expiryInfo = moment().add(parseInt(expiryTime), 'days')
    console.log(expiryInfo, 'info')

    const updatedDetailsInfo = { ...detailsInfo, expiryInfo: expiryInfo.format() }

    const dataString = JSON.stringify(updatedDetailsInfo)
    setQrData(dataString)

    const checkExpirationInterval = setInterval(() => {
      const now = moment()
      if (now.isAfter(expiryInfo)) {
        clearInterval(checkExpirationInterval);
      }
    }, 1000); // Check every second

    return () => clearInterval(checkExpirationInterval)

  }, [detailsInfo, expiryTime]) // Include detailsInfo and expiryTime in the dependency array

  return (
    <div>
      {qrData && <QrGenerator QrData={qrData} />}
    </div>
  )
}

export default ExpiryTime
