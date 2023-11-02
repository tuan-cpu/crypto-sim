import React from 'react';

//INTERNAL IMPORT
import Style from './Button.module.css';
interface ButtonProps{
  btnText: string,
  handleClick: ()=>void
}

const Button:React.FC<ButtonProps> = ({ btnText, handleClick }) => {
  return (
    <div className={Style.box}>
      <button className={Style.button} onClick={()=>handleClick()}>
        {btnText}
      </button>
    </div>
  )
}

export default Button