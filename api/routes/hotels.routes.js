import express from "express"
// import { createError } from "../utils/error.utils.js";
import { createHotel,updateHotel,deleteHotel,getHotel,getAllHotel, countByCity, countByType, getHotelRooms } from "../controllers/hotel.controller.js";
import { verifyAdmin } from "../utils/verifyJWT.utils.js";

const router = express.Router();

//CREATE - post since we are creating
router.post("/",verifyAdmin,createHotel)
//UPDATE
router.put("/:id",verifyAdmin,updateHotel)
//DELETE
router.delete("/find/:id",deleteHotel)
//GET

router.get("/find/:id",getHotel)
//GET ALL

router.get("/",getAllHotel)
router.get("/countByCity",countByCity)
router.get("/countByType",countByType)
router.get("/room/:id",getHotelRooms)
export default router;