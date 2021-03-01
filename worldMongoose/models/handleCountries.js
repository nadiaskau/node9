"use strict";
const mon = require("./mongoWrap");
const dbServer = "localhost";
const dbName = "world";

//Used for selection of countries
exports.getCountries = async function (res) {
    try {
        let cs = await mon.retrieve(dbServer, dbName, "country", {});
        res.render('country', {
            title: 'Fragments of the World',
            subtitle: 'Select Country',
            countries: cs
        });
    } catch (e) {
        console.log(e);
    }
}

//Show selected contry
exports.getCountry = async function (res, ctryname) {
    try {
        let cs = await mon.retrieve(dbServer, dbName, "country", { "name": ctryname });
        res.render('countryDisplay', {
            title: 'Fragments of the World',
            subtitle: ctryname,
            countries: cs
        });
    } catch (e) {
        console.log(e);
    }
}

//Register new country
exports.getContinentsAndGovernment = async function (res) {
    try {
        let con = await mon.retrieve(dbServer, dbName, "continent", {}); //get continents from that collection
        let gov = await mon.retrieve(dbServer, dbName, "governmentform", {}); //get governtmentforms from that collection
        console.log(gov);
        res.render('countryData', {
            title: 'Fragments of the World',
            subtitle: 'Select Country',
            continents: con, 
            governs: gov
        });
    } catch (e) {
        console.log(e);
    }
}


exports.postCountry = async function (req, res, next) {
    let chk = { name: req.body.name };  // check object for existence
    let country = {                     // create obejct in db-format
        code: req.body.code,
        name: req.body.name,
        continent: req.body.continent,
        region: req.body.region,
        surfacearea: req.body.surfacearea,
        indepyear: req.body.indepyear,
        population: req.body.population,
        lifeexpectancy: req.body.lifeexpectancy,
        gnp: req.body.gnp,
        gnpold: req.body.gnpold,
        localname: req.body.localname,
        governmentform: req.body.governmentform,
        headofstate: req.body.headofstate,
        capital: null,
        code2: req.body.code2
    };
    if (req.body.localname === "") country.localname = country.name;
    console.log(req.body);
    try {
        let cs = await mon.upsert(dbServer, dbName, "country", country, chk);
        res.redirect("/");
    } catch (e) {
        console.log(e);
    }
}