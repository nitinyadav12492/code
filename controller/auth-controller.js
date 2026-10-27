// Controller for authentication actions
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user-model.js";

const home = async(req,res) =>{
try{
res.status(200).send("Hello World");
}catch(error){
  console.log(error)
}
}

// register 

const register = async(req,res,next) =>{
  try{
   const{username,email,phone,password,isAdmin} = req.body;

   const userExist = await User.findOne({email:email});
   if(userExist){
    return res.status(400).json({message:"User already exists"});
   }
 
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

 const userCreated = await User.create({username,email,phone,password:hashedPassword,isAdmin});


 res.status(200).json({msg:userCreated , token: await userCreated.generateToken() , });

  }
  catch(error){
    next(error);
  }
};

//user login
 const login = async(req,res) =>{
  try{
    const {email,password} = req.body;

    const userExist = await User.findOne({email});
    if(!userExist){
      return res.status(400).json({msg:"User not found"});
    }

    const isMatch = await bcrypt.compare(password, userExist.password);
    if(!isMatch){
      return res.status(400).send("Invalid credentials");
    }

    res.status(200).json({msg:"Login successful", token: await userExist.generateToken()});

  } catch(error){
    console.log(error);
  }
};



//user 
// logic

const user = async(req,res)=>{
  try{
    const userData = req.user;
    console.log(userData)
    res.status(200).json({userData});
  }catch(error){
    console.log(error);
  }
}


export { home, register, login,user };
