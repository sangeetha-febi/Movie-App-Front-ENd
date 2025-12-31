const express = require("express");
const router = express.Router();


const  { getallComment,getCommentsbyId,giveComment, updateReview, deleteReview}= require("../controller/ReviewController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/comments", getallComment);
router.get("/comments/:id",authMiddleware([]), getCommentsbyId);
router.post("/comments", giveComment);
router.put("/comments/:id",authMiddleware(["admin"]),updateReview);
router.delete("/comments/:id",deleteReview);

module.exports = router;