const axios = require("axios");
const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

const getCountriesFromApi = async () => {
  try {
    let countriesFromApi = await axios.get("https://restcountries.com/v3/all");
    countriesFromApi = await Promise.all(
      countriesFromApi.data.map((country) => {
        Country.findOrCreate({
          where: {
            id: country.cca3,
            name: country.name.common,
            flag: country.flags[1],
            continent: country.continents[0],
            capital: country.capital ? country.capital[0] : "Not found",
            subregion: country.subregion ? country.subregion : "Not found",
            area: country.area ? country.area : 0,
            population: country.population ? country.population : 0,
          },
        });
      })
    );
    return "Countries added successfully";
  } catch (error) {
    console.log(error);
  }
};

const getCountriesById = async (req, res) => {
  try {
    const { id } = req.params;
    let countryId = await Country.findByPk(id.toUpperCase(), {
      attributes: [
        "name",
        "flag",
        "continent",
        "capital",
        "subregion",
        "area",
        "population",
      ],
      include: Activity,
    });
    countryId ? res.send(countryId) : res.status(400).send("Country not found");
  } catch (error) {
    console.log(error);
  }
};

const getCountriesByName = async (req, res) => {
  await getCountriesFromApi();
  try {
    const { name } = req.query;
    if (name) {
      let countryFoundByName = await Country.findAll({
        attributes: [
          "name",
          "flag",
          "continent",
          "capital",
          "subregion",
          "area",
          "population",
        ],
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: Activity,
      });
      countryFoundByName.length > 0
        ? res.status(200).send(countryFoundByName)
        : res.status(404).send("Country not found");
    } else {
      const allCountries = await Country.findAll({
        attributes: [
          "id",
          "name",
          "flag",
          "continent",
          "capital",
          "subregion",
          "area",
          "population",
        ],
        include: Activity,
      });
      res.status(200).send(allCountries);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCountriesByName,
  getCountriesById,
};
