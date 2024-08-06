<<<<<<< HEAD
import React from 'react'
=======
>>>>>>> ashehal
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Routes, Route, Navigate} from 'react-router-dom'
import Email from './Email'
<<<<<<< HEAD
=======
import Password from './Password'
>>>>>>> ashehal
import './Login.css'

const Login = () => {
  return (
    <div className='full-screen d-flex align-items-center justify-content-center'>
<<<<<<< HEAD
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
=======
        <Container className='image-container m-0 p-0 b-0'>

        </Container>
        <Container className='d-flex align-items-center justify-content-center personal-card b-1'>
            <Row className='d-flex justify-content-center m-0 b-0 p-0'>
                <Row>
                    <h3 className='text-center mb-10'>Learn With AI</h3>
                </Row>
                <Row className='m-0 p-0 b-0 mb-10'>
                    <h6 className="text-center">All this wisdom at your fingertips</h6>
                </Row>
                <Row className='mt-10'>
                    <Col className='lg'>
                        <Row></Row>
                        <Row>
                            <Routes>
                                <Route path="email/" element={<Email />} />
                                <Route path="/" element={<Navigate to="email" />} />
                                <Route path='password/' element={<Password />}/>
                            </Routes>
                        </Row>
                        <Row></Row>
                    </Col>
                </Row>
>>>>>>> ashehal
            </Row>
        </Container>
    </div>  
    )
}

export default Login