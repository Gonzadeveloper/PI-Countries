// import React from 'react';
// import Card from '../card/Card';
// import './Layout.css';

// export default function Cards({
//   countriesData,
//   currentPage,
//   setCurrentPage,
//   countriesDataName,
// }) {
//   // Determina si countriesDataName está vacío
//   const isCountriesDataNameEmpty = countriesDataName.length === 0;

//   // Obtiene los resultados según el estado de countriesDataName
//   const results = isCountriesDataNameEmpty ? countriesData : countriesDataName;

//   const itemsPerPage = 10;
//   const totalPages = Math.ceil(results.length / itemsPerPage);


//   // Función para cambiar la página
//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // Calcular los números de página a mostrar
//   const visiblePages = [];
//   for (let i = Math.max(currentPage - 1, 1); i <= Math.min(currentPage + 1, totalPages); i++) {
//     visiblePages.push(i);
//   }

//   return (
//     <div>
//         <div className='card_content'>
//           {Array.isArray(results) && results.length > 0 ? (
//             results
//               .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
//               .map((country) => (
//                 <Card
//                   key={country.id}
//                   id={country.id}
//                   name={country.name}
//                   image={country.image}
//                   continents={country.continents}
//                 />
//               ))
//           ) : (
            
//             <Card
//               key={results.id}
//               id={results.id}
//               name={results.name}
//               image={results.image}
//               continents={results.continents}
//             />
//           )}
//         </div>

//       {/* Agrega botones de paginación con flechas */}
//       <div className='pagination'>
//         {currentPage > 1 && (
//           <>
//             <button onClick={() => paginate(1)}>{"<<"}</button>
//             <button onClick={() => paginate(currentPage - 1)}>{"<"}</button>
//           </>
//         )}

//         {visiblePages.map((page) => (
//           <button key={page} onClick={() => paginate(page)} className={page === currentPage ? 'active' : ''}>
//             {page}
//           </button>
//         ))}

//         {currentPage < totalPages && (
//           <>
//             <button onClick={() => paginate(currentPage + 1)}>{">"}</button>
//             <button onClick={() => paginate(totalPages)}>{">>"}</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import Card from '../card/Card';
import './Layout.css';

export default function Cards({
  countriesData,
  currentPage,
  setCurrentPage,
  countriesDataName,
  nameFilter,
}) {
  const [filteredCountriesData, setFilteredCountriesData] = useState([]);
  const [filter, setFilter] = useState('All');
  const [order, setOrder] = useState('ascendente');

  // Determina si countriesDataName está vacío
  const isCountriesDataNameEmpty = countriesDataName.length === 0;

  // Obtiene los resultados según el estado de countriesDataName
  const results = isCountriesDataNameEmpty ? countriesData : countriesDataName;

  useEffect(() => {
    filterAndOrderData();
  }, [countriesData, filter, order, isCountriesDataNameEmpty, nameFilter]);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleOrder = (e) => {
    setOrder(e.target.value);
  };


  const filterAndOrderData = () => {
    // Filtrar por continente
    let filteredData = results;
    if (filter !== 'All') {
      filteredData = results.filter((country) => country.continents === filter);
    }

    // Filtrar por nombre
    if (nameFilter.trim() !== '') {
      filteredData = filteredData.filter((country) =>
        country.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    // Asegúrate de que filteredData es un array antes de intentar ordenarlo
    if (Array.isArray(filteredData)) {
      // Ordenar según la opción seleccionada
      if (order === 'ascendente') {
        filteredData.sort((a, b) => a.name.localeCompare(b.name));
      } else if (order === 'descendente') {
        filteredData.sort((a, b) => b.name.localeCompare(a.name));
      }
    }

    setFilteredCountriesData(filteredData);
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredCountriesData.length / itemsPerPage);

  // Función para cambiar la página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calcular los números de página a mostrar
  const visiblePages = [];
  for (let i = Math.max(currentPage - 1, 1); i <= Math.min(currentPage + 1, totalPages); i++) {
    visiblePages.push(i);
  }

  return (
    <div className='container_p'>
      <div className='filters'>
        <select  className= 'select_left'name="filter" onChange={handleFilter} defaultValue="All">
          <option value="All">Mostrar todos</option>
          <option value="Africa">Africa</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="Asia">Asia</option>
          <option value="South America">South America</option>
          <option value="North America">North America</option>
        </select>

        <select className= 'select_rigth'name="order" onChange={handleOrder} defaultValue="orderChar">
          <option value="orderChar" disabled="disabled">
            order..
          </option>
          <option value="ascendente">Ascendente</option>
          <option value="descendente">Descendente</option>
        </select>
      </div>

      <div className="card_content">
        {countriesDataName.length > 0 ? (
          countriesDataName.map((country) => (
            <Card
              key={country.id}
              id={country.id}
              name={country.name}
              image={country.image}
              continents={country.continents}
            />
          ))
        ) : (
          filteredCountriesData
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((country) => (
              <Card
                key={country.id}
                id={country.id}
                name={country.name}
                image={country.image}
                continents={country.continents}
              />
            ))
        )}
      </div>

      {/* Agrega botones de paginación con flechas */}
      <div className="pagination">
        {currentPage > 1 && (
          <>
            <button onClick={() => paginate(1)}>{"<<"}</button>
            <button onClick={() => paginate(currentPage - 1)}>{"<"}</button>
          </>
        )}

        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={page === currentPage ? 'active' : ''}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages && (
          <>
            <button onClick={() => paginate(currentPage + 1)}>{">"}</button>
            <button onClick={() => paginate(totalPages)}>{">>"}</button>
          </>
        )}
      </div>
    </div>
  );
} 