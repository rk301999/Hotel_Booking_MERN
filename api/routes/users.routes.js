import express from "express"
import { updateUser,deleteUser,getAllUser,getUser } from "../controllers/user.controller.js";
import { verifyJWT,verifyUser,verifyAdmin} from "../utils/verifyJWT.utils.js";

const router = express.Router();

router.get("/checkauth",verifyJWT,(req,res,next)=>{
    res.json("you are logged in 🥳");
})

//permission to delete and update user
router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
    res.json("hello user , you cn delete you account");
})

router.get("/checkAdmin/:id",verifyAdmin,(req,res,next)=>{
    res.json("hello Admin , you cn delete all account");
})

//UPDATE
router.put("/:id",verifyUser,updateUser)
//DELETE
router.delete("/:id",verifyUser,deleteUser)
//GET
router.get("/:id",verifyUser,getUser)
//GET ALL
router.get("/",verifyAdmin,getAllUser)

export default router;