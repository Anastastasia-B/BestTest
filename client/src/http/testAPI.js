import {$host} from "./index"

export const getOneTest = async (id) => {
    const {data} = await $host.get('api/test/' + id)
    return data
}
