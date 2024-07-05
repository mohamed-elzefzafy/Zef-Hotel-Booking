import { useQuery } from "react-query";
import { useSearchContext } from "../components/contexts/Searchcontext"
import { searchHotelsApi } from "../apiClient";
import { ChangeEvent, useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";


const SearchPage = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilites, setSelectedFacilites] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOptions, setSortOptions] = useState<string>("");

  console.log(search);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page : page.toString(),
    stars : selectedStars,
    types : selectedHotelTypes,
    facilities : selectedFacilites,
    maxPrice : selectedPrice?.toString(),
    sortOption : sortOptions,

  }

  const {data : hotelData} = useQuery(["searchHotels", searchParams] , () => searchHotelsApi(searchParams))
  console.log(hotelData);
  

  const HandleStarsChange = (e : ChangeEvent<HTMLInputElement>) => {
const starRating = e.target.value;
setSelectedStars(prev => e.target.checked ? [...prev , starRating] : prev.filter(p => p !== starRating) )
  }

  const HandleTypesChange = (e : ChangeEvent<HTMLInputElement>) => {
const type = e.target.value;
setSelectedHotelTypes(prev => e.target.checked ? [...prev , type] : prev.filter(p => p !== type) )
  }

  const HandleFacilitesChange = (e : ChangeEvent<HTMLInputElement>) => {
const facility = e.target.value;
setSelectedFacilites(prev => e.target.checked ? [...prev , facility] : prev.filter(p => p !== facility) )
  }


  return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit lg:sticky  top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter onChange={HandleStarsChange} selectedStars={selectedStars}/>
          <HotelTypesFilter onChange={HandleTypesChange} selectedHotelTypes={selectedHotelTypes}/>
          <FacilitiesFilter onChange={HandleFacilitesChange} selectedFacilites={selectedFacilites}/>
          <PriceFilter onChange={(value? : number) => setSelectedPrice(value)}  selectedPrice={selectedPrice}/>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
           <span className="text-xl font-bold">
             {hotelData?.pagination?.total} Hotels Found
             {search?.destination ? ` in ${search?.destination}` : ""}
           </span>

           <select value={sortOptions} onChange={(e) => setSortOptions(e.target.value)}
            className="p-2 border rounded-md"
            >
            <option value="">Sort By</option>
          {  ["starRating" , "pricePerNightAsc" , "pricePerNightDesc"].map(sort =>

 <option value={sort}>{sort === "starRating" ? "Star Rating" : sort === "pricePerNightAsc" ?
   "price Per Night (low to high)"  : sort === "pricePerNightDesc" ?
    "price Per Night (high to low)" : undefined } </option>

          )}

           </select>
        </div>
        {hotelData?.data?.map(hotel => 
      <SearchResultsCard hotel={hotel}/>

        )}
    { hotelData?.pagination?.pages !== undefined  && hotelData?.pagination?.pages > 1    &&
    
    <div>
    <Pagination page={hotelData?.pagination?.page || 1} 
    pages={hotelData?.pagination?.pages || 1}
     onPageChange={(pageNum)=> setPage(pageNum)}/>
    </div>
    }
      </div>
    
    </div>
  )
}

export default SearchPage