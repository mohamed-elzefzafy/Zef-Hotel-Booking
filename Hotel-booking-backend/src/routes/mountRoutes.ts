import { Express } from "express-serve-static-core";
import userRoutes from "./userRoutes";
import myHotelsRoutes from "./myHotelsRoutes";


const mountRoutes = (app: Express)=> {
app.use("/api/v1/users" , userRoutes);
app.use("/api/v1/my-hotels" , myHotelsRoutes);

}


export default mountRoutes;