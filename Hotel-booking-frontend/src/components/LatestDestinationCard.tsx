import { Link } from "react-router-dom"
import { HotelType } from "../utils/types"

type Props = {
  hotel : HotelType
}
const LatestDestinationCard = ({hotel} : Props) => {
  return (
    <Link to={`/details/${hotel?._id}`} className="relative cursor-pointer overflow-hidden rounded-md">
    <div className="h-[300px]">
      <img src={hotel?.imageUrls[0]} alt="" className="w-full h-full object-cover object-center" />
      </div>

      <div className="absolute bottom-0 top-0 p-4 bg-black opacity-50 w-full rounded-b-md flex justify-center items-center">
        <span className="text-white font-bold tracking-tight text-3xl">
          {hotel?.name}
        </span>
      </div>
    </Link>
  )
}

export default LatestDestinationCard