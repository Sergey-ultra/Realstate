import React, {useCallback, useEffect, useState} from 'react';
import api from '../../../dataAccessLayer/firebase'
import {useParams} from 'react-router-dom';
import {FlatForm} from "./FlatForm";
import {useSelector} from "react-redux";


export const Edit = () => {
    const {id} = useParams()
    const isAuth = useSelector(state => state.auth.isAuth)
    const [newItem, setNewItem] = useState({})
    const [images, setImages] = useState([])
    const [selectedRooms, setSelectedRooms] = useState(null)
    const name='Редактирование объявления'
    const manipulateTitle= 'Редактировать'


    const fetchEdit = useCallback(async () => {
        const item = await api.getAdvById(id)
        setNewItem({...item})
        setImages([...item.imgUrl])
        setSelectedRooms(item.rooms)
    })

    useEffect(() => {
        fetchEdit()
    }, [])


    const edit = () => {
        const date = new Date()
        let priceHistory = [...newItem.priceHistory, {date: date, price: newItem.price}]
        api.updateAdv(
            newItem.id,
            images,
            newItem.address,
            newItem.price,
            priceHistory,
            newItem.phone,
            selectedRooms,
            newItem.square,
            newItem.floor,
            newItem.description,
            newItem.date,
            newItem.userId
        )
    }


    return (
        <FlatForm
            manipulateTitle={manipulateTitle}
            isAuth={isAuth}
            name={name}
            setNewItem={setNewItem}
            newItem={newItem}
            mainFunction={edit}
            images={images}
            setImages={setImages}
            selectedRooms={selectedRooms}
            setSelectedRooms={setSelectedRooms}
        />
    )
}



