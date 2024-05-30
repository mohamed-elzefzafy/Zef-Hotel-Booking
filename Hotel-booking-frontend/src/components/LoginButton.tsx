import { useMutation, useQueryClient } from 'react-query'
import { logout } from '../apiClient'
import { useAppContext } from './contexts/AppContext'

const LoginButton = () => {
  const {showToast} = useAppContext();
  const quertClient = useQueryClient();
  const mutation = useMutation(logout , {
    onSuccess : async () => {
      await quertClient.invalidateQueries("validateToken");
showToast({message : "logged out successfully" , type : "SUCCESS"});
    } ,
    onError : (error :Error) => {
showToast({message : error.message, type : "ERROR"});
    }
  })
const handleLogout = () => {
  mutation.mutate();

}

  return (
  <button onClick={handleLogout} className='text-blue-600 md:px-3 px-1 font-bold bg-white hover:bg-gray-200 rounded-md'>Logout</button>
  )
}

export default LoginButton