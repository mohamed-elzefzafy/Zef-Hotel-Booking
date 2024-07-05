import { ChangeEvent } from "react";
import { hotelFacilities } from "../config/hotel-options-config";


type Props = {
  selectedFacilites : string[];
  onChange : (e : ChangeEvent<HTMLInputElement>) => void;
}
const FacilitiesFilter = ({selectedFacilites , onChange} : Props) => {
  return (
    <div className="border border-slate-300 pb-5 pl-2">
    <h4 className="text-md font-semibold mb-2">Facilities</h4>
    {hotelFacilities?.map(facility => 
<label className="flex items-center space-x-2">
<input type="checkbox" 
 className="rounded mr-2" 
 value={facility} 
 checked={selectedFacilites.includes(facility)} 
 onChange={onChange}/>
{facility} 
</label>

    ) }
  </div>
  )
}

export default FacilitiesFilter;