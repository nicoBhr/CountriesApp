const axios = require("axios");
const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

const getCountriesFromApi = async () => {
  try {
    let countriesFromApi = await axios.get("https://restcountries.com/v3/all")
      .data;
    countriesFromApi = await Promise.all(
      countriesFromApi.map((country) => {
        Country.findOrCreate({
          where: {
            id: country.cca3,
            name: country.name.common,
            flag: country.flag[1],
            continent: country.continents[0],
            capital: country.capital[0],
            Subregion: country.subregion,
            area: country.area,
            population: country.population,
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
    const countryId = await Country.findByPk(id.toUpperCase, {
      attributes: [
        "name",
        "flag",
        "continent",
        "capital",
        "Subregion",
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
  try {
    const { name } = req.query;
    if (name) {
      let countryFoundByName = await Country.findAll({
        attributes: [
          "name",
          "flag",
          "continent",
          "capital",
          "Subregion",
          "area",
          "population",
        ],
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
        include: Activity,
      });
      countryFoundByName
        ? res.send(countryFoundByName)
        : res.status(400).send("Country not found");
    } else {
      const allCountries = await Country.findAll({
        attributes: [
          "name",
          "flag",
          "continent",
          "capital",
          "Subregion",
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
