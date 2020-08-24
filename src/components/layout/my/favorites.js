import React, {useCallback, useEffect, useState} from 'react'
import s from "../adv/AdvContainer.module.scss";
import {Adv} from "../adv/adv"
import {useSelector} from "react-redux";
import api from "../../../dataAccessLayer/firebase";
import {Preloader} from "../../common/preloader/preloader";


export const Favorites = () => {
    const userId = useSelector(state => state.auth.userId)
    const [flats, setFlats] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    const fetchFavorites = useCallback(async () => {
        let flatIds = await api.getFavoritesByUserId(userId)
        console.log(flatIds)
        let flatArray = []
        for (const item of flatIds) {
            const current = await api.getAdvById(item.flatId)
            flatArray.push(current)
        }

        setFlats([...flatArray])
        setIsLoading(false)
    })
    useEffect(() => {
        fetchFavorites()

    }, [userId])

    if (isLoading) {
        return <Preloader/>
    }
    return (
        <div className={s.flats}>
            <div className={s.container}>
                <div className={s.flats__title}>Избранные</div>
                <div className={s.flats__content}>
                    {flats.length !==0
                        ?
                        flats.map((flat, index) =>  <Adv key={index} flat={flat} userId={userId}/>)
                    : <h3>У вас еще нет объявлений в избранном</h3>}
                </div>
            </div>
        </div>
    )
}