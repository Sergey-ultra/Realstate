import React, {useState} from 'react'
import s from "./Tooltips.module.scss"
import {FaChevronDown} from "react-icons/fa";

export const Tooltips = ({options, selected, setSelected}) => {
    const [showSelect, setShowSelect] = useState(false)
    return(
        <div
            className={s.select__field}
            onClick={() => setShowSelect(!showSelect)}
            id="rooms">
            {selected}
            <span className={s.arrow /*+ " " + showSelect ? s.arrow__down : s.arrow__up*/}>
                                    <FaChevronDown/>
                                </span>
            <div className={s.selected}
                 style={{display: showSelect ? "block" : "none"}}>
                <ul className={s.selected__list}>
                    {options.map((option, index) =>
                        <li
                            key={index}
                            onClick={() => setSelected(option)}
                            className={s.selected__item}>
                            {option}
                        </li>
                    )}
                </ul>
            </div>
        </div>

    )
}