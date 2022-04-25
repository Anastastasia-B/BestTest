import React, { Fragment, useState } from "react"
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'

const ExpandableParagraph = ({text, maxLenght}) => {
    const {t} = useTranslation()
    const [showAll, setShowAll] = useState(false)

    const textTooLong = text.length > maxLenght
    const trancatedText = textTooLong ? `${text.substr(0, maxLenght - 4)} ...` : text

    return (
        <Fragment>
        <ReactMarkdown>{showAll ? text : trancatedText}</ReactMarkdown>
        {textTooLong && (
            <a
                className="view_more"
                onClick={() => setShowAll(!showAll)}
            >
                {showAll ? t('shared.hide') : t('shared.viewMore')}
            </a>
        )}
        </Fragment>
    )
}

export default ExpandableParagraph
