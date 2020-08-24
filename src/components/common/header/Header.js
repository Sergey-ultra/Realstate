import React, {Fragment, useCallback, useState} from "react";
import s from './Header.module.scss';
import {Link, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../store/auth-reducer";
import {Button} from "@material-ui/core";
import {FiHeart, FiMessageCircle, FiUsers} from "react-icons/fi";
import {FaChevronLeft, FaSearch, FaEnvelopeOpen, FaDesktop, FaMobileAlt, FaThLarge, FaStreetView, FaSyncAlt, FaStar, FaRegArrowAltCircleLeft} from "react-icons/fa"
import logo from '../../../assets/images/ic_head_logo.svg'
import api from "../../../dataAccessLayer/firebase";
import {AuthForm} from "./auth/AuthForm";



export const Header = withRouter(({history}) => {

    const isAuth = useSelector(state => state.auth.isAuth)
    const name = useSelector(state => state.auth.name)
    const dispatch = useDispatch()
    const [mobileMenu, setMobileMenu] = useState(false)
    const [loginModal, setLoginModal] = useState(false)

    const openMobileMenu = useCallback(() =>  setMobileMenu(true))
    const closeMobileMenu = useCallback(() =>  setMobileMenu(false))
    const openAuthForm = useCallback(() =>  setLoginModal(true))
    const closeAuthForm = useCallback(() =>  setLoginModal(false))


    const logoutHandler = async () => {
        await api.logout()
        dispatch(logout())
        history.replace('/')
    }

    const logoutMobile = async () => {
        await logoutHandler()
        setMobileMenu(false)
    }


    return (
        <Fragment>
            {loginModal &&
            <Fragment>
                <div className={s.modal__blur}></div>
                <div className={s.login__modal}>
                    <main className={s.main}>
                        <div className={s.close__button} onClick={closeAuthForm}>
                            <div className={s.close__line}></div>
                            <div className={s.close__line}></div>
                        </div>
                         <AuthForm closeAuthForm={closeAuthForm}/>
                    </main>
                </div>
            </Fragment>
            }
            {mobileMenu &&
                <div className={s.mob}>
                    <div className={s.mob__top}>
                        <div className={s.back} onClick={closeMobileMenu}>
                            <FaChevronLeft/>
                        </div>
                        {isAuth
                            ?
                            <Link className={s.auth} to='/my' onClick={closeMobileMenu}>
                                <div className={s.auth__avatar}></div>
                                <div className={s.mob__item}>
                                    {name}
                                    <div className={s.auth__private}>Личный кабинет</div>
                                </div>
                            </Link>

                            :
                            <div className={s.auth} onClick={() => {
                                closeMobileMenu()
                                openAuthForm ()
                            }}>
                                <FaChevronLeft/>
                                <span className={s.mob__item}>Войти</span>
                            </div>
                        }

                    </div>

                    <ul className={s.mob__manipulation}>
                        <li><FaSearch/><span className ={s.mob__item}>Новый поиск </span></li>
                        <li>
                            <Link to={'/create'} onClick={closeMobileMenu}>
                                <FaEnvelopeOpen/>
                                <span className={s.mob__item}>Разместить объявление</span>
                            </Link>
                        </li>
                        <li onClick={() => {
                            history.push('/favorites')
                            closeMobileMenu()
                        }}>
                            <FaDesktop/><span className ={s.mob__item}>Избранное</span>
                        </li>
                        <li onClick={() => {
                            history.push('/my_items')
                            closeMobileMenu()
                        }}>
                            <FaMobileAlt/><span className ={s.mob__item}>Мои объявления</span>
                        </li>
                    </ul>

                    <ul className={s.mob__main}>
                        <li>
                            <Link to='/flat' onClick={closeMobileMenu}>
                                <FaThLarge/>
                                <span className={s.mob__item}>Продажа</span>
                            </Link>
                        </li>
                        <li><FaStreetView/><span className ={s.mob__item}>Аренда</span></li>
                        <li><FaSyncAlt/><span className ={s.mob__item}>Краткосрочная</span></li>
                        <li><FaStar/><span className ={s.mob__item}>Ипотека</span></li>
                    </ul>


                    {isAuth &&
                    <div className={s.mob__exit}>
                        <Link to='/' onClick={logoutMobile}>
                            <FaRegArrowAltCircleLeft/>
                            <span className={s.mob__item}>Выйти</span>
                        </Link>
                    </div>
                    }
                </div>
            }




            <header className={s.header}>
                <div className={s.container}>
                    <div className={s.header__row}>
                        <Link to='/'><img src={logo}/></Link>
                        <input className={s.header__search} type="text" placeholder="Поиск"/>

                        {isAuth
                            ?
                            <div className={s.header__right}>
                                <span className={s.header__item}><Link to='/my'>{`${name} Личный кабинет`}  </Link>
                                </span>
                                <span className={s.header__item} onClick={logoutHandler}><Link to='/'>Выйти</Link>
                                </span>

                            </div>
                            :
                            <div className={s.header__right + " " + s.header__exit} onClick={openAuthForm}>
                                    <FiUsers/><span className={s.header__item}>Вход и регистрация</span>
                            </div>
                        }
                    </div>
                    <div className={s.nav__mobile}>
                        <div className={s.burger_icon} onClick={openMobileMenu}>
                            <i className={s.close}></i>
                            <i className={s.close}></i>
                            <i className={s.close}></i>
                        </div>
                        <Link to='/'><img src={logo}/></Link>
                        <div className={s.mobile__icons}>
                            <div className={s.mobile__icon}>
                                <Link to='/favorites'><span><FiHeart/></span></Link>
                            </div>
                            <div className={s.mobile__icon}>
                                <Link to='/my/dialogs'><span><FiMessageCircle/></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <nav className={s.menu}>
                <div className={s.container}>
                    <div className={s.menu__wrapper}>
                        <ul className={s.menu__main}>
                            <li className={s.menu__link}>
                                <Link to='/flat'>Продажа</Link>
                            </li>
                            <li className={s.menu__link}>Аренда</li>
                            <li className={s.menu__link}>Краткосрочная</li>
                            <li className={s.menu__link}>Ипотека</li>
                        </ul>

                        <div className={s.menu__items}>
                            <div className={s.menu__item}>
                                <div className={s.menu__icon}>
                                    <Link to='/favorites'><span><FiHeart/></span></Link>
                                </div>
                                <div className={s.menu__icon}>
                                    <Link to='/my/dialogs'><span><FiMessageCircle/></span></Link>
                                </div>
                            </div>

                            <div className={s.menu__item + " " + s.menu__button}>
                                <Link to={'/create'}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                    >Новое объявление
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
})

