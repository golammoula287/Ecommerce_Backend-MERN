const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config({ path: "../../.env" });



exports.EncodeToken = (email,user_id)=>{

    let KEY = `${process.env.KEY}`;
    let EXPIRE = {expiresIn: "24h"};
    let PAYLOAD = {email:email,user_id:user_id};
    return jwt.sign(PAYLOAD,KEY,EXPIRE);
}



exports.DecodeToken = (token)=>{
    try {
        let KEY = `${process.env.KEY}`;
        return jwt.verify(token,KEY);
    }
    catch (e){
        return null
    }

}