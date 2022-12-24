const mongoose = require(`mongoose`);
const listingSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true,
    },
    seller: {
        type:String,
        required:true,
    }
});
const Listing = mongoose.model(`listing`, listingSchema);
module.exports = Listing;