import express from "express"
import { verifyAdmin } from "../utils/verifyJWT.utils.js";
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom, updateRoomAvailability } from "../controllers/room.controller.js";

const router = express.Router();

router.post("/:hotelid",verifyAdmin,createRoom)
//UPDATE
router.put("/:id",verifyAdmin,updateRoom)
//DELETE
router.delete("/:id/:hotelid",deleteRoom)
//GET

router.get("/:id",getRoom)
//GET ALL

router.get("/",getAllRoom)
router.put("/availability/:id", updateRoomAvailability);

export default router;