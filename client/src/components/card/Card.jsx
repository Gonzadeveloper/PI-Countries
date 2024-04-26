import { Link } from "react-router-dom";
import './Card.css'

function Card({id,name, officialName, image, continents, capital, subregion, area, population, maps, timezones}) {
   

    return (
      <div >
         <div className='card'>
            <img className='img_poke' src={image} alt='' />
            <div className='sub_card'>
               <strong className='id_card'>{id}</strong>
               <h4 className='hp_card'>Continents: {continents}</h4>
               <Link to={`/detail/:${id}`}>
                  <button className='name_card'>{name}</button>
               </Link>

            </div>
         </div>
      </div>
   );
}



export default (Card);