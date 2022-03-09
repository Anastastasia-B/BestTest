import {$authHost, $host} from "./index"
import jwt_decode from "jwt-decode"

export const registration = async (email, password, name) => {
    const {data} = await $host.post('api/user/registration', {email, password, name})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getOneUser = async (id) => {
    const {data} = await $authHost.get('api/user/' + id)
    return data
}

export const uploadAvatar = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const {data} = await $authHost.post('api/user/avatar', formData)
    return data
}

export const deleteAvatar = async () => {
    const {data} = await $authHost.delete('api/user/avatar')
    return data
}

export const editProfile = async (user) => {
    const {data} = await $authHost.post('api/user/edit_profile', user)
    return data
}
