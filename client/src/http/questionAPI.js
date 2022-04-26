import {$authHost} from "./index"

export const getOneQuestion = async (id) => {
    const {data} = await $authHost.get('api/question/' + id)
    return data
}
