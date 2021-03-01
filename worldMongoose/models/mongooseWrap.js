const mongoose = require("mongoose");

//Connection to mongodb server
const dbname = "world"; 
const constr = `mongodb://localhost:27017/${dbname}`;
const conparam = { useNewUrlParser: true, useUnifiedTopology: true };
const db = mongoose.connection;

exports.retrieve = async function(Model, query){
    let stuff = null; 
    await mongoose.connect(constr, conparam);
    db.once("open", function() { //open connection
        console.log("Connected to server by mongoose")
    });
    
    try {
        stuff = await Model.find(query); //find data
    } catch(err) {
        console.log(err);
    } finally {
        console.log("Found stuff with mongoose girl");
        db.close(); 
        return stuff; 
    }
}

exports.upsert = async function(obj){
    await mongoose.connect(constr, conparam);
    db.once("open", function() { //open connection
        console.log("Connected to server by mongoose")
    });

    try{
        obj.save();
    } catch(e) {
        console.log(e);
    }
}