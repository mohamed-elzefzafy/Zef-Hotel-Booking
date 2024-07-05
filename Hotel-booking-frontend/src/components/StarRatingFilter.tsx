import { ChangeEvent } from "react";

type Props = {
  selectedStars : string[];
  onChange : (e : ChangeEvent<HTMLInputElement>) => void;
}

const StarRatingFilter = ({selectedStars , onChange} : Props) => {
  console.log(selectedStars);
  
  return (
    <div className="border border-slate-300 pb-5 pl-2">
      <h4 className="text-md font-semibold mb-2">Property Rating</h4>
      {["5" , "4" , "3" , "2" , "1"].map(star => 
 <label className="flex items-center space-x-2">
  <input type="checkbox" 
   className="rounded mr-2" 
   value={star} 
   checked={selectedStars.includes(star)} 
   onChange={onChange}/>
  {star} Stars
 </label>

      ) }
    </div>
  )
}

export default StarRatingFilter