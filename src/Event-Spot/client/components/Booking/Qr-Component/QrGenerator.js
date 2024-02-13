import React,{useState} from 'react'
import QRCode from "react-qr-code";

function QrGenerator({QrData}) {
    const [qrVar,setQrVar] = useState({
        // value,//empty 
        back:" ",//#FFFFFF bgcolor
        fore:" ",//#000000 color
        size:70//256 
    })
     

    // const Qr = QRCode.toString('This is QrCode', {
    //     errorCorrectionLevel: 'H',
    //     type: 'svg'
    //   }, function(err, Qr) {
    //     if (err) throw err;
    //     console.log(Qr);
    //   });


  return (
    <div className='Componet-Container'>
        <div className="qrCode" style={{textAlign:"center"}}>
            <QRCode value={QrData} size={qrVar.size} fore={qrVar.fore} back={qrVar.back}/>
        </div>
    </div>
        
        


  )
}

export default QrGenerator