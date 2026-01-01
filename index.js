const express = require("express");
const app = express();
require("dotenv").config();

const MovieRouter = require("./routes/MovieRouter");
const UserRoutes = require("./routes/UserRouter");
const ReviewRouter = require("./routes/ReviewRouter");

const dbConnection =require("./config/dbConnection");
const authenticationRoutes = require("./routes/authenticationRoutes");
const cors = require("cors");


app.use(express.json());
app.use(cors({
    origin: ["https://dreamy-sunflower-34e3fb.netlify.app"], // Allow your Netlify site
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true 
  }));

app.use(MovieRouter);
app.use(UserRoutes);
app.use(ReviewRouter);
app.use("/api/auth/",authenticationRoutes);
dbConnection();
app.listen(process.env.port, () => {
    console.log(`Server running on http://localhost:${process.env.port}`);
})