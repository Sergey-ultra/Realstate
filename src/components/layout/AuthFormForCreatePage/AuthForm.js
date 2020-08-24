import s from "./AuthForm.module.scss";
import React, {useState} from "react";
import api from "../../../dataAccessLayer/firebase";
import {login, setAutorization} from "../../../store/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect} from 'react-router-dom'
import {Avatar, Button, Paper, Typography} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/core/SvgIcon/SvgIcon";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

export const AuthForm = withStyles(styles)(({classes, closeAuthForm}) => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.auth.isAuth)
    const [inputInfo, setInputInfo] = useState({})
    const [showRegister, setShowRegister] = useState(false)
    const show = () => {setShowRegister(true)}
    const close = () => {setShowRegister(false)}

    const inputHandler = e => {
        setInputInfo({...inputInfo, [e.target.id]: e.target.value})
    }

    const loginWithEmailAndPassword = async () => {
        try {
            const response = await api.login(inputInfo.email, inputInfo.password)
            if (response) {
                dispatch(login(response.user.uid, response.user.displayName))
                closeAuthForm ()
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const onRegister = async () => {
        try {
            await api.register(inputInfo.name, inputInfo.email, inputInfo.password)
            const user = await api.isAutorized()
            if (user) {
                const {uid, displayName} = user
                dispatch(setAutorization(uid, displayName))
                closeAuthForm ()
            }
        } catch (error) {
            alert(error.message)
        }
    }


    if (isAuth) return <Redirect to={"/"}/>
    return (
        <div className={s.auth}>
            <div className={s.auth__title}>
                <Typography component="h1" variant="h5">Вход и регистрация</Typography>
            </div>
            <div className={s.auth__widget}>
                <div className={s.auth__row}>

                    <form className={classes.form}
                          onSubmit={e => e.preventDefault() && false}>
                        {showRegister &&
                        <div className={s.auth__content}>
                            <input type="text"
                                   placeholder="Имя"
                                   className={s.auth__input}
                                   id='name'
                                   value={inputInfo.name}
                                   onChange={inputHandler}
                            />
                        </div>
                        }
                        <div className={s.auth__content}>
                            <input type="text"
                                   placeholder="Email или id"
                                   className={s.auth__input}
                                   id='email'
                                   value={inputInfo.email}
                                   onChange={inputHandler}
                            />
                        </div>
                        <div className={s.auth__content}>
                            <input type="password"
                                   placeholder="Пароль"
                                   className={s.auth__input}
                                   id='password'
                                   value={inputInfo.password}
                                   onChange={inputHandler}
                            />
                        </div>


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={showRegister ? onRegister : loginWithEmailAndPassword}
                            className={classes.submit}>
                            {showRegister ? 'Регистрация' : 'Войти'}
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={showRegister ? close : show}
                            className={classes.submit}>
                            {showRegister ? 'Логин' : 'Регистрация'}
                        </Button>
                    </form>
                </div>
                <div className={s.auth__container}>
                    <Link className={s.auth__link} to='/contacts'>Нужна помощь?</Link>
                </div>
            </div>
        </div>
    )
})