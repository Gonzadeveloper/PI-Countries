import './Card.css'

function CardActivities({ id, name, dificultad, duración, temporada, countries }) {
    return (
      <div>
        <div className='card'>
          <div className='sub_card'>
            <strong className='id_card'>{id}</strong>
            <h4 className='name'>Name: {name}</h4>
            <h4 className='campos'>Difficulty: {dificultad}</h4>
            <h4 className='campos'>Duration: {duración}</h4>
            <h4 className='campos'>Season: {temporada}</h4>
            
            {countries && countries.length > 0 && (
              <div>
                <h4 className='hp_card'>Countries:</h4>
                <ul>
                  {countries.map((country) => (
                    <li key={country.id}>
                      <div>
                        <p>{country.name}</p>
                        <img className='mini_img' src={country.image} alt={country.name} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  export default CardActivities;