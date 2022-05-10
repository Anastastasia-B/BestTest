import React, {Fragment} from "react"
import { useTranslation } from 'react-i18next'

import starOn from '../assets/starOn.svg'

const AverageRating = ({rating}) => {
    const {t} = useTranslation()

    return (
        <div>
            <span>{t('test.rate')}</span>
            {rating > 0
                ? (
                <Fragment>
                    <span>{rating}</span>
                    <img className="star_average_rating" alt="Stars" src={starOn}></img>
                </Fragment>
                )
                : <span className="result_text_xs">{t('test.notRated')}</span>
            }
        </div>
    )
}

export default AverageRating
