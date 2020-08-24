import React, {Fragment, useCallback, useEffect, useState} from "react";
import {reviewAPI} from "../../../../dataAccessLayer/ExpressApi";
import {Preloader} from "../../../common/preloader/preloader";


export const Reviews = () => {
    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const fetchReviews = useCallback(async () => {
        try {
            const fetched = await reviewAPI.getReviews()
            setReviews(fetched)
            setIsLoading(false)
        } catch
            (e) {

        }
    })

    useEffect(() => {
        fetchReviews()
    }, [])

    if (isLoading) {return <Preloader/>}
    return (
        <Fragment>
            {reviews.map((review, index) => {
                return (
                    <div key={index}>
                        {review.text}
                        {review.date}
                    </div>
                )
            })}
        </Fragment>
    )
}





