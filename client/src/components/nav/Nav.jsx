import React from "react"
import { Link } from 'react-router-dom'
import logo from '../../assets/pokemon.png'
import './Nav.css'

export default function Nav({nameFilter,
    handleNameFilter}){
    
    return <div className="header">
        <div className="div_header">
            <Link to='/Home'>
            <div className="div_logo">
                <button> 
                <img src={logo} alt="logo" />
                </button>
            </div>
            </Link>
        </div>
        <div className="div_Buttons">
            <Link to='/Home'>
            <button>Home</button>
            </Link>
            <Link to='/AtivitiForm'>
            <button>Create</button>
            </Link>
            <div>
            </div>
                <input
                    type="text"
                    placeholder="  Search by name"
                    value={nameFilter}
                    onChange={handleNameFilter}
            />
        </div>        
    </div>
}


