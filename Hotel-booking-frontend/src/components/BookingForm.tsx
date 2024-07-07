import { useForm } from "react-hook-form"
import { UserType } from "../utils/types"


type Props = {
  loggedUser : UserType
}

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

const BookingForm = ({loggedUser} : Props) => {
const {handleSubmit , register}  = useForm<BookingFormData>({
  defaultValues :{
    firstName : loggedUser.firstName,
    lastName : loggedUser.lastName,
    email : loggedUser.email,
  }
});
  return (
    <form className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
         <span className="text-3xl font-bold">Confirm Your Details</span>
         <div className="grid grid-cols-2 gap-6">
          <label className="text-gray-700 text-sm font-bold flex-1">
         First Name 
         <input type="text" className="mt-1 rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal" 
         disabled
         {...register("firstName")}
         />
          </label>

          <label className="text-gray-700 text-sm font-bold flex-1">
         Last Name 
         <input type="text" className="mt-1 rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal" 
         disabled
         {...register("lastName")}
         />
          </label>

          <label className="text-gray-700 text-sm font-bold flex-1">
         Email
         <input type="text" className="mt-1 rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal" 
         disabled
         {...register("email")}
         />
          </label>
         </div>
    </form>
  )
}

export default BookingForm