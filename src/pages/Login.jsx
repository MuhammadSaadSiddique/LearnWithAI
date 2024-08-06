import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Routes, Route, Navigate} from 'react-router-dom'
import Email from './Email'
import './Login.css'

const Login = () => {
  return (
    <div className='full-screen d-flex align-items-center justify-content-center'>
        <Container className='d-flex align-items-center justify-content-center'>
            <Row>
                <Col className='lg'>
                    <Row></Row>
                    <Row>
                        <Routes>
                            <Route path="email/" element={<Email />} />
                            <Route path="/" element={<Navigate to="email" />} />
                        </Routes>
                    </Row>
                    <Row></Row>
                </Col>
            </Row>
        </Container>
    </div>  
    )
}

export default Login