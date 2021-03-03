const mongoose = require("mongoose");
const goose = require("./mongooseWrap");
const model = require("./schemas");

exports.getCountries = async function (res) {
    try {
        let countries = await goose.retrieve(model.Country);
        res.render('country', {
            title: 'Fragments of the World',
            subtitle: 'Select Country',
            countries: countries
        });
    } catch (e) {
        console.log(e);
    }
};

exports.getCountry = async function (res, ctryname) {
    try {
        let countries = await goose.retrieve(model.Country, {
            "name": ctryname
        });
        res.render('countryDisplay', {
            title: 'Fragments of the World',
            subtitle: ctryname,
            countries: countries
        });
    } catch (e) {
        console.log(e);
    }
}

//Register new country
exports.getContinentsAndGovernment = async function (res, view, sub) {
    try {
        let con = await goose.retrieve(model.Continent); //get continents from that collection
        let gov = await goose.retrieve(model.Government); //get governtmentforms from that collection
        res.render(view, {
            title: 'Fragments of the World',
            subtitle: sub,
            continents: con,
            governs: gov
        });
    } catch (e) {
        console.log(e);
    }
}

exports.postCountry = async function (req, res) {
    let chk = {
        name: req.body.name
    }; //not sure if we can use it 
    let country = new model.Country({
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
    });

    if (req.body.localname === "") {
        country.localname = country.name;
    }
    try {
        await goose.upsert(country);
        res.redirect("/");
    } catch (e) {
        console.log(e);
    }
}

exports.getContinentLanguages = async function (res, continent) {
    try {
        let languages = await goose.retrieve(model.CountryLanguage);
        let countries = await goose.retrieve(model.Country, {
            "continent": continent
        }); //all countries in the chosen continent
        let spokenLang = [];
        let countLang = [];
        let allLang = [];

        for (const country of countries) { //iteration through found countries       
            for (const language of languages) { //iteration through all languages
                if (language.countrycode == country.code) {
                    allLang.push(language.language);
                } 
                if (language.countrycode == country.code&& !spokenLang.includes(language.language)) { //no duplicates
                    spokenLang.push(language.language);
                }
            }
        }

        for (let i = 0; i < spokenLang.length; i++) {
             let count = 0; 
             for (let y = 0; y < allLang.length; y++) {
                if(spokenLang[i] == allLang[y]){
                    count++; 
                }   
             }  
             countLang.push(count);          
        }
        console.log(countLang);

        res.render('continentDisplay', {
            title: 'Fragments of the World',
            subtitle: continent,
            languages: spokenLang,
        });
    } catch (e) {
        console.log(e);
    }
}