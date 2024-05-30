
const EmailSend = require("../utilities/EmailHelper")
const UserModel = require("../models/UserModel")
const ProfileModel = require("../models/ProfileModel")
const {EncodeToken} = require("../utilities/TokenHelper");
const UserOTPService = async (req)=>{
    try {
        let email = req.params.email;
        let code = Math.floor(100000 + Math.random() * 900000);

        let EmailText = `Your verification code is ${code}`;
        let EmailSubject = "Email Verification";

        await EmailSend(email,EmailText,EmailSubject);
        await UserModel.updateOne({email:email},{$set:{otp:code}},{upsert:true})

        return {status:"success",message:"6 Digit OTP has been sent to your email"}

    }
    catch (e) {
        return {status:"fail",message:e}
    }
}

const VerifyLoginService = async (req)=>{
    try {
        let email = req.params.email;
        let otp = req.params.otp;

        let total = await UserModel.find({email:email,otp:otp}).count('total');
        if(total === 1){
            let user_id = await UserModel.find({email:email,otp:otp}).select('_id');

            let token = EncodeToken(email,user_id[0]['_id'].toString());

            await UserModel.updateOne({email:email},{$set:{otp:"0"}});

            return {status:"success",message:"Valid OTP", token:token};

        }
        else{
            return {status:"failed",message:"Invalid OTP"}
        }
    }
    catch (e) {
        return {status:"fail",message:"Invalid OTP"}
    }

}

const SaveProfileService = async (req)=>{
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.user_id = user_id;
        await ProfileModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true})
        return {status:"success",message:"Successfully updated"};
    }
    catch (e) {
        return {status:"fail",message:e}
    }

}

const ReadProfileService = async (req)=>{
    try {
        let user_id = req.headers.user_id;
        let data = await ProfileModel.find({userID:user_id})
        return {status:"success",data:data};
    }
    catch (e) {
        return {status:"fail",data:e};
    }

}

module.exports = {
    UserOTPService,
    ReadProfileService,
    SaveProfileService,
    VerifyLoginService
}