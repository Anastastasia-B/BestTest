import React, { useState, useEffect, Fragment } from "react"
import { useParams } from "react-router-dom"
import ReactMarkdown from 'react-markdown'
import { useTranslation } from 'react-i18next'

import { getOneUser } from "../http/userAPI"
import PageContainer from '../components/PageContainer'
import Avatar from "../components/Avatar"

const Profile = () => {
    const {t} = useTranslation()
    const [user, setUser] = useState(null)
    const {id} = useParams()
    const [showAllBio, setShowAllBio] = useState(false)

    useEffect(() => {
        getOneUser(id).then(data => setUser(data))
    }, [id])

    if (!user) return null

    const bio = user.bio || t('profile.noBio')

    const bioTooLong = bio.length > 500
    const trancatedBio = bioTooLong ? `${bio.substr(0, 496)} ...` : bio

    return (
        <PageContainer children={(
            <Fragment>
                <div className="d-inline-flex w-100">
                    <div className="profile_avatar_section">
                        <Avatar userAvatarUrl={user.avatarUrl} userName={user.name} />
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
                                <p className="profile_abot_label my-0 mx-1"><b>{t('profile.bioColon')}</b></p>
                                <ReactMarkdown>{showAllBio ? bio : trancatedBio}</ReactMarkdown>
                                {bioTooLong && (
                                    <a
                                        className="profile_view_bio"
                                        onClick={() => setShowAllBio(!showAllBio)}
                                    >
                                        {showAllBio ? t('profile.hide') : t('profile.viewMore')}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile_content">
                    {/* Место для тестов созданных пользователем */}
                </div>
            </Fragment>
        )}/>
    )
}

export default Profile
