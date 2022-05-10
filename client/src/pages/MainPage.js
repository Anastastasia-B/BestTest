import React, { useState, useEffect, Fragment } from "react"
import { useTranslation } from 'react-i18next'
import { Button, Dropdown } from "react-bootstrap"

import { getTests } from "../http/testAPI"
import PageContainer from '../components/PageContainer'
import {TEST_ROUTE} from "../utils/consts"
import AverageRating from "../components/AverageRating"

const Profile = () => {
    const {t} = useTranslation()
    const [tests, setTests] = useState(null)

    const sortMethods = ['DATE', 'RATING', 'POPULARITY']
    const [sortMethod, setSortMethod] = useState(sortMethods[0])

    useEffect(() => {
        if (!sortMethod) return

        getTests(sortMethod).then(data => setTests(data))
    }, [sortMethod])

    if (!tests) return null

    const renderTest = (test) => {
        return(
            <div key={test.id} className="mb-4 main_page_test_container">
                <h3>{test.title}</h3>
                <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-row">
                        {test.frontPictureUrl && (
                            <img
                                className="test_front_image_sm me-4"
                                alt={test.title}
                                src={process.env.REACT_APP_API_URL + test.frontPictureUrl}
                            />
                        )}
                        <div>
                            <AverageRating rating={test.averageRating} />
                            <p>{t('test.usersPassedCount') + test.usersPassedCount}</p>
                        </div>
                    </div>
                    <div>
                        <Button
                            href={TEST_ROUTE + '/' + test.id}
                            size="md"
                            className="btn-block px-4"
                            variant="outline-primary"
                        >
                            {t('mainPage.viewTest')}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    const localizedSortMethodName = (sortMethod) => {
        return t('mainPage.sortBy.' + sortMethod.toLowerCase())
    }

    return (
        <PageContainer>
            <div className="d-flex align-items-center mx-2 mb-2">
                <span className="me-1">{t('mainPage.sortBy.heading')}</span>
                <Dropdown>
                    <Dropdown.Toggle variant="link" id="sort-by-dropdown">
                        {localizedSortMethodName(sortMethod)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {sortMethods.map((method) => (
                            <Dropdown.Item key={method} onClick={() => setSortMethod(method)}>{localizedSortMethodName(method)}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            {tests.map((test) => renderTest(test))}
        </PageContainer>
    )
}

export default Profile
