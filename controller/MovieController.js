const MovieModel = require("../model/MovieModel");
const Movie = require("../model/MovieModel");

 //Get All API

 const getallMovies = async (req, res)=> {
    try{
      const Movies = await Movie.find();
      if(Movies.length === 0)
        {
        return res.status (200).json({message:"Movie Collection Empty"});
      }
      res.status(200).json({count:Movies.length, data:Movies}); 
    }catch(err){
      res.status(500).json({message:"server Error"});
    }
};
 
 //Get by Id
 const getMoviesbyId = (req,res) =>{
   const id = parseInt(req.params.id);
    const Movie = Movie.find(existingItem=>existingItem.id===id);
    if(Movie){
      res.status(200).json(Movie);
    }
    else{
      res.status(404).json({message:"Movie not found"});
    }
 };

 //post API
 const createMovie = async (req, res) =>
 { 
  try{
   const{title,description,release_date,duration_minutes,poster} = req.body;
   if(!title ||!description || !release_date ||!duration_minutes ||! poster)
   {
      res.status(404).json({message: "Both fields are required"});
   }
   const newMovies = await MovieModel.create({
  
      title,
      description,
      release_date,
      duration_minutes,
      poster
   });
   return res.status(201).json({
    success:true,
    message:"Movie created successfully",
    data: newMovies
   });
} catch(err){
  console.error("Error creating movie:", error);
  return res.status(500).json({
    success: false,
      message: "Server error",
      error: error.message
  });
}
 };
// Update API
const updateMovie = (req, res) => {
    const id = parseInt(req.params.id);
    const {title, description, release_date, duration_minutes,poster}= req.body;

    const movie = MovieModel.find(existingMovie => existingMovie.id === id);

    if(movie){
        
        movie.title = title ?? movie.title; // || - ??
        movie.description = description ?? movie.description;
        movie.release_date = release_date ?? movie.release_date;
        movie.duration_minutes = duration_minutes ?? movie.duration_minutes;
        movie.poster = poster ?? movie.poster;
        res.status(200).json(movie);
    }else{
        res.status(404).json({message: "movie Not Found"});
    }
};
const deleteMovie = (req, res) => {
    const id = parseInt(req.params.id);
    const movie = MovieModel.findIndex(existingMovie => existingMovie.id === id);

    if(movie !== -1){
        const deletedMovie = MovieModel.splice(movie, 1);
        res.status(200).json({message: "Product deleted"},);
    } else {
         res.status(404).json({message: "Product Not Found"});
    }
};

   
 module.exports = {getallMovies, getMoviesbyId, createMovie, updateMovie, deleteMovie};