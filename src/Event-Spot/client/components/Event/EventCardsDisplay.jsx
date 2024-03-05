import React, { useContext, useState ,memo} from 'react'
import { useSelector } from 'react-redux'
import EventCard from "./EventCard"
import "./EventCardsDisplay.css"
import { MyContext } from '../../ContextApi/Context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Container } from '@mui/material'
import MultiCarousel from './multi-Carousel/MultiCarousel'

function EventCardsDisplay() {
  const { cardSearch, setCardSearch } = useContext(MyContext)
  const events = useSelector((state) => {
    return state.events
  })
  const [userSearchQuery, setUserSearchQuery] = useState("")
  const filterEvent = cardSearch && events.filter(item => item.title.toLowerCase().includes(cardSearch))

  const handleSearch = () => {
    setCardSearch(userSearchQuery.toLowerCase())
  };
  return (
    <div style={{ marginBottom: "50px" ,backgroundColor:"#ffb703",borderRadius: "15px"}}>
      <Container>

        <div >
          <img style={{ width: "100%", height: "100px", borderRadius: "5px",marginTop:"20px" }} src={`https://eventpot.s3.ap-south-1.amazonaws.com/glowing-stage-light-illuminates-cheering-rock-fans-generated-by-ai.jpg`} />
        </div>

        <div style={{ bottom: 20, right: 20, textAlign: 'right', marginBottom: "20px", marginTop: "20px" }}>
          <input type='text' style={{ textAlign: 'left',border:"2px solid black",borderRadius:"5px" ,width:"15%"}} value={userSearchQuery} onChange={(e) => setUserSearchQuery(e.target.value)} placeholder=' Search...' />
          <button onClick={handleSearch} style={{ height: "30px", width: "30px", color: "blue", borderRadius: "20%" }}><FontAwesomeIcon icon={faSearch} /></button>
        </div>
        <div className='cards-display'>

          {(Object.keys(filterEvent).length > 0 ? filterEvent : events).map(ele => <EventCard
            image={ele.posters[0]?.image}
            title={ele?.title}
            start={ele?.eventStartDateTime}
            categoryName={ele.categoryId?.name}
            id={ele?._id}
            tickets = {ele?.ticketType}



          />)}
        </div>
      </Container>
    </div>
  )
}

export default memo(EventCardsDisplay)
// by scratch
// import React, { useEffect, useState, memo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import EventCard from './EventCard';
// import './EventCardsDisplay.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { Container } from '@mui/material';
// import { startGetNewEvents } from '../../react-redux/action/infinte-scrollAction';
// import SpinnerComponent from '../Utils/Spinner/SpinnerComponent';

// function EventCardsDisplay() {
//   const [search, setSearch] = useState('');
//   const [sortBy, setSortBy] = useState('title');
//   const [order, setOrder] = useState('desc');
//   const [page, setPage] = useState(1);
//   const limit = 3
//   const [city, setCity] = useState('')
//   const [isLoading, setIsLoading] = useState(false);
//   const [total, setTotal] = useState(0)
//   const [totalPages,setTotalPages] = useState("1")

//   useEffect(() => {
//     handleFetchData();
//   }, []);

//   const paginationObj = useSelector((state) => state?.categoryCarousel?.infiniteScroll);

//   useEffect(() => {
//     if (paginationObj?.page && paginationObj?.totalPages) {
//       console.log("In pagination")
//       setPage(paginationObj.page)
//       setTotal(paginationObj.totalPages)
//     }
//   }, [paginationObj]);

//   const dispatch = useDispatch();

//   const handleFetchData = () => {
//     try {
//       if (total >= page) {
//         setIsLoading(true)        
//         dispatch(startGetNewEvents(search, sortBy, order, page, limit, city))
//         setPage(page+1)
//         setIsLoading(false)
//       }
//     } catch (err) {
//       setIsLoading(false);
//     }
//   }
//   useEffect(()=>{
//     console.log(page,"useEffect")
//   },[page])

//   const handleScroll = () => {
//     if (
//       window.innerHeight + document.documentElement.scrollTop ===
//       document.documentElement.offsetHeight
//     ) {
//       setPage(page+1)
//       handleFetchData(); // No need to manually update the page state here
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'search') {
//       setSearch(value);
//     } else if (name === 'city') {
//       setCity(value);
//     }
//   };

//   const handleSortChange = (e) => {
//     setSortBy(e.target.value);
//   };

//   const handleOrderChange = (e) => {
//     setOrder(e.target.value);
//   };

//   return (
//     <div style={{ marginBottom: '50px', backgroundColor: '#ffb703', borderRadius: '15px' }}>
//       <Container>
//         <div>
//           <img
//             style={{ width: '100%', height: '100px', borderRadius: '5px', marginTop: '20px' }}
//             src={`https://eventpot.s3.ap-south-1.amazonaws.com/glowing-stage-light-illuminates-cheering-rock-fans-generated-by-ai.jpg`}
//           />
//         </div>

//         <div style={{ bottom: 20, right: 20, textAlign: 'left', marginBottom: '20px', marginTop: '20px' }}>
          
//           <input type="text" name="search" value={search} onChange={handleChange} placeholder=" Search..." />
//           <input type="text" name="city" value={city} onChange={handleChange} placeholder=" City..." />

//           <select value={sortBy} onChange={handleSortChange}>
//           <option value="">Select</option>

//             <option value="title">Title</option>
//             <option value="eventStartDateTime">Event Start At</option>
//             <option value="ticketSaleStartDateTime">Ticket Sale On</option>
//           </select>

//           <label>
//             Asc
//             <input type="radio" name="order" value="asc" checked={order === 'asc'} onChange={handleOrderChange} />
//           </label>
//           <label>
//             Desc
//             <input type="radio" name="order" value="desc" checked={order === 'desc'} onChange={handleOrderChange} />
//           </label>
//           <button
//             onClick={handleFetchData}
//             style={{ height: '30px', width: '30px', color: 'blue', borderRadius: '20%' }}
//           >
//             <FontAwesomeIcon icon={faSearch} />
//           </button>
//         </div> 
//         <div className="cards-display">
//           {paginationObj?.data?.length > 0 &&
//             paginationObj?.data?.map((ele) => (
//               <EventCard
//                 image={ele.posters[0]?.image}
//                 title={ele?.title}
//                 start={ele?.eventStartDateTime}
//                 categoryName={ele.categoryId?.name}
//                 id={ele?._id}
//                 tickets={ele?.ticketType}
//               />
//             ))}
//           {isLoading && <SpinnerComponent />}
//         </div>
//       </Container>
//     </div>
//   );
// }

// export default memo(EventCardsDisplay)


//by package
// import React, { useState, useEffect, memo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import EventCard from './EventCard';
// import './EventCardsDisplay.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { Container } from '@mui/material';
// import { startGetNewEvents } from '../../react-redux/action/infinte-scrollAction';
// import SpinnerComponent from '../Utils/Spinner/SpinnerComponent';
// import InfiniteScroll from 'react-infinite-scroll-component';

// function EventCardsDisplay() {
//   const [search, setSearch] = useState('');
//   const [sortBy, setSortBy] = useState('title');
//   const [order, setOrder] = useState('desc');
//   const [page, setPage] = useState(1)
//   const [limit,setLimit] = useState(3)
//   const [city, setCity] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [totalPages, setTotalPages] = useState(1);

//   const paginationObj = useSelector((state) => state?.categoryCarousel?.infiniteScroll);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     handleFetchData();
//   }, []);

//   useEffect(() => {
//     if (paginationObj?.page && paginationObj?.totalPages) {
//       setTotalPages(paginationObj.totalPages);
//     }
//   }, [paginationObj]);

//   const handleFetchData = () => {
//     setTimeout(()=>{
//       if(page===1) setPage(page+1)
//     try {
//       if (page <= totalPages && !isLoading) {
//         setIsLoading(true);
//         dispatch(startGetNewEvents(search, sortBy, order, page, limit, city))
//           .then(() => {
//             setPage((prevPage) => prevPage + 1);
//             setIsLoading(false);
//           })
//           .catch((error) => {
//             console.error('Error fetching data:', error);
//             setIsLoading(false);
//           });
//       }
//     } catch (err) {
//       setIsLoading(false);
//     }
//   },3000)

//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'search') {
//       setSearch(value);
//     } else if (name === 'city') {
//       setCity(value);
//     }
//   };

//   const handleSortChange = (e) => {
//     setSortBy(e.target.value);
//   };

//   const handleOrderChange = (e) => {
//     setOrder(e.target.value);
//   };
//   const handleFetchNewData = ()=>{
//     setPage(1)
//     setTotalPages(1)
//     setLimit(1)
//   }

//   return (
//     <div style={{ marginBottom: '50px', backgroundColor: '#ffb703', borderRadius: '15px', overflowY: 'hidden' }}>
//       <Container>
//         <div>
//           <img
//             style={{ width: '100%', height: '100px', borderRadius: '5px', marginTop: '20px' }}
//             src={`https://eventpot.s3.ap-south-1.amazonaws.com/glowing-stage-light-illuminates-cheering-rock-fans-generated-by-ai.jpg`}
//           />
//         </div>

//         <div style={{ bottom: 20, right: 20, textAlign: 'left', marginBottom: '20px', marginTop: '20px' }}>
//           <input type="text" name="search" value={search} onChange={handleChange} placeholder=" Search..." />
//           <input type="text" name="city" value={city} onChange={handleChange} placeholder=" City..." />

//           <select value={sortBy} onChange={handleSortChange}>
//             <option value="">Select</option>
//             <option value="title">Title</option>
//             <option value="eventStartDateTime">Event Start At</option>
//             <option value="ticketSaleStartDateTime">Ticket Sale On</option>
//           </select>

//           <label>
//             Asc
//             <input type="radio" name="order" value="asc" checked={order === 'asc'} onChange={handleOrderChange} />
//           </label>
//           <label>
//             Desc
//             <input type="radio" name="order" value="desc" checked={order === 'desc'} onChange={handleOrderChange} />
//           </label>
//           <button onClick={handleFetchNewData} style={{ height: '30px', width: '30px', color: 'blue', borderRadius: '20%' }}>
//             <FontAwesomeIcon icon={faSearch} />
//           </button>
//         </div>

//         <div style={{ overflowY: 'hidden', paddingRight: '17px' }}>
//           <InfiniteScroll
//             dataLength={paginationObj?.data?.length || 0}
//             next={handleFetchData}
//             hasMore={page <= totalPages}
//             loader={<SpinnerComponent />}
//           >
//             <div className="cards-display">
//               {paginationObj?.data?.map((ele) => (
//                 <EventCard
//                   key={ele._id}
//                   image={ele.posters[0]?.image}
//                   title={ele?.title}
//                   start={ele?.eventStartDateTime}
//                   categoryName={ele.categoryId?.name}
//                   id={ele?._id}
//                   tickets={ele?.ticketType}
//                 />
//               ))}
//             </div>
//           </InfiniteScroll>
//         </div>
//       </Container>
//     </div>
//   );
// }

// export default memo(EventCardsDisplay);

