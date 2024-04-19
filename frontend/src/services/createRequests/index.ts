// export const async createRequest()
// type T = typeof Request
// const myAsynFunction = async (url: string): Promise<T> => {
//     const { data } = await fetch(url)
//     return data
// }
import axios from "axios"
enum method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}
export type requestParams = {
    method: string,
    url: string,
    data?: any,
    headers?: any
}
export const createRequest = async (params: requestParams): Promise<any> => {
    try {
        const { method, url, data, headers } = params
        // const response = await axios(params)
        // const response = await axios({
        //     ...params
        // })
        const response = await axios({
            method: method,
            url: url,
            data: data,
            headers: headers
        });

        return response.data
    } catch (err) {
        if (err) {
            return err
        }
    }
}