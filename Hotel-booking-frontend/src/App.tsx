import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { useAppContext } from './components/contexts/AppContext'
import AddHotel from './pages/AddHotel'
import { getHotels } from './apiClient'
import MyHotels from './pages/MyHotels'
import EditHotel from './pages/EditHotel'
import SearchPage from './pages/SearchPage'
import HotelDetailsPage from './pages/HotelDetailsPage'
import BookingPage from './pages/BookingPage'
import MyBookingsPage from './pages/MyBookingsPage'

function App() {
  const {isLoggedIn} = useAppContext();
  console.log(getHotels());
  

  return (

<BrowserRouter>
<Routes>
<Route  path='/' element={<Layout> <HomePage/> </Layout>}/>
<Route  path='/search' element={<Layout> <SearchPage/> </Layout>}/>
<Route  path='/details/:hotelId' element={<Layout> <HotelDetailsPage/> </Layout>}/>
<Route  path='/register' element={<Layout> <RegisterPage/> </Layout>}/>
<Route  path='/login' element={<Layout>  <LoginPage/> </Layout>}/>

{isLoggedIn && 
<>
<Route path='/add-hotel' element={<Layout> <AddHotel/>  </Layout>}/>
<Route path='/hotel/:hotelId/booking' element={<Layout> <BookingPage/>  </Layout>}/>
<Route path='/edit-hotel/:hotelId' element={<Layout> <EditHotel/>  </Layout>}/>
<Route path='/my-hotels' element={<Layout> <MyHotels/>  </Layout>}/>
<Route path='/my-booking' element={<Layout> <MyBookingsPage/>  </Layout>}/>

</>
}

<Route  path='*' element={<Navigate to="/"/>}/>
</Routes>

</BrowserRouter>

  )
}

export default App
