import React, { useState, useEffect, Fragment } from "react"
import { useParams } from "react-router-dom"
import { useTranslation } from 'react-i18next'

import { getOneUser } from "../http/userAPI"
import PageContainer from '../components/PageContainer'
import ExpandableParagraph from '../components/ExpandableParagraph'
import Avatar from "../components/Avatar"
import {TEST_ROUTE} from "../utils/consts"

const Profile = () => {
    const {t} = useTranslation()
    const [user, setUser] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        getOneUser(id).then(data => setUser(data))
    }, [id])

    if (!user) return null

    const bio = user.bio || t('profile.noBio')

    return (
        <PageContainer>
            <Fragment>
                <div className="d-inline-flex w-100">
                    <Avatar userAvatarUrl={user.avatarUrl} userName={user.name} />
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
                                <ExpandableParagraph text={bio} maxLenght={375}></ExpandableParagraph>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile_content">
                    <div className="my-3">
                        <span>{t('profile.testsCreated')}</span>
                        {user.createdTests.map(test => (
                            <Fragment key={test.id}>
                                <a href={TEST_ROUTE + '/' + test.id}>{test.title}</a>
                                { <span>{' '}</span>}
                            </Fragment>
                        ))}
                    </div>
                    <span>{t('profile.testsPassed')}</span>
                    {user.testsPassed.map(test => (
                        <Fragment key={test.id}>
                            <a href={TEST_ROUTE + '/' + test.id}>{test.title}</a>
                            { <span>{' '}</span>}
                        </Fragment>
                    ))}
                </div>
            </Fragment>
        </PageContainer>
    )
}

export default Profile
