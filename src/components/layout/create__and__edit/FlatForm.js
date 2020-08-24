import React, {useState} from "react";
import {storage} from "../../../dataAccessLayer/fbConfig";
import s from "./FlatForm.module.scss";
import {Tooltips} from "../../common/Tooltips/Tooltips";
import {FiImage} from 'react-icons/fi';
import {useHistory} from 'react-router-dom';
import {AuthForm} from "../../common/header/auth/AuthForm";

export const FlatForm = ({
                             setNewItem,
                             newItem,
                             mainFunction,
                             images,
                             setImages,
                             selectedRooms,
                             setSelectedRooms,
                             name,
                             isAuth,
                             manipulateTitle
                  }) => {
    const history = useHistory();
    const [progressBar, setProgressBar] = useState(0)
    const options = ['1', '2', '3', '4', '5', '6 или более']

    const formCondition =
        progressBar === 100 &&
        newItem.address !== '' &&
        newItem.price !== '' &&
        newItem.phone !== '' &&
        newItem.rooms !== '' &&
        newItem.square !== '' &&
        newItem.floor !== '' &&
        newItem.description

    const close = () => {
        setImages([]);
        setProgressBar(0);
        history.push("/flat");
    }
    const manipulate =() => {
        mainFunction()
        close()
    }


    const onHandleUpdate = e => {
        setNewItem({...newItem, [e.target.id]: e.target.value});
    };

    // Редактирование загруженных картинок   в Firebase
    const onHandleChangeFile = async e => {

        if (e.target.files !== []) {
            let aditionalArray = [];
            for (let i = 0; i < e.target.files.length; i++) {
                const file = e.target.files[i]
                if (!file.type.match('image.*')) {
                    continue
                }
                storage.ref(`/images/${file.name}`).put(file)
                    .on('state_changed',
                        async snapshot => {
                            await setProgressBar(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
                            console.log('процент загрузки ' + progressBar)
                        },
                        error => {
                            console.log(error)
                        },
                        async () => {
                            let url = await storage.ref('images').child(file.name).getDownloadURL()
                            aditionalArray.push(url)
                            console.log(images)
                            console.log(...aditionalArray)
                            /* console.log(url)
                             console.log(images.concat(url))*/
                            console.log(`Проходка цикла номер ${i}`)
                            setImages([...images, ...aditionalArray])

                        }
                    )

            }
        }
    }

    return (
        <div className={s.container}>
            <div className={s.create__title}>{name}</div>
            <div className={s.create__main}>
                <div className={s.create__item}>
                    <div className={s.subtitle}>Об объекте</div>
                    <form className={s.create__form}>
                        <div className={s.field}>
                            <label>Адрес квартиры</label>
                            <input
                                type="text"
                                className={s.input__text + " " + s.address}
                                onChange={onHandleUpdate}
                                id="address"
                                value={newItem.address}
                            />
                        </div>
                        <div className={s.field}>
                            <label>Количество комнат</label>
                            <Tooltips options={options}
                                      setSelected={setSelectedRooms}
                                      selected={selectedRooms}/>

                        </div>

                        <div className={s.field}>
                            <label>Общая площадь</label>
                            <div className={s.field__wrapper}>
                                <input
                                    type="text"
                                    className={s.input__text + " " + s.square}
                                    onChange={onHandleUpdate}
                                    id="square"
                                    value={newItem.square}
                                />
                                <span className={s.field__text}>м<sup>2</sup></span>
                            </div>
                        </div>
                        <div className={s.field}>
                            <label>Этаж</label>
                            <input
                                type="text"
                                className={s.input__text + " " + s.floors}
                                onChange={onHandleUpdate}
                                id="floor"
                                value={newItem.floor}
                            />
                        </div>
                    </form>
                </div>
                <div className={s.create__item + " " + s.create__photos}>
                    <div className={s.subtitle}>Фотографии</div>
                    <div className={s.guide}>
                        Не допускаются к размещению фотографии с водяными знаками, чужих объектов и
                        рекламные баннеры. JPG, PNG или GIF. Максимальный размер файла 10 мб
                    </div>
                    <div className={s.loader}>
                        {images &&
                        images.map((img, index) =>
                            <div key={index} className={s.loader__photos}>
                                <img src={img} alt="flat"/>
                            </div>)
                        }
                        <form className={s.loader__upload}>
                            <FiImage/>
                            <p>Загрузите фотографии<span>*</span></p>
                            <input
                                type="file"
                                multiple
                                className={s.input__file}
                                onChange={onHandleChangeFile}
                                id="Photos"
                            />
                        </form>
                    </div>
                    <div className={s.description}>
                        <div className={s.subtitle}>Описание</div>
                        <textarea
                            type="textarea"
                            placeholder="Расскажите в каком состоянии полы, окна, сантехника, установлены л счетчики;
							была ли перепланировка; как долго квартира в собственности и сколько хозяев; какие у вас соседи."
                            className={s.input__textarea}
                            onChange={onHandleUpdate}
                            id="description"
                            value={newItem.description}
                        />
                    </div>
                </div>
                <div className={s.create__item + " " + s.create__photos}>
                    <div className={s.subtitle}>Цена и контакты</div>
                    <form className={s.create__form}>
                        <div className={s.field}>
                            <label>Цена</label>
                            <div className={s.field__wrapper}>
                                <input
                                    type="text"
                                    className={s.input__text + " " + s.price}
                                    onChange={onHandleUpdate}
                                    value={newItem.price}
                                    id="price"
                                />
                                <span className={s.field__text}>руб</span>
                            </div>
                        </div>


                        <div className={s.field}>
                            <label>Тип продажи</label>
                            <input
                                type="text"
                                className={s.input__text}
                                onChange={onHandleUpdate}
                                id="type__of__sale"
                            />
                        </div>
                        <div className={s.field}>
                            <label>Телефон</label>
                            <input
                                type="text"
                                className={s.input__text + " " + s.phone}
                                onChange={onHandleUpdate}
                                id="phone"
                                value={newItem.phone}
                            />
                        </div>
                    </form>
                </div>

                {isAuth
                    ?
                    <div className={s.create__item + " " + s.create__buttons}>
                        <button type="button"
                                className={s.button + " " + s.create__button + " " + s.close__button}
                                onClick={close}>Закрыть
                        </button>
                        <button type="button"
                                className={s.button + " " + s.create__button + " " + (formCondition ? s.success__button : s.disabled__button)}
                                onClick={formCondition ? manipulate: null}>
                            {manipulateTitle}
                        </button>
                    </div>
                    :
                    <AuthForm
                        closeAuthForm={() => {}}
                        //эта функция используется, если форма авторизации открыта в модальном онке для закрытия оного
                    />

                }
            </div>
        </div>
    )
}
