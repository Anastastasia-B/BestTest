import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Container from "react-bootstrap/Container"
import ReactMarkdown from 'react-markdown'

import { getOneUser } from "../http/userAPI"

const Profile = () => {
    const [user, setUser] = useState(null)
    const {id} = useParams()
    const [showAllAbout, setShowAllAbout] = useState(false)

    useEffect(() => {
        getOneUser(id).then(data => setUser(data))
    }, [id])

    if (!user) return null

    const initials = () => {
        const words = user.name.split(' ')
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

    const about = user.about || 'User last speachless :>'
    const avatarUrl = user.avatarUrl || defaultAvatarUrl()

    const aboutTooLong = about.length > 500
    const trancatedAbout = aboutTooLong ? `${about.substr(0, 496)} ...` : about

    return (
        <Container>
            <div className="d-inline-flex w-100">
                <div className="profile_avatar_section">
                    <div className="profile_avatar_large">
                        <img className="profile_avatar_image" alt={user.name} src={avatarUrl} />
                    </div>
                </div>
                <div className="profile_name_section w-100">
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <h1 className="profile_name">{user.name}</h1>
                            <div className="profile_email">
                                <a href="mailto:a.berezniova@datarockets.com">{user.email}</a>
                            </div>
                            {/* Место для рейтинга пользователя или какой-нибудь ещё инфы */}
                        </div>
                        <div className="profile_abot">
                            <p className="profile_abot_label my-0"><b>About: </b></p>
                            <ReactMarkdown>{showAllAbout ? about : trancatedAbout}</ReactMarkdown>
                            {aboutTooLong && (
                                <a
                                    className="profile_view_about"
                                    onClick={() => setShowAllAbout(!showAllAbout)}>{showAllAbout ? 'Hide' : 'View more'}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile_content">
                {/* Место для тестов созданных пользователем */}
            </div>
        </Container>
    )
}

export default Profile
