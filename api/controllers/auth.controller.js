import { User } from "../models/user.models.js";
import bcrypt from "bcrypt"
import { createError } from "../utils/error.utils.js";
import jwt from "jsonwebtoken"

//check the addHotel hotel controller
export const register = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(parseInt(process.env.SALT));
  const hash = bcrypt.hashSync(req.body.password, salt);
  try {
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
    try {
      const user = await User.findOne({
        username:req.body.username
      })
      if(!user){
        return next(createError(404,"user not found"))
      }
      const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password)

      if(!isPasswordCorrect)
        return next(createError(400,"Wrong  passowrd or username"))

      const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.SECRET_JWT)

      const {password,isAdmin , ...other} =user._doc;
      res.cookie("access_token",token,{
        httpOnly: true,
      }).status(200).json({...other})

    } catch (error) {
      next(error);
    }
  };

  export const logout =async(req,res,next) =>{
    console.log(res.cookie);
    try {
      res.clearCookie("access_token",{
        httpOnly:true,
      })
      res.status(200).json("logged out");
    } catch (error) {
      next(error);
    }
  }
