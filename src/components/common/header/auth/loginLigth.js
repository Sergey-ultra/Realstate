import React from "react";
import {withRouter} from "react-router-dom";

import {Field, reduxForm} from "redux-form";
import {required} from "../../validator/validator";
import {renderInput} from "../../validator/FormControl";



import LockOutlinedIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { Typography, Paper, Avatar} from '@material-ui/core'
import withStyles from "@material-ui/core/styles/withStyles";

import form from '../../validator/FormControl.module.css'






const LoginForm = (props) => {
    const {handleSubmit, error} =props;
    return (
        <form onSubmit ={handleSubmit}>
            <div>
                <Field type="text" name= "email"placeholder="Email"
                       validate ={[required]}component ={renderInput}/>
            </div>
            <div>
                <Field type="password" name= "password"placeholder="Password"
                       validate ={[required]} component ={renderInput}/>
            </div>
            <div>
                <Field type = "checkbox" name= "rememberMe"
                       component ={renderInput}/>Запомнить меня
            </div>
            {error && <div className ={form.formSummaryError}>{error}</div>}
            <div>
                <button>Войти</button>
            </div>
            <div>

            </div>
        </form>
    )
}
const LoginFormLight = reduxForm({form:'login'})(LoginForm)

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
        marginTop: theme.spacing.unit * 8,
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

const LoginLight = (props) => {
    const { classes, signIn} = props
    const login = formData => {
        console.log (formData)
        signIn(formData.email, formData.password, formData.rememberMe)
    }
    return(

        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Вход
                </Typography>
                <LoginFormLight onSubmit={login}/>
            </Paper>
        </main>

      )
}

export default withRouter(withStyles(styles)(LoginLight))
/*export default LoginLight*/
