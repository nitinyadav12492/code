import { z } from "zod";

const signupSchema = z.object({
  username:z
  .string({required_error:"Name is required"})
  .trim()
  .min(3,{message:"Name must be at least 3 characters long"})
  .max(20,{message:"Name must be at most 20 characters long"}),
  
  
  email:z
  .string({required_error:"Email is required"})
  .email({message:"Invalid email address"}),
  
  
  
  phone:z
  .string({required_error:"Phone number is required"})
  .regex(/^[0-9]{10}$/, {message:"Invalid phone number"}),
  
  
  password:z
  .string({required_error:"Password is required"})
  .min(6,{message:"Password must be at least 6 characters long"})
  .max(20,{message:"Password must be at most 20 characters long"}),
});

export default signupSchema;