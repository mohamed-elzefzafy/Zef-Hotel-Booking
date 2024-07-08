import { useForm } from "react-hook-form"
import { PaymentIntentResponse, UserType } from "../utils/types"
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "./contexts/Searchcontext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { createRoomBooking } from "../apiClient";
import { useAppContext } from "./contexts/AppContext";


type Props = {
  loggedUser : UserType,
  paymentInten : PaymentIntentResponse
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

 const BookingForm = ({loggedUser , paymentInten} : Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const search = useSearchContext();
  const {hotelId} = useParams();
const {showToast} = useAppContext();

  const {mutate : bookRoom , isLoading} = useMutation(createRoomBooking , {
    onSuccess : () =>{
showToast({message : "Booking Saved" , type : "SUCCESS"})
    } , 
    onError : () => {
showToast({message : "Error Save Booking" , type : "ERROR"})
    }
  })

const {handleSubmit , register}  = useForm<BookingFormData>({
  defaultValues :{
    firstName : loggedUser.firstName,
    lastName : loggedUser.lastName,
    email : loggedUser.email,
    adultCount: search.adultCount,
    childCount: search.childCount,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    hotelId : hotelId,
    totalCost : paymentInten.totalCost,
    paymentIntentId : paymentInten.paymentId

  }
});


const onSubmit =  async(formData : BookingFormData) => {
  if (!stripe || !elements) {
    return;
  }

const result = await stripe?.confirmCardPayment(paymentInten.clientSecret , {
  payment_method : {
    card : elements.getElement(CardElement) as StripeCardElement
  }
})

if (result.paymentIntent?.status === "succeeded") {
bookRoom({...formData , paymentIntentId : result.paymentIntent.id})
}
}
  return (
    <form className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5" onSubmit={handleSubmit(onSubmit)}>
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
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Your Price Summary</h2>
        <div className="bg-blue-200 rounded-md p-4">
<div className="font-semibold text-lg">
Total Cost : $ {paymentInten.totalCost.toFixed(2)}
</div>
<div className="text-xs">Includes taxes and c</div>
         </div>
        </div>


        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Payment Details</h3>
          <CardElement id="payment-element" className="border rounded-md p-2 text-sm"/>
        </div>
<div className="flex justify-end">
  <button disabled={isLoading} className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-800 rounded-md disabled:bg-gray-500">
    {isLoading ? "Loading..." : "Confirm Booking"}
    </button>
  </div>

    </form>
  )
}

export default BookingForm