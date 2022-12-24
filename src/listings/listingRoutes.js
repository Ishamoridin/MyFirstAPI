const { Router } = require(`express`);
const listingRouter = Router();
const { createListing, readListings, updateListing, deleteListing } = require(`./listingControllers`)
listingRouter.post("/createListing", createListing);
listingRouter.get("/readListings", readListings);
listingRouter.patch("/updateListing", updateListing);
listingRouter.delete("/deleteListing", deleteListing);
module.exports = listingRouter