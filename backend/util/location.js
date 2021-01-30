const axios = require("axios");
const { response } = require("express");
const HttpError = require("../models/http-error");

const API_KEY = "AIzaSyDAMOLLiQFe3MoEO2lM6nkUL2hm80ZihwM";

async function getCoordsForAddress(address) {
  axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;
  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address",
      422
    );
    throw error;
  }
  const coordinates = data.results[0].geometry.location;
  return coordinates;
}

module.exports = getCoordsForAddress;
