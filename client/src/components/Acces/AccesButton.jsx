import React from 'react';
import './AccesButton.css'

const AccessButton = ({ setAccess, navigate }) => {
  const handleAccess = () => {
    setAccess(true);
    navigate('/home');
  };

  return (
    <div className='container'>
      <h1>Welcome to PI Countries!</h1>
      
      <p>In this App you will be able to see all the countries in the world, and you will also be able to add activities to them. Enjoy your stay</p>
      
      <p>Press the button to access home:</p>
     
      <button className='buttonAcces' onClick={handleAccess}>Acces to Home</button>
    </div>
  );
};

export default AccessButton;