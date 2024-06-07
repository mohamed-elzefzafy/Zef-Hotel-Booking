import mongoose from "mongoose"
import bcrypt from "bcryptjs";
import { UserType } from "../utils/types";


const UserSchema = new  mongoose.Schema<UserType>({
  email : {type : String , required: true , unique: true},
  password : {type : String , required: true},
  firstName : {type : String , required: true},
  lastName : {type : String , required: true},
  profilePhoto: {
    type : Object,
  default : {
    url : "https://res.cloudinary.com/dw1bs1boz/image/upload/v1702487318/Zef-Blog/Default%20images/download_w26sr9.jpg",
    public_id : null
  }
  },
},{timestamps : true})


UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password , 8)
  }

  next();
})


const UserModel = mongoose.model<UserType>("User" , UserSchema );
export default UserModel;