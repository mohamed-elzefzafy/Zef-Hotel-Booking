import { Link } from "react-router-dom"
import { useAppContext } from "./contexts/AppContext"

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
    <Link to="/my-booking">
      My Booking
      </Link>

      <Link to="/my-hotels">
          My Hotels
      </Link>
      <button>LogOut</button>
  </>) : 
      <Link to="/login" className="flex items-center rounded-md bg-white text-blue-600 px-3 font-bold hover:bg-gray-100 hover:text-blue-900">
      Login
      </Link>
  
  }
    </span>
  </div>
    </div>
  )
}

export default Header