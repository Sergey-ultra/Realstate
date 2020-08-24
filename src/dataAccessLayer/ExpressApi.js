import * as axios from "axios";

const instance = axios.create({
    withCredentials: false,
    baseURL: '/review'
})

export const reviewAPI = {
    getReviews() {
        return instance.get('')
            .then(response => {
                console.log(response)
                /*if (!response.ok) {
                    throw new Error(response.statusText)
                }*/
                return response
            })
    }
}


