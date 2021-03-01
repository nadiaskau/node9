const mongoose = require("mongoose");

//Connection to mongodb server
const dbname = "world"; 
const constr = `mongodb://localhost:27017/${dbname}`;
const conparam = { useNewUrlParser: true, useUnifiedTopology: true };
const db = mongoose.connection;

exports.retrieve = async function(Model){
    let stuff = null; 
    await mongoose.connect(constr, conparam);
    db.once("open", function() { //open connection
        console.log("Connected to server by mongoose")
    });
    
    stuff = await Model.find({}); //find data
    console.log(stuff);
    db.close(); 
}