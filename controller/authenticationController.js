const UserModel = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { hash } = require("bcryptjs");

const registerAPI = async(req,res)=>{
    const{username, email, password, role}= req.body;

    try{
         const user = await UserModel.findOne({email});
         if(user){
             return res.status(400).json({message: "user account already exists, please try to login"});
         }
         const hashedpassword = await bcrypt.hash(password, 10);
         const newuser = new UserModel({username,email ,password: hashedpassword, role});
         await newuser.save();
          res.status(201).json({message:"Registered successfully"});
        }

    catch(err){
         console.log(err.message);
      
    }
}
const loginAPI = async(req,res)=>{
        const{email,password} =req.body;

   try{
       const user =await UserModel.findOne({email});
       if(!user){
        return res.status(404).json({message:"User account not found , please register first "})
       }
         const passwordcheck = await bcrypt.compare(password, user.password);
         if(!passwordcheck){
            return res.status(401).json({message:"Invalid Password"});
         }
         const token = jwt.sign(
            {userId: user._id, username: user.username, email:user.email,role:user.role},process.env.jwtsecretkey,{expiresIn:'3h'});
            res.status(200).json({message:"login Successful",token});
   }catch(err){
            console.log(err.message);
   }

}
module.exports =  {registerAPI , loginAPI};