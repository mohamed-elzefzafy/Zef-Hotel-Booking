import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getOneHotel, updateHotel } from "../apiClient";
import ManageHotelForm  from "../forms/manageHotelForm/ManageHotelForm";
import { HotelType } from "../utils/types";
import { useAppContext } from "../components/contexts/AppContext";


const EditHotel = () => {
  const {hotelId} = useParams();
  const {showToast} = useAppContext();
  const defaultHotel: HotelType = {
    _id:  "",
    userId:  "",
    name:  "",
    city:  "",
    country:  "",
    description:  "",
    type:  "",
    adultCount: 0,
    childCount: 0,
    facilities: [""],
    pricePerNight: 0,
    starRating: 0,
    imageUrls:  [""],
    lastUpdated:new Date(),
    bookings: [],
  };
  

  const {data : hotel} = useQuery("getHotelById" , () => getOneHotel(hotelId || "") , {
    enabled : !!hotelId
  })

  const {mutate , isLoading} = useMutation(updateHotel , {
    onSuccess : () => {
      showToast({message : "updated Hotel saved" , type : "SUCCESS"});
    },
    onError : () => {
      showToast({message : "error saving hotel" , type : "ERROR"});
    }
  });

  const handleSave = (hotelFormData : FormData) => {
mutate(hotelFormData);
  }

  return (
<ManageHotelForm hotel={hotel || defaultHotel} onSave={handleSave} isLoading={isLoading}/>
  )
}

export default EditHotel;