const {DecodeToken} = require("../utilities/TokenHelper");


module.exports = (req,res,next)=>{

    // Receive Token
    let token = req.headers['token'];
    if(!token){
        token = req.cookies['token']
    }

    // decode or verify token

    let decoded = DecodeToken(token);

    // find & set email and user_id

    if(decoded === null){
        return res.status(401).json({status:"fail",message:"Unauthorized"})
    }else {
        let email = decoded['email'];
        let user_id = decoded['user_id'];
        req.headers.email = email;
        req.headers.user_id = user_id;
        next();

    }















}