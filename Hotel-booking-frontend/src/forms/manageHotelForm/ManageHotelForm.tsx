import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { useEffect } from "react";
import { HotelType } from "../../utils/types";




export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageUrls: string[];
  adultCount: number;
  childCount: number;
}

type Props = {
  hotel? : HotelType,
  onSave : (hotelFormData : FormData) => void,
  isLoading : boolean,
}
const ManageHotelForm = ({onSave , isLoading , hotel} : Props) => {
  const formMethods = useForm<HotelFormData>();
  const {handleSubmit , reset} = formMethods;

  useEffect(()=>{
    reset(hotel);
  },[hotel , reset]);

  const onSubmit = handleSubmit((formDataJson : HotelFormData) => {
const formData = new FormData();

if (hotel) {
  formData.append( "hotelId" , hotel._id);
}

formData.append( "name" , formDataJson.name);
formData.append( "city" , formDataJson.city);
formData.append( "country" , formDataJson.country);
formData.append( "description" , formDataJson.description);
formData.append( "type" , formDataJson.type);
formData.append( "pricePerNight" , formDataJson.pricePerNight.toString());
formData.append( "starRating" , formDataJson.starRating.toString());
formData.append( "adultCount" , formDataJson.adultCount.toString());
formData.append( "childCount" , formDataJson.childCount.toString());

formDataJson.facilities.forEach((facility) => {
  formData.append( "facilities" , facility);
})


// if (formDataJson.imageUrls) {
//   for (let i = 0; i < formDataJson.imageUrls.length; i++) {
//     formData.append("imageUrls", formDataJson.imageUrls[i]);
//   }

// }

if (formDataJson.imageUrls) {
  Array.from(formDataJson.imageUrls).forEach((url) => {
    formData.append("imageUrls", url);
  });
}


onSave(formData);
  });
  return (
    <FormProvider {...formMethods}>

  <form className="flex flex-col gap-10" onSubmit={onSubmit}>
<DetailsSection/>
<TypeSection/>
<FacilitiesSection/>
<GuestsSection/>
<ImagesSection/>
<span className="flex justify-end">
  <button disabled={isLoading} type="submit" className="bg-blue-600 text-white rounded-md px-4 py-2 font-bold hover:bg-blue-800 transition-all disabled:bg-gray-500 duration-300" 
>{isLoading ? "Loding.." : "Save"}</button>
</span>
</form>
    </FormProvider>


  )
}

export default ManageHotelForm;