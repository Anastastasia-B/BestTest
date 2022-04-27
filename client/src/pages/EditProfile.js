import React, { useState, useEffect, useContext, Fragment } from "react"
import {Button, Form} from "react-bootstrap"
import {Formik, Field, Form as FormikForm, ErrorMessage} from 'formik'
import { useTranslation } from 'react-i18next'

import {Context} from '../index'
import { getOneUser, uploadAvatar, deleteAvatar, editProfile } from "../http/userAPI"
import PageContainer from '../components/PageContainer'
import {PROFILE_ROUTE} from "../utils/consts"
import Avatar from "../components/Avatar"

const Profile = () => {
    const {t} = useTranslation()
    const {user: currentUser} = useContext(Context)
    const [user, setUser] = useState(null)

    useEffect(() => {
        getOneUser(currentUser.user.id).then(data => setUser(data))
    }, [currentUser])

    if (!user) return null

    const changeHandler = async (e) => {
        if (!e.target.files[0]) return

        try {
            const file = e.target.files[0]
            const data = await uploadAvatar(file)
            setUser(data)

            e.target.value = ''
        } catch (e) {
            if (e.response && e.response.data) {    
                alert(t(e.response.data.message))
            }
            else {
                console.log(e)
            }
        }
    }

    const removeAvatar = async () => {
        try {
            const data = await deleteAvatar()
            setUser(data)
        } catch (e) {
            if (e.response && e.response.data) {    
                alert(t(e.response.data.message))
            }
            else {
                console.log(e)
            }
        }
    }

    const updateProfile = async (values) => {
        if (values.email === user.email && values.name === user.name && values.bio === user.bio) return

        try {
            const data = await editProfile({...values, id: user.id})
            setUser(data)

            alert(t('profile.updated')) // заменить на флеш нотификацию
        } catch (e) {
            if (e.response && e.response.data) {    
                alert(t(e.response.data.message))
            }
            else {
                console.log(e)
            }
        }
    }

    const renderForm = ({ isSubmitting }) => (
        <FormikForm>
            <Form.Label className="edit-profile-label mb-2">{t('shared.editProfile')}</Form.Label>
            <Form.Group className="profile-form-group profile-compact-field">
                <Form.Label className="edit-profile-field-label">{t('shared.name')}</Form.Label>
                <Field className="form-control" name="name" placeholder={t('shared.enterName')} />
            </Form.Group>
            <Form.Group className="profile-form-group profile-compact-field">
                <Form.Label className="edit-profile-field-label">{t('auth.email')}</Form.Label>
                <Field className="form-control" name="email" placeholder={t('auth.enterEmail')} />
                <ErrorMessage className="field-error" name="email" component="div" />
            </Form.Group>
            <Form.Group className="profile-form-group">
                <Form.Label className="edit-profile-field-label">{t('profile.bio')}</Form.Label>
                <Field
                    className="form-control" 
                    name="bio"
                    placeholder={t('profile.enterBio')}
                    as="textarea"
                    rows="5"
                    maxLength ="2000"
                />
            </Form.Group>
            <Button
                disabled={isSubmitting}
                className="profile-button-medium mt-2 align-items-center"
                variant="primary"
                type="submit"
            >
                {t('shared.update')}
            </Button>
        </FormikForm>
    )

    return (
        <PageContainer>
            <Fragment>
                <div className="d-inline-flex w-100 mb-4">
                    <Avatar userAvatarUrl={user.avatarUrl} userName={user.name} />
                    <div className="d-flex justify-content-between w-100"> 
                        <Form.Group className="mt-1 d-flex flex-column">
                            <Form.Label className="edit-profile-label">{t('profile.uploadAvatar')}</Form.Label>
                            <label>
                                <div className="btn btn-primary btn-lg">
                                    <div className="choose_file_text">
                                        <input
                                            className="hidden-input-file"
                                            type="file"
                                            accept="image"
                                            onChange={changeHandler}
                                            autoComplete="off"
                                        />
                                        {t('profile.chooseFile')}
                                    </div>
                                </div>
                            </label>
                            {user.avatarUrl && (
                                <Button
                                    onClick={removeAvatar}
                                    className="delete-avatar-button text-start"
                                    variant="link"
                                >
                                    {t('profile.removeAvatar')}
                                </Button>
                            )}
                        </Form.Group>
                        <div>
                            <Button className="profile-button-medium" variant="outline-primary" href={PROFILE_ROUTE + `/${user.id}`} >
                                {t('shared.viewProfile')}
                            </Button>
                        </div>
                    </div>
                </div>
                <Formik
                    onSubmit={updateProfile}
                    initialValues={{email: user.email, name: user.name, bio: user.bio || ''}}
                    validate={(values) => {
                        const errors = {}

                        if (!values.email)
                            errors.email = t('errors.fieldRequired')

                        return errors
                    }}
                >
                    {renderForm}
                </Formik>
            </Fragment>
        </PageContainer>
    )
}

export default Profile
