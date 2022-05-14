import {$host, $authHost} from "./index"

export const getOneTest = async (id, userId = 0) => {
    const {data} = await $host.get('api/test/' + id + '&' + userId)
    return data
}

export const finishTest = async ({testId, testResultId, userId}) => {
    const {data} = await $authHost.post('api/test/finish/' + testId, {testResultId, userId})
    return data
}

export const getTests = async (sortMethod) => {
    const {data} = await $host.get('api/test/index/' + sortMethod)
    return data
}

export const createTest = async (formData) => {
    const {data} = await $authHost.post('api/test/create', formData)
    return data
}
