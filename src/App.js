import React, {useEffect} from 'react';
import {BrowserRouter as Router, Redirect, Route, withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {setAutorization } from './store/auth-reducer'
import api from './dataAccessLayer/firebase'

import './App.scss';


import {Header} from "./components/common/header/Header"
import {Footer} from "./components/common/footer/footer";
import {AdvContainer} from './components/layout/adv/AdvContainer'
import {AdvViewContainer} from "./components/layout/advView/AdvViewContainer";
import {My} from "./components/layout/my/My";
import {NoPage} from "./components/common/404/404";
import {Create} from "./components/layout/create__and__edit/Create";
import {Main} from "./components/layout/main/main";
import {MyItems} from "./components/layout/my/MyItems";
import {Edit} from "./components/layout/create__and__edit/Edit";
import {Favorites} from "./components/layout/my/favorites";


const App = () => {
    const dispatch = useDispatch()
    //const isAuth = useSelector(state => state.auth.isAuth)

    useEffect(() => {
        api.isAutorized().then(user => {
            if (user) {
                const{uid, displayName} = user
                dispatch(setAutorization(uid, displayName))
            }
        })
    }, [])

    return (
        <Router basename ={process.env.PUBLIC_URL}>
            <div className="app__wrapper">
                <Header/>
                <div className="app_content">
                    <Route path='/my' component={My}/>
                    <Route exact path='/create/' component={Create}/>
                    <Route path='/flat/:id' component={AdvViewContainer}/>
                    <Route exact path='/flat' component={AdvContainer}/>
                    <Route exact path='/' component={Main}/>
                    <Route exact path='/favorites' component={Favorites}/>
                    <Route exact path='/edit/:id' component={Edit}/>
                    <Route exact path='/my_items' component={MyItems}/>
                    <Route exact path='/my_items/:id' component={AdvViewContainer}/>
                    {/*<Route  component={NoPage} />*/}
                </div>
                <Footer/>
            </div>
        </Router>
    )
}
export default withRouter(App);
