// import React, { useState, useEffect } from 'react';
// import Select from 'react-select';
// import axios from 'axios';

// const Practice = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [locObj, setLocObj] = useState({
//     address: "",
//     place_id: "",
//     lonlat: [  ,  ], // lon and lat
//     city: ""
//   });
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);

//   const fetchAddresses = async () => {
//     try {
//       const GEO_CODE_API_KEY = "659f7b557feb5653368044xyz79cdbd";
//       const response = await axios.get(
//         `https://geocode.maps.co/search?q=${searchTerm}&api_key=${GEO_CODE_API_KEY}`
//       );

//       setSearchResults(response.data);
//       if (response.data.length === 0) {
//         setSearchResults([
//           { place_id: "404", display_name: "Try typing different or check typo" }
//         ]);
//       }
//     } catch (error) {
//       console.error('Error fetching addresses:', error);
//     }
//   };

//   const handleAddressSelect = (selectedOption) => {
//     // Use the selectedOption to update state or perform other actions
//     setSelectedAddress(selectedOption);

//     // Find the selected address in the search results
//     const selectedResult = searchResults.find(
//       (result) => result.place_id === selectedOption.value
//     );
//     console.log(selectedResult,"full data 42")

//     // Assuming you want to store the location data in locObj state
//     setLocObj({
//       address: selectedResult.display_name,
//       place_id: selectedResult.place_id,
//       lonlat: [selectedResult.lon,selectedResult.lat], // Make sure lonlat exists in the API response
//       city: locObj.city // Make sure city exists in the API response
//     });
    

//     // Additional logic or API calls can be added here if needed
//   };

//   const confirmAddress = () => {
//     // Perform actions to confirm the address
//     console.log('Confirmed Address:', locObj);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Type to search addresses"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <button onClick={fetchAddresses}>Search</button>

//       <Select
//         options={searchResults.map((addr) => ({
//           label: addr.display_name,
//           value: addr.place_id
//         }))}
//         value={selectedAddress}
//         onChange={handleAddressSelect}
//         isSearchable
//         placeholder="Select an address"
//       />

//       <button onClick={confirmAddress}>Confirm Address</button>
//       <input type="text" value={locObj.city} onChange={(e)=>setLocObj((prev)=>({ ...prev,{prev.city}))}/>
//     </div>
//   );
// };

// export default Practice;

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const Practice = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locObj, setLocObj] = useState({
    address: '',
    place_id: '',
    lonlat: ['', ''], // lon and lat
    city: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const fetchAddresses = async () => {
    try {
      const GEO_CODE_API_KEY = '659f7b557feb5653368044xyz79cdbd';
      const response = await axios.get(
        `https://geocode.maps.co/search?q=${searchTerm}&api_key=${GEO_CODE_API_KEY}`
      );

      setSearchResults(response.data);
      if (response.data.length === 0) {
        setSearchResults([
          { place_id: '404', display_name: 'Try typing different or check typo' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleAddressSelect = (selectedOption) => {
    // Use the selectedOption to update state or perform other actions
    setSelectedAddress(selectedOption);

    // Find the selected address in the search results
    const selectedResult = searchResults.find(
      (result) => result.place_id === selectedOption.value
    );
    console.log(selectedResult, 'full data 42');

    // Assuming you want to store the location data in locObj state
    setLocObj((prev) => ({
      ...prev,
      address: selectedResult.display_name,
      place_id: selectedResult.place_id,
      lonlat: [selectedResult.lon, selectedResult.lat], // Make sure lonlat exists in the API response
      // Corrected line
      city: prev.city // Make sure city exists in the API response
    }));

    // Additional logic or API calls can be added here if needed
  };

  const confirmAddress = () => {
    // Perform actions to confirm the address
    console.log('Confirmed Address:', locObj);
  };

  return (
    <div className='AddressContainer'>
      <input
        type="text"
        placeholder="Type to search addresses"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={fetchAddresses}>Search</button>

      <Select
        options={searchResults.map((addr) => ({
          label: addr.display_name,
          value: addr.place_id
        }))}
        value={selectedAddress}
        onChange={handleAddressSelect}
        isSearchable
        placeholder="Select an address"
      />

      {/* Adding input for city */}
      <input
        type="text"
        value={locObj.city}
        onChange={(e) => setLocObj((prev) => ({ ...prev, city: e.target.value }))}
      />
      <button onClick={confirmAddress}>Confirm Address</button>
    </div>
  );
};

export default Practice;

