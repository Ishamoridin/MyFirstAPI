const Listing = require("./listingModel");
const User = require("../users/userModel");
exports.createListing = async (req, res) => {
    try {
        const seller = await User.findOne({username: req.body.seller});
        // console.log(seller)
        if (seller){const newListing = await Listing.create(req.body);
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.status(201).send({listingName: newListing.name})}
        else {
            throw new Error ('No such seller')
        }
    } catch (error) {
        console.log(error);
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.status(500).send({error: error.message});
    }
};
exports.readListings = async (req, res) => {
    try {
        const listings = await Listing.find({});
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.status(200).send(listings);
    } catch (error) {
        console.log(error);
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.status(500).send({error: error.message});
    }
};
exports.updateListing = async (req, res) => {
    try {
        const updatedListing = await Listing.updateOne({name: req.body.name}, req.body);
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.status(200).send(updatedListing)
    } catch (error) {
        console.log(error);
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.status(500).send({error: error.message});
    }
};
exports.deleteListing = async (req, res) => {
    try {
        const deletedListing = await Listing.deleteOne(req.body);
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.status(200).send(deletedListing)
    } catch (error) {
        console.log(error);
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.status(500).send({error: error.message});
    }
};
