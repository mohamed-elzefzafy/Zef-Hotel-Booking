import { useMutation } from "react-query"
import ManageHotelForm from "../forms/manageHotelForm/ManageHotelForm"
import { useAppContext } from "../components/contexts/AppContext";
import { addHotel } from "../apiClient";


const AddHotel = () => {
const {showToast} = useAppContext();
  const {mutate , isLoading} = useMutation(addHotel , {
    onSuccess : () => {
      showToast({message : "Hotel saved" , type : "SUCCESS"});
    },
    onError : () => {
      showToast({message : "error saving hotel" , type : "ERROR"});
    }
  });

const onSave = (hotelFormData : FormData) => {
  mutate(hotelFormData)
};
  return (
    <ManageHotelForm onSave={onSave} isLoading={isLoading}/>
  )
}

export default AddHotel