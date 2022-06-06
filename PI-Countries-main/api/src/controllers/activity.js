const { Country, Activity } = require("../db");

const createActivity = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  try {
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });
    countries.forEach(async (country) => {
      let countryActivity = await Country.findOne({
        where: {
          name: country,
        },
      });
      await newActivity.addCountry(countryActivity);
    });
    res.status(200).send("Activity created");
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {createActivity};