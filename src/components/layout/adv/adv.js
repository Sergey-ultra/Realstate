import React, {Fragment, useCallback, useEffect, useState} from 'react'
import {Link} from "react-router-dom"
import s from './adv.module.scss'
import {Button} from "@material-ui/core"
import {FaRegHeart, FaHeart} from "react-icons/fa"
import {CardSlider} from "../../common/CardSlider/CardSlider"
import api from "../../../dataAccessLayer/firebase"


export const Adv = ({flat, userId, isAuth}) => {
    const [openToFavorite, setOpenToFavorite] = useState(false)
    const [localPhone, setLocalPhone] = useState(true)
    const [followedByUserId, setFollowedByUserId] = useState(false)

    const date = flat.date.toDate().toLocaleString("ru", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric'
    })

    const isFollowedByUserId = useCallback(async () => {
        const isFollowed = await api.isFollowedFlatIdByUserId(flat.id, userId)
        setFollowedByUserId(isFollowed)
    })

    useEffect(() => {
        isFollowedByUserId()
    }, [])

    const openLocalPhone = useCallback(() => {setLocalPhone(false)})
    const closeWindowToFavorite = useCallback(() => {setOpenToFavorite(false)})
    const toggleFavorites = useCallback(() => {
        if (followedByUserId) {
            api.removeFromFavoriteById(flat.id, userId)
            setFollowedByUserId(false)
        } else {
            api.addFavoritesById(userId, flat.id)
            setFollowedByUserId(true)
        }
    })

    return (
        <Fragment>
            {openToFavorite &&
            <div>
                <div className="modal__created-blur"></div>
                <div className="modal__created-modal-warning">
                    <div className="created__modal-body">
                        <p>Добавлено в избранное</p>
                    </div>

                    <div className="created__modal-bottom">

                        <div className="close__button" onClick={closeWindowToFavorite}>
                            Закрыть
                        </div>
                    </div>
                </div>
            </div>
            }
            <div className={s.flat}>
                <div className ={s.flat__slider}>
                    <CardSlider  imgUrl={flat.imgUrl}/>
                </div>

                <div className={s.flat__main}>
                    <div className={s.flat__info}>
                        <div className={s.flat__infoWrapper}>
                            <Link to={'/flat/' + flat.id}>
                                {`${flat.rooms} комн. квартира ${flat.square} м2 ${flat.floor} этаж`}
                            </Link>
                            <div>{`${flat.price} руб`}
                                <div className={s.flat__pricePerSquare}>
                                    {isNaN(flat.price / flat.square) === false ? `${Math.round(flat.price / flat.square)} руб/м2` : null}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`${s.flat__info} ${s.flat__address}`}>{flat.address}</div>

                    <div className={`${s.flat__info} ${s.flat__description}`}>
                        {flat.description.length >= 185
                            ? <Fragment>
                                <div className={s.flat__description__text}>{`${flat.description.slice(0,185)}...`}</div>
                                <Link to={'/adv/' + flat.id}>Подробней</Link>
                            </Fragment>
                            : `${flat.description}`}
                    </div>

                    <div className={`${s.flat__info} ${s.flat__bottom}`}>
                            {localPhone
                                ?
                                <div className={s.flat__manip}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="default"
                                        onClick={openLocalPhone}
                                    >Показать телефон
                                    </Button>
                                </div>
                                : <h4>{`+7 ${flat.phone}`}</h4>
                            }
                            {isAuth &&
                            <div className={s.flat__manip}>
                                <Button
                                    className={s.favorite__button}
                                    type="submit"
                                    variant="contained"
                                    color="default"
                                    onClick={toggleFavorites}>

                                    {followedByUserId ?
                                        <div>  <FaHeart className={s.red__heart}/> <span>В избранном</span></div>
                                        : <div><FaRegHeart/> <span>В избранное</span></div>}
                                </Button>
                            </div>
                            }
                        <div className={s.flat__date}>{date}</div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

