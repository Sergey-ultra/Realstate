import React, {useState} from 'react';
import api from "../../../dataAccessLayer/firebase";
import {useSelector} from "react-redux"
import {FlatForm} from "./FlatForm";

export const Create = () => {
    const userId = useSelector(state => state.auth.userId)
    const isAuth = useSelector(state => state.auth.isAuth)
    const [newItem, setNewItem] = useState({})
    const [images, setImages] = useState([])
    const [selectedRooms, setSelectedRooms] = useState(null)
    const name ='Новое объявление'
    const manipulateTitle= 'Создать'



    const addFlat = () => {
        const date = new Date()
        const priceHistory = [{date: date, price: newItem.price}]
        api.addAdv(
            images,
            newItem.address,
            newItem.price,
            priceHistory,
            newItem.phone,
            selectedRooms,
            newItem.square,
            newItem.floor,
            newItem.description,
            date,
            userId)
    }

    return (
        <FlatForm
            manipulateTitle={manipulateTitle}
            isAuth={isAuth}
            name={name}
            setNewItem={setNewItem}
            newItem={newItem}
            mainFunction={addFlat}
            images={images}
            setImages={setImages}
            selectedRooms={selectedRooms}
            setSelectedRooms={setSelectedRooms}
        />
    )
}
