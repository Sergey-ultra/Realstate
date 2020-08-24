import React from 'react'
import s from './main.module.scss'
import {NavLink} from "react-router-dom";

export const Main = () => {
    return (
        <div className={s.main}>
            <div className={s.overlay}></div>
            <div className={s.container}>
                <div className={s.main__wrapper}>
                    <div className={s.main__title}>Аренда недвижимости на Банан</div>
                    <ul className={s.list}>
                        <li className={s.list__element}>
                            <NavLink to='/'>Продажа</NavLink>
                        </li>
                        <li className={s.list__element}>
                            <NavLink to='/'>Снять</NavLink>
                        </li>
                        <li className={s.list__element}>
                            <NavLink to='/'>Посуточно</NavLink>
                        </li>
                        <li className={s.list__element}>
                            <NavLink to='/'>Оценить</NavLink>
                        </li>
                        <li className={s.list__element}>
                            <NavLink to='/'>Ипотека</NavLink>
                        </li>
                    </ul>
                    <div className={s.filter}>
                        <div className={s.filter__item}>
                            <button className={s.filter__button} title='Квартиру в новостройке и вторичке'>
                                Квартиру в новостройке и вторичке
                            </button>
                        </div>
                    </div>
                    <div className={s.search__buttons}>
                        <div className={s.search__button}>
                            <NavLink className={s.button + " " + s.light__button} to='flat'>Показать на карте</NavLink>
                        </div>
                        <div className={s.search__button}>
                            <NavLink className={s.button} to='flat'>Поиск</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}