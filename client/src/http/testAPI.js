import {$host, $authHost} from "./index"

export const getOneTest = async (id, userId = 0) => {
    const {data} = await $authHost.get('api/test/' + id + '&' + userId)
    return data
}

export const finishTest = async ({testId, testResultId, userId}) => {
    const {data} = await $authHost.post('api/test/finish/' + testId, {testResultId, userId})
    return data
}
