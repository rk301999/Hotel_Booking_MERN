
//it is gonna act like a middleware as we have used next

import jwt from "jsonwebtoken"
import { createError } from "./error.utils.js"

export const verifyJWT = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401,"you are not authenticated"))
    }
    //user in the params is the {id:user._id,isAdmin:user.isAdmin} data we had passed in during jwt sign
    jwt.verify(token,process.env.SECRET_JWT,(err,user)=>{
        if(err)
            return next(createError(403,"your token is not valid"))
        req.user = user; //here in req.user we could have given anything say req.ritesh
        next();
    })
}

export const verifyUser = (req,res,next)=>{
    //should be authenticated first
    verifyJWT(req,res,next,()=>{
        if(req.params.id ===req.user.id || req.user.isAdmin){
            next()
        }else{
                return next(createError(403,"you are not athorized"))
        }
    })
}
export const verifyAdmin = (req,res,next)=>{
    //should be authenticated first
    verifyJWT(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
                return next(createError(403,"you are not athorized"))
        }
    })
}