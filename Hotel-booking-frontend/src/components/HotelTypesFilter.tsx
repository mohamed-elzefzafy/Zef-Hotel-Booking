import React, { ChangeEvent } from 'react'
import { hotelTypes } from '../config/hotel-options-config';

type Props = {
  selectedHotelTypes : string[];
  onChange : (e : ChangeEvent<HTMLInputElement>) => void;
}

const HotelTypesFilter = ({selectedHotelTypes , onChange} : Props) => {
  return (
    <div className="border border-slate-300 pb-5 pl-2">
    <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
    {hotelTypes?.map(type => 
<label className="flex items-center space-x-2">
<input type="checkbox" 
 className="rounded mr-2" 
 value={type} 
 checked={selectedHotelTypes.includes(type)} 
 onChange={onChange}/>
{type} 
</label>

    ) }
  </div>
  )
}

export default HotelTypesFilter