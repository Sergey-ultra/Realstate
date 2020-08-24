import React, {useEffect, useState} from "react";
import api from "../../../dataAccessLayer/firebase";
import Chart from "react-apexcharts";
import {BrowserRouter as Router, Switch, Link, Route} from "react-router-dom";
import s from './flatView.module.scss'

//импорт стилей
import {Preloader} from "../../common/preloader/preloader";
import {Description} from "./Description";
import {Price} from "./price/Price";
import {Slider} from "./slider/slider";
import {Reviews} from "./reviews/Reviews";


export const AdvViewContainer = ({match}) => {
    const [current, setCurrent] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [infoSection, setInfoSection] = useState("Where buy");
    const [priceHistory, setPriceHistory] = useState([]);
    const chartWidth = "300px"
    const chartHeight = "220px"
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric'
    };

    const fetchFlatById = async () => {
        if (!isLoading) {
            const res = await api.getAdvById(match.params.id)
            setCurrent(res)
            setIsLoading(true)
            let aditionalPriceHistory = res.priceHistory.map(item => {
                return ({x: item.date.toDate().getTime(), y: Number(item.price)})
            })
            setPriceHistory(aditionalPriceHistory)
        }
    }


    useEffect(() => {
        fetchFlatById()
    }, [])


    const chartState = {
        options: {
            chart: {
                id: "basic-bar"
            },
            stroke: {
                curve: 'smooth',
            },
            xaxis: {
                type: 'datetime'
            }
        },
        series: [
            {
                name: "Цена",
                data: priceHistory
            }
        ]
    };

    return (!isLoading
            ? <Preloader/>
            :
            <Router>
                <div className={s.flat}>
                    <div className={s.container}>
                        <div className={s.item}>
                            <div className={s.item__main}>
                                <div className={s.breadcrumbs}>
                                    <Link to='/'>
                                        Недвижимость в Москве /
                                    </Link>
                                    {`${current.rooms} комн. квартира ${current.square} м2`}
                                </div>
                                <div className={s.item__date}>
                                    {`${current.date.toDate().toLocaleString("ru", options)}`}
                                </div>

                                <div className={s.item__card}>
                                    <div className={s.item__title}>
                                        {`${current.rooms} комн. квартира ${current.square} м2`}
                                    </div>
                                    <div className={s.item__tabs}>
                                        <Link to={`${match.url}`}>
                                            <div
                                                className={s.item__tab + " " + (infoSection === "Where buy" && s.item__tab__active)}
                                                onClick={() => setInfoSection("Where buy")}>Где купить
                                            </div>
                                        </Link>
                                        <Link to={`${match.url}/description`}>
                                        <div
                                            className={s.item__tab + " " + (infoSection === "Discription" && s.item__tab__active)}
                                            onClick={() => setInfoSection("Discription")}>Описание
                                        </div>
                                        </Link>
                                        <Link to={`${match.url}/reviews`}>
                                            <div
                                                className={s.item__tab + " " + (infoSection === "Reviews" && s.item__tab__active)}
                                                onClick={() => setInfoSection("Reviews")}>Отзывы
                                            </div>
                                        </Link>
                                        <Link to={`${match.url}/discussion`}>
                                            <div
                                                className={s.item__tab + " " + (infoSection === "Discussion" && s.item__tab__active)}
                                                onClick={() => setInfoSection("Discussion")}>Обсуждение
                                            </div>
                                        </Link>
                                        <Link to={`${match.url}/useful`}>
                                            <div
                                                className={s.item__tab + " " + (infoSection === "Useful" && s.item__tab__active)}
                                                onClick={() => setInfoSection("Useful")}>Полезное
                                            </div>
                                        </Link>
                                    </div>

                                    <div className={s.item__underline}></div>

                                    <div className={s.item__content}>
                                        <div className={s.item__slider}>
                                            <Slider imgUrl={current.imgUrl} name={current.address}/>
                                        </div>
                                        <div className={s.item__price}>
                                            <div className={s.item__digital}> {`${current.price} руб`} </div>
                                            <div className={s.item__chart}>
                                                {/*<Chart
                                                    options={chartState.options}
                                                    series={chartState.series}
                                                    type="line"
                                                    width={chartWidth}
                                                    height={chartHeight}
                                                />*/}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={s.item__info}>
                                        <h2>{`${current.rooms} комн. квартира ${current.square} м2`}</h2>

                                        <Switch>
                                            <Route
                                                exact path={`${match.path}`}
                                                render={props => <Price {...props} current={current}/>}
                                            />
                                            <Route exact path={`${match.path}/description`}
                                                   render={props => <Description {...props} current={current}/>}
                                            />
                                            <Route
                                                exact path={`${match.path}/reviews`}
                                                render={props => <Reviews {...props} current={current}/>}
                                            />
                                            <Route
                                                exact path={`${match.path}/discussion`}
                                                render={props => <Reviews {...props} current={current}/>}
                                            />
                                            <Route
                                                exact path={`${match.path}/usefull`}
                                                render={props => <Reviews {...props} current={current}/>}
                                            />

                                        </Switch>

                                    </div>
                                </div>

                            </div>
                            <div className={s.item__sidepanel}>
                                Подбор по параметрам
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
    )
}
