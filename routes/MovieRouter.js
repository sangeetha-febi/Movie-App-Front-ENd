const express = require("express");
const router = express.Router();


const {getallMovies, getMoviesbyId , createMovie, updateMovie, deleteMovie} = require("../controller/MovieController");

const authMiddleware = require("../middleware/authMiddleware");


router.get("/movies", getallMovies);
router.get("/movies/:id",authMiddleware([]), getMoviesbyId);
router.post("/movies", createMovie);
router.put("/movies/:id",authMiddleware(["admin"]),updateMovie);
router.delete("/movies/:id",deleteMovie);

module.exports = router;