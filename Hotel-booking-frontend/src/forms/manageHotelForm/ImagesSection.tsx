import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";


const ImagesSection = () => {
  const {register , formState : {errors}} = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input className="w-full text-gray-700 font-normal" type="file" multiple accept="image/*" {...register("imageUrls" , {
          validate : imageFiles => {
            if (imageFiles.length <= 0) {
              return "at least one image"
            }

            if (imageFiles.length > 6) {
              return "can't upload more than 6 images"
            }
            return true;
          }
        })}/>

      </div>
      {errors.imageUrls && (
        <span className="text-red-500">{errors.imageUrls.message}</span>
      )}
    </div>
  )
}

export default ImagesSection