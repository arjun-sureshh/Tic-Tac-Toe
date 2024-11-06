import React, { useState } from 'react'
import Styles from '../../TicTacToe.module.css'

const Player = ({ type, className, name, onchange, value,placeholder,className_row}) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => {
    setIsEditing((previous) => !previous)
  }

  return (
    <div className={className_row}>
      <div >
        <input 
          type={type} 
          className={className} 
          value={value} 
          name={name} 
          placeholder={placeholder}
          onChange={onchange} 
          disabled={!isEditing}  // Disable input when not in editing mode
        />
      </div>
      <button className={Styles.button} onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
    </div>
  )
}

export default Player
