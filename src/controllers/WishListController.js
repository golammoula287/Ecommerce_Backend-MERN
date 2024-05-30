const {WishListService, RemoveWishListService, SaveWishListService} = require("../services/WishListServices");
exports.SaveWishList = async (req,res)=>{
    let result = await SaveWishListService(req);
    return res.status(200).json(result);
}

exports.RemoveWishList = async (req,res)=>{
    let result = await RemoveWishListService(req);
    return res.status(200).json(result);
}


exports.WishList = async (req,res)=>{
    let result = await WishListService(req);
    return res.status(200).json(result);
}