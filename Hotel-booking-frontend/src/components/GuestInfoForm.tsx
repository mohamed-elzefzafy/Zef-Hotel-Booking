import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";

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
  const {watch , register , handleSubmit , setValue , formState : {errors}} = useForm<GuestInfoFormData>();

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();

  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return (
    <div className="flex flex-col p-4 bg-blue-300 gap-4">
      <h3 className="text-2xl font-bold">$ {pricePerNights} Per Night</h3>
      <form >
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
          <DatePicker selected={checkOut}
           onChange={(date) => setValue(date as Date)}
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
        </div>
      </form>
    </div>
  )
}

export default GuestInfoForm