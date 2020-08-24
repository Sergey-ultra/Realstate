import React, {useState, useEffect, useCallback} from 'react'
import {useSelector} from "react-redux"
import s from './AdvContainer.module.scss'
import {Preloader} from "../../common/preloader/preloader";
import {Adv} from './adv';
import api from "../../../dataAccessLayer/firebase";


export const AdvContainer = () => {
    const userId = useSelector(state => state.auth.userId)
    const isAuth = useSelector(state => state.auth.isAuth)
    const [flats, setFlats] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    const fetchAdv = useCallback(() => {
        api.getAdv(flats => {
            setFlats(flats)
            setIsLoading(false)
        })
    })
    useEffect(() => {
        fetchAdv()
    }, [])

    if (isLoading) {
        return <Preloader/>
    }
    return (
        <div className={s.flats}>
            <div className={s.container}>
                <div className={s.flats__title}>Продажа</div>
                <div className={s.flats__content}>
                    {flats.map((flat, index) => {
                            return (
                                <Adv
                                    key={index}
                                    flat={flat}
                                    userId={userId}
                                    isAuth={isAuth}
                                />
                            )
                        }
                    )}
                </div>
            </div>
        </div>
    )
}









