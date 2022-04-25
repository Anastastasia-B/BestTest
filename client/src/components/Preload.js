import React from "react"
import {Spinner} from "react-bootstrap"

const Preload = () => {
    return (
        <div className="mt-2 mx-auto d-flex justify-content-center">
            <Spinner animation="border" variant="primary" size="lg"/>
        </div>
    )
}

export default Preload
