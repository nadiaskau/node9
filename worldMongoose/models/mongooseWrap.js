const mongoose = require("mongoose");

//Connection to mongodb server
const dbname = "world"; 
const constr = `mongodb://localhost:27017/${dbname}`;
const conparam = { useNewUrlParser: true, useUnifiedTopology: true };
const db = mongoose.connection;

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

exports.retrieve = async function(){
    let stuff = null; 
    await mongoose.connect(constr, conparam);
    db.once("open", function() { //open connection
        console.log("Connected to server by mongoose")
    });

    stuff = await Country.find({}, null); //find data
    console.log(stuff);
}