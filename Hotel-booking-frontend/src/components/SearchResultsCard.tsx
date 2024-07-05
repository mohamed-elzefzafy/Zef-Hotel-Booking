import { Link } from 'react-router-dom';
import { HotelType } from '../utils/types'
import {AiFillStar} from "react-icons/ai"

type Props = {
  hotel : HotelType;
}

const SearchResultsCard = ({hotel} : Props) => {
  return (
    <div className='grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8'>
      <div className='w-full h-[300px]'>
        <img src={hotel.imageUrls[0]} alt=""  className='w-full h-full object-cover object-center'/>
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className='flex items-center'>
            <span className='flex'>
              {Array.from({length : hotel.starRating}).map(() => 
                  <AiFillStar className='fill-yellow-500 mr-1'/>

              )}
            </span>
            <span className='text-sm'>
              {hotel?.type}
              </span>
          </div>
          <Link to={`/details/${hotel?._id}`} className='text-2xl font-bold cursor-pointer'>{hotel?.name}</Link>
        </div>
    

             <div>
              <div className='line-clamp-4'> {hotel?.description}</div>
             </div>

             <div className='grid grid-cols-1 md:grid-cols-2 items-end whitespace-nowrap'>
              <div className="flex gap-1 items-center">
                    {hotel?.facilities?.slice(0 , 3).map((facility) => 
                    <span className='bg-slate-300 rounded-lg p-2 font-bold text-xs whitespace-nowrap'>
                           {facility}
                    </span>
                    )}

                    {hotel.facilities.length > 3 &&   <span className='text-sm'> + {hotel.facilities.length - 3} more</span>}
              </div>
              <div className='flex flex-col items-center gap-1'>
                <span className='font-bold'>$ {hotel?.pricePerNight} per night</span>
                <Link to={`/details/${hotel?._id}`}  className='bg-blue-600 text-white h-full font-bold p-2 text-xs max-w-fit rounded-lg hover:bg-blue-700'>
                  View More
                  </Link>
              </div>
             </div>

      </div>
    </div>
  )
}

export default SearchResultsCard