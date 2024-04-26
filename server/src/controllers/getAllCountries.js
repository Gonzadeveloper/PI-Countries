const { Country } = require("../db");

const getAllCountriesController = async () => {
  try {
    const countries = await Country.findAll({
      attributes: ['id','name', 'officialName', 'image', 'continents', 'capital', 'subregion', 'area', 'population', 'maps', 'timezones'],
      raw: true
    });

    const modifiedCountries = countries.map(country => ({
      id: country.id,
      name: country.name,
      officialName: country.officialName,
      image: country.image,
      continents: country.continents,
      capital: country.capital.slice(1, -1),
      subregion: country.subregion,
      area: country.area,
      population: country.population,
      maps: country.maps,
      timezones: country.timezones.slice(1, -1)
    }));

    return modifiedCountries;
  } catch (error) {
    console.error('Error al obtener todos los países:', error);
    throw error;
  }
};

module.exports = getAllCountriesController;