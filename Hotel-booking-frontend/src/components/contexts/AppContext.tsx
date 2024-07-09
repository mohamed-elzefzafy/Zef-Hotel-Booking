import { ReactNode, createContext, useContext, useState } from "react"
import Toast from "../Toast";
import { useQuery } from "react-query";
import { validateToken } from "../../apiClient";
import { loadStripe, Stripe } from "@stripe/stripe-js";


// const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";


type ToastMessage = {
  message : string,
  type : "SUCCESS" | "ERROR"
}

type AppContext = {
  showToast : (toastMessage : ToastMessage) => void,
  isLoggedIn : boolean,
  stripePromise : Promise<Stripe | null>,
}

const AppContext = createContext<AppContext | undefined>(undefined);
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);



export const AppContextProvider = ({children} : {children : ReactNode}) => {
  const [tost, setTost] = useState<ToastMessage | undefined>();
  const {isError} = useQuery( "validateToken" , validateToken, {
    retry : false
  })
return (
  <AppContext.Provider
   value={{
    showToast : (toastMessage) => {
      setTost(toastMessage);

    },
    isLoggedIn : !isError,
    stripePromise

  }}>
    {tost && <Toast message={tost.message} type={tost.type} onClose={()=> setTost(undefined)}/>}
    {children}
  </AppContext.Provider>
)
}


export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
}