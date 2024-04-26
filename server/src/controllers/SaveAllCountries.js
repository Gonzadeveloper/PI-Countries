const axios = require('axios');
const { Country } = require("../db");

const saveCountriesController = async () => {
  try {
    // Realiza la solicitud HTTP a la API local
    console.log('Haciendo solicitud HTTP...');
    const response = await axios.get('http://localhost:5000/countries');

    // Filtra y guarda la información deseada de cada país
    const countriesData = response.data.map(country => ({
      id: country.cca3 || 'No data id',
      name: country.name.common || "No data comes from the API about the common name ⛔",
      officialName: country.name.official || "No data comes from the API about the common name ⛔",
      image: country.flags.png || "No data comes from the API about flags in SVG ⛔",
      continents: country.continents[0] || "No continents found ⛔",
      capital: country.capital || "This country looks like without a capital ⛔",
      subregion: country.subregion || "No subregion found ⛔",
      area: country.area || "This country does not have lands ⛔",
      population: country.population || "No data comes from the API about population ⛔",
      maps: country.maps.googleMaps || "You'll never find it on maps ⛔",
      timezones: country.timezones || "No data comes from the API about time zone ⛔",
    }));

    // Verifica si los países ya existen en la base de datos
    const existingCountries = await Country.findAll({
      where: {
        id: countriesData.map(country => country.id),
      },
    });

    // Decide qué países son nuevos y cuáles ya existen
    const newCountries = countriesData.filter(country =>
      !existingCountries.some(existingCountry => existingCountry.id === country.id)
    );

    // Guarda solo los países nuevos en la base de datos utilizando Sequelize
    if (newCountries.length > 0) {
      console.log('Guardando nuevos países en la base de datos...');
      const savedCountries = await Country.bulkCreate(newCountries);
      console.log('Países guardados en la base de datos:', savedCountries);
      return savedCountries;
    } else {
      console.log('No hay nuevos países para guardar en la base de datos.');
      return existingCountries;
    }
  } catch (error) {
    console.error('Error al obtener los datos de la API o al guardar en la base de datos:', error);
    throw error;
  }
};

module.exports = saveCountriesController;
