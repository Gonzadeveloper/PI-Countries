// const { Activity } = require("../db");

// const createActivityController = async (req, res) => {
//   try {
//     // Extrae los datos del cuerpo de la solicitud
//     const { name, dificultad, duración, temporada } = req.body;

//     // Verifica si todos los campos necesarios están presentes
//     if (!name || !dificultad || !duración || !temporada) {
//       return res.status(400).json({ message: "Todos los campos son obligatorios." });
//     }

//     // Crea la actividad en la base de datos
//     const createdActivity = await Activity.create({
//       name,
//       dificultad,
//       duración,
//       temporada
//     });

//     // Devuelve la actividad recién creada
//     res.status(201).json(createdActivity);
//   } catch (error) {
//     console.error('Error al crear actividad:', error);
//     res.status(500).json({ message: 'Error interno del servidor' });
//   }
// };

// module.exports = createActivityController;

const { Activity, Country, user_twist } = require("../db");

const createActivityController = async (req, res) => {
  try {
    // Extrae los datos del cuerpo de la solicitud
    const { name, dificultad, duración, temporada, countries } = req.body;

    // Verifica si todos los campos necesarios están presentes
    if (!name || !dificultad || !duración || !temporada || !countries) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    // Crea la actividad en la base de datos
    const createdActivity = await Activity.create({
      name,
      dificultad,
      duración,
      temporada
    });

    // Relaciona la actividad con los países a través de la tabla intermedia
    if (countries.length > 0) {
      const countryInstances = await Country.findAll({
        where: { id: countries }
      });

      await createdActivity.addCountries(countryInstances, { through: user_twist });
    }

    // Devuelve la actividad recién creada
    res.status(201).json(createdActivity);
  } catch (error) {
    console.error('Error al crear actividad:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = createActivityController;