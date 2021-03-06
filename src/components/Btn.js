import React from 'react'
import { CSVLink } from "react-csv";
import '../sass/btn.scss'
function Btn({icon,text,active,handleClick}) {
  return (
    <div className='btn' style={!active?{marginLeft: '10px',borderRadius: '8px'}:{marginLeft: '24px',backgroundColor: '#FF993C',color: '#FFFFFF',borderRadius: '8px'}} onClick={handleClick}>
        <div className='btn__container'>
            {
                icon&&<img src={icon}></img>
            }
            <span>
                {text}
            </span>
        </div>
    </div>
  )
}

export default Btn