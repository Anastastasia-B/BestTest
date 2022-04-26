import {$authHost} from "./index"

export const getOneTestResult = async (id) => {
    const {data} = await $authHost.get('api/test_result/' + id)
    return data
}
