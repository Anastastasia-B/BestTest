import React from "react"

const Avatar = ({userAvatarUrl, userName}) => {
    const initials = () => {
        const words = userName.split(' ')
        const firstLetter = words[0].substr(0, 1)
        const secondLetter = words[1]?.substr(0, 1)
        return secondLetter ? firstLetter + secondLetter : firstLetter
    }

    const defaultAvatarUrl = () => (
        `data:image/svg+xml;utf8,${defaultAvatar()}`
    )

    const defaultAvatar = () => (
      "<svg xmlns='http://www.w3.org/2000/svg' width='224' height='224'>" +
        "<rect width='100%' height='100%' x='0' y='0' fill='rgb(22, 123, 255, 0.25)'/>" +
        "<text text-anchor='middle' x='112' y='160' font-family='Arial' font-size='130' fill='rgb(235, 245, 255)'>" +
          `${initials()}` +
        '</text>' +
      '</svg>'
    )

    const avatarUrl = userAvatarUrl
        ? process.env.REACT_APP_API_URL + userAvatarUrl
        : defaultAvatarUrl()

    return (
        <div className="profile_avatar_section">
            <div className="profile_avatar_large">
                <img className="profile_avatar_image" alt={userName} src={avatarUrl} />
            </div>
        </div>
    )
}

export default Avatar
