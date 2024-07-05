import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelFacilities } from "../../config/hotel-options-config";


const FacilitiesSection = () => {
  const {register , formState : {errors}} = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-5 gap-4">
        {hotelFacilities.map(facility => 
<label className="text-sm flex gap-1 items-center text-gray-700">
  <input type="checkbox" value={facility}
  {...register("facilities" , {
    validate : facilaties => {
      if (facilaties && facilaties.length > 0){
        return true;
      } else {
        return "at least one facility required"
      }
    }
  })}
  />
  {facility}
</label>

        )}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">{errors.facilities.message}</span>
      )}
    </div>
  )
}

export default FacilitiesSection