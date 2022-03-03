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

    const about = user.about || 'User last speachless :>'

    const aboutTooLong = about.length > 500
    const trancatedAbout = aboutTooLong ? `${about.substr(0, 496)} ...` : about

    return (
        <Container>
            <div className="d-inline-flex w-100">
                <div className="profile_avatar_section">
                    <div className="profile_avatar_large">
                        <img className="profile_avatar_image" alt={user.name} src={user.avatar_url} />
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
