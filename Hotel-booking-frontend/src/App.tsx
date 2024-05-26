import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

function App() {


  return (

<BrowserRouter>
<Routes>
<Route  path='/' element={<Layout> <HomePage/> </Layout>}/>
<Route  path='/search' element={<Layout> <p>Search page</p> </Layout>}/>
<Route  path='/register' element={<Layout> <RegisterPage/> </Layout>}/>
<Route  path='/login' element={<Layout>  <LoginPage/> </Layout>}/>

<Route  path='*' element={<Navigate to="/"/>}/>
</Routes>

</BrowserRouter>

  )
}

export default App
