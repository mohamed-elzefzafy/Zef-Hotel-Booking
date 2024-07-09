import { Express } from "express-serve-static-core";
import userRoutes from "./userRoutes";
import myHotelsRoutes from "./myHotelsRoutes";
import hotelsRoutes from "./hotelsRoutes";
import bookingRoutes from "./bookingRoutes";


const mountRoutes = (app: Express)=> {
app.use("/api/v1/users" , userRoutes);
app.use("/api/v1/my-hotels" , myHotelsRoutes);
app.use("/api/v1/hotels" , hotelsRoutes);
app.use("/api/v1/my-bookings" , bookingRoutes);

}


export default mountRoutes;