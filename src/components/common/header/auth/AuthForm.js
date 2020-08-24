import React, {useState} from 'react'
import {Link, Redirect, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {login, setAutorization} from "../../../../store/auth-reducer"
import api from "../../../../dataAccessLayer/firebase";
import s from './authForm.module.scss'
import { useForm } from "react-hook-form";

import {Typography, Paper, Avatar, Button} from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'


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

const Login = ({classes,closeAuthForm}) => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.auth.isAuth)
    const [showRegister, setShowRegister] = useState(false)
    const { register, handleSubmit, reset, errors  } = useForm();


    const show = () => {
        setShowRegister(true)
        reset()
    }
    const close = () => {
        setShowRegister(false)
        reset()
    }




    const loginWithEmailAndPassword = async data => {
        try {
            const response = await api.login(data.email, data.password)
            if (response) {
                dispatch(login(response.user.uid, response.user.displayName))
                closeAuthForm ()
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const onRegister = async data => {
        try {
            await api.register(data.name, data.email, data.password)
            const user = await api.isAutorized()
            if (user) {
                dispatch(setAutorization(user.uid, user.displayName))
                closeAuthForm ()
            }


        } catch (error) {
            alert(error.message)
        }
    }


    console.log(errors)
    if (isAuth) return <Redirect to={"/"}/>
    return (

                <div className={s.paper}>
                    <div className={s.auth__title}>
                        <Typography component="h1" variant="h5">Вход и регистрация</Typography>
                    </div>
                    <div className={s.auth__widget}>
                        <div className={s.auth__row}>

                            <form className={classes.form}
                                  onSubmit={showRegister ?
                                      handleSubmit(onRegister)
                                      : handleSubmit(loginWithEmailAndPassword)}>

                                {showRegister &&
                                <div className={s.auth__content}>
                                    <input type="text"
                                           placeholder="Имя"
                                           className={s.auth__input + " " + (errors.name && s.auth__error)}
                                           id='name'
                                           name='name'
                                           ref={register({ required: true })}
                                    />
                                    {errors.name && <span className={s.error__text}>Заполните поле "Имя"</span>}
                                </div>
                                }
                                <div className={s.auth__content}>
                                    <input type="text"
                                           placeholder="Email или id"
                                           className={s.auth__input + " " + (errors.email && s.auth__error)}
                                           id='email'
                                           name='email'
                                           ref={register({ required: true })}
                                    />
                                    {errors.email && <span className={s.error__text}>Заполните поле "Email"</span>}
                                </div>
                                <div className={s.auth__content}>
                                    <input type="password"
                                           placeholder="Пароль"
                                           className={s.auth__input + " " + (errors.password && s.auth__error)}
                                           id='password'
                                           name='password'
                                           ref={register({ required: true })}
                                    />
                                    {errors.password && <span className={s.error__text}>Заполните поле "Пароль"</span>}
                                </div>


                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}>
                                    {showRegister ? 'Регистрация' : 'Войти'}
                                </Button>
                                <Button
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
}

export const AuthForm = withStyles(styles)(Login)