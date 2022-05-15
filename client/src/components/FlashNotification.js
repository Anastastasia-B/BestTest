import React, {useEffect, useContext} from 'react'
import classNames from 'classnames'

import { Context } from "../index"

const FlashNotification = ({notification}) => {
  const {notification: notificationContext} = useContext(Context)

  useEffect(() => {
    const removeTimeoutId = setTimeout(() => {
      localStorage.setItem('notification', null)
      notificationContext.setNotification(null)
    }, 5000)

    return () => {
      clearTimeout(removeTimeoutId)
    }
  }, [notification])

  const containerClass = classNames("flash_container", {
    ["flash_info"]: notification.type === 'INFO',
    ["flash_danger"]: notification.type === 'DANGER',
  })

  return (
    <div className={containerClass}>
      <span>{notification.message}</span>
    </div>
  )
}

export default FlashNotification
