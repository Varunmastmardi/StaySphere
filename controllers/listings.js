const Listing = require("../models/listing.js");

const maptilerClient = require("@maptiler/client");
const mapApi = process.env.MAP_API;

maptilerClient.config.fetch = fetch;
maptilerClient.config.apiKey = mapApi;

module.exports.index = async (req, res) => {
  searchListing = req.query.search;
  if (!searchListing || searchListing == "" || searchListing == undefined) {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  } else {
    allListings = await Listing.find({ country: searchListing.toUpperCase() });
    if (!allListings || allListings.length === 0) {
      req.flash("error", "listing is not available");
      return res.redirect("/listings");
    }
    if (allListings.length > 0) {
      res.render("listings/search.ejs", { allListings });
    }
  }
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let query = req.body.listing.location;
  const result = await maptilerClient.geocoding.forward(query);

  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.country = newListing.country.toUpperCase();
  newListing.image = { url, filename };
  newListing.geometry = result.features[0].geometry;
  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.editListingForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "listing No longer available");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { runValidatiors: true }
  );

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
