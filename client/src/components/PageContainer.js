import React from "react"
import Container from "react-bootstrap/Container"

const PageContainer = ({children}) => {
    return (
        <Container className="page-container content-width">
            <div className="page-wrapper">
                {children}
            </div>
        </Container>
    )
}

export default PageContainer
