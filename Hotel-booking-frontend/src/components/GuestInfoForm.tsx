import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useSearchContext } from "./contexts/Searchcontext";
import { useAppContext } from "./contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId : string;
  pricePerNights : number;
}

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};


const GuestInfoForm = ({hotelId , pricePerNights} : Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {isLoggedIn} = useAppContext();
  const search = useSearchContext();

  const {watch , register , handleSubmit , setValue , formState : {errors}} = useForm<GuestInfoFormData>({
    defaultValues : {
      checkIn : search.checkIn,
      checkOut : search.checkOut,
      adultCount : search.adultCount,
      childCount : search.childCount
    }
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();

  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onLoginClick = () => {
    search.saveSearchValues("0" , search.checkIn, search.checkOut , search.adultCount , search.childCount);
    navigate("/login" , {state : {from : location}});
  };

  const onSubmit = () => {
    search.saveSearchValues("0" , search.checkIn, search.checkOut , search.adultCount , search.childCount);
    navigate(`/hotel/${hotelId}/booking`);
  };
  return (
    <div className="flex flex-col p-4 bg-blue-300 gap-4">
      <h3 className="text-2xl font-bold">$ {pricePerNights} Per Night</h3>
      <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onLoginClick)}>
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
          <DatePicker
          required
           selected={checkOut}
           onChange={(date) => setValue( "checkIn" , date as Date)}
           selectsStart
           startDate={checkIn}
           endDate={checkOut}
           minDate={minDate}
           maxDate={maxDate}
           placeholderText="Check in date"
           className="min-w-full bg-white p-2 focus:outline-none"
           wrapperClassName="min-w-full"
           />
          </div>


          <div>
          <DatePicker
          required
           selected={checkOut}
           onChange={(date) => setValue( "checkOut" , date as Date)}
           selectsStart
           startDate={checkIn}
           endDate={checkOut}
           minDate={minDate}
           maxDate={maxDate}
           placeholderText="Check out date"
           className="min-w-full bg-white p-2 focus:outline-none"
           wrapperClassName="min-w-full"
           />
          </div>


          <div className="flex bg-white px-2 py-1 gap-2">
        <label className="items-center flex">
          Adults:
          <input className="w-full font-bold p-1 focus:outline-none"
           type="number"
            min={1} max={20}
            {...register("adultCount" , {
              required : "adultCount is required",
              min : {
                value : 1,
                message : "Adult count must be at least 1 adult",
              },
              valueAsNumber : true,
            })}
          
            />
        </label>

        <label className="items-center flex">
          childs:
          <input className="w-full font-bold p-1 focus:outline-none"
           type="number"
            min={0} max={20}
            {...register("childCount" , {
              valueAsNumber : true,
            })}
            />
        </label>
        {errors?.adultCount && 
        (
          <span className="text-red-500 font-semibold text-sm">
              {errors?.adultCount?.message}
          </span>
        )
        }
      </div>
          
          {isLoggedIn ? (
            <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold px-3 py-1.5 rounded">Book Now</button>
          ) : (
      
            <button className="w-full bg-blue-600 text-white font-bold px-3 py-1.5 rounded">Login to Book</button>
        
          )}
        </div>
      </form>
    </div>
  )
}

export default GuestInfoForm