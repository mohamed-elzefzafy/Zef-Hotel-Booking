import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import HomePage from './pages/HomePage'

function App() {


  return (

<BrowserRouter>
<Routes>
<Route  path='/' element={<Layout> <HomePage/> </Layout>}/>
<Route  path='/search' element={<Layout> <p>Search page</p> </Layout>}/>
</Routes>

</BrowserRouter>

  )
}

export default App
