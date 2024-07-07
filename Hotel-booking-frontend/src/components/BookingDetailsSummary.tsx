import { HotelType } from "../utils/types";


type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
}
const BookingDetailsSummary = ({checkIn , checkOut , adultCount , childCount , numberOfNights , hotel} : Props) => {
  return (
    <div className="grid gap-4 h-fit rounded-lg p-5 border border-slate-300">
      <h2 className="text-lg font-bold">Your Booking Details</h2>
      <div className="border-b py-2">
        Location :
        <div className="font-bold">{hotel?.name} , {hotel?.city} , {hotel?.country}</div>
      </div>

    <div className="flex justify-between border-b py-2 px-3">
    <div className="">
        Check in :
        <div className="font-bold">{checkIn.toDateString()}</div>
      </div>

      <div className="">
        check out :
        <div className="font-bold">{checkOut.toDateString()}</div>
      </div>
    </div>

    <div className="border-b py-2">
        stay period :
        <div className="font-bold">{numberOfNights} Nights</div>
      </div>

    <div className="py-2">
        Guests :
        <div className="font-bold">{adultCount} Adults , {childCount} Children</div>
      </div>

    </div>
  )
}

export default BookingDetailsSummary;


