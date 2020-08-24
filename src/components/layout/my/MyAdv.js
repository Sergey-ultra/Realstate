import React, {Fragment, useCallback, useState} from 'react'
import {Link, useHistory } from "react-router-dom"
import {Button} from "@material-ui/core"
import {FiTrash2, FiEdit2} from "react-icons/fi"
import {CardSlider} from "../../common/CardSlider/CardSlider"
import api from "../../../dataAccessLayer/firebase"

import s from './MyAdv.module.scss'


export const MyAdv = ({flat}) => {
    const [deleteModal, setDeleteModal] = useState(false)
    const [localPhone, setLocalPhone] = useState(true)
    const date = flat.date.toDate().toLocaleString("ru", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric'
    })

    const openLocalPhone =useCallback( () => {setLocalPhone(false)})
    const closeDeleteModal =useCallback( () => {setDeleteModal(false)})
    const openDeleteModal =useCallback( () => {setDeleteModal(true)})
    const deleteFlat =useCallback( () => {
        api.deleteAdv(flat.id)
        setDeleteModal(false)
    })

    return (
        <Fragment>
            {deleteModal &&
            <div>
                <div className="modal__created-blur"></div>
                <div className="modal__created-modal-warning">
                    <div className="created__modal-body">
                        <p>Вы уверены, что хотите удалить пользователя? Это действие необратимо!</p>
                    </div>

                    <div className="created__modal-bottom">
                        <button type="button" className="close__button" onClick={closeDeleteModal}>
                            Закрыть
                        </button>
                        <button type="button" className="delete__button" onClick={deleteFlat}>Удалить
                        </button>
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

                        <div className={s.flat__manip}>
                            <Link to={`/edit/${flat.id}`}>
                                <span className={s.flat__details}><FiEdit2/></span>
                            </Link>
                            <span className={s.flat__details} onClick={openDeleteModal}>
                                <FiTrash2/>
                            </span>
                        </div>
                    </div>

                    <div className={s.flat__info}>
                        <h5>{flat.address}</h5>
                    </div>

                    <div className={`${s.flat__info} ${s.flat__description}`}>
                        {flat.description.length >= 185
                            ? <div>
                                {flat.description.slice(0, 185)}

                                <Link to={'/flat/' + flat.id}>...Подробней</Link>
                            </div>
                            : `${flat.description}`}
                    </div>

                    <div className={`${s.flat__info} ${s.flat__bottom}`}>
                        {localPhone
                            ?
                            <Button
                                type="submit"
                                variant="contained"
                                color="default"
                                onClick={openLocalPhone}
                            >Показать телефон
                            </Button>
                            : <h4>{`+7 ${flat.phone}`}</h4>
                        }
                        <div className={s.flat__date}>{date}</div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

