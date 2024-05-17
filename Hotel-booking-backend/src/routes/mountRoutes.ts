import { Express } from "express-serve-static-core";
import userRoutes from "./userRoutes";


const mountRoutes = (app: Express)=> {
app.use("/api/v1/users" , userRoutes);

}


export default mountRoutes;