const { Activity, Country, user_twist } = require("../db");

const getAllActivitiesController = async (req, res) => {
  try {
    // Obtén todas las actividades con información de los países relacionados
    const activities = await Activity.findAll({
      include: [
        {
          model: Country,
          through: {
            model: user_twist,
            attributes: [] // Puedes especificar las columnas que deseas recuperar de user_twist
          },
        },
      ],
    });

    // Devuelve la lista de actividades con información de países
    res.status(200).json(activities);
  } catch (error) {
    console.error('Error al obtener actividades:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = getAllActivitiesController;