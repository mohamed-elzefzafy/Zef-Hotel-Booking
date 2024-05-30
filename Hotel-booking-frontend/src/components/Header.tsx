import { Link } from "react-router-dom"
import { useAppContext } from "./contexts/AppContext"
import LoginButton from "./LoginButton";

const Header = () => {
  const {isLoggedIn} = useAppContext();
  return (
    <div className='bg-blue-800 py-4'>
  <div className="container mx-auto flex  justify-between">

    <span className="text-xl  md:text-3xl text-white font-bold tracking-tight ">
      <Link to="/">
      ZEF-HOTEL-BOOKING
      </Link>
    </span>

    <span className="flex space-x-2">
  {isLoggedIn ? (<>
    <Link to="/my-booking" className="text-white font-bold text-lg p-2 bg-blue-600 hover:bg-blue-700 rounded-md">
      My Booking
      </Link>

      <Link to="/my-hotels" className="text-white font-bold text-lg p-2 bg-blue-600 hover:bg-blue-700 rounded-md">
          My Hotels
      </Link>
      <LoginButton/>
  </>) : 
  <>
      <Link to="/login" className="flex items-center rounded-md bg-white text-blue-600 px-3 font-bold hover:bg-gray-100 hover:text-blue-900">
      Login
      </Link>
      <Link to="/register" className="flex items-center rounded-md bg-white text-blue-600 px-3 font-bold hover:bg-gray-100 hover:text-blue-900">
      Register
      </Link>
  </>
  
  }
    </span>
  </div>
    </div>
  )
}

export default Header