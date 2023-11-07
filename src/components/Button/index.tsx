import React from 'react';

//INTERNAL IMPORT
import Style from './Button.module.css';
interface ButtonProps{
  btnText: string,
  handleClick: ()=>void,
  icon: any,
  classStyle: any
}

const Button:React.FC<ButtonProps> = ({ btnText, handleClick, icon, classStyle }) => {
  return (
    <div className={Style.box}>
      <button type="button" className={`${Style.button}`+ ` ${classStyle}`} onClick={()=>handleClick()}>
        {icon} {btnText}
      </button>
    </div>
  )
}

export default Button