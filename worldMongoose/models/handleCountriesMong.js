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

        //Finding languages 
        for (const country of countries) { //iteration through found countries       
            for (const language of languages) { //iteration through all languages
                if (language.countrycode == country.code) {
                    allLang.push(language.language); //creating array with all occurenses 
                }
                if (language.countrycode == country.code && !spokenLang.includes(language.language)) { //no duplicates
                    spokenLang.push(language.language);
                }
            }
        }

        //Counting our languages
        for (let i = 0; i < spokenLang.length; i++) {
            let count = 0;
            for (let y = 0; y < allLang.length; y++) {
                if (spokenLang[i] == allLang[y]) {
                    count++;
                }
            }
            countLang.push(count);
        }

        res.render('continentDisplay', {
            title: 'Fragments of the World',
            subtitle: continent,
            languages: spokenLang,
            counts: countLang
        });
    } catch (e) {
        console.log(e);
    }
}

//ALL LANGUAGES AND COUNT OF THEM
exports.getLanguages = async function (res) {
    try {
        let query = 'language';
        let languages = await goose.retrieveDistinct(model.CountryLanguage, query);
        let count = languages.length;

        res.render('languages', {
            title: 'Fragments of the World',
            languages: languages,
            count: count
        });
    } catch (e) {
        console.log(e);
    }
}

//DROP DOWN FOR LANGUAGES
exports.getLanguageSelection = async function (res) {
    try {
        let query = 'language';
        let languages = await goose.retrieveDistinct(model.CountryLanguage, query);

        res.render('language', {
            title: 'Fragments of the World',
            languages: languages,
        });
    } catch (e) {
        console.log(e);
    }
}

//RANKING OF LANGUAGES
exports.getLanguageRank = async function (res, language) {
    let QUERY = {
        language: language
    };
    let rank = await goose.retrieve(model.CountryLanguage, QUERY);

    res.render('languageDisplay', {
        title: 'Fragments of the World',
        language: language,
        rank: rank.length
    });
}

//GROUPED COUNTRIES PR CONTINENT
exports.countriesPrContinent = async function (res) {
    let SORT = {
        sort: {
            continent: -1
        }
    }
    let countries = await goose.retrieveAndSort(model.Country, SORT);
    let con = await goose.retrieve(model.Continent); //get continents from that collection
    let conArr = [];

    function Continent(name) {
        this.name = name;
        this.countries = [];
    }

    for (let i = 0; i < con.length; i++) {
        conArr.push(new Continent(con[i].name));
        for (let y = 0; y < countries.length; y++) {
            if (conArr[i].name == countries[y].continent) {
                conArr[i].countries.push(countries[y].name);
            }
        }
    }

    res.render('countriesSorted', {
        title: 'Fragments of the World',
        continents: conArr
    });
}

exports.getCityNamesakes = async function (res) {
    try {
        let cities = await goose.retrieve(model.City);
        let citiesCompare = cities.slice();
        let count=[];
        
/*         for (const city of cities) {
            let counter = 0; 
            
            for (const cityCompare of citiesCompare){
                if(city.name == cityCompare.name && city.countrycode !== cityCompare.countrycode){
                    counter++;
                    console.log(counter);
                }
                count.push(counter);
            }
        }
        console.log(count); */
  

        res.render('cities', {
            title: 'Fragments of the World',
        });
    } catch (e) {
        console.log(e);
    }
}