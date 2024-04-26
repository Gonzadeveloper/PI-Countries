import axios from "axios"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import './Detail.css'

function Detail(){
    const { id } = useParams()
      const [countriesData, setCountriesData] = useState([]);

    useEffect(() => {

        const countrieId = id.slice(1);

        axios(`http://localhost:3001/countries/id/${countrieId}`)
        .then(({ data }) => setCountriesData(data)
        )
          return setCountriesData({});
     },[id]);                                     
    
    
    return <div className="card_content">
        {
            countriesData ? (
                <div className="container_detail"> 
                    <h1>Details of contries</h1>
                    <h2>Id:{countriesData.id}</h2>
                    <h2>Name: {countriesData.name}</h2>
                    <h4>continents: {countriesData.continents}</h4>
                    <h4>capital: {countriesData.capital}</h4>
                    <h4>subregion: {countriesData.subregion}</h4>
                    <h4>area: {countriesData.area}</h4>
                    <h4>population: {countriesData.population}</h4>
                    <img src={countriesData.image} alt={countriesData.name} />
                </div>
            ) : ''

        
        }
    </div>
}

export default Detail;