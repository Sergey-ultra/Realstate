import React, {useCallback, useEffect, useState} from 'react'
import s from "../adv/AdvContainer.module.scss";
import {MyAdv} from "./MyAdv"
import {useSelector} from "react-redux";
import api from "../../../dataAccessLayer/firebase";
import {Preloader} from "../../common/preloader/preloader";


export const MyItems = () => {
    const userId = useSelector(state => state.auth.userId)
    const [flats, setFlats] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    const fetchAdv = useCallback(async () => {
        const flats = await api.getAdvByUserId(userId)
        setFlats(flats)
        setIsLoading(false)
    })

    useEffect(() => {
        fetchAdv()
    }, [userId])

    if (isLoading) {
        return <Preloader/>
    }

        return <div className={s.flats}>
            <div className={s.container}>
                <div className={s.flats__title}>Мои объявления</div>
                {(flats.length !== 0)
                    ?
                    <div className={s.flats__content}>
                        {flats.map((flat, index) => <MyAdv key={index} flat={flat}/>)}
                    </div>
                    :
                    <h4>У нас нет добавленных объявлений</h4>
                }


            </div>
        </div>

}