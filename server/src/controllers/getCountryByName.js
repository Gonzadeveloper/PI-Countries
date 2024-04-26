const { Country } = require("../db");
const { Op } = require("sequelize");

const getCountryByNameController = async (name) => {
  try {
    // Busca el país por nombre en la base de datos (insensible a mayúsculas y minúsculas)
    const country = await Country.findOne({
      where: { name: { [Op.iLike]: name } }, // Utiliza 'ilike' para una búsqueda insensible a mayúsculas y minúsculas
      attributes: ['id','officialName', 'name', 'image', 'continents', 'capital', 'subregion', 'area', 'population', 'maps', 'timezones'],
    });

    if (!country) {
      console.log(`No se encontró un país con el nombre ${name}`);
      return null; // O puedes lanzar un error si prefieres
    }

    // Retorna solo los campos deseados del país encontrado
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
    console.error('Error al obtener el país de la base de datos por nombre:', error);
    throw error;
  }
};

module.exports = getCountryByNameController;