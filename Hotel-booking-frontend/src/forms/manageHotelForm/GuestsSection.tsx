import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {register , formState : {errors}} = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <form className="bg-gray-300 p-3 grid grid-cols-1 md:grid-cols-2 gap-4 rounded-md">
        <label className="flex flex-col mb-2 text-gray-950 font-bold">
        adults
          <input type="number" {...register("adultCount" , {required : "adult count is required"})} 
          className="bg-white px-2 py-1 border" min={1}/>
                 {errors.adultCount && 
           <span className="text-red-500 text-sm font-bold">{errors.adultCount.message}</span>
           }
        </label>

        <label className="flex flex-col mb-2 text-gray-950 font-bold">
        children
          <input type="number" {...register("childCount" , {required : "children count is required"})}
           className="bg-white px-2 py-1" min={0}/>
           {errors.childCount && 
           <span className="text-red-500 text-sm font-bold">{errors.childCount.message}</span>
           }
        </label>
      </form>
    </div>
  )
}

export default GuestsSection