const { Country } = require("../db");

const getCountryByIdController = async (id) => {
  try {
    // Busca el país por ID en la base de datos
    const country = await Country.findOne({
      where: { id: id },
      attributes: ['id', 'name','officialName', 'image', 'continents', 'capital', 'subregion', 'area', 'population', 'maps', 'timezones']
    });

    if (!country) {
      console.log(`No se encontró un país con el ID ${id}`);
      return null; // O puedes lanzar un error si prefieres
    }

    // Retorna el país encontrado
    console.log('País encontrado en la base de datos:', country);
    return {
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
      };
  } catch (error) {
    console.error('Error al obtener el país de la base de datos:', error);
    throw error;
  }
};

module.exports = getCountryByIdController;