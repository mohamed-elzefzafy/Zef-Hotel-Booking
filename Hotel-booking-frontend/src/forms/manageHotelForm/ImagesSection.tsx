import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

 


// interface IProps {
//   hotelImages : CloudinaryObject[]
// }


const ImagesSection = () => {
  const {register , formState : {errors} , watch , setValue} = useFormContext<HotelFormData>();
  const existingImageUrls = watch("imageUrls");
  
// console.log(hotelImages);
console.log(existingImageUrls);


const handleDelete = (e : React.MouseEvent<HTMLButtonElement , MouseEvent> , imageUrl : string ) => {
e.preventDefault();
setValue("imageUrls" , existingImageUrls.filter(image => image !== imageUrl));
}

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
  
        
        {Array.isArray(existingImageUrls) ?   
      (
        <div className="grid grid-cols-6 gap-4 ">
        {
           existingImageUrls.map((image ) =>  
              <div className="relative group p-0 text-center">
        <img src={image} alt="hotelImages" className="min-h-full" />
        <button
        onClick={(e) => handleDelete(e , image)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
           
          
        )
        }
      </div>
      ) :
      (
        <h2>hhhhhh</h2>
      )
        }

      <div className="border rounded p-4 flex flex-col gap-4">
        <input className="w-full text-gray-700 font-normal" type="file" multiple accept="image/*" {...register("imageUrls" , {
          validate : imageFiles => {
            const totalLength = imageFiles.length + (existingImageUrls?.length || 0)
            if (totalLength <= 0) {
              return "at least one image"
            }

            if (totalLength > 6) {
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