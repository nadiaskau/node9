const mongoose = require("mongoose");
const {
    CountryLanguage
} = require("./schemas");

//Connection to mongodb server
const dbname = "world";
const constr = `mongodb://localhost:27017/${dbname}`;
const conparam = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
const db = mongoose.connection;

exports.retrieve = async function (Model, query) {
    let stuff = null;
    await mongoose.connect(constr, conparam);
    db.once("open", function () { //open connection
        console.log("Connected to server by mongoose")
    });

    try {
        stuff = await Model.find(query); //find data

    } catch (err) {
        console.log(err);
    } finally {
        console.log("Found stuff with mongoose girl");
        db.close();
        return stuff;
    }
}

exports.count = async function (Model, query) {
    await mongoose.connect(constr, conparam);
    db.once("open", function () { //open connection
        console.log("Connected to server by mongoose")
    });

    db.items.aggregate([ 
        // unwind binding collection
        { $unwind : "$countryLanguage" }, 
      
        // group and count by relevant attributes
        { 
          $group : { 
            _id : { 
              status: "$language", 
              delivery_date: "$countrycode"
            }, 
            count: { $sum: 1 }
          } 
        }, 
      
        // get proper counts
        { 
          $match : { 
            "_id.status" : "Arabic",
            "_id.delivery_date" : "15-03-2016"
          }
        } 
      ], function(err, docs) {
        // ...
      });
}


exports.count = async function (Model, query) {
    await mongoose.connect(constr, conparam);
    db.once("open", function () { //open connection
        console.log("Connected to server by mongoose")
    });

    await Model.countDocuments(query, function (err, count) {
        if (err) {
            console.log(err)
        } else {
            console.log("Count is", count)
            db.close();
            return count;
        }
    });
}

exports.upsert = async function (obj) {
    await mongoose.connect(constr, conparam);
    db.once("open", function () { //open connection
        console.log("Connected to server by mongoose")
    });

    try {
        await obj.save();
        console.log("Saved to db!");
        db.close();
    } catch (e) {
        console.log(e);
    }
}