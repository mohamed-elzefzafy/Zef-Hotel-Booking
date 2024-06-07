import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";


const DetailsSection = () => {
  const {register ,  formState : {errors}} = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Add Hotel</h1>
      <label className="text-gray-700 font-bold text-sm flex-1">
      Name
      <input
        type="text"
        className="rounded font-normal py-1 px-2 border w-full"
        {...register("name", { required: "name is required" })}
      />
      {errors.name && (
        <span className="text-red-500">{errors.name.message}</span>
      )}
    </label>

    <div className="flex gap-2">

    <label className="text-gray-700 font-bold text-sm flex-1">
      City
      <input
        type="text"
        className="rounded font-normal py-1 px-2 border w-full"
        {...register("city", { required: "city is required" })}
      />
      {errors.city && (
        <span className="text-red-500">{errors.city.message}</span>
      )}
    </label>

    <label className="text-gray-700 font-bold text-sm flex-1">
      Country
      <input
        type="text"
        className="rounded font-normal py-1 px-2 border w-full"
        {...register("country", { required: "country is required" })}
      />
      {errors.country && (
        <span className="text-red-500">{errors.country.message}</span>
      )}
    </label>

    </div>
    <label className="text-gray-700 font-bold text-sm flex-1">
    Description
      <textarea
      rows={7}
        className="rounded font-normal py-1 px-2 border w-full"
        {...register("description", { required: "description is required" })}
      />
      {errors.description && (
        <span className="text-red-500">{errors.description.message}</span>
      )}
    </label>

    <label className="text-gray-700 font-bold text-sm max-w-[50%]">
      Price PerNight
      <input
        type="number"
        min={1}
        className="rounded font-normal py-1 px-2 border w-full"
        {...register("pricePerNight", { required: "price Per Night is required" })}
      />
      {errors.pricePerNight && (
        <span className="text-red-500">{errors.pricePerNight.message}</span>
      )}
    </label>

    <label className="text-gray-700 font-bold text-sm max-w-[50%]">
      Star Rating
  <select {...register("starRating" , {required : "Star Rating Per Night is required"})}
  className="border rounded w-full p-2 text-gray-700"
  >
    <option value="" className="text-sm font-bold">Select Rating</option>
    {[1,2,3,4,5].map(num => 
<option value={num}>{num}</option>

    )}
  </select>
      {errors.starRating && (
        <span className="text-red-500">{errors.starRating.message}</span>
      )}
    </label>
    </div>
  )
}

export default DetailsSection