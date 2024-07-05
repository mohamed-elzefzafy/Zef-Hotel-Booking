import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getOneHotelById } from "../apiClient";
import {  AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../components/GuestInfoForm";


const HotelDetailsPage = () => {
  const {hotelId} = useParams();

  const {data : hotel} = useQuery("fetchOneHotelById" , () => getOneHotelById(hotelId as string) , {
    enabled : !!hotelId,
  })

  if (!hotel) {
    return (
      <></>
    )
  }

  return (
    <div className="space-y-6">
      {/* row 1  */}
      <div>
        <span className="flex mb-2">
        {Array.from({length : hotel?.starRating}).map(() => 
                  <AiFillStar className='fill-yellow-500 mr-1'/>

              )}
        </span>
        <h1 className="text-3xl font-bold">{hotel?.name}</h1>
        </div>

          {/* row 2  */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
             {hotel?.imageUrls.slice(0 , 3)?.map(image => 
              <div className="h-[300px]">
                <img src={image} alt={hotel?.name} className="rounded-md h-full w-full object-cover object-center" />
                </div>

             )}
          </div>

                {/* row 3  */}
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
 {hotel.facilities.map(facility =>
<div className="border border-slate-300 rounded-sm p-3">
  {facility}
</div>

 )}
    </div>      

      {/* row 4  */}      
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{hotel?.description}</div>


      <div className="h-fit">
          <GuestInfoForm/>
      </div>
      </div>
    </div>
  )
}

export default HotelDetailsPage;