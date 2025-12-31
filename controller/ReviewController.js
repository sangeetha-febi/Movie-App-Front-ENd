const reviewModel = require("../model/ReviewModel");








const getallComment = async (req, res)=> {
    try{
      const Comments = await reviewModel.find();
      if(Comments.length === 0)
        {
        return res.status (200).json({message:" comment Collection Empty"});
      }
     return res.status(200).json({count:Comments.length, data:Comments}); 
    }catch(err){
    return res.status(500).json({message:"server Error",err});

      return res.status(500).json({ 
        message: "server Error", 
        errorDetail: err.message 
      });
    }
};
 
 //Get by Id
 const getCommentsbyId = (req,res) =>{
   const id = parseInt(req.params.id);
    const Comment = newComment.find(existingItem=>existingItem.id===id);
    if(Movie){
      return res.status(200).json(Movie);
    }
    else{
      return res.status(404).json({message:" comment not found"});
    }
 };


//post API
 const giveComment = async (req, res) =>
 { 
  try{
   const{username,text,createdAt,rating} = req.body;
   if(!username || !text||!createdAt || !rating)
   {
       return res.status(404).json({message: "All the fields are required"});
   }
   const newComment = await reviewModel.create({
  
      
      username,
      text,
     createdAt,
     rating
   });
   return res.status(201).json({
    success:true,
    message:"Comment Added Successfully",
    data: newComment
   });
} catch(err){
    console.error("Error:", err);
    return res.status(500).json({ message: "Server error" });
}
 };
// Update API
const updateReview = (req, res) => {
    const id = parseInt(req.params.id);
    const {comment,rating} = req.body;

    const review = reviewModel.find(existingProduct => existingProduct.id === id);

    if(review){
        
        review.comment = comment?? review.comment; // || - ??
        review.rating = rating ?? review.rating;
       return res.status(200).json(review);
    }else{
       return res.status(404).json({message: "Review Not Found"});
    }
};
const deleteReview = (req, res) => {
    const id = parseInt(req.params.id);
    const review = reviewModel.findIndex(existingProduct => existingProduct.id === id);

    if(review !== -1){
        const deletedReview = reviewModel.splice(review, 1);
        return res.status(200).json({message: "Review deleted"},);
    } else {
        return res.status(404).json({message: "Review Not Found"});
    }
};

   
 module.exports = { getallComment , getCommentsbyId,giveComment, updateReview, deleteReview};