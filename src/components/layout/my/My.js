import React from "react";
import s from "./my.module.scss";
import {useSelector} from "react-redux";
import {BrowserRouter as Router, Route, Switch, Link, withRouter} from 'react-router-dom';
import {MyPosts} from "./MyPosts";
import {Favorites} from "./favorites";
import {MyItems} from "./MyItems";
import {Edit} from "../create__and__edit/Edit";
import {AdvViewContainer} from "../advView/AdvViewContainer";
import {useHistory} from 'react-router-dom';
import {FaRegComment} from "react-icons/fa";


export  const My =  withRouter(({match}) => {
    const isAuth = useSelector(state => state.auth.isAuth)
    const name = useSelector(state => state.auth.name)
    const history = useHistory()
    const { path, url } = match
    console.log(match)
    return (
        <Router>
            <div className={s.my}>
                <div className={s.container}>
                    {isAuth?
                    <div className={s.my__wrapper}>
                        <div className={s.my__side}>
                            <div className={s.profile}>
                                <div className={s.profile__wrapper}>
                                    <div className={s.profile__avatar}></div>
                                    <div className={s.profile__summary}>
                                        <div className={s.profile__id}>{name}</div>
                                    </div>
                                </div>
                            </div>
                            <ul className={s.list}>
                                <li className={s.list__item}>
                                    <Link className={s.list__link} to={`${url}/dialogs`} >
                                        <span className={s.list__icon}><FaRegComment /></span>
                                        <span>Мои сообщения</span>
                                    </Link>
                                </li>
                                <li className={s.list__item} >
                                    <div className={s.list__link} onClick={() => history.push('/favorites')}>
                                        <span className={s.list__icon}><FaRegComment /></span>
                                        <span>Избранное</span>
                                    </div>
                                </li>
                                <li className={s.list__item}>
                                    <div className={s.list__link} onClick={() => history.push('/my_items')}>
                                        <span className={s.list__icon}><FaRegComment /></span>
                                        <span>Мои объявления</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className={s.my__main}>
                            <Route exact path={`${path}/dialogs`} component={MyPosts}/>
                        </div>
                    </div>
                    :
                    <div><h3>Вы не авторизированы</h3></div>}
                </div>
            </div>
        </Router>
    )
})

