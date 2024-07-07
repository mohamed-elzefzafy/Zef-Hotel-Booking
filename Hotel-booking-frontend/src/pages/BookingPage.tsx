import { useQuery } from "react-query"
import { getLoggedInUser, getOneHotelById } from "../apiClient"
import BookingForm from "../components/BookingForm";
import { useSearchContext } from "../components/contexts/Searchcontext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailSummary from "../components/BookingDetailsSummary";



const BookingPage = () => {
  const search = useSearchContext();
  const {hotelId} = useParams();
const [numberOfNights, setNumberOfNights] = useState<number>(0);

useEffect(()=>{
  if (search.checkIn && search.checkOut) {
    const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24);
    setNumberOfNights(Math.ceil(nights));
    
  }
},[search.checkIn, search.checkOut]);

  const {data : hotel} = useQuery("fetchOneHotelById" , () => getOneHotelById(hotelId as string) ,{
    enabled : !!hotelId
  })
  const {data : loggedUser} = useQuery("getLoggedInUser" ,  getLoggedInUser);
  console.log(loggedUser);
  
  if (!hotel) {
    return (
      <> </>
    )
  }
  return (
    <div className="grid lg:grid-cols-[1fr_2fr] gap-4">
  <BookingDetailSummary checkIn={search.checkIn} checkOut={search.checkOut} adultCount={search.adultCount}
   childCount={search.childCount} numberOfNights={numberOfNights} hotel={hotel}/>
      {loggedUser && <BookingForm loggedUser={loggedUser}/>}
    </div>
  )
}

export default BookingPage