import mongoose from "mongoose";
import { ObjectId } from "mongoose";

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },

   role: {
      type: String,
      enum: ['patient', 'doctor', 'admin'],
      default: 'patient'
   },
   status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active'
   },
   isAdmin: {
      type: Boolean,
      default: false,

   },
   isDoctor: {
      type: Boolean,
      default: false,
   },
   profilePicture: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
   }

}, { timestamps: true });


const User = mongoose.model('User', userSchema);
export default User;