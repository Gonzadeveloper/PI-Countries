import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postActivities } from "../../redux/actions/actions";
import axios from 'axios'
import CardActivities from "../card/CardActivities";
import './AtivitiForm.css'



export const Form = () => {
    const dispatch = useDispatch();
  
    const validate = (input) => {
      let errors = {};
      if (!input.name) {
        errors.name = "El name es obligatorio";
      }
  
      return errors;
    };
  
    const [data, setData] = useState({
      name: "",
      dificultad: "",
      duración: "",
      temporada: "",
      countries: [],
    });
  
    const [errors, setErrors] = useState({});
  
    const handleInputChange = (e) => {
      if (e.target.name !== "name" && e.target.name !== "types") {
        setData({
          ...data,
          [e.target.name]: Number(e.target.value) <= 0 ? 0 : e.target.value,
        });
      } else {
        setErrors(
          validate({
            ...data,
            [e.target.name]: e.target.value,
          })
        );
        if (e.target.name === "types") {
          const typesArray = e.target.value.split(',').map((type) => type.trim());
          setData({
            ...data,
            [e.target.name]: typesArray,
          });
        } else {
          setData({
            ...data,
            [e.target.name]: e.target.value,
          });
        }
      }
    };
  
    const submit = async (e) => {
      e.preventDefault();
      try {
        const crear = await fetch("http://localhost:3001/countries/postActivities", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        dispatch(postActivities());
        const respuesta = await crear.json();
        console.log(respuesta);
  

        alert("La actividad ah sido creada exitosamente, lo podras ver aqui ");
  
        setData({
          name: "",
          dificultad: "",
          duración: "",
          temporada: "",
          countries: [],
        });
      } catch (error) {
        console.error("Error al crear la actividad:", error);
  
        alert("Hubo un problema al crear la actividad");
      }
    }

    const [activitiesData, setActivitiesData] = useState([]);
    
    useEffect(() => {
    
      const URL = 'http://localhost:3001/countries/activities';
  
      const fetchData = async () => {
        try {
          const response = await axios.get(URL);
          setActivitiesData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData(); // Llama a la función sin invocarla para evitar el bucle infinito
  
    }, []);
    
    ;
  
    return (
      <div >
        <form className="estilo_form" action="POST"  onSubmit={submit}>
          <div  >
            <h1>Create yours activities</h1>
            <h1>You can relate it to one or more countries!</h1>
            <p>
              <label>Name of activity</label>
              <input
                type="text"
                placeholder="  Name.."
                name="name"
                value={data.name}
                onChange={handleInputChange}
                required
              />
            </p>
            <p>
              <label>Difficulty</label>
              <input
                type="text"
                name="dificultad"
                placeholder="  difficulty"
                value={data.dificultad}
                onChange={handleInputChange}
              />
            </p>
            <p >
              <label>Duration</label>
              <input
                type="text"
                name="duración"
                placeholder="  duration"
                value={data.duración}
                onChange={handleInputChange}
              />
            </p>
            <p >
              <label>Season</label>
              <input
                type="text"
                name="temporada"
                placeholder="  season"
                value={data.temporada}
                onChange={handleInputChange}
              />
            </p>
            <p >
              <label>Countries</label>
              <input
                type="text"
                name="countries"
                placeholder="  ID of countries"
                value={data.countries}
                onChange={handleInputChange}
              />
            </p>
          </div>
          
          <div className="container_button">
              <input type="submit" value="Create" />
          </div>
        </form>

        <div className="container_h1">
          <h1>This is yours activities</h1>
        </div>

        <div className="card_content">
          {activitiesData.map((activity) => (
              <CardActivities
                key={activity.id}
                id={activity.id}
                name={activity.name}
                dificultad={activity.dificultad}
                duración={activity.duración}
                temporada={activity.temporada}
                countries={activity.Countries}
              />
          )
          )}
        </div>
      </div>
    );
  };

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getPokemons } from "../../redux/actions/actions";

// export const Form = () => {
//   const dispatch = useDispatch();
//   const countries = useSelector((state) => state.countries); // Asumiendo que tienes un reducer llamado 'countries' en tu estado Redux

//   const validate = (input) => {
//     let errors = {};
//     if (!input.name) {
//       errors.name = "El nombre es obligatorio";
//     }

//     return errors;
//   };

//   const [data, setData] = useState({
//     name: "",
//     dificultad: "",
//     duración: "",
//     temporada: "",
//     countries: [],
//   });

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     dispatch(getPokemons());
//   }, [dispatch]);

//   const handleInputChange = (e) => {
//     if (e.target.name !== "name" && e.target.name !== "types") {
//       setData({
//         ...data,
//         [e.target.name]: Number(e.target.value) <= 0 ? 0 : e.target.value,
//       });
//     } else {
//       setErrors(
//         validate({
//           ...data,
//           [e.target.name]: e.target.value,
//         })
//       );
//       if (e.target.name === "types") {
//         const typesArray = e.target.value.split(",").map((type) => type.trim());
//         setData({
//           ...data,
//           [e.target.name]: typesArray,
//         });
//       } else {
//         setData({
//           ...data,
//           [e.target.name]: e.target.value,
//         });
//       }
//     }
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const crear = await fetch("http://localhost:3001/countries/postActivities", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
//       dispatch(getPokemons());
//       const respuesta = await crear.json();
//       console.log(respuesta);

//       alert("La actividad ha sido creada exitosamente. La podrás ver en el detalle del país.");

//       setData({
//         name: "",
//         dificultad: "",
//         duración: "",
//         temporada: "",
//         countries: [],
//       });
//     } catch (error) {
//       console.error("Error al crear la actividad:", error);

//       alert("Hubo un problema al crear la actividad");
//     }
//   };

//   return (
//     <div>
//       <form action="POST" onSubmit={submit}>
//         <div>
//           <h1>Crea tu propia Actividad</h1>
//           <h1>Puedes relacionarla con uno o muchos países</h1>
//           <p>
//             <label>Nombre de la actividad</label>
//             <input
//               type="text"
//               placeholder="Nombre.."
//               name="name"
//               value={data.name}
//               onChange={handleInputChange}
//               required
//             />
//             {errors.name && <p>{errors.name}</p>}
//           </p>
//           <p>
//             <label>Dificultad</label>
//             <input
//               type="text"
//               name="dificultad"
//               value={data.dificultad}
//               onChange={handleInputChange}
//             />
//           </p>
//           <p>
//             <label>Duración</label>
//             <input
//               type="text"
//               name="duración"
//               value={data.duración}
//               onChange={handleInputChange}
//             />
//           </p>
//           <p>
//             <label>Temporada</label>
//             <input
//               type="text"
//               name="temporada"
//               value={data.temporada}
//               onChange={handleInputChange}
//             />
//           </p>
//           <p>
//             <label>Países</label>
//             <select
//               name="countries"
//               value={data.countries}
//               onChange={handleInputChange}
//               multiple
//             >
//               {countries.map((country) => (
//                 <option key={country.id} value={country.id}>
//                   {country.name}
//                 </option>
//               ))}
//             </select>
//           </p>
//         </div>

//         <div>
//           <input type="submit" value="Crear" />
//         </div>
//       </form>
//     </div>
//   );
// };