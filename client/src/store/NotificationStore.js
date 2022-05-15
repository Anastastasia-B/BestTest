import {makeAutoObservable} from "mobx"

export default class NotificationStore {
    constructor() {
        this._notification = null
        makeAutoObservable(this)
    }

    setNotification(notification) {
        this._notification = notification
    }

    get notification() {
        return this._notification
    }
}
