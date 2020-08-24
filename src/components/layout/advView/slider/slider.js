import React, {Fragment, useState} from "react";
import s from './slider.module.scss'
import leftArrow from "../../../../assets/slider-svg/left-arrow.svg";
import rightArrow from "../../../../assets/slider-svg/right-arrow.svg";
import { BsArrowsFullscreen } from "react-icons/bs"


export const Slider = ({imgUrl, name}) => {
    const [mainPhotoIndex, setMainPhotoIndex] = useState(0);
    const [position, setPosition] = useState(0);
    return (
        <Fragment>
            <div className={s.slider}>
                <div className={s.slider__container}>
                    <div className={s.left__slider}>
                        <img onClick={() => {
                            if (mainPhotoIndex > 0) {
                                setMainPhotoIndex(mainPhotoIndex - 1)
                            }
                        }} className={s.leftArrow} src={leftArrow} alt={"leftArrow"}/>
                    </div>
                    <img className={s.mainPhoto}
                         src={imgUrl[mainPhotoIndex] ? imgUrl[mainPhotoIndex] : null}
                         alt={name}/>
                    <div className={s.right__slider}>
                        <img onClick={() => {
                            if (mainPhotoIndex < imgUrl.length - 1) {
                                setMainPhotoIndex(mainPhotoIndex + 1)
                            }
                        }}
                             className={s.rightArrow} src={rightArrow} alt={"rightArrow"}/>
                    </div>
                    <div className={s.extender}>
                        <BsArrowsFullscreen/>
                    </div>
                </div>
                <div className={s.smallPhotos}>
                    {imgUrl
                        ? imgUrl.map((item, index) => {
                            return (
                                <div
                                    className={s.smallPhotos__item + " " + (index === mainPhotoIndex && s.smallPhotos__activeItem)}>
                                    <img src={item}
                                         alt="advPhotos"
                                         style={{left: `${position} px`}}
                                         onClick={() => {
                                             setPosition(110)
                                             setMainPhotoIndex(index)
                                         }}
                                    />
                                </div>
                            )
                            //}
                        })
                        : null}
                </div>
            </div>
        </Fragment>
    )
}
