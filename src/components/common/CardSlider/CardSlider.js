import React, {useState} from 'react'
import s from "./slider.module.scss";
import leftArrow from "../../../assets/slider-svg/left-arrow.svg";
import rightArrow from "../../../assets/slider-svg/right-arrow.svg";

export const CardSlider = ({imgUrl}) => {

    const [sliderIndex, setSliderIndex] = useState(0);

    const NextPhoto = () => {
        if(sliderIndex < imgUrl.length - 1) {
            setSliderIndex(sliderIndex + 1)
        }
    }
    const PrevPhoto = () => {
        if(sliderIndex> 0) {
            setSliderIndex(sliderIndex  - 1)
        }
    }

    return (
        <div className={s.sliderContainer}>
            <div className={s.arrow + " " + s.left__arrow}>
                <img onClick={PrevPhoto} className={s.left__icon} src={leftArrow} alt={"leftArrow"}/>
            </div>
            {imgUrl
                ?
                <img className={s.cardPhoto} src={imgUrl[sliderIndex]} alt={"Adv_avatar"}/>
                : null
            }
            <div className={s.arrow + " " + s.right__arrow}>
                <img onClick={NextPhoto} className={s.right__icon} src={rightArrow} alt={"rightArrow"}/>
            </div>
        </div>
    )
}