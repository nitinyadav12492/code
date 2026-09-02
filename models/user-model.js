import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true
   },
 
   phone:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   isAdmin:{
    type:Boolean,
    default:false,
   },
});


userSchema.methods.generateToken = async function () {
  try {
    const JWT_SECRET = process.env.JWT_SECRET || process.env.JWT_SECRET_KEY;
    return jwt.sign(
      {
        userID: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
  } catch (error) {
    throw new Error("token generation failed");
  }
};

const User = mongoose.model("User", userSchema);

export default User;