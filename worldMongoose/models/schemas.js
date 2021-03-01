const mongoose = require("mongoose");
const mong = require("mongooseWrap");

const countrySchema = mongoose.Schema({
    code: String, 
    name: String, 
    continent: String, 
    region: String,
    surfacearea: Number, 
    indepyear: Number,
    population: Number,
    lifeexpectancy: Number,
    gnp: Number,
    gnpOld: Number, 
    localname: String,
    governmentform: String,
    headofstate: String,
    capital: Number, 
    code2: String
})

const Country = mongoose.model("Country", countrySchema, 'country');

exports.getCountries = function(){
    mong.retrieve(Country);
};