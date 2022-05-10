import {$authHost} from "./index"

export const setRate = async (testId, value) => {
    const {data} = await $authHost.post('api/rate/set', {testId, value})
    return data
}
