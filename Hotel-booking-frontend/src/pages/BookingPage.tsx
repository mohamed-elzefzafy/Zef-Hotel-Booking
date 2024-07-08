import { useQuery } from "react-query"
import { createPaymentIntent, getLoggedInUser, getOneHotelById } from "../apiClient"
import BookingForm from "../components/BookingForm";
import { useSearchContext } from "../components/contexts/Searchcontext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailSummary from "../components/BookingDetailsSummary";
import { useAppContext } from "../components/contexts/AppContext";
import { Elements } from "@stripe/react-stripe-js";



const BookingPage = () => {
  const search = useSearchContext();
  const {stripePromise} = useAppContext();
  const {hotelId} = useParams();
const [numberOfNights, setNumberOfNights] = useState<number>(0);

useEffect(()=>{
  if (search.checkIn && search.checkOut) {
    const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24);
    setNumberOfNights(Math.ceil(nights));
    
  }
},[search.checkIn, search.checkOut]);

const {data : paymentIntentData} = useQuery("createPaymentIntent" , 
  () => createPaymentIntent(hotelId as string , numberOfNights.toString()) , {
    enabled : !!hotelId && numberOfNights > 0
  })

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
      {loggedUser && paymentIntentData && 
      
      <Elements stripe={stripePromise} options={{
        clientSecret :paymentIntentData.clientSecret,
      }}>
  <BookingForm loggedUser={loggedUser} paymentInten={paymentIntentData}/>
      </Elements>
    
      
      }
    </div>
  )
}

export default BookingPage