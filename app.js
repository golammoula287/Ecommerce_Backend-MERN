const express =require("express");
const app = new express();
const router = require("./src/routes/api")
const cors =require("cors");
const mongoose =require("mongoose");
const rateLimit =require("express-rate-limit");
const mongoSanitize =require("express-mongo-sanitize");
const cookieParser =require("cookie-parser");
const hpp =require("hpp");
const helmet =require("helmet");
const path = require("path");
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });


// database connection
const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@cluster0.paeh3ok.mongodb.net/ecom5`;
const options = {user:"",pass:"",autoIndex:true};
mongoose.connect(uri,options)
    .then((res)=>{
        console.log("Database Connected")
    })
    .catch((e)=>{
        console.log(e)
    })

// middlewares
app.use(cors());
app.use(cookieParser());
app.use(hpp());
app.use(helmet());
app.use(mongoSanitize());
const limiter = rateLimit({windowMs:15*60*1000,limit:3000})
app.use(limiter)
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({extended:true}))


app.set("etag",false);
app.use("/api/v1", router)



// connect frontend
// app.use(express.static("client/dist"));
// app.get("*", function (req,res) {
//
//     res.sendFile(path.resolve(__dirname,"client","dist","index.html"))
//
// })

module.exports = app;