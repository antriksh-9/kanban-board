import React from 'react'
import './tag.css'
import { BiSolidCircle } from "react-icons/bi";

const Tag = (props) => {
  return (
    <div className='tag'>
        <BiSolidCircle/>
        <p>{props.text}</p>
    </div>
  )
}

export default Tag