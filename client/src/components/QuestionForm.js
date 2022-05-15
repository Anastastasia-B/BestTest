import React, { useState, Fragment } from "react"
import {Button, Row, Col, Form} from "react-bootstrap"
import {Formik, Field, Form as FormikForm, ErrorMessage} from 'formik'
import { useTranslation } from 'react-i18next'

import PageContainer from '../components/PageContainer'

function QuestionForm() {
    const {t} = useTranslation()
    const [frontImage, setFrontImage] = useState(null)

    const createTest = async (values) => {
        console.log(values)
    }

    const frontImageChangeHandler = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader()
            reader.onload = function (e) {
                setFrontImage(e.target.result)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const renderForm = ({isSubmitting}) => (
        <FormikForm className="my-4">
            <Row className="mb-3">
                {frontImage && (
                    <Col>
                        <img className="test_front_image" src={frontImage} />
                    </Col>
                )}
                <Col>
                    <Form.Label className="h5">{t('test.uploadFrontPicture')}</Form.Label>
                    <label className="d-block">
                        <div className="btn btn-primary">
                            <div className="choose_file_text">
                                <input
                                    className="hidden-input-file"
                                    type="file"
                                    accept="image"
                                    onChange={frontImageChangeHandler}
                                    autoComplete="off"
                                />
                                {t('profile.chooseFile')}
                            </div>
                        </div>
                    </label>
                </Col>
            </Row>
            <Form.Group className="profile-form-group">
                <Form.Label className="edit-profile-field-label">{t('test.title')}</Form.Label>
                <Field className="form-control" name="title" placeholder={t('test.enterTitle')} />
                <ErrorMessage className="field-error" name="title" component="div" />
            </Form.Group>
            <Form.Group className="profile-form-group">
                <Form.Label className="edit-profile-field-label">{t('test.description')}</Form.Label>
                <Field
                    className="form-control" 
                    name="description"
                    placeholder={t('test.enterDescription')}
                    as="textarea"
                    rows="5"
                    maxLength ="5000"
                />
            </Form.Group>
            <Button
                disabled={isSubmitting}
                className="btn-lg mt-2 align-items-center"
                variant="primary"
                type="submit"
            >
                {t('test.createButton')}
            </Button>
        </FormikForm>
    )

    return (
        <PageContainer>
            <h2>{t('test.create')}</h2>
            <Formik
                onSubmit={createTest}
                initialValues={{title: '', description: ''}}
                validate={(values) => {
                    const errors = {}

                    if (!values.title)
                        errors.title = t('errors.fieldRequired')

                    return errors
                }}
            >
                {renderForm}
            </Formik>
        </PageContainer>
    )
}

export default QuestionForm
