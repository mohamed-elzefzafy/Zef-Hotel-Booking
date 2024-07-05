import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'
import { AppContextProvider } from './components/contexts/AppContext'
import { SearchContextProvider } from './components/contexts/Searchcontext'


const queryClient = new QueryClient({
  defaultOptions : {
    queries : {
      retry : 0
    }
  }
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <SearchContextProvider>
        <App/>
        </SearchContextProvider>
    
      </AppContextProvider>
  
    </QueryClientProvider>
  
  </React.StrictMode>,
)
