function commitMessage(type, message, notificationContext) {
    localStorage.setItem('notification', {message, type})
    notificationContext.setNotification({message, type})
}

export default {
    danger(message, notificationContext) {
        commitMessage('DANGER', message, notificationContext)
    },
    notice(message, notificationContext) {
        commitMessage('INFO', message, notificationContext)
    }
}
