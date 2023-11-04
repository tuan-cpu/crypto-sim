import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { TiArrowLeftThick, TiArrowRightThick } from 'react-icons/ti';

//INTERNAL IMPORT
import Style from './Slider.module.css';
import SliderCard from './SliderCard/SliderCard';

const Slider = () => {
  const controls = useAnimation();
  const sliderArray = [1,2,3,4,5,6];
  const [width, setWidth] = useState(0);
  const dragSlider = useRef<HTMLInputElement | null>(null);
  useEffect(()=>{
    if(dragSlider.current){
      setWidth(dragSlider.current.scrollWidth - dragSlider.current.offsetWidth);
    }
  },[])
  const handleScroll = (direction: string) => {
    const { current } = dragSlider;
    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;
    if (current) {
      const currentScrollLeft = current.scrollLeft;
      const newScrollLeft = direction === 'left' ? (currentScrollLeft < scrollAmount ? 0: currentScrollLeft - scrollAmount) : currentScrollLeft + scrollAmount;
      current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
      controls.start({ x: -newScrollLeft, transition: { type: 'tween', ease: 'easeInOut', duration: 0.8 } });
    }
  };
  return (
    <div className={Style.slider}>
      <div className={Style.slider_box}>
        <h2>Explore NFTs Video</h2>
        <div className={Style.slider_box_button}>
          <p>Click on play icon & enjoy NFTs Video</p>
          <div className={Style.slider_box_button_btn}>
            <div className={Style.slider_box_button_btn_icon} onClick={()=>handleScroll("left")}>
            <TiArrowLeftThick/>
            </div>
            <div className={Style.slider_box_button_btn_icon} onClick={()=>handleScroll("right")}>
            <TiArrowRightThick/>
            </div>
            
          </div>
        </div>
        <motion.div className={Style.slider_box_items} ref={dragSlider}>
          <motion.div ref={dragSlider} className={Style.slider_box_item}
          drag="x" dragConstraints={{right:0, left: -width}} animate={controls}>
            {sliderArray.map((element, index)=>(
              <SliderCard key={index+1} element={element} index={index}/>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Slider