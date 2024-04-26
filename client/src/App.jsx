import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Nav from './components/nav/Nav.jsx';
import LayoutHome from './components/layout/Layout.jsx';
import AccessButton from './components/Acces/AccesButton.jsx';
import Error404 from './components/error404/Error404.jsx'
import Detail from './components/detail/Detail.jsx';
import { Form }  from'./components/AtivitiForm/AtivitiForm.jsx'

function App() {

  const { pathname } = useLocation()
  const [access, setAccess] = useState(false)
  const [countriesData, setCountriesData] = useState([]);
  const [countriesDataName, setCountriesDataName] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  
  const handleNameFilter = (e) => {
    setNameFilter(e.target.value);
  };


  useEffect(() => {
    
    const URL = 'http://localhost:3001/countries/All';

    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        setCountriesData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Llama a la función sin invocarla para evitar el bucle infinito

  }, []); // Agrega un array vacío como dependencia para que se ejecute solo una vez


    const navigate = useNavigate()


   return (
      <div className='App'>
         { pathname !== '/' && <Nav nameFilter={nameFilter} handleNameFilter={handleNameFilter}/> }  
         <Routes>
            <Route path="/" element={<AccessButton setAccess={setAccess} navigate={navigate} />} />
            <Route path='/home' element={<LayoutHome nameFilter={nameFilter} handleNameFilter={handleNameFilter} countriesData={countriesData} currentPage={currentPage} setCurrentPage={setCurrentPage} countriesDataName={countriesDataName}/>}/>
            <Route path="/detail/:id" element={<Detail />} /> 
            <Route path="*" element={<Error404 />} /> 
            <Route path='/AtivitiForm' element= {<Form/>}/>
         </Routes>
      </div>
   );
}

export default App;

