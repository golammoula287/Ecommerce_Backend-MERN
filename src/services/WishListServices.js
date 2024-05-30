const WishModel = require("../models/WishModel");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;

const WishListService = async (req)=>{
    try {
        let user_id = new ObjectID(req.headers.user_id);
        let MatchStage = {$match: {userID:user_id}};

        let JoinWithProductStage = {$lookup: {from:"products",localField:"productID",
                foreignField:"_id",as:"product"}}
        let UnwindProductStage = {$unwind: "$product"};

        let JoinWithBrandStage = {$lookup: {from:"brands",localField:"product.brandID",
                foreignField:"_id",as:"brand"}}
        let UnwindBrandStage = {$unwind: "$brand"};

        let JoinWithCategoryStage = {$lookup: {from:"categories",localField:"product.categoryID",
                foreignField:"_id",as:"category"}}
        let UnwindCategoryStage = {$unwind: "$category"};

        let ProjectionStage = {$project: {"_id":0, "userID":0, "productID":0,"createdAt":0,
            "updatedAt":0,"product.brandID":0,"product.categoryID":0,"brand._id":0,
                "category._id":0,"product._id":0}}


        let data = await WishModel.aggregate([
            MatchStage,
            JoinWithProductStage,
            UnwindProductStage,
            JoinWithBrandStage,
            UnwindBrandStage,
            JoinWithCategoryStage,
            UnwindCategoryStage,
            ProjectionStage
        ])

        return {status:"success", data:data}

    }
    catch (e) {
        return {status:"failed", data:e}
    }

}

const RemoveWishListService = async (req)=>{
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;
        await WishModel.deleteOne(reqBody)
        return {status:"success",message:"successfully removed"}
    }
    catch (e) {
        return {status:"fail",message:e}
    }

}

const SaveWishListService = async (req)=>{
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;
        await WishModel.updateOne(reqBody,{$set:reqBody},{upsert:true});
        return {status:"success",message:"successfully updated & created"}
    }
    catch (e) {
        return {status:"fail",message:e}
    }

}



module.exports = {
    WishListService,
    SaveWishListService,
    RemoveWishListService
}